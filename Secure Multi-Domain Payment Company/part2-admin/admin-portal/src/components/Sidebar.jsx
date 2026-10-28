import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  ArrowLeftRight,
  ShieldAlert,
  Users,
  Network,
  Lock,
  CreditCard,
  ShieldCheck
} from "lucide-react";
import { useAuth } from "../auth/AuthContext.jsx";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Overview", icon: LayoutGrid, feature: "dashboard" },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight, feature: "transactions" },
  { to: "/security-logs", label: "Security logs", icon: ShieldAlert, feature: "securityLogs" },
  { to: "/users", label: "User management", icon: Users, feature: "userManagement" },
  { to: "/architecture", label: "Architecture", icon: Network, feature: "dashboard" },
  { to: "/secure-communication", label: "Secure communication", icon: Lock, feature: "dashboard" },
  { to: "/payment-security", label: "Payment security", icon: CreditCard, feature: "dashboard" }
];

export default function Sidebar() {
  const { can } = useAuth();

  return (
    <aside className="w-60 shrink-0 bg-surface border-r border-border flex flex-col">
      <div className="h-14 flex items-center gap-2 px-4 border-b border-border">
        <ShieldCheck className="w-5 h-5 text-signal" strokeWidth={1.75} />
        <span className="font-semibold text-sm tracking-tight">Sentry Ledger</span>
      </div>

      <nav className="flex-1 py-3 px-2 space-y-0.5">
        {NAV_ITEMS.map(({ to, label, icon: Icon, feature }) => {
          const allowed = can(feature);
          return (
            <NavLink
              key={to}
              to={allowed ? to : "#"}
              onClick={(e) => !allowed && e.preventDefault()}
              className={({ isActive }) =>
                [
                  "flex items-center gap-2.5 px-3 py-2 rounded text-sm transition-colors",
                  !allowed && "opacity-40 cursor-not-allowed",
                  allowed && isActive && "bg-elevated text-ink",
                  allowed && !isActive && "text-muted hover:text-ink hover:bg-elevated/60"
                ]
                  .filter(Boolean)
                  .join(" ")
              }
            >
              <Icon className="w-4 h-4" strokeWidth={1.75} />
              {label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border text-[11px] text-muted leading-snug">
        Educational prototype.
        <br />
        Not a real payment gateway.
      </div>
    </aside>
  );
}
