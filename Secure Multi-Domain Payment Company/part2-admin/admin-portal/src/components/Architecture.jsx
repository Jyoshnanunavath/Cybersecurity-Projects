import React from "react";
import AppLayout from "./AppLayout.jsx";

const NODE = "bg-elevated border border-border rounded px-4 py-2.5 text-sm text-center";
const BENEFITS = [
  "Reduced attack surface per application",
  "Independent access controls per domain",
  "Application isolation between customer and admin surfaces",
  "Clear trust boundaries between public and internal systems",
  "Better monitoring, since each domain's traffic is distinguishable",
  "Easier security policy enforcement per surface"
];

export default function Architecture() {
  return (
    <AppLayout title="Domain and application architecture">
      <p className="text-sm text-muted mb-6 max-w-2xl">
        This prototype separates the customer-facing site from the payment application, the internal
        API layer, and the admin/monitoring surfaces. Below is a conceptual view of that separation —
        it is not a diagram of literal network infrastructure.
      </p>

      <div className="bg-surface border border-border rounded p-8 mb-8">
        <div className="flex flex-col items-center gap-2 max-w-md mx-auto">
          <div className={NODE + " w-full"}>Main website</div>
          <div className="h-5 w-px bg-border" />
          <div className={NODE + " w-full"}>Customer portal</div>
          <div className="h-5 w-px bg-border" />
          <div className={NODE + " w-full"}>Payment app</div>
          <div className="h-5 w-px bg-border" />
          <div className={NODE + " w-full border-signal/40 text-signal"}>API services</div>
          <div className="h-5 w-px bg-border" />
          <div className="flex w-full gap-6 justify-center">
            <div className="flex flex-col items-center flex-1">
              <div className={NODE + " w-full"}>Admin portal</div>
            </div>
            <div className="flex flex-col items-center flex-1">
              <div className={NODE + " w-full"}>Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded p-5">
        <h2 className="text-sm font-medium mb-3">Why separate domains and applications</h2>
        <ul className="space-y-2 text-sm text-muted">
          {BENEFITS.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-signal">–</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted mt-4 pt-4 border-t border-border">
          Domain separation reduces certain risks, but it is one layer among many. It does not by
          itself make an application secure — authentication, authorization, input validation, and
          monitoring still have to be implemented correctly within each surface.
        </p>
      </div>
    </AppLayout>
  );
}
