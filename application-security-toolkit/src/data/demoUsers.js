// Demonstration accounts only.
// These are hard-coded, publicly-documented sample credentials used purely
// to illustrate authentication/authorization concepts in the UI.
// No real accounts, real users, or real credentials are involved.
// In a production system, credentials would never be stored in plaintext
// in source code — they would be salted, hashed, and stored server-side.

export const DEMO_USERS = [
  {
    id: 'admin',
    username: 'admin',
    password: 'Secure@123',
    displayName: 'Administrator',
    role: 'Administrator',
  },
  {
    id: 'user',
    username: 'user',
    password: 'User@123',
    displayName: 'Standard User',
    role: 'User',
  },
]

export const ROLE_PERMISSIONS = {
  Administrator: {
    viewDashboard: true,
    viewSecurityChecks: true,
    viewUserManagement: true,
    modifySecuritySettings: true,
    viewAdminReports: true,
  },
  User: {
    viewDashboard: true,
    viewSecurityChecks: true,
    viewUserManagement: false,
    modifySecuritySettings: false,
    viewAdminReports: false,
  },
}

export const PERMISSION_LABELS = [
  { key: 'viewDashboard', label: 'View Dashboard' },
  { key: 'viewSecurityChecks', label: 'View Security Checks' },
  { key: 'viewUserManagement', label: 'View User Management' },
  { key: 'modifySecuritySettings', label: 'Modify Security Settings' },
  { key: 'viewAdminReports', label: 'View Admin Reports' },
]

export const MAX_LOGIN_ATTEMPTS = 5
