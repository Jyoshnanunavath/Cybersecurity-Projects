#  IP Port Scanner

A frontend-only, educational IP port scanner prototype developed for the cybersecurity coursework assignment "Assignment 1: IP Port Scanner."

VD demonstrates the workflow of a port-scanning application through an interactive React interface, including target configuration, port-range selection, simulated scanning, results analysis, service identification, filtering, port details, and CSV export.

> **Important:** VD does not perform real network scanning. It does not send packets, probe target systems, connect to external hosts, or make outbound network requests. All scan results are generated from a predefined mock dataset for educational demonstration.

---

## 1. Features

* Target IP address and port range configuration
* IPv4 and port-range validation
* Simulated port scanning with progress visualization
* Scan summary with target, ports scanned, open ports, and scan status
* Open and closed port status identification
* Common service identification
* Search and status filtering
* Detailed information for individual ports
* Security observations for selected ports
* CSV export of displayed results
* Educational port-security guidance
* Responsive frontend interface

---

## 2. Tech Stack

| Technology       | Purpose                                   |
| ---------------- | ----------------------------------------- |
| React 18         | User interface and component architecture |
| Vite 5           | Development server and build tooling      |
| Tailwind CSS 3   | Styling and responsive design             |
| JavaScript (ES6) | Frontend logic and state management       |
| lucide-react     | Interface icons                           |

**Backend:** None
**Database:** None
**External APIs:** None
**Network Scanning:** None

---

## 3. Installation and Running Locally

### Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd vd-port-scanner
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will display a local development URL, typically:

```text
http://localhost:5173/
```

Open the URL in a modern web browser.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

---

## 4. Project Structure

```text
vd-port-scanner/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    │
    ├── components/
    │   ├── Header.jsx
    │   ├── Hero.jsx
    │   ├── ScannerConfig.jsx
    │   ├── ScanProgress.jsx
    │   ├── ScanSummary.jsx
    │   ├── ResultsTable.jsx
    │   ├── PortDetails.jsx
    │   ├── SecurityNotes.jsx
    │   └── Footer.jsx
    │
    └── data/
        └── mockPorts.js
```

---

## 5. Component Overview

### Header

Displays the VD brand identity and system status indicator.

### Hero

Introduces the application and identifies it as an educational simulated prototype.

### ScannerConfig

Handles:

* Target IPv4 address
* Starting port
* Ending port
* Input validation
* Scan initiation
* Clear/reset functionality

### ScanProgress

Provides the simulated scanning animation using a local timer. It does not communicate with the target IP.

### ScanSummary

Displays:

* Target IP
* Number of ports scanned
* Number of open ports
* Scan status

### ResultsTable

Displays and manages the simulated scan results.

Features include:

* Port search
* Service search
* Status filtering
* Open/closed indicators
* CSV export
* Empty-state handling

### PortDetails

Displays detailed information for a selected port, including:

* Port number
* Protocol
* Service
* Description
* Security observation

### SecurityNotes

Provides general educational information about port-security practices.

### Footer

Displays project information and reinforces that the application uses demonstration data only.

---

## 6. Simulated Scanning Logic

The application follows a frontend-only scanning workflow:

```text
User enters target IP and port range
              |
              v
       Input validation
              |
              v
      Start scan animation
              |
              v
     Frontend timer completes
              |
              v
 Filter predefined mock port dataset
              |
              v
       Generate results
              |
              v
 Display summary and results table
              |
              v
 Search, filter, inspect, or export
```

### Process

1. The user enters an IPv4 address and port range.
2. `ScannerConfig.jsx` validates the input.
3. `App.jsx` changes the application state to `"scanning"`.
4. `ScanProgress.jsx` displays a simulated progress animation.
5. Once the animation completes, `App.jsx` calls `getPortsInRange()`.
6. `getPortsInRange()` filters the predefined records in `mockPorts.js`.
7. The application changes the state to `"done"`.
8. The filtered results are displayed in the summary and results table.

No network request is made during this process.

---

## 7. Mock Dataset

The application uses a predefined dataset containing example port information such as:

```text
Port
Protocol
Service
Description
Status
Security Observation
```

The displayed results depend on the selected port range.

Because the dataset is static, scanning the same range repeatedly produces the same results.

---

## 8. CSV Export

The Export Results feature allows users to download the currently displayed scan results.

The export process:

1. Applies the current search and status filters.
2. Converts the displayed records into CSV format.
3. Creates a browser `Blob` containing the CSV data.
4. Generates a temporary download link.
5. Downloads the file as:

```text
VD_port_scan_results.csv
```

The export button is disabled when there are no results to export.

---

## 9. Example Usage

For a demonstration:

1. Start the application:

```bash
npm run dev
```

2. Open the application in a desktop browser.
3. Enter the following example IP address:

```text
192.168.1.1
```

4. Set the port range to:

```text
1 - 1024
```

5. Select "Scan Ports".
6. Wait for the simulated scan to complete.
7. Review the scan summary and results.
8. Use the search and filtering functionality.
9. Select an individual port to view its details.
10. Export the displayed results as a CSV file if required.

> The IP address is used only as an input value within the prototype. No connection is made to that address.

---

## 10. Assignment Mapping

| Assignment Requirement        | Implementation                      |
| ----------------------------- | ----------------------------------- |
| Enter target IP address       | `ScannerConfig.jsx`                 |
| Enter port range              | `ScannerConfig.jsx`                 |
| Click Scan                    | `ScannerConfig.jsx` → `App.jsx`     |
| Scan progress                 | `ScanProgress.jsx`                  |
| View scanning results         | `ResultsTable.jsx`                  |
| OPEN / CLOSED status          | `mockPorts.js` + `ResultsTable.jsx` |
| Common service identification | `mockPorts.js`                      |
| Results in a table            | `ResultsTable.jsx`                  |
| Search and filtering          | `ResultsTable.jsx`                  |
| Port details                  | `PortDetails.jsx`                   |
| Export results                | `ResultsTable.jsx`                  |
| Security guidance             | `SecurityNotes.jsx`                 |

---

## 11. Security and Ethical Scope

This project intentionally avoids real network scanning.

It does not:

* Probe external IP addresses
* Send TCP or UDP packets
* Attempt connections to target ports
* Perform vulnerability scanning
* Collect network traffic
* Store user data
* Communicate with a backend

The project is intended to demonstrate port-scanning concepts, frontend application logic, and cybersecurity awareness in a controlled educational environment.

---

## 12. Future Enhancements

Potential future improvements include:

* Controlled backend-based network scanning
* TCP and UDP scanning support
* Configurable scan timeout
* Additional service fingerprinting
* Real-time scan logs
* Network security alerts
* Historical scan comparison
* User authentication
* Backend-based result storage
* Advanced vulnerability detection

Any real scanning functionality should only be implemented for systems where appropriate authorization has been obtained.

---

## 13. Project Scope

VD — IP Port Scanner is an educational cybersecurity prototype designed to demonstrate the workflow and concepts of an IP port-scanning application through a modern frontend interface.

The project focuses on safe simulation, usability, visualization, and cybersecurity education rather than real-world network probing.

---

## 14. License

This project is intended for educational and academic purposes. You are free to modify and use it for learning and non-commercial coursework.
