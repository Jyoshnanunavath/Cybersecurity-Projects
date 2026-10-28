import { useState } from 'react'
import { Panel, StatusPill } from './common.jsx'
import { SECURITY_CHECKS } from '../data/securityChecks.js'
import { PlayCircle, Info } from 'lucide-react'

export default function SecurityChecks({ appState }) {
  const [hasRun, setHasRun] = useState(false)
  const [running, setRunning] = useState(false)

  function runChecks() {
    setRunning(true)
    // Brief simulated delay so the "run" action feels real, without faking data.
    setTimeout(() => {
      setRunning(false)
      setHasRun(true)
    }, 450)
  }

  const results = SECURITY_CHECKS.map((check) => ({ ...check, ...check.evaluate(appState) }))
  const counts = results.reduce(
    (acc, r) => ({ ...acc, [r.status]: (acc[r.status] || 0) + 1 }),
    {},
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-medium text-ink-primary mb-1">Security Checks</h1>
        <p className="text-sm text-ink-secondary max-w-2xl">
          Evaluates a fixed set of predefined application-security conditions based on what you've
          configured elsewhere in the demo — it does not scan real code or infrastructure.
        </p>
      </div>

      <Panel eyebrow="NOTICE" className="border-signal-info/30">
        <div className="flex gap-2 text-sm text-ink-secondary">
          <Info size={16} className="text-signal-info shrink-0 mt-0.5" />
          Results reflect the state of this demo session (e.g. whether you've logged in or
          evaluated a password) — not a scan of any real system.
        </div>
      </Panel>

      <Panel eyebrow="RUN" title="Run security checks">
        <button
          onClick={runChecks}
          disabled={running}
          className="flex items-center gap-2 rounded-md bg-signal-amber text-base-bg text-sm font-medium px-4 py-2 hover:brightness-110 transition disabled:opacity-50"
        >
          <PlayCircle size={16} />
          {running ? 'Running…' : 'Run Security Checks'}
        </button>
      </Panel>

      {hasRun && (
        <>
          <Panel eyebrow="SUMMARY" title="Results">
            <div className="flex gap-4 mb-4 text-xs font-mono">
              <span className="text-signal-pass">PASS: {counts.PASS || 0}</span>
              <span className="text-signal-warn">WARNING: {counts.WARNING || 0}</span>
              <span className="text-signal-fail">FAIL: {counts.FAIL || 0}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left text-ink-muted text-xs font-mono border-b border-base-borderMuted">
                    <th className="py-2 pr-4 font-normal">Security Check</th>
                    <th className="py-2 px-4 font-normal">Status</th>
                    <th className="py-2 pl-4 font-normal">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r.id} className="border-b border-base-borderMuted last:border-0">
                      <td className="py-3 pr-4 text-ink-primary whitespace-nowrap">{r.name}</td>
                      <td className="py-3 px-4">
                        <StatusPill status={r.status} />
                      </td>
                      <td className="py-3 pl-4 text-ink-secondary">{r.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </>
      )}
    </div>
  )
}
