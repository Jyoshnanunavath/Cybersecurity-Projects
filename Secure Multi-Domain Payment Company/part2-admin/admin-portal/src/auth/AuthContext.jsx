import React, { createContext, useContext, useMemo, useState } from "react";
import { DEMO_ACCOUNTS } from "../data/demoData.js";

// This is a prototype authorization mechanism for demonstration purposes only.
// It runs entirely in the browser with hardcoded demo credentials and must
// never be used as a model for real authentication.

const AuthContext = createContext(null);

export const ROLES = {
  ADMIN: "administrator",
  ANALYST: "security_analyst",
  SUPPORT: "support_staff"
};

// Feature -> roles permitted to access it (see README permission matrix).
const PERMISSIONS = {
  dashboard: [ROLES.ADMIN, ROLES.ANALYST, ROLES.SUPPORT],
  transactions: [ROLES.ADMIN, ROLES.ANALYST, ROLES.SUPPORT],
  securityLogs: [ROLES.ADMIN, ROLES.ANALYST],
  userManagement: [ROLES.ADMIN],
  securityConfig: [ROLES.ADMIN, ROLES.ANALYST],
  auditLogs: [ROLES.ADMIN, ROLES.ANALYST]
};

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);

  function login(username, password) {
    const account = DEMO_ACCOUNTS.find(
      (a) => a.username === username && a.password === password
    );

    if (!account) {
      setFailedAttempts((n) => n + 1);
      setLoginError("Invalid username or password.");
      return false;
    }

    setLoginError("");
    setFailedAttempts(0);
    setSession({
      username: account.username,
      role: account.role,
      displayName: account.displayName,
      loginTime: new Date().toISOString()
    });
    return true;
  }

  function logout() {
    setSession(null);
  }

  function can(feature) {
    if (!session) return false;
    const allowed = PERMISSIONS[feature];
    return Boolean(allowed && allowed.includes(session.role));
  }

  const value = useMemo(
    () => ({ session, login, logout, can, loginError, failedAttempts }),
    [session, loginError, failedAttempts]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
