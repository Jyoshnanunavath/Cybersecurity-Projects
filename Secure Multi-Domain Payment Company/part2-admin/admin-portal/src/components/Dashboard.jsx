import React from "react";
import { Users, ArrowLeftRight, ShieldAlert, KeyRound, Network, Bell } from "lucide-react";
import AppLayout from "./AppLayout.jsx";
import { SYSTEM_OVERVIEW, SECURITY_EVENTS } from "../data/demoData.js";

const METRICS = [
  { key: "activeUsers", label: "Active users", icon: Users },
  { key: "transactionsToday", label: "Transactions today", icon: ArrowLeftRight },
  { key: "failedLogins", label: "Failed logins", icon: KeyRound },
  { key: "securityEvents", label: "Security events", icon: ShieldAlert },
  { key: "apiRequests", label: "API requests", icon: Network },
  { key: "alerts", label: "Alerts", icon: Bell }
];

export default function Dashboard() {
  const recentAlerts = SECURITY_EVENTS.filter((e) => e.severity === "high").slice(0, 3);

  return (
    <AppLayout title="System overview" feature="dashboard">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-muted">Demonstration data — refreshed for this session only.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {METRICS.map(({ key, label, icon: Icon }) => (
          <div key={key} className="bg-surface border border-border rounded p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted">{label}</span>
              <Icon className="w-4 h-4 text-signal" strokeWidth={1.75} />
            </div>
            <div className="text-2xl font-semibold font-mono text-ink">
              {SYSTEM_OVERVIEW[key].toLocaleString("en-IN")}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-medium">High-severity events</h2>
          <span className="text-xs text-muted">Last hour</span>
        </div>
        <ul className="divide-y divide-border">
          {recentAlerts.map((evt) => (
            <li key={evt.id} className="px-4 py-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-risk-high" />
                <span>{evt.event}</span>
              </div>
              <span className="text-muted font-mono text-xs">{evt.timestamp}</span>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
}
