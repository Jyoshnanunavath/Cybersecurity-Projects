# Cybersecurity and Computer Networking Projects

## Overview

This repository contains academic assignments and practical projects developed as part of coursework in cybersecurity and computer networking. It demonstrates the application of networking concepts, network diagnostics, host discovery, and security principles through hands-on implementation.

## Projects

### 1. Traceroute Visualizer

**Description:**  
A Python-based web application that visualizes the network path between a source computer and a destination host. It presents hop-by-hop information, IP addresses, response times, and probe statuses to help users understand network routing and identify potential delays.

**Key Features**
- Destination domain or IP address input
- Configurable maximum number of hops
- Adjustable probe timeout
- Hop-by-hop route visualization
- IP address and latency display
- Probe status reporting

**Technology Stack:** Python, Streamlit

**Project Directory:** `traceroute-visualizer/`

### 2. Network IP Range Scanner

**Description:**  
A web-based application designed to demonstrate IP range scanning and host discovery. It provides an interface for entering network ranges and viewing scan results to understand host availability within a network.

**Key Features**
- IP range input
- Host discovery
- Active and inactive host identification, where supported by the implementation
- Scan results visualization
- Input validation and error handling

**Technology Stack:** React, Vite, JavaScript, and the libraries specified in `package.json`

**Project Directory:** `network-ip-range-scanner/`

## Repository Structure

```text
Cybersecurity-Projects/
├── README.md
├── traceroute-visualizer/
│   ├── app.py
│   ├── requirements.txt
│   └── README.md
└── network-ip-range-scanner/
    ├── src/
    ├── index.html
    ├── package.json
    ├── package-lock.json
    └── README.md
```

*Additional configuration and supporting files are included in the respective project directories.*

## Learning Outcomes

Through these projects, the repository explores:

- Network routing and traceroute analysis
- IP addressing and host discovery
- Network latency and response-time interpretation
- Web application development
- Input validation and error handling
- Practical implementation of computer networking concepts

## Usage

Each project has its own directory and README file containing project-specific information and execution instructions.

Refer to the individual project documentation for setup requirements and instructions.

## Academic Purpose

This repository is maintained for academic coursework, practical implementation, and demonstration of cybersecurity and computer networking concepts.
