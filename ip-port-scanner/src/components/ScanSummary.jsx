import { Target, ListChecks, Unlock, CheckCircle2 } from 'lucide-react'

export default function ScanSummary({ target, portsScanned, openCount, status }) {
  const cards = [
    { label: 'Target', value: target, icon: Target, mono: true },
    { label: 'Ports Scanned', value: portsScanned, icon: ListChecks, mono: true },
    { label: 'Open Ports', value: openCount, icon: Unlock, mono: true, accent: openCount > 0 },
    { label: 'Scan Status', value: status, icon: CheckCircle2, mono: false, success: true },
  ]

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6" aria-label="Scan summary">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {cards.map(({ label, value, icon: Icon, mono, accent, success }) => (
          <div
            key={label}
            className="glass animate-fade-up rounded-xl p-4"
          >
            <div className="mb-2 flex items-center gap-1.5 text-slate-500">
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="text-[11px] font-medium uppercase tracking-wide">{label}</span>
            </div>
            <p
              className={
                'truncate text-lg font-bold sm:text-xl ' +
                (mono ? 'font-mono-tight ' : '') +
                (success ? 'text-emerald-400' : accent ? 'text-cyan-accent' : 'text-white')
              }
            >
              {value}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
