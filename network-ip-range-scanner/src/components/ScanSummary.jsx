const CARD_STYLE = {
  neutral: 'text-ink-primary',
  active: 'text-signal-active',
  inactive: 'text-signal-inactive',
  error: 'text-signal-error',
}

function SummaryCard({ label, value, tone = 'neutral' }) {
  return (
    <div className="border border-line bg-base-900/60 p-4">
      <p className="text-xs text-ink-muted">{label}</p>
      <p className={`mt-2 font-mono text-2xl font-semibold tabular ${CARD_STYLE[tone]}`}>{value}</p>
    </div>
  )
}

export default function ScanSummary({ rangeLabel, total, active, inactive, errors, status }) {
  if (status === 'ready' || status === 'error') return null

  return (
    <section className="mx-auto max-w-6xl px-6 py-6">
      <h2 className="mb-3 text-sm font-semibold text-ink-primary">Summary</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="col-span-2 border border-line bg-base-900/60 p-4 sm:col-span-1">
          <p className="text-xs text-ink-muted">Range scanned</p>
          <p className="mt-2 truncate font-mono text-sm font-medium text-ink-primary" title={rangeLabel}>
            {rangeLabel}
          </p>
        </div>
        <SummaryCard label="Total hosts" value={total} />
        <SummaryCard label="Active" value={active} tone="active" />
        <SummaryCard label="Inactive" value={inactive} tone="inactive" />
        <SummaryCard label="Errors" value={errors} tone={errors > 0 ? 'error' : 'neutral'} />
      </div>
    </section>
  )
}
