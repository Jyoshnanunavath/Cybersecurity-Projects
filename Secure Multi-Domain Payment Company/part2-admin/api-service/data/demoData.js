// All data in this file is fabricated demonstration data.
// No real users, transactions, or credentials are stored here.

export const demoUsers = [
  { id: "usr-001", username: "admin", displayName: "Asha Rao", role: "administrator", status: "active" },
  { id: "usr-002", username: "analyst01", displayName: "Rahul Iyer", role: "security_analyst", status: "active" },
  { id: "usr-003", username: "support01", displayName: "Meera Nair", role: "support_staff", status: "active" },
  { id: "usr-004", username: "support02", displayName: "Farhan Ali", role: "support_staff", status: "disabled" }
];

export const demoTransactions = [
  { id: "TXN-1001", amount: 1500, currency: "INR", status: "success", timestamp: "2026-09-10T10:42:00Z", risk: "low" },
  { id: "TXN-1002", amount: 8500, currency: "INR", status: "pending", timestamp: "2026-09-10T10:44:00Z", risk: "medium" },
  { id: "TXN-1003", amount: 25000, currency: "INR", status: "flagged", timestamp: "2026-09-10T10:47:00Z", risk: "high" },
  { id: "TXN-1004", amount: 320, currency: "INR", status: "success", timestamp: "2026-09-10T10:49:00Z", risk: "low" },
  { id: "TXN-1005", amount: 60000, currency: "INR", status: "flagged", timestamp: "2026-09-10T10:52:00Z", risk: "high" }
];

export const demoSecurityEvents = [
  { id: "evt-1", timestamp: "2026-09-10T10:42:00Z", event: "Successful login", user: "admin", severity: "low", status: "normal" },
  { id: "evt-2", timestamp: "2026-09-10T10:43:00Z", event: "Failed login attempt", user: "user01", severity: "medium", status: "review" },
  { id: "evt-3", timestamp: "2026-09-10T10:45:00Z", event: "Unauthorized resource access attempt", user: "user02", severity: "high", status: "alert" },
  { id: "evt-4", timestamp: "2026-09-10T10:51:00Z", event: "Multiple failed login attempts", user: "user03", severity: "high", status: "alert" },
  { id: "evt-5", timestamp: "2026-09-10T10:58:00Z", event: "Admin configuration change", user: "admin", severity: "medium", status: "review" }
];

export const demoMonitoringEvents = [
  { id: "mon-1", timestamp: "2026-09-10T10:42:00Z", severity: "INFO", message: "Admin login successful" },
  { id: "mon-2", timestamp: "2026-09-10T10:43:30Z", severity: "WARNING", message: "Multiple failed authentication attempts detected" },
  { id: "mon-3", timestamp: "2026-09-10T10:45:10Z", severity: "HIGH", message: "Unauthorized admin resource access attempt" },
  { id: "mon-4", timestamp: "2026-09-10T10:47:05Z", severity: "INFO", message: "Payment API request completed" },
  { id: "mon-5", timestamp: "2026-09-10T10:52:40Z", severity: "CRITICAL", message: "API request threshold exceeded for client 203.0.113.7" }
];
