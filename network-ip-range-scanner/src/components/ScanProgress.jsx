const STATUS_STYLES = {
  ready: { label: 'Ready', dot: 'bg-ink-muted' },
  scanning: { label: 'Scanning', dot: 'bg-signal-progress animate-blink' },
  completed: { label: 'Completed', dot: 'bg-signal-active' },
  error: { label: 'Error', dot: 'bg-signal-error' },
}

export default function ScanProgress({ status, currentIp, processed, total }) {
  if (status === 'ready' || status === 'error') return null

  const pct = total > 0 ? Math.round((processed / total) * 100) : 0
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.ready

  return (
    <section className="mx-auto max-w-6xl px-6 pb-2">
      <div className="border border-line bg-base-900/60 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${style.dot}`} />
            <span className="font-mono text-xs uppercase tracking-wide text-ink-secondary">
              {style.label}
            </span>
          </div>
          <span className="font-mono text-xs tabular text-ink-muted">
            {processed} / {total} hosts
          </span>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden border border-line bg-base-950">
          <div
            className="h-full bg-signal-progress transition-all duration-200 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between font-mono text-xs text-ink-muted">
          <span>
            {status === 'scanning' && currentIp ? (
              <>
                checking <span className="text-ink-primary">{currentIp}</span>
                <span className="animate-blink">_</span>
              </>
            ) : (
              '\u00A0'
            )}
          </span>
          <span className="tabular">{pct}%</span>
        </div>
      </div>
    </section>
  )
}
