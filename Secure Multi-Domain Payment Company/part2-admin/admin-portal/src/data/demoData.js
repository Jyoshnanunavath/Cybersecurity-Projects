// All values in this file are fabricated demonstration data for the
// admin portal prototype. Nothing here represents a real user, account,
// or transaction.

export const DEMO_ACCOUNTS = [
  { username: "admin", password: "Admin@123", role: "administrator", displayName: "Asha Rao" },
  { username: "analyst", password: "Analyst@123", role: "security_analyst", displayName: "Rahul Iyer" },
  { username: "support", password: "Support@123", role: "support_staff", displayName: "Meera Nair" }
];

export const SYSTEM_OVERVIEW = {
  activeUsers: 1248,
  transactionsToday: 4582,
  failedLogins: 17,
  securityEvents: 6,
  apiRequests: 12481,
  alerts: 3
};

export const TRANSACTIONS = [
  { id: "TXN-1001", amount: 1500, status: "Success", timestamp: "10:42", risk: "low" },
  { id: "TXN-1002", amount: 8500, status: "Pending", timestamp: "10:44", risk: "medium" },
  { id: "TXN-1003", amount: 25000, status: "Flagged", timestamp: "10:47", risk: "high" },
  { id: "TXN-1004", amount: 320, status: "Success", timestamp: "10:49", risk: "low" },
  { id: "TXN-1005", amount: 60000, status: "Flagged", timestamp: "10:52", risk: "high" },
  { id: "TXN-1006", amount: 4200, status: "Success", timestamp: "10:55", risk: "low" }
];

export const SECURITY_EVENTS = [
  { id: "evt-1", timestamp: "10:42", event: "Successful Login", user: "admin", severity: "low", status: "Normal" },
  { id: "evt-2", timestamp: "10:43", event: "Failed Login", user: "user01", severity: "medium", status: "Review" },
  { id: "evt-3", timestamp: "10:45", event: "Unauthorized Access Attempt", user: "user02", severity: "high", status: "Alert" },
  { id: "evt-4", timestamp: "10:51", event: "Multiple Failed Logins", user: "user03", severity: "high", status: "Alert" },
  { id: "evt-5", timestamp: "10:58", event: "Admin Configuration Change", user: "admin", severity: "medium", status: "Review" },
  { id: "evt-6", timestamp: "11:04", event: "Successful Login", user: "analyst01", severity: "low", status: "Normal" }
];

export const DEMO_USERS_TABLE = [
  { id: "usr-001", username: "admin", displayName: "Asha Rao", role: "Administrator", status: "Active" },
  { id: "usr-002", username: "analyst01", displayName: "Rahul Iyer", role: "Security Analyst", status: "Active" },
  { id: "usr-003", username: "support01", displayName: "Meera Nair", role: "Support Staff", status: "Active" },
  { id: "usr-004", username: "support02", displayName: "Farhan Ali", role: "Support Staff", status: "Disabled" }
];
