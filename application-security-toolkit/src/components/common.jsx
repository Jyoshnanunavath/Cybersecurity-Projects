import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'

export function Panel({ title, eyebrow, children, className = '' }) {
  return (
    <section className={`bg-base-surface border border-base-border rounded-lg shadow-panel ${className}`}>
      {(title || eyebrow) && (
        <div className="px-5 py-4 border-b border-base-borderMuted">
          {eyebrow && <div className="text-[11px] font-mono text-ink-muted mb-0.5">{eyebrow}</div>}
          {title && <h2 className="text-base font-medium text-ink-primary">{title}</h2>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  )
}

const STATUS_STYLES = {
  PASS: { color: 'text-signal-pass', bg: 'bg-signal-pass/10', border: 'border-signal-pass/30', Icon: CheckCircle2 },
  WARNING: { color: 'text-signal-warn', bg: 'bg-signal-warn/10', border: 'border-signal-warn/30', Icon: AlertTriangle },
  FAIL: { color: 'text-signal-fail', bg: 'bg-signal-fail/10', border: 'border-signal-fail/30', Icon: XCircle },
}

export function StatusPill({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.WARNING
  const { Icon } = style
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-mono ${style.color} ${style.bg} ${style.border}`}
    >
      <Icon size={13} strokeWidth={2} />
      {status}
    </span>
  )
}

export function Field({ label, hint, error, valid, children }) {
  return (
    <label className="block">
      <span className="block text-sm text-ink-secondary mb-1.5">{label}</span>
      {children}
      {error ? (
        <span className="block mt-1.5 text-xs text-signal-fail">{error}</span>
      ) : valid ? (
        <span className="block mt-1.5 text-xs text-signal-pass">{hint || 'Looks good.'}</span>
      ) : hint ? (
        <span className="block mt-1.5 text-xs text-ink-muted">{hint}</span>
      ) : null}
    </label>
  )
}

export function inputClasses(state) {
  const base =
    'w-full rounded-md bg-base-bg border px-3 py-2 text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none transition-colors'
  if (state === 'error') return `${base} border-signal-fail/60 focus:border-signal-fail`
  if (state === 'valid') return `${base} border-signal-pass/50 focus:border-signal-pass`
  return `${base} border-base-border focus:border-signal-amber/70`
}

export function ProgressBar({ value, max = 100, colorClass = 'bg-signal-amber' }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="h-2 w-full rounded-full bg-base-bg border border-base-border overflow-hidden">
      <div className={`h-full ${colorClass} transition-all duration-300`} style={{ width: `${pct}%` }} />
    </div>
  )
}
