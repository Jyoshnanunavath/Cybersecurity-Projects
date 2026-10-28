import React from "react";
import AppLayout from "./AppLayout.jsx";
import { DEMO_USERS_TABLE } from "../data/demoData.js";

export default function UserManagement() {
  return (
    <AppLayout title="User management" feature="userManagement">
      <p className="text-sm text-muted mb-4">
        Administrator-only feature, per the role/permission matrix. Demonstration accounts shown below.
      </p>

      <div className="bg-surface border border-border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted">
              <th className="px-4 py-3 font-normal">Username</th>
              <th className="px-4 py-3 font-normal">Name</th>
              <th className="px-4 py-3 font-normal">Role</th>
              <th className="px-4 py-3 font-normal">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {DEMO_USERS_TABLE.map((u) => (
              <tr key={u.id} className="hover:bg-elevated/50">
                <td className="px-4 py-3 font-mono text-xs">{u.username}</td>
                <td className="px-4 py-3">{u.displayName}</td>
                <td className="px-4 py-3 text-muted">{u.role}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      u.status === "Active"
                        ? "text-risk-low"
                        : "text-muted"
                    }
                  >
                    {u.status}
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
