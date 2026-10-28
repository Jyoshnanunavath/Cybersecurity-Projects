import { Panel } from './common.jsx'
import { ROLE_PERMISSIONS, PERMISSION_LABELS } from '../data/demoUsers.js'
import { Check, X, ShieldAlert, Info } from 'lucide-react'

const FEATURES = [
  { key: 'viewUserManagement', label: 'User Management', description: 'Create, edit, and remove demo accounts.' },
  { key: 'modifySecuritySettings', label: 'Security Settings', description: 'Change password policy and lockout thresholds.' },
  { key: 'viewAdminReports', label: 'Admin Reports', description: 'View aggregate security-check history.' },
]

export default function Authorization({ currentUser, accessDeniedLog, logAccessDenied }) {
  const role = currentUser?.role
  const permissions = role ? ROLE_PERMISSIONS[role] : null

  function attemptAccess(feature) {
    if (!permissions || !permissions[feature.key]) {
      logAccessDenied(feature.label)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-medium text-ink-primary mb-1">Authorization</h1>
        <p className="text-sm text-ink-secondary max-w-2xl">
          Authentication confirms who you are. Authorization decides what you're allowed to do.
          This module demonstrates role-based access using a client-side permission check only.
        </p>
      </div>

      <Panel eyebrow="NOTICE" className="border-signal-info/30">
        <div className="flex gap-2 text-sm text-ink-secondary">
          <Info size={16} className="text-signal-info shrink-0 mt-0.5" />
          This is a client-side educational demonstration. No backend enforces these permissions —
          a real application must verify authorization on the server for every request.
        </div>
      </Panel>

      {!currentUser ? (
        <Panel eyebrow="STATUS" title="No active session">
          <p className="text-sm text-ink-secondary">
            Log in from the Authentication module first to see role-based access in action.
          </p>
        </Panel>
      ) : (
        <Panel eyebrow="STATUS" title="Current role">
          <div className="text-sm text-ink-secondary">
            Signed in as <span className="text-ink-primary">{currentUser.displayName}</span> —
            role{' '}
            <span
              className={`font-mono ${role === 'Administrator' ? 'text-signal-amber' : 'text-signal-teal'}`}
            >
              {role}
            </span>
          </div>
        </Panel>
      )}

      <Panel eyebrow="MATRIX" title="Role permissions">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-ink-muted text-xs font-mono border-b border-base-borderMuted">
                <th className="py-2 pr-4 font-normal">Feature</th>
                <th className="py-2 px-4 font-normal">Administrator</th>
                <th className="py-2 px-4 font-normal">User</th>
              </tr>
            </thead>
            <tbody>
              {PERMISSION_LABELS.map((p) => (
                <tr key={p.key} className="border-b border-base-borderMuted last:border-0">
                  <td className="py-2.5 pr-4 text-ink-primary">{p.label}</td>
                  <td className="py-2.5 px-4">
                    <PermissionMark allowed={ROLE_PERMISSIONS.Administrator[p.key]} />
                  </td>
                  <td className="py-2.5 px-4">
                    <PermissionMark allowed={ROLE_PERMISSIONS.User[p.key]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel eyebrow="TRY IT" title="Attempt to access protected features">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {FEATURES.map((f) => {
            const allowed = permissions ? permissions[f.key] : false
            return (
              <div key={f.key} className="rounded-md border border-base-border bg-base-bg p-4 flex flex-col gap-2">
                <div className="text-sm text-ink-primary">{f.label}</div>
                <div className="text-xs text-ink-muted flex-1">{f.description}</div>
                <button
                  onClick={() => attemptAccess(f)}
                  className="mt-2 text-sm rounded-md border border-base-border px-3 py-1.5 text-ink-secondary hover:text-ink-primary hover:border-signal-amber/50 transition-colors"
                >
                  {allowed ? 'Open feature' : 'Attempt access'}
                </button>
                {currentUser && (
                  <ResultLine allowed={allowed} />
                )}
              </div>
            )
          })}
        </div>

        {accessDeniedLog.length > 0 && (
          <div className="border-t border-base-borderMuted pt-4">
            <div className="text-xs font-mono text-ink-muted mb-2">recent access-denied events</div>
            <ul className="flex flex-col gap-1.5">
              {accessDeniedLog.map((entry, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-signal-fail font-mono">
                  <ShieldAlert size={13} />
                  {entry.at} — denied access to "{entry.feature}"
                </li>
              ))}
            </ul>
          </div>
        )}
      </Panel>
    </div>
  )
}

function PermissionMark({ allowed }) {
  return allowed ? (
    <span className="inline-flex items-center gap-1 text-signal-pass text-xs font-mono">
      <Check size={14} /> Yes
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-ink-muted text-xs font-mono">
      <X size={14} /> No
    </span>
  )
}

function ResultLine({ allowed }) {
  if (allowed) {
    return <div className="text-xs text-signal-pass">Access granted for your role.</div>
  }
  return (
    <div className="text-xs text-signal-fail">
      Access Denied — you do not have permission to access this resource.
    </div>
  )
}
