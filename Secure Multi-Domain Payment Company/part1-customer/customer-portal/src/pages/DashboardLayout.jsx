import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ShieldCheck, LayoutGrid, Receipt, UserCircle, Lock, LogOut, Ban } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import SessionBadge from '../components/SessionBadge.jsx';

const navItems = [
  { to: '/dashboard', label: 'Account overview', icon: LayoutGrid, end: true },
  { to: '/dashboard/activity', label: 'Payment activity', icon: Receipt },
  { to: '/dashboard/profile', label: 'Profile', icon: UserCircle },
  { to: '/dashboard/security', label: 'Security', icon: Lock },
];

export default function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-white">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-trust" strokeWidth={2.25} />
            <span className="font-display text-base font-semibold">Customer Dashboard</span>
          </div>
          <SessionBadge />
        </div>
      </header>

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[220px,1fr]">
        <aside>
          <nav className="space-y-1">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive ? 'bg-trust-tint text-trust-dim font-medium' : 'text-muted hover:bg-white hover:text-ink'
                  }`
                }
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
                {label}
              </NavLink>
            ))}

            <NavLink
              to="/admin"
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted/60 hover:bg-white hover:text-muted"
            >
              <Ban className="h-4 w-4" strokeWidth={2} />
              Admin console
            </NavLink>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 flex w-full items-center gap-2.5 rounded-md border border-line px-3 py-2 text-sm text-ink hover:bg-white"
            >
              <LogOut className="h-4 w-4" strokeWidth={2} />
              Logout
            </button>
          </nav>
        </aside>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
