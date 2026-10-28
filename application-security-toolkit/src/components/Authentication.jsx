import { useState } from 'react'
import { Panel, Field, inputClasses } from './common.jsx'
import { DEMO_USERS } from '../data/demoUsers.js'
import { CheckCircle2, XCircle, Eye, EyeOff, LogOut, Info } from 'lucide-react'

export default function Authentication({
  currentUser,
  setCurrentUser,
  failedAttempts,
  setFailedAttempts,
  maxAttempts,
  onLogout,
}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [result, setResult] = useState(null) // 'success' | 'failure' | null

  const locked = failedAttempts >= maxAttempts

  function handleLogin(e) {
    e.preventDefault()
    if (locked) return

    const match = DEMO_USERS.find((u) => u.username === username && u.password === password)
    if (match) {
      setCurrentUser(match)
      setFailedAttempts(0)
      setResult('success')
    } else {
      setFailedAttempts((n) => n + 1)
      setResult('failure')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-medium text-ink-primary mb-1">Authentication</h1>
        <p className="text-sm text-ink-secondary max-w-2xl">
          A simulated login flow using fixed demonstration accounts. This mechanism runs entirely
          in the browser and is not a substitute for a real, server-side authentication system.
        </p>
      </div>

      <Panel eyebrow="NOTICE" className="border-signal-info/30">
        <div className="flex gap-2 text-sm text-ink-secondary">
          <Info size={16} className="text-signal-info shrink-0 mt-0.5" />
          <span>
            This is a client-side simulation for demonstration purposes only. It is not suitable
            for production use — real authentication requires a server, hashed credential storage,
            and secure session management.
          </span>
        </div>
      </Panel>

      {currentUser ? (
        <Panel eyebrow="SESSION" title="Authenticated">
          <div className="flex items-center gap-2 text-signal-pass text-sm mb-3">
            <CheckCircle2 size={16} />
            Authentication Successful — Welcome, {currentUser.displayName}.
          </div>
          <p className="text-sm text-ink-secondary mb-4">
            Role assigned: <span className="text-ink-primary font-mono">{currentUser.role}</span>.
            Continue to the Authorization module to see how this role controls access.
          </p>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 rounded-md border border-base-border text-sm text-ink-secondary px-4 py-2 hover:text-signal-fail hover:border-signal-fail/50 transition-colors"
          >
            <LogOut size={14} /> Logout
          </button>
        </Panel>
      ) : (
        <Panel eyebrow="DEMO" title="Sign in">
          <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm">
            <Field label="Username">
              <input
                className={inputClasses('default')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin or user"
                disabled={locked}
              />
            </Field>
            <Field label="Password">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`${inputClasses('default')} pr-10`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter demo password"
                  disabled={locked}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink-secondary"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </Field>

            <button
              type="submit"
              disabled={locked}
              className="rounded-md bg-signal-amber text-base-bg text-sm font-medium px-4 py-2 hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Log In
            </button>

            {result === 'failure' && !locked && (
              <div className="flex items-center gap-2 text-signal-fail text-sm">
                <XCircle size={15} />
                Authentication Failed. Invalid username or password.
              </div>
            )}

            {locked && (
              <div className="flex items-center gap-2 text-signal-warn text-sm">
                <XCircle size={15} />
                Too many failed attempts. Account temporarily locked in this demo.
              </div>
            )}

            <div className="text-xs font-mono text-ink-muted">
              failed attempts: {failedAttempts}/{maxAttempts}
            </div>
          </form>
        </Panel>
      )}

      <Panel eyebrow="REFERENCE" title="Demonstration accounts">
        <p className="text-xs text-ink-muted mb-3">
          These are fixed demo credentials for this assignment only — not real accounts.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-sm">
          {DEMO_USERS.map((u) => (
            <div key={u.id} className="rounded-md border border-base-border bg-base-bg px-4 py-3">
              <div className="text-ink-muted text-xs mb-1">{u.role}</div>
              <div>username: {u.username}</div>
              <div>password: {u.password}</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}
