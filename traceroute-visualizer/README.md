# Traceroute Visualizer

A small Python + Streamlit application that runs the operating system's traceroute utility and displays hop-by-hop results.

## Features
- Accepts a destination domain or IP address
- Displays hop number, responding IP address, latency, and probe status
- Configurable maximum hops and timeout
- Flags higher observed latency and non-responsive hops
- Shows raw traceroute output and exports parsed results to CSV
- Explains TTL and the purpose of traceroute

## Requirements
- Python 3.10 or newer
- Windows: built-in `tracert` command
- Linux/macOS: `traceroute` command installed
- Internet/network access (some networks block probes)

## Run on Windows (PowerShell or Command Prompt)

```bash
py -m venv .venv
.venv\Scripts\activate
py -m pip install -r requirements.txt
py -m streamlit run app.py
```

If `py` is not recognized, try `python` instead.

## Run on Linux/macOS

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
streamlit run app.py
```

Make sure the `traceroute` utility is installed.

## Test
Try `example.com` or `8.8.8.8`. A trace may take time and some hops may show no response. This can be normal because routers sometimes filter or deprioritize probes.

## How it works
Traceroute varies the packet Time To Live (TTL). When a router reduces TTL to zero, it may return an ICMP Time Exceeded response. The app reads the system command output, parses responding hops and latency values, and displays them in a table.

## Limitations
- Output parsing can vary between operating systems.
- The current implementation resolves a destination to IPv4 for the summary.
- A timeout does not necessarily indicate a network failure.
- Latency values are round-trip probe times, not a definitive measure of delay on a particular link.

## GitHub submission
Do not commit virtual environments, secrets, or personal network details. Suggested repository name: `traceroute-visualizer`.
