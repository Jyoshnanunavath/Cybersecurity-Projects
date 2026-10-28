import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../auth/AuthContext.jsx";

const ROLE_LABELS = {
  administrator: "Administrator",
  security_analyst: "Security Analyst",
  support_staff: "Support Staff"
};

export default function TopBar({ title }) {
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-base">
      <h1 className="text-sm font-medium text-ink">{title}</h1>

      <div className="flex items-center gap-4">
        <div className="text-right leading-tight">
          <div className="text-xs text-ink">{session?.displayName}</div>
          <div className="text-[11px] text-muted">{ROLE_LABELS[session?.role] || session?.role}</div>
        </div>
        <button
          onClick={handleLogout}
          className="focus-ring flex items-center gap-1.5 text-xs text-muted hover:text-ink border border-border rounded px-2.5 py-1.5 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" strokeWidth={1.75} />
          Log out
        </button>
      </div>
    </header>
  );
}
