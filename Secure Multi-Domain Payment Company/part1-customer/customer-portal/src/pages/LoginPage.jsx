import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ShieldCheck, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { DEMO_CREDENTIALS } from '../data/demoData.js';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Invalid username or password.');
      return;
    }

    setSubmitting(true);
    // Simulated network delay so the auth state is visibly demonstrated.
    setTimeout(() => {
      const result = login({ username: username.trim(), password });
      setSubmitting(false);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      navigate('/dashboard');
    }, 350);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <ShieldCheck className="h-6 w-6 text-trust" strokeWidth={2.25} />
          <h1 className="mt-3 font-display text-xl font-semibold text-ink">Customer account</h1>
          <p className="mt-1 text-sm text-muted">Sign in to view your Meridian Pay account.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="rounded-lg border border-line bg-white p-6">
          <div>
            <label htmlFor="username" className="field-label">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              className="field-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="field-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="field-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p role="alert" className="field-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-md bg-trust px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-trust-dim disabled:opacity-60"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="mt-4 flex items-start gap-2 rounded-md border border-line bg-white/60 p-3 text-xs text-muted">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2} />
          <p>
            Demonstration credentials — username{' '}
            <span className="font-mono text-ink">{DEMO_CREDENTIALS.username}</span>, password{' '}
            <span className="font-mono text-ink">{DEMO_CREDENTIALS.password}</span>. Not a real account.
          </p>
        </div>
      </div>
    </div>
  );
}
