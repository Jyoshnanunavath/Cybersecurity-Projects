import { useEffect, useState } from 'react'
import { Panel, Field, inputClasses, ProgressBar } from './common.jsx'
import { Eye, EyeOff, Info, CheckCircle2, XCircle } from 'lucide-react'

const CRITERIA = [
  { key: 'length', label: 'At least 8 characters', test: (v) => v.length >= 8 },
  { key: 'upper', label: 'Contains an uppercase letter', test: (v) => /[A-Z]/.test(v) },
  { key: 'lower', label: 'Contains a lowercase letter', test: (v) => /[a-z]/.test(v) },
  { key: 'number', label: 'Contains a number', test: (v) => /[0-9]/.test(v) },
  { key: 'symbol', label: 'Contains a special character', test: (v) => /[^A-Za-z0-9]/.test(v) },
]

const STRENGTH_LABELS = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong']
const STRENGTH_COLORS = ['bg-signal-fail', 'bg-signal-fail', 'bg-signal-warn', 'bg-signal-teal', 'bg-signal-pass']

function scorePassword(v) {
  if (!v) return 0
  return CRITERIA.filter((c) => c.test(v)).length
}

async function sha256Hex(text) {
  if (!window.crypto?.subtle) return null
  const data = new TextEncoder().encode(text)
  const digest = await window.crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export default function PasswordSecurity({ onScoreChange }) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [show, setShow] = useState(false)
  const [hash, setHash] = useState('')

  const score = scorePassword(password)
  const strengthIndex = Math.min(score, 4)

  useEffect(() => {
    onScoreChange?.(password ? score : null)
  }, [score, password, onScoreChange])

  useEffect(() => {
    let active = true
    if (password) {
      sha256Hex(password).then((h) => {
        if (active) setHash(h || '')
      })
    } else {
      setHash('')
    }
    return () => {
      active = false
    }
  }, [password])

  const confirmState = confirm.length === 0 ? null : confirm === password

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-medium text-ink-primary mb-1">Password Security</h1>
        <p className="text-sm text-ink-secondary max-w-2xl">
          Type a sample password to see strength evaluation, confirmation matching, and an
          educational look at hashing. Nothing typed here is stored or transmitted.
        </p>
      </div>

      <Panel eyebrow="DEMO" title="Evaluate a password">
        <div className="flex flex-col gap-5 max-w-md">
          <Field label="Password">
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                className={`${inputClasses('default')} pr-10`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Try a sample password"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink-secondary"
                aria-label="Toggle password visibility"
              >
                {show ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </Field>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-ink-secondary">Strength</span>
              <span className={`text-xs font-mono ${password ? '' : 'text-ink-muted'}`}>
                {password ? STRENGTH_LABELS[strengthIndex] : '—'}
              </span>
            </div>
            <ProgressBar
              value={password ? strengthIndex + 1 : 0}
              max={5}
              colorClass={STRENGTH_COLORS[strengthIndex]}
            />
          </div>

          <ul className="flex flex-col gap-1.5">
            {CRITERIA.map((c) => {
              const met = password ? c.test(password) : false
              return (
                <li key={c.key} className="flex items-center gap-2 text-xs">
                  {met ? (
                    <CheckCircle2 size={14} className="text-signal-pass" />
                  ) : (
                    <XCircle size={14} className="text-ink-muted" />
                  )}
                  <span className={met ? 'text-ink-secondary' : 'text-ink-muted'}>{c.label}</span>
                </li>
              )
            })}
          </ul>

          <Field
            label="Confirm password"
            error={confirmState === false ? 'Passwords do not match.' : null}
            valid={confirmState === true}
          >
            <input
              type={show ? 'text' : 'password'}
              className={inputClasses(confirmState === false ? 'error' : confirmState === true ? 'valid' : 'default')}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter the password"
            />
          </Field>
        </div>
      </Panel>

      <Panel eyebrow="EDUCATIONAL DEMO" title="What hashing looks like">
        <div className="flex gap-2 text-sm text-ink-secondary mb-3">
          <Info size={16} className="text-signal-info shrink-0 mt-0.5" />
          <span>
            This runs SHA-256 in your browser purely to illustrate that a hash looks nothing like
            the original password. It is <strong className="text-ink-primary font-medium">not</strong> how
            production systems should hash passwords — real systems use a slow, salted algorithm
            such as bcrypt or Argon2, computed on the server.
          </span>
        </div>
        <div className="rounded-md border border-base-border bg-base-bg px-4 py-3 font-mono text-xs text-signal-teal break-all min-h-[2.5rem] flex items-center">
          {hash || <span className="text-ink-muted">enter a password above to see its SHA-256 digest</span>}
        </div>
      </Panel>

      <Panel eyebrow="PRINCIPLES" title="Password-handling recommendations">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-ink-secondary list-disc list-inside">
          <li>Never store plaintext passwords.</li>
          <li>Use salted password hashing in real applications.</li>
          <li>Never expose passwords in logs.</li>
          <li>Use secure, well-tested authentication mechanisms.</li>
          <li>Enforce appropriate password policies.</li>
        </ul>
      </Panel>
    </div>
  )
}
