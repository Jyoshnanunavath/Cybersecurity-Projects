# Assignment 3: Traceroute — Submission Notes

## Objective
To understand how packets travel between a source computer and a destination host.

## Implementation
The application runs the operating system's traceroute command (`tracert` on Windows, `traceroute` on Linux/macOS), parses hop information, and presents a hop table with response latency and probe status.

## Fields displayed
- Hop number
- Responding IP address (where available)
- Average latency from reported probes
- Probe status

## Identifying possible delays
The app flags average latency of 100 ms or more as a point worth investigating. This threshold is only a heuristic; it does not prove congestion. A timeout can happen when routers do not respond to probes.

## Screenshots to capture
1. Application home page with destination field and settings.
2. Results table after a successful trace.
3. Possible delays / timeout note.
4. Raw output expander.
5. GitHub repository showing uploaded files.

## Before submission
- Run the app and test a destination.
- Replace this note with your own screenshots if your instructor requires screenshots in the repository.
- Include your name, roll number, and date on the assignment cover page separately.
