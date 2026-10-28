import { X, ShieldAlert, Info } from 'lucide-react'

export default function PortDetails({ port, onClose }) {
  if (!port) return null

  const isOpen = port.status === 'OPEN'

  return (
    <div className="glass animate-fade-up mt-4 rounded-2xl p-5 sm:p-6" role="region" aria-label={`Details for port ${port.port}`}>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Port Details</p>
          <h3 className="mt-1 font-mono-tight text-xl font-bold text-white">Port {port.port}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close port details"
          className="rounded-lg border border-base-600 p-1.5 text-slate-400 transition hover:border-cyan-accent/40 hover:text-cyan-accent"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Status</dt>
          <dd
            className={
              'mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ' +
              (isOpen
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-slate-500/10 text-slate-400')
            }
          >
            <span className={'h-1.5 w-1.5 rounded-full ' + (isOpen ? 'bg-emerald-400' : 'bg-slate-500')} />
            {port.status}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Protocol</dt>
          <dd className="mt-1 font-mono-tight text-sm text-slate-200">{port.protocol}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Service</dt>
          <dd className="mt-1 text-sm font-semibold text-slate-200">{port.service}</dd>
        </div>
      </dl>

      <div className="mt-5">
        <p className="mb-1 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-500">
          <Info className="h-3.5 w-3.5" aria-hidden="true" />
          Description
        </p>
        <p className="text-sm leading-relaxed text-slate-300">{port.description}</p>
      </div>

      <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-3.5">
        <p className="mb-1 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-amber-400">
          <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
          Security Observation
        </p>
        <p className="text-sm leading-relaxed text-amber-100/80">{port.note}</p>
      </div>
    </div>
  )
}
