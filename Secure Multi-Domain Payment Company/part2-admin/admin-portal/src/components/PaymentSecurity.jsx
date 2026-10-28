import React from "react";
import AppLayout from "./AppLayout.jsx";

const TOPICS = [
  {
    title: "Tokenization",
    body: "Replacing sensitive payment details with a non-reversible token, so downstream systems can reference a transaction without ever holding the underlying card or account data."
  },
  {
    title: "Least privilege",
    body: "Every service and role — including admin roles in this prototype — should hold only the access it needs to do its job, nothing broader."
  },
  {
    title: "Secure API communication",
    body: "Payment-related API calls should be authenticated, authorized, encrypted in transit, and validated on every request, not just at the edge."
  },
  {
    title: "Transaction authorization",
    body: "Confirming that the party requesting a transaction is both authenticated and permitted to authorize that specific transaction, before it is processed."
  },
  {
    title: "Audit logging",
    body: "Recording who did what and when across the payment flow, so activity can be reconstructed and reviewed after the fact, without capturing sensitive payment details in the logs themselves."
  },
  {
    title: "Fraud monitoring",
    body: "Continuously watching transaction patterns for signals like unusual amounts, velocity, or geography, and flagging anomalies for review, as simulated by the risk column in transaction monitoring."
  },
  {
    title: "Sensitive-data minimization",
    body: "Collecting and retaining only the payment data actually required, and avoiding storage of full card numbers, CVVs, or authentication credentials anywhere in the system."
  },
  {
    title: "Secure payment processing architecture",
    body: "Isolating payment logic behind dedicated, tightly scoped services with strong boundaries from the rest of the application, consistent with the domain-separation approach used in this prototype."
  }
];

export default function PaymentSecurity() {
  return (
    <AppLayout title="Payment security considerations">
      <div className="bg-risk-medium/10 border border-risk-medium/30 rounded px-4 py-3 mb-6 text-sm">
        This prototype does not process real payments, store real financial information, or implement
        real card processing.
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {TOPICS.map((t) => (
          <div key={t.title} className="bg-surface border border-border rounded p-4">
            <h2 className="text-sm font-medium mb-1.5">{t.title}</h2>
            <p className="text-sm text-muted leading-relaxed">{t.body}</p>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
