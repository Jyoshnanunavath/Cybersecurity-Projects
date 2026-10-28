import { Panel, StatusPill, ProgressBar } from './common.jsx'
import { SECURITY_CHECKS } from '../data/securityChecks.js'
import { ArrowRight } from 'lucide-react'

const MODULES = [
  { id: 'input-validation', label: 'Input Validation' },
  { id: 'authentication', label: 'Authentication' },
  { id: 'authorization', label: 'Authorization' },
  { id: 'password-security', label: 'Password Security' },
]

export default function Dashboard({ currentUser, appState, onNavigate }) {
  const results = SECURITY_CHECKS.map((check) => ({ ...check, ...check.evaluate(appState) }))
  const passCount = results.filter((r) => r.status === 'PASS').length
  const score = Math.round((passCount / results.length) * 100)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-medium text-ink-primary mb-1">Security Overview</h1>
        <p className="text-sm text-ink-secondary max-w-2xl">
          A walkthrough of core application-security concepts: input validation, authentication,
          authorization, password handling, and error handling — demonstrated through a controlled
          frontend simulation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Panel eyebrow="STATUS" title="Session" className="lg:col-span-1">
          {currentUser ? (
            <div className="flex flex-col gap-2">
              <div className="text-sm text-ink-primary">
                Signed in as <span className="font-medium">{currentUser.displayName}</span>
              </div>
              <div className="text-xs font-mono text-ink-muted">role: {currentUser.role}</div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-ink-secondary">
                No active session. Log in with a demo account to unlock authorization and session
                checks.
              </p>
              <button
                onClick={() => onNavigate('authentication')}
                className="self-start flex items-center gap-1.5 text-sm text-signal-amber hover:underline"
              >
                Go to Authentication <ArrowRight size={14} />
              </button>
            </div>
          )}
        </Panel>

        <Panel eyebrow="SCORE" title="Security Score" className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-3xl font-mono text-ink-primary">{score}%</span>
            <span className="text-xs text-ink-muted">
              {passCount} of {results.length} checks passing
            </span>
          </div>
          <ProgressBar value={score} colorClass={score >= 80 ? 'bg-signal-pass' : score >= 50 ? 'bg-signal-warn' : 'bg-signal-fail'} />
        </Panel>
      </div>

      <Panel eyebrow="RESULTS" title="Security Checks">
        <div className="divide-y divide-base-borderMuted">
          {results.map((r) => (
            <div key={r.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0 gap-4">
              <div>
                <div className="text-sm text-ink-primary">{r.name}</div>
                <div className="text-xs text-ink-muted mt-0.5">{r.description}</div>
              </div>
              <StatusPill status={r.status} />
            </div>
          ))}
        </div>
      </Panel>

      <Panel eyebrow="MODULES" title="Explore the demonstration">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MODULES.map((m) => (
            <button
              key={m.id}
              onClick={() => onNavigate(m.id)}
              className="flex items-center justify-between rounded-md border border-base-border bg-base-bg px-4 py-3 text-sm text-ink-secondary hover:text-ink-primary hover:border-signal-amber/50 transition-colors text-left"
            >
              {m.label}
              <ArrowRight size={14} />
            </button>
          ))}
        </div>
      </Panel>
    </div>
  )
}
