import { useState } from 'react'
import { Network, RadarIcon, AlertCircle } from 'lucide-react'

const IPV4_REGEX =
  /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/

export default function ScannerConfig({ onScan, onClear, canClear, isScanning, disabled }) {
  const [ip, setIp] = useState('192.168.1.1')
  const [startPort, setStartPort] = useState('1')
  const [endPort, setEndPort] = useState('1024')
  const [errors, setErrors] = useState({})

  function validate() {
    const nextErrors = {}

    if (!ip.trim()) {
      nextErrors.ip = 'Please enter a valid IPv4 address.'
    } else if (!IPV4_REGEX.test(ip.trim())) {
      nextErrors.ip = 'Please enter a valid IPv4 address.'
    }

    const start = Number(startPort)
    const end = Number(endPort)

    if (!startPort.trim() || !Number.isInteger(start) || start < 1 || start > 65535) {
      nextErrors.startPort = 'Port must be between 1 and 65535.'
    }
    if (!endPort.trim() || !Number.isInteger(end) || end < 1 || end > 65535) {
      nextErrors.endPort = 'Port must be between 1 and 65535.'
    }
    if (!nextErrors.startPort && !nextErrors.endPort && start > end) {
      nextErrors.range = 'Start port cannot be greater than end port.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (disabled) return
    if (validate()) {
      onScan({ ip: ip.trim(), start: Number(startPort), end: Number(endPort) })
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6" aria-labelledby="scanner-config-heading">
      <form
        onSubmit={handleSubmit}
        className="glass animate-fade-up rounded-2xl p-5 shadow-glow sm:p-7"
        noValidate
      >
        <div className="mb-6 flex items-center gap-2">
          <Network className="h-5 w-5 text-cyan-accent" aria-hidden="true" />
          <h2 id="scanner-config-heading" className="text-lg font-semibold text-white">
            Scanner Configuration
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <label htmlFor="target-ip" className="mb-1.5 block text-sm font-medium text-slate-300">
              Target IP Address
            </label>
            <div className="relative">
              <Network
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                aria-hidden="true"
              />
              <input
                id="target-ip"
                type="text"
                inputMode="numeric"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="Enter target IP address"
                className="w-full rounded-lg border border-base-600 bg-base-900 py-2.5 pl-9 pr-3 font-mono-tight text-sm text-white placeholder:text-slate-600 focus:border-cyan-accent focus:outline-none"
                aria-invalid={Boolean(errors.ip)}
                aria-describedby={errors.ip ? 'ip-error' : undefined}
              />
            </div>
            {errors.ip && (
              <p id="ip-error" className="mt-1.5 flex items-center gap-1 text-xs text-rose-400">
                <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                {errors.ip}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="start-port" className="mb-1.5 block text-sm font-medium text-slate-300">
              Start Port
            </label>
            <input
              id="start-port"
              type="number"
              min={1}
              max={65535}
              value={startPort}
              onChange={(e) => setStartPort(e.target.value)}
              className="w-full rounded-lg border border-base-600 bg-base-900 px-3 py-2.5 font-mono-tight text-sm text-white focus:border-cyan-accent focus:outline-none"
              aria-invalid={Boolean(errors.startPort)}
              aria-describedby={errors.startPort ? 'start-port-error' : undefined}
            />
            {errors.startPort && (
              <p id="start-port-error" className="mt-1.5 flex items-center gap-1 text-xs text-rose-400">
                <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                {errors.startPort}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="end-port" className="mb-1.5 block text-sm font-medium text-slate-300">
              End Port
            </label>
            <input
              id="end-port"
              type="number"
              min={1}
              max={65535}
              value={endPort}
              onChange={(e) => setEndPort(e.target.value)}
              className="w-full rounded-lg border border-base-600 bg-base-900 px-3 py-2.5 font-mono-tight text-sm text-white focus:border-cyan-accent focus:outline-none"
              aria-invalid={Boolean(errors.endPort)}
              aria-describedby={errors.endPort ? 'end-port-error' : undefined}
            />
            {errors.endPort && (
              <p id="end-port-error" className="mt-1.5 flex items-center gap-1 text-xs text-rose-400">
                <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                {errors.endPort}
              </p>
            )}
          </div>
        </div>

        {errors.range && (
          <p className="mt-3 flex items-center gap-1 text-xs text-rose-400">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            {errors.range}
          </p>
        )}

        <div className="mt-2 flex flex-col gap-4 sm:mt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">Recommended range: 1–1024</p>

          <div className="flex items-center gap-2.5">
            {canClear && (
              <button
                type="button"
                onClick={onClear}
                disabled={disabled}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-base-600 bg-transparent px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear Scan
              </button>
            )}
            <button
              type="submit"
              disabled={disabled}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-accent px-5 py-2.5 text-sm font-semibold text-base-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RadarIcon className="h-4 w-4" aria-hidden="true" />
              {isScanning ? 'Scanning…' : 'Scan Ports'}
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}
