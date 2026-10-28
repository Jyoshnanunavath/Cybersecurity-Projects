import { useState } from 'react'
import { ShieldHalf, LogOut, Menu, X } from 'lucide-react'

export default function Header({ currentUser, onLogout, navItems, activeView, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="border-b border-base-border bg-base-surface/80 backdrop-blur sticky top-0 z-20">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-ink-secondary"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <ShieldHalf size={20} className="text-signal-amber" strokeWidth={1.75} />
          <div className="leading-tight">
            <div className="font-mono text-sm tracking-tight text-ink-primary">
              APPLICATION SECURITY TOOLKIT
            </div>
            <div className="text-[11px] text-ink-muted font-mono">
              educational demonstration &middot; not production security
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="text-right leading-tight hidden sm:block">
                <div className="text-sm text-ink-primary">{currentUser.displayName}</div>
                <div
                  className={`text-[11px] font-mono ${
                    currentUser.role === 'Administrator' ? 'text-signal-amber' : 'text-signal-teal'
                  }`}
                >
                  {currentUser.role.toUpperCase()}
                </div>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink-primary border border-base-border rounded-md px-3 py-1.5 hover:border-signal-fail/60 hover:text-signal-fail transition-colors"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <span className="text-xs font-mono text-ink-muted">not signed in</span>
          )}
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-base-border px-3 py-2 flex flex-col gap-1 bg-base-surface">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id)
                setMobileOpen(false)
              }}
              className={`text-left text-sm px-3 py-2 rounded-md ${
                activeView === item.id ? 'bg-base-raised text-ink-primary' : 'text-ink-secondary'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}
