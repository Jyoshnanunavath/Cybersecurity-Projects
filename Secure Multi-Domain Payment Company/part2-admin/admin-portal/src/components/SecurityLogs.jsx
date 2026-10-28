import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import AppLayout from "./AppLayout.jsx";
import { SECURITY_EVENTS } from "../data/demoData.js";

const SEVERITY_STYLES = {
  low: "text-risk-low bg-risk-low/10 border-risk-low/30",
  medium: "text-risk-medium bg-risk-medium/10 border-risk-medium/30",
  high: "text-risk-high bg-risk-high/10 border-risk-high/30"
};

export default function SecurityLogs() {
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState("all");

  const filtered = useMemo(() => {
    return SECURITY_EVENTS.filter((e) => {
      const matchesSeverity = severity === "all" || e.severity === severity;
      const matchesQuery =
        query.trim() === "" ||
        e.event.toLowerCase().includes(query.toLowerCase()) ||
        e.user.toLowerCase().includes(query.toLowerCase());
      return matchesSeverity && matchesQuery;
    });
  }, [query, severity]);

  return (
    <AppLayout title="Security event logs" feature="securityLogs">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search event or user"
            className="focus-ring w-full bg-elevated border border-border rounded pl-8 pr-3 py-2 text-sm placeholder:text-muted/60"
          />
        </div>

        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="focus-ring bg-elevated border border-border rounded px-3 py-2 text-sm text-ink"
        >
          <option value="all">All severities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="bg-surface border border-border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted">
              <th className="px-4 py-3 font-normal">Timestamp</th>
              <th className="px-4 py-3 font-normal">Event</th>
              <th className="px-4 py-3 font-normal">User</th>
              <th className="px-4 py-3 font-normal">Severity</th>
              <th className="px-4 py-3 font-normal">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((e) => (
              <tr key={e.id} className="hover:bg-elevated/50">
                <td className="px-4 py-3 font-mono text-xs text-muted">{e.timestamp}</td>
                <td className="px-4 py-3">{e.event}</td>
                <td className="px-4 py-3 font-mono text-xs">{e.user}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-sm border text-xs capitalize ${SEVERITY_STYLES[e.severity]}`}
                  >
                    {e.severity}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted">{e.status}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted text-sm">
                  No events match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
