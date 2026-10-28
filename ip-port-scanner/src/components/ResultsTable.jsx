import { useMemo, useState } from 'react'
import { Search, Download, RadarIcon, CheckCircle } from 'lucide-react'

function exportToCsv(rows) {
  const header = ['Port', 'Protocol', 'Status', 'Service', 'Description']
  const lines = rows.map((r) =>
    [r.port, r.protocol, r.status, r.service, `"${r.description.replace(/"/g, '""')}"`].join(',')
  )
  const csv = [header.join(','), ...lines].join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'VD_port_scan_results.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default function ResultsTable({ results, selectedPort, onSelectPort }) {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [exported, setExported] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return results.filter((r) => {
      const matchesQuery =
        !q ||
        String(r.port).includes(q) ||
        r.service.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      const matchesStatus = statusFilter === 'All' || r.status === statusFilter.toUpperCase()
      return matchesQuery && matchesStatus
    })
  }, [results, query, statusFilter])

  function handleExport() {
    if (filtered.length === 0) return
    exportToCsv(filtered)
    setExported(true)
    window.setTimeout(() => setExported(false), 2500)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6" aria-labelledby="results-heading">
      <div className="glass animate-fade-up rounded-2xl p-5 shadow-glow sm:p-7">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="results-heading" className="text-lg font-semibold text-white">
            Scan Results
          </h2>

          <div className="flex items-center gap-3">
            {exported && (
              <span className="hidden items-center gap-1.5 text-xs font-medium text-emerald-400 sm:inline-flex">
                <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Results exported successfully.
              </span>
            )}
            <button
              type="button"
              onClick={handleExport}
              disabled={filtered.length === 0}
              className="inline-flex items-center gap-1.5 rounded-lg border border-base-600 bg-base-900 px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-accent/40 hover:text-cyan-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Export Results
            </button>
          </div>
        </div>

        {exported && (
          <p className="mb-4 flex items-center gap-1.5 text-xs font-medium text-emerald-400 sm:hidden">
            <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
            Results exported successfully.
          </p>
        )}

        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-base-600 py-10 text-center">
            <RadarIcon className="h-6 w-6 text-slate-600" aria-hidden="true" />
            <p className="text-sm font-medium text-slate-300">
              No known demonstration services found in this range.
            </p>
            <p className="max-w-sm text-xs text-slate-500">
              Try a range such as 1–1024 to see mock results for common TCP services.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
                <label htmlFor="result-search" className="sr-only">
                  Search ports or services
                </label>
                <input
                  id="result-search"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search ports or services..."
                  className="w-full rounded-lg border border-base-600 bg-base-900 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-accent focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="status-filter" className="sr-only">
                  Filter by status
                </label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full rounded-lg border border-base-600 bg-base-900 px-3 py-2.5 text-sm text-slate-200 focus:border-cyan-accent focus:outline-none sm:w-40"
                >
                  <option>All</option>
                  <option>Open</option>
                  <option>Closed</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-base-700">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-base-700 bg-base-900/60 text-[11px] uppercase tracking-wide text-slate-500">
                    <th scope="col" className="px-4 py-3 font-medium">Port</th>
                    <th scope="col" className="px-4 py-3 font-medium">Protocol</th>
                    <th scope="col" className="px-4 py-3 font-medium">Status</th>
                    <th scope="col" className="px-4 py-3 font-medium">Service</th>
                    <th scope="col" className="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">
                        No results match your search or filter.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((r) => {
                      const isOpen = r.status === 'OPEN'
                      const isSelected = selectedPort?.port === r.port
                      return (
                        <tr
                          key={r.port}
                          onClick={() => onSelectPort(r)}
                          tabIndex={0}
                          role="button"
                          aria-pressed={isSelected}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              onSelectPort(r)
                            }
                          }}
                          className={
                            'cursor-pointer border-b border-base-700/60 transition last:border-b-0 hover:bg-cyan-accent/[0.05] ' +
                            (isSelected ? 'bg-cyan-accent/[0.08]' : '')
                          }
                        >
                          <td className="px-4 py-3 font-mono-tight font-semibold text-slate-100">{r.port}</td>
                          <td className="px-4 py-3 font-mono-tight text-slate-400">{r.protocol}</td>
                          <td className="px-4 py-3">
                            <span
                              className={
                                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ' +
                                (isOpen
                                  ? 'bg-emerald-500/10 text-emerald-400'
                                  : 'bg-slate-500/10 text-slate-400')
                              }
                            >
                              <span className={'h-1.5 w-1.5 rounded-full ' + (isOpen ? 'bg-emerald-400' : 'bg-slate-500')} />
                              {r.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-medium text-slate-200">{r.service}</td>
                          <td className="px-4 py-3 max-w-xs truncate text-slate-400">{r.description}</td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
