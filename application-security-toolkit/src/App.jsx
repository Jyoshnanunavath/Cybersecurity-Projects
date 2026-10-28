import { useState, useMemo } from 'react'
import Header from './components/Header.jsx'
import Dashboard from './components/Dashboard.jsx'
import InputValidation from './components/InputValidation.jsx'
import Authentication from './components/Authentication.jsx'
import Authorization from './components/Authorization.jsx'
import PasswordSecurity from './components/PasswordSecurity.jsx'
import SecurityChecks from './components/SecurityChecks.jsx'
import Recommendations from './components/Recommendations.jsx'
import Footer from './components/Footer.jsx'
import { MAX_LOGIN_ATTEMPTS } from './data/demoUsers.js'
import {
  LayoutDashboard,
  ClipboardCheck,
  KeyRound,
  ShieldCheck,
  Lock,
  ListChecks,
  BookOpenCheck,
} from 'lucide-react'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'input-validation', label: 'Input Validation', icon: ClipboardCheck },
  { id: 'authentication', label: 'Authentication', icon: KeyRound },
  { id: 'authorization', label: 'Authorization', icon: ShieldCheck },
  { id: 'password-security', label: 'Password Security', icon: Lock },
  { id: 'security-checks', label: 'Security Checks', icon: ListChecks },
  { id: 'recommendations', label: 'Recommendations', icon: BookOpenCheck },
]

export default function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [currentUser, setCurrentUser] = useState(null) // demo user object or null
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [lastPasswordScore, setLastPasswordScore] = useState(null)
  const [accessDeniedLog, setAccessDeniedLog] = useState([])

  const appState = useMemo(
    () => ({
      isAuthenticated: !!currentUser,
      failedAttempts,
      maxAttempts: MAX_LOGIN_ATTEMPTS,
      lastPasswordScore,
    }),
    [currentUser, failedAttempts, lastPasswordScore],
  )

  function handleLogout() {
    setCurrentUser(null)
    setActiveView('dashboard')
  }

  function logAccessDenied(feature) {
    setAccessDeniedLog((prev) => [{ feature, at: new Date().toLocaleTimeString() }, ...prev].slice(0, 8))
  }

  return (
    <div className="min-h-screen bg-base-bg text-ink-primary font-sans flex flex-col">
      <Header
        currentUser={currentUser}
        onLogout={handleLogout}
        navItems={NAV_ITEMS}
        activeView={activeView}
        onNavigate={setActiveView}
      />

      <div className="flex-1 flex w-full max-w-[1400px] mx-auto">
        <aside className="hidden md:flex w-60 shrink-0 flex-col gap-1 border-r border-base-border px-3 py-6">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const active = activeView === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-left transition-colors ${
                  active
                    ? 'bg-base-raised text-ink-primary border border-base-border'
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-base-surface border border-transparent'
                }`}
              >
                <Icon size={16} strokeWidth={1.75} className={active ? 'text-signal-amber' : ''} />
                {item.label}
              </button>
            )
          })}
        </aside>

        <main className="flex-1 px-5 py-7 md:px-8">
          {activeView === 'dashboard' && (
            <Dashboard
              currentUser={currentUser}
              appState={appState}
              onNavigate={setActiveView}
            />
          )}
          {activeView === 'input-validation' && <InputValidation />}
          {activeView === 'authentication' && (
            <Authentication
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              failedAttempts={failedAttempts}
              setFailedAttempts={setFailedAttempts}
              maxAttempts={MAX_LOGIN_ATTEMPTS}
              onLogout={handleLogout}
            />
          )}
          {activeView === 'authorization' && (
            <Authorization
              currentUser={currentUser}
              accessDeniedLog={accessDeniedLog}
              logAccessDenied={logAccessDenied}
            />
          )}
          {activeView === 'password-security' && (
            <PasswordSecurity onScoreChange={setLastPasswordScore} />
          )}
          {activeView === 'security-checks' && <SecurityChecks appState={appState} />}
          {activeView === 'recommendations' && <Recommendations />}
        </main>
      </div>

      <Footer />
    </div>
  )
}
