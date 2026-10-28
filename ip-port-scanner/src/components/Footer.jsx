export default function Footer() {
  return (
    <footer className="mt-12 border-t border-base-700/60">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-sm font-bold text-white">VD</p>
          <p className="text-xs text-slate-500">IP Port Scanner</p>
          <p className="mt-2 text-xs text-slate-600">Educational Frontend Prototype</p>
          <p className="text-xs text-slate-600">No real network scanning • Demo data only</p>
        </div>
      </div>
    </footer>
  )
}
