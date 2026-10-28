import ipaddress
import platform
import re
import socket
import subprocess
import time

import pandas as pd
import streamlit as st

st.set_page_config(page_title="Traceroute Visualizer", page_icon="🛰️", layout="wide")

st.title("🛰️ Traceroute Visualizer")
st.write("Explore the network hops between your computer and a destination host.")
st.caption("Use only destinations you are authorized to test. Some routers may not reply to traceroute probes.")

def valid_destination(value: str) -> bool:
    value = value.strip()
    if not value or len(value) > 253:
        return False
    if any(ch.isspace() for ch in value) or value.startswith("-"):
        return False
    try:
        ipaddress.ip_address(value)
        return True
    except ValueError:
        pass
    # Basic hostname validation; DNS resolution is checked separately.
    return bool(re.fullmatch(r"(?=.{1,253}$)(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)(?:\.(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?))*\.?", value))

def parse_trace(output: str):
    rows = []
    for line in output.splitlines():
        # Windows tracert: "  1     2 ms     3 ms     2 ms  192.168.1.1"
        win = re.match(r"^\s*(\d+)\s+(.*)$", line)
        if not win:
            continue
        hop = int(win.group(1))
        rest = win.group(2).strip()
        times = re.findall(r"(\d+)\s*ms", rest, flags=re.I)
        addresses = re.findall(r"\[?([0-9A-Fa-f:.]+)\]?", rest)
        # Avoid accidentally treating latency digits as an address.
        ip = ""
        for candidate in reversed(addresses):
            try:
                ipaddress.ip_address(candidate)
                ip = candidate
                break
            except ValueError:
                continue
        if not times and "*" not in rest and "timed out" not in rest.lower():
            continue
        latency = round(sum(map(int, times)) / len(times), 2) if times else None
        status = "Timeout / no reply" if not times else "Responded"
        rows.append({"Hop": hop, "IP address": ip or "Unresolved / no reply",
                     "Latency (ms)": latency if latency is not None else "—",
                     "Probe status": status})
    return rows

with st.sidebar:
    st.header("Traceroute settings")
    destination = st.text_input("Destination domain or IP", value="example.com", help="For example: example.com or 8.8.8.8")
    max_hops = st.slider("Maximum hops", min_value=5, max_value=30, value=20)
    timeout_ms = st.slider("Timeout per probe (milliseconds)", min_value=500, max_value=5000, value=1500, step=500)
    run = st.button("Run traceroute", type="primary", use_container_width=True)

if run:
    destination = destination.strip()
    if not valid_destination(destination):
        st.error("Enter a valid domain name or IP address.")
        st.stop()
    try:
        resolved = socket.gethostbyname(destination)
    except OSError:
        st.error("Could not resolve that destination. Check the spelling and your internet/DNS connection.")
        st.stop()

    st.subheader("Trace summary")
    a, b, c = st.columns(3)
    a.metric("Destination", destination)
    b.metric("Resolved IPv4", resolved)
    c.metric("Max hops", max_hops)

    if platform.system().lower() == "windows":
        command = ["tracert", "-d", "-h", str(max_hops), "-w", str(timeout_ms), destination]
    else:
        # Linux/macOS traceroute generally supports -n, -m max hops, -w timeout seconds.
        command = ["traceroute", "-n", "-m", str(max_hops), "-w", str(max(1, timeout_ms // 1000)), destination]

    st.info("Running a network trace. This can take a little while if many hops time out.")
    started = time.time()
    try:
        result = subprocess.run(command, capture_output=True, text=True, timeout=max(45, max_hops * 4), check=False)
        elapsed = round(time.time() - started, 2)
        output = (result.stdout or "") + ("\n" + result.stderr if result.stderr else "")
        if result.returncode != 0 and not output.strip():
            st.error("Traceroute could not run. Check that the system traceroute utility is installed and available.")
            st.code("Command attempted: " + " ".join(command))
            st.stop()
    except FileNotFoundError:
        st.error("Traceroute utility not found. On Windows, use Command Prompt's `tracert`; on Linux install `traceroute`; on macOS, check that `traceroute` is available.")
        st.stop()
    except subprocess.TimeoutExpired:
        st.error("The trace took too long and was stopped. Try fewer maximum hops or a destination that responds.")
        st.stop()

    rows = parse_trace(output)
    st.metric("Trace runtime", f"{elapsed} seconds")
    if rows:
        df = pd.DataFrame(rows)
        st.subheader("Hop-by-hop route")
        st.dataframe(df, use_container_width=True, hide_index=True)
        responded = sum(1 for row in rows if row["Probe status"] == "Responded")
        st.write(f"**Responding hops:** {responded} of {len(rows)} parsed hops.")
        numeric = [row["Latency (ms)"] for row in rows if isinstance(row["Latency (ms)"], (int, float))]
        if numeric:
            st.line_chart(pd.DataFrame({"Hop latency (ms)": numeric}, index=[r["Hop"] for r in rows if isinstance(r["Latency (ms)"], (int, float))]))
        st.subheader("Possible delays")
        delayed = [r for r in rows if isinstance(r["Latency (ms)"], (int, float)) and r["Latency (ms)"] >= 100]
        timed_out = [r for r in rows if r["Probe status"] != "Responded"]
        if delayed:
            st.warning("Higher observed latency (100 ms or more) at hop(s): " + ", ".join(str(r["Hop"]) for r in delayed) + ". This is a clue, not proof of congestion.")
        else:
            st.success("No parsed hop had an average latency of 100 ms or more.")
        if timed_out:
            st.warning("Some hops did not reply. Routers may filter or deprioritize traceroute probes; a timeout alone does not prove a fault.")
        st.download_button("Download hop results as CSV", df.to_csv(index=False).encode("utf-8"), "traceroute_results.csv", "text/csv")
    else:
        st.warning("The output was received, but no hop rows could be parsed. Read the raw output below and check your operating system's traceroute format.")
    with st.expander("Show raw traceroute output"):
        st.code(output or "(No output)", language="text")

st.divider()
st.subheader("How traceroute works")
st.markdown("""
1. The computer sends probes with a small **TTL (Time To Live)** value.
2. Each router that forwards a packet reduces the TTL by one.
3. When TTL reaches zero, a router may send an ICMP **Time Exceeded** message.
4. The program records the responding hop and estimates round-trip time (latency).
5. The TTL is increased until the destination is reached or the maximum hop limit is met.

**Important:** Latency is round-trip time for a probe, not a direct measurement of delay on one individual link. Firewalls, load balancing, and router policies can affect results.
""")
