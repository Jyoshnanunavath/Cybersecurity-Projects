import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Transactions from "./components/Transactions.jsx";
import SecurityLogs from "./components/SecurityLogs.jsx";
import UserManagement from "./components/UserManagement.jsx";
import Architecture from "./components/Architecture.jsx";
import SecureCommunication from "./components/SecureCommunication.jsx";
import PaymentSecurity from "./components/PaymentSecurity.jsx";

export default function App() {
  const { session } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={session ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/security-logs" element={<SecurityLogs />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/architecture" element={<Architecture />} />
      <Route path="/secure-communication" element={<SecureCommunication />} />
      <Route path="/payment-security" element={<PaymentSecurity />} />
      <Route path="*" element={<Navigate to={session ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
}
