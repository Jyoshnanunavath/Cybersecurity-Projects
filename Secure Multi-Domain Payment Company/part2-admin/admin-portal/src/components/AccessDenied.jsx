import React from "react";
import { ShieldOff } from "lucide-react";

export default function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-24 text-center">
      <ShieldOff className="w-8 h-8 text-risk-high mb-4" strokeWidth={1.5} />
      <h2 className="text-base font-medium mb-1">Access Denied</h2>
      <p className="text-sm text-muted max-w-xs">
        You do not have permission to access this resource.
      </p>
    </div>
  );
}
