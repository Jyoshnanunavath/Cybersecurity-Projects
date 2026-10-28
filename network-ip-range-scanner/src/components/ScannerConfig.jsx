import { Play, RotateCcw } from 'lucide-react'

const FIELD_BASE =
  'w-full border bg-base-900 px-3 py-2 font-mono text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none'

export default function ScannerConfig({
  startIp,
  endIp,
  onStartIpChange,
  onEndIpChange,
  authorized,
  onAuthorizedChange,
  onScan,
  onClear,
  error,
  status,
  maxHosts,
}) {
  const isScanning = status === 'scanning'

  return (
    <section id="scan-configuration" className="mx-auto max-w-6xl px-6 py-6">
      <div className="border border-line bg-base-900/60 p-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold text-ink-primary">Scan configuration</h2>
          <span className="font-mono text-xs text-ink-muted">max {maxHosts} hosts / scan</span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-ink-secondary">Start IP address</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="192.168.1.1"
              value={startIp}
              onChange={(e) => onStartIpChange(e.target.value)}
              disabled={isScanning}
              className={`${FIELD_BASE} ${
                error ? 'border-signal-error' : 'border-line focus:border-signal-progress'
              } disabled:opacity-50`}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-ink-secondary">End IP address</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="192.168.1.20"
              value={endIp}
              onChange={(e) => onEndIpChange(e.target.value)}
              disabled={isScanning}
              className={`${FIELD_BASE} ${
                error ? 'border-signal-error' : 'border-line focus:border-signal-progress'
              } disabled:opacity-50`}
            />
          </label>
        </div>

        {error && (
          <p role="alert" className="mt-3 border border-signal-error/40 bg-signal-error/10 px-3 py-2 text-xs text-signal-error">
            {error}
          </p>
        )}

        <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-xs text-ink-secondary">
          <input
            type="checkbox"
            checked={authorized}
            onChange={(e) => onAuthorizedChange(e.target.checked)}
            disabled={isScanning}
            className="mt-0.5 h-3.5 w-3.5 accent-signal-progress"
          />
          <span>
            I confirm this range belongs to a lab or network I own or am explicitly authorized to test,
            and I understand this scan is simulated for educational purposes.
          </span>
        </label>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onScan}
            disabled={isScanning || !authorized}
            className="inline-flex items-center gap-2 border border-signal-progress bg-signal-progress/10 px-4 py-2 text-sm font-medium text-signal-progress transition-colors hover:bg-signal-progress/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Play size={15} strokeWidth={2} />
            {isScanning ? 'Scanning…' : 'Start discovery'}
          </button>

          <button
            type="button"
            onClick={onClear}
            disabled={isScanning}
            className="inline-flex items-center gap-2 border border-line px-4 py-2 text-sm font-medium text-ink-secondary transition-colors hover:border-ink-muted hover:text-ink-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw size={15} strokeWidth={2} />
            Clear
          </button>
        </div>
      </div>
    </section>
  )
}
