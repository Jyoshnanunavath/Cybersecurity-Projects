import { useMemo, useState } from 'react'
import { ArrowUpDown, Search, Trash2 } from 'lucide-react'

const STATUS_DOT = {
  active: 'bg-signal-active',
  inactive: 'bg-signal-inactive',
  error: 'bg-signal-error',
}

const STATUS_TEXT = {
  active: 'text-signal-active',
  inactive: 'text-signal-inactive',
  error: 'text-signal-error',
}

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'inactive', label: 'Inactive' },
  { key: 'error', label: 'Error' },
]

export default function ResultsTable({ results, selectedIp, onSelect, onClearResults, status }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortAsc, setSortAsc] = useState(true)

  const filtered = useMemo(() => {
    let rows = results
    if (filter !== 'all') rows = rows.filter((r) => r.status === filter)
    if (query.trim()) rows = rows.filter((r) => r.ip.includes(query.trim()))
    rows = [...rows].sort((a, b) => {
      const cmp = a.ip.localeCompare(b.ip, undefined, { numeric: true })
      return sortAsc ? cmp : -cmp
    })
    return rows
  }, [results, filter, query, sortAsc])

  if (status === 'ready' || status === 'error') return null

  return (
    <section className="mx-auto max-w-6xl px-6 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-ink-primary">Results</h2>
        {results.length > 0 && (
          <button
            type="button"
            onClick={onClearResults}
            className="inline-flex items-center gap-1.5 text-xs text-ink-muted transition-colors hover:text-signal-error"
          >
            <Trash2 size={13} strokeWidth={2} />
            Clear results
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            type="text"
            placeholder="Search IP address…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-line bg-base-900 py-2 pl-9 pr-3 font-mono text-xs text-ink-primary placeholder:text-ink-muted focus:border-signal-progress focus:outline-none"
          />
        </div>

        <div className="flex gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`border px-3 py-2 text-xs font-medium transition-colors ${
                filter === f.key
                  ? 'border-signal-progress bg-signal-progress/10 text-signal-progress'
                  : 'border-line text-ink-secondary hover:border-ink-muted'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-x-auto border border-line">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-base-900/80">
              <th className="px-4 py-2.5">
                <button
                  type="button"
                  onClick={() => setSortAsc((s) => !s)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-secondary hover:text-ink-primary"
                >
                  IP address
                  <ArrowUpDown size={12} strokeWidth={2} />
                </button>
              </th>
              <th className="px-4 py-2.5 text-xs font-medium text-ink-secondary">Status</th>
              <th className="px-4 py-2.5 text-xs font-medium text-ink-secondary">Result</th>
              <th className="px-4 py-2.5 text-xs font-medium text-ink-secondary">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-xs text-ink-muted">
                  {results.length === 0 ? 'No results yet.' : 'No hosts match this search or filter.'}
                </td>
              </tr>
            )}
            {filtered.map((row) => (
              <tr
                key={row.ip}
                onClick={() => onSelect(row.ip)}
                className={`cursor-pointer border-b border-line/60 last:border-b-0 transition-colors hover:bg-base-800/60 ${
                  selectedIp === row.ip ? 'bg-base-800/80' : ''
                }`}
              >
                <td className="px-4 py-2.5 font-mono text-xs text-ink-primary tabular">{row.ip}</td>
                <td className="px-4 py-2.5">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${STATUS_TEXT[row.status]}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[row.status]}`} />
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-ink-secondary">{row.result}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-ink-muted tabular">
                  {row.timestamp ? new Date(row.timestamp).toLocaleTimeString() : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
