import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

const TOTAL_DURATION_MS = 1500
const TICK_MS = 60

export default function ScanProgress({ target, range, onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(0)
    const steps = TOTAL_DURATION_MS / TICK_MS
    let current = 0

    const interval = setInterval(() => {
      current += 1
      // Ease toward 100 with slight randomness so it doesn't feel mechanical.
      const pct = Math.min(100, Math.round((current / steps) * 100 + Math.random() * 3))
      setProgress(pct)

      if (current >= steps) {
        clearInterval(interval)
        setProgress(100)
        window.setTimeout(() => onComplete(), 250)
      }
    }, TICK_MS)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, range.start, range.end])

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6" aria-live="polite">
      <div className="glass animate-fade-up rounded-2xl p-5 shadow-glow sm:p-7">
        <div className="mb-4 flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-cyan-accent" aria-hidden="true" />
          <h3 className="text-sm font-semibold text-white">Scanning target…</h3>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-2 font-mono-tight text-xs text-slate-400 sm:grid-cols-2">
          <p>
            Target: <span className="text-slate-200">{target}</span>
          </p>
          <p>
            Ports: <span className="text-slate-200">{range.start}–{range.end}</span>
          </p>
        </div>

        <div
          className="h-2 w-full overflow-hidden rounded-full bg-base-900"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="relative h-full">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-accent/70 to-cyan-accent transition-[width] duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-slate-500">Checking TCP ports…</p>
          <p className="font-mono-tight text-xs text-cyan-accent">{progress}%</p>
        </div>
      </div>
    </section>
  )
}
