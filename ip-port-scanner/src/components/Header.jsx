import { ShieldHalf } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-base-700/60 bg-base-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-accent/30 bg-cyan-accent/10">
            <ShieldHalf className="h-5 w-5 text-cyan-accent" aria-hidden="true" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold tracking-tight text-white">VD</span>
            <span className="hidden text-sm text-slate-400 sm:inline">IP Port Scanner</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden items-center gap-1.5 rounded-full border border-base-600 bg-base-900 px-3 py-1 text-xs font-medium text-slate-400 sm:inline-flex">
            Frontend Prototype
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            System Ready
          </span>
        </div>
      </div>
    </header>
  )
}
