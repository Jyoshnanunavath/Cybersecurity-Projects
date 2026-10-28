// Fabricated demonstration data for the monitoring dashboard prototype.

export const MONITORING_EVENTS = [
  { id: "mon-1", timestamp: "10:42:00", severity: "INFO", message: "Admin login successful" },
  { id: "mon-2", timestamp: "10:43:30", severity: "WARNING", message: "Multiple failed authentication attempts" },
  { id: "mon-3", timestamp: "10:45:10", severity: "HIGH", message: "Unauthorized admin resource access attempt" },
  { id: "mon-4", timestamp: "10:47:05", severity: "INFO", message: "Payment API request completed" },
  { id: "mon-5", timestamp: "10:52:40", severity: "CRITICAL", message: "API request threshold exceeded for client 203.0.113.7" },
  { id: "mon-6", timestamp: "10:58:12", severity: "WARNING", message: "Elevated API latency on /api/transactions" },
  { id: "mon-7", timestamp: "11:03:44", severity: "INFO", message: "Scheduled security-log rotation completed" }
];

export const SERVICE_STATUS = [
  { name: "admin-portal", status: "operational" },
  { name: "api-service", status: "operational" },
  { name: "monitoring", status: "operational" }
];

export const SECURITY_ALERTS = [
  { id: "alert-1", title: "Multiple failed logins", detail: "5 failed login attempts detected.", severity: "HIGH" },
  { id: "alert-2", title: "Unauthorized access", detail: "Unauthorized access attempt detected.", severity: "HIGH" },
  { id: "alert-3", title: "API rate limit", detail: "API request threshold exceeded.", severity: "CRITICAL" }
];
