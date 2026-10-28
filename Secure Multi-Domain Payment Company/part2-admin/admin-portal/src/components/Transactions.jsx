import React from "react";
import AppLayout from "./AppLayout.jsx";
import { TRANSACTIONS } from "../data/demoData.js";

const RISK_STYLES = {
  low: "text-risk-low bg-risk-low/10 border-risk-low/30",
  medium: "text-risk-medium bg-risk-medium/10 border-risk-medium/30",
  high: "text-risk-high bg-risk-high/10 border-risk-high/30"
};

const STATUS_STYLES = {
  Success: "text-risk-low",
  Pending: "text-risk-medium",
  Flagged: "text-risk-high"
};

export default function Transactions() {
  return (
    <AppLayout title="Transaction monitoring" feature="transactions">
      <p className="text-sm text-muted mb-4">
        Demonstration data only. No real payments are processed by this prototype.
      </p>

      <div className="bg-surface border border-border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted">
              <th className="px-4 py-3 font-normal">Transaction ID</th>
              <th className="px-4 py-3 font-normal text-right">Amount</th>
              <th className="px-4 py-3 font-normal">Status</th>
              <th className="px-4 py-3 font-normal">Timestamp</th>
              <th className="px-4 py-3 font-normal">Risk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {TRANSACTIONS.map((t) => (
              <tr key={t.id} className="hover:bg-elevated/50">
                <td className="px-4 py-3 font-mono text-xs">{t.id}</td>
                <td className="px-4 py-3 text-right font-mono">
                  ₹{t.amount.toLocaleString("en-IN")}
                </td>
                <td className={`px-4 py-3 ${STATUS_STYLES[t.status]}`}>{t.status}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted">{t.timestamp}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-sm border text-xs capitalize ${RISK_STYLES[t.risk]}`}
                  >
                    {t.risk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
