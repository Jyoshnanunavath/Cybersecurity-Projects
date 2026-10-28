import { Radar } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-line bg-base-900/80 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center border border-line bg-base-800 text-signal-progress">
            <Radar size={18} strokeWidth={1.75} />
          </div>
          <div className="leading-tight">
            <p className="font-mono text-sm font-semibold tracking-tight text-ink-primary">
              net-range-scanner
            </p>
            <p className="text-xs text-ink-muted">Lab discovery dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-2 border border-signal-warn/40 bg-signal-warn/10 px-3 py-1.5 font-mono text-xs text-signal-warn">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-blink rounded-full bg-signal-warn" />
          </span>
          authorized use only
        </div>
      </div>
    </header>
  )
}
