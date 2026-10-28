# Network Security IP Range Scanner (Educational Lab Tool)

A browser-based dashboard that demonstrates how basic network host-discovery
scanning works, built as a cybersecurity education project. **All scanning in
this application is simulated.** No real network traffic is ever generated.

## Overview

You enter a start and end IPv4 address, confirm you're authorized to "scan"
that range, and the app walks through each address in order, deterministically
marking it Active or Inactive, then presents the results in a searchable,
filterable dashboard with per-host detail.

## Objective

Give students a hands-on feel for the mechanics of host discovery — input
validation, iterating a range, tracking progress, and summarizing results —
without touching a real network, and without including any of the
functionality (stealth, evasion, exploitation, credential attacks) that would
make a tool usable for unauthorized scanning.

## Features

- IPv4 input validation with clear, user-friendly error messages
- Start/end range validation (valid format, start ≤ end, max 64 hosts, private/lab ranges only)
- Explicit authorized-use confirmation required before a scan can start
- Step-by-step simulated discovery with live progress (current IP, hosts processed, percentage, status)
- Summary cards (range, total, active, inactive, errors)
- Results table with search, status filter, and sort
- Host detail view for a selected IP
- Clear/reset controls for both the form and the results
- Dark, high-contrast dashboard UI with visible "Authorized Use Only" and "Simulation Mode" notices throughout

## Technology stack

- React 18
- Vite
- Tailwind CSS
- lucide-react (icons)
- Plain JavaScript — no backend, no network calls, no external scanning libraries

## Installation

```bash
npm install
```

## Running the application

```bash
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`) in your browser.

To build a production bundle:

```bash
npm run build
npm run preview
```

## How host discovery works in this project

This is a **frontend-only simulation**. Browsers cannot open raw sockets or
ping arbitrary hosts, and this project intentionally does not attempt to work
around that limitation with a backend scanning service.

Each IP address's Active/Inactive result is derived **deterministically** from
the address string itself (via `src/data/mockHosts.js`), so the same range
always produces the same results. This makes the tool reproducible for
grading/demo purposes while making it obvious — both in the code and in the
UI — that no device is actually being contacted.

The UI displays a persistent "Simulation Mode" notice and the statement:

> No real network traffic is generated. Results are simulated for educational purposes.

### What this project does **not** do

- Does not send ICMP, ARP, or TCP/UDP probes to any real host
- Does not perform stealth or evasive scanning
- Does not perform vulnerability scanning or exploitation
- Does not perform credential or brute-force attacks
- Does not attempt to bypass firewalls or other security controls

If you want to extend this into a tool that performs **real** discovery
against a lab network you control, that requires a backend service (e.g. a
small authenticated API that shells out to a permitted, rate-limited ping
sweep) running in an environment you own — this repository does not include
one, by design.

## Project structure

```
network-ip-range-scanner/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Header.jsx
    │   ├── Hero.jsx
    │   ├── ScannerConfig.jsx
    │   ├── ScanProgress.jsx
    │   ├── ScanSummary.jsx
    │   ├── ResultsTable.jsx
    │   ├── HostDetails.jsx
    │   ├── SecurityNotice.jsx
    │   └── Footer.jsx
    ├── data/
    │   └── mockHosts.js
    └── utils/
        └── ip.js
```

## Error handling

The app validates and reports, in plain language, without exposing stack traces:

- Empty start/end fields
- Malformed IPv4 addresses
- Start IP greater than end IP
- Ranges outside private/lab address space (10.x, 172.16–31.x, 192.168.x, 127.x)
- Ranges larger than the configured host limit (default 64)
- Missing authorization confirmation
- Unexpected errors during a simulated scan step (surfaced as a per-host "error" row rather than crashing the scan)

## Security and ethical considerations

- The app displays "Authorized Use Only" in the header and a security notice throughout the page.
- A scan cannot start until the user checks a box confirming authorization and understanding that results are simulated.
- The tool restricts itself to private/lab address ranges — it will not validate a "scan" of public internet ranges.
- No stealth, evasion, exploitation, credential-attack, or automated attack functionality is present anywhere in the codebase.
- This project is a teaching aid, not a security product, and should not be relied on for real network assessment.

## Assignment mapping

| Requirement | Where it's addressed |
|---|---|
| IP range input + validation | `src/utils/ip.js`, `ScannerConfig.jsx` |
| Host discovery | `src/data/mockHosts.js` (simulated), `App.jsx` scan loop |
| Scanning progress | `ScanProgress.jsx` |
| Results dashboard | `ScanSummary.jsx`, `ResultsTable.jsx` |
| Result details | `HostDetails.jsx` |
| Error handling | `utils/ip.js` validation + `App.jsx` try/catch around each step |
| Safety limits | `MAX_HOSTS` constant, authorization checkbox, private-range restriction |
| Simulation labeling | `Hero.jsx`, `SecurityNotice.jsx`, header badge |

## Future enhancements

- Optional authenticated backend for real discovery against a self-hosted lab range
- Export results to CSV
- Scan history across multiple sessions
- Configurable simulation seed for reproducible classroom demos

## License

MIT — provided for educational use.
