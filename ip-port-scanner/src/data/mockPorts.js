// mockPorts.js
// -----------------------------------------------------------------------------
// Predefined, static demonstration dataset for VD — IP Port Scanner.
// This is NOT the result of any real network activity. Every record below is
// a fixed mock value used purely to drive the UI and workflow of the
// prototype, as required by the assignment (frontend-only, no real scanning).
// -----------------------------------------------------------------------------

export const MOCK_PORTS = [
  {
    port: 21,
    protocol: 'TCP',
    status: 'CLOSED',
    service: 'FTP',
    description: 'File Transfer Protocol, used for uploading and downloading files between systems.',
    note: 'FTP transmits credentials in plain text and should be replaced with SFTP or FTPS where possible.',
  },
  {
    port: 22,
    protocol: 'TCP',
    status: 'OPEN',
    service: 'SSH',
    description: 'Secure Shell is commonly used for encrypted remote administration.',
    note: 'Exposed administrative services should be restricted to trusted networks and kept updated.',
  },
  {
    port: 23,
    protocol: 'TCP',
    status: 'CLOSED',
    service: 'Telnet',
    description: 'Legacy remote terminal protocol that transmits data, including credentials, without encryption.',
    note: 'Telnet is an insecure legacy protocol and should generally be avoided where possible.',
  },
  {
    port: 25,
    protocol: 'TCP',
    status: 'CLOSED',
    service: 'SMTP',
    description: 'Simple Mail Transfer Protocol, used for sending email between mail servers.',
    note: 'Open mail relays can be abused for spam; SMTP services should require authentication.',
  },
  {
    port: 53,
    protocol: 'TCP',
    status: 'CLOSED',
    service: 'DNS',
    description: 'Domain Name System service used to resolve hostnames to IP addresses.',
    note: 'Publicly exposed DNS resolvers should be hardened against cache poisoning and amplification abuse.',
  },
  {
    port: 80,
    protocol: 'TCP',
    status: 'OPEN',
    service: 'HTTP',
    description: 'Hypertext Transfer Protocol is commonly used for unencrypted web services.',
    note: 'Unencrypted web traffic should be redirected to HTTPS to protect data in transit.',
  },
  {
    port: 110,
    protocol: 'TCP',
    status: 'CLOSED',
    service: 'POP3',
    description: 'Post Office Protocol version 3, used by mail clients to retrieve email from a server.',
    note: 'Prefer encrypted variants (POP3S) to avoid exposing mailbox credentials.',
  },
  {
    port: 143,
    protocol: 'TCP',
    status: 'CLOSED',
    service: 'IMAP',
    description: 'Internet Message Access Protocol, used by mail clients to manage messages on a server.',
    note: 'Prefer encrypted variants (IMAPS) to protect mailbox contents and credentials.',
  },
  {
    port: 443,
    protocol: 'TCP',
    status: 'OPEN',
    service: 'HTTPS',
    description: 'HTTP over TLS, commonly used for secure web communication.',
    note: 'Ensure TLS certificates are valid, current, and configured with strong cipher suites.',
  },
  {
    port: 3306,
    protocol: 'TCP',
    status: 'CLOSED',
    service: 'MySQL',
    description: 'Default port for MySQL / MariaDB database connections.',
    note: 'Database ports should never be exposed directly to the public internet.',
  },
  {
    port: 3389,
    protocol: 'TCP',
    status: 'CLOSED',
    service: 'RDP',
    description: 'Remote Desktop Protocol, used for graphical remote access to Windows systems.',
    note: 'RDP is a frequent target for brute-force attacks; restrict access and enforce MFA.',
  },
  {
    port: 8080,
    protocol: 'TCP',
    status: 'CLOSED',
    service: 'HTTP-Proxy',
    description: 'Commonly used as an alternate HTTP port or for proxy and application servers.',
    note: 'Alternate web ports should follow the same hardening standards as the primary web service.',
  },
]

// Returns the subset of MOCK_PORTS whose port number falls within [start, end].
export function getPortsInRange(start, end) {
  return MOCK_PORTS.filter((p) => p.port >= start && p.port <= end)
}
