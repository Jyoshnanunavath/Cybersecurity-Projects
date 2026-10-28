import React from "react";
import { Activity } from "lucide-react";
import { MONITORING_EVENTS, SERVICE_STATUS, SECURITY_ALERTS } from "./data/demoData.js";

export default function App() {
  return (
    <div className="shell">
      <div className="header">
        <div className="brand">
          <Activity size={18} strokeWidth={1.75} color="#2FB9A8" />
          Sentry Ledger Monitoring
        </div>
        <span style={{ fontSize: 12, color: "var(--muted)" }}>Prototype — demonstration data</span>
      </div>

      <p className="subtitle">
        Aggregated authentication, authorization, API, and payment-related events across the
        admin portal and API service. Passwords, tokens, and full payment credentials are never logged.
      </p>

      <div className="status-row">
        {SERVICE_STATUS.map((s) => (
          <div className="status-pill" key={s.name}>
            <span className="dot" />
            <span className="mono">{s.name}</span>
            <span style={{ marginLeft: "auto", color: "var(--muted)", textTransform: "capitalize" }}>
              {s.status}
            </span>
          </div>
        ))}
      </div>

      <div className="alerts-grid">
        {SECURITY_ALERTS.map((a) => (
          <div className={`alert-card ${a.severity === "CRITICAL" ? "critical" : ""}`} key={a.id}>
            <div className="alert-title">{a.title}</div>
            <div className="alert-detail">{a.detail}</div>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="panel-header">Event stream</div>
        {MONITORING_EVENTS.map((e) => (
          <div className="event-row" key={e.id}>
            <span className={`sev-badge sev-${e.severity}`}>{e.severity}</span>
            <span className="mono" style={{ color: "var(--muted)", fontSize: 12, minWidth: 74 }}>
              {e.timestamp}
            </span>
            <span>{e.message}</span>
          </div>
        ))}
      </div>

      <div className="footnote">
        This monitoring view is a local educational prototype. It does not connect to any external
        system and does not reflect real user or transaction activity.
      </div>
    </div>
  );
}
