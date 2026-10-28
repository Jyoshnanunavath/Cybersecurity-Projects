import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock } from "lucide-react";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Login() {
  const { login, loginError, failedAttempts } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const ok = login(username, password);
    if (ok) navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <ShieldCheck className="w-6 h-6 text-signal" strokeWidth={1.75} />
          <span className="font-semibold text-lg tracking-tight">Sentry Ledger</span>
        </div>

        <div className="bg-surface border border-border rounded p-6">
          <h1 className="text-base font-medium mb-1">Admin console sign in</h1>
          <p className="text-sm text-muted mb-6">Prototype environment. Demo credentials only.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-xs text-muted mb-1.5">
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="focus-ring w-full bg-elevated border border-border rounded px-3 py-2 text-sm text-ink placeholder:text-muted/60"
                placeholder="admin"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs text-muted mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus-ring w-full bg-elevated border border-border rounded px-3 py-2 text-sm text-ink placeholder:text-muted/60"
                  placeholder="••••••••"
                />
                <Lock className="w-3.5 h-3.5 text-muted absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {loginError && (
              <div className="text-sm text-risk-high bg-risk-high/10 border border-risk-high/30 rounded px-3 py-2">
                {loginError}
                {failedAttempts >= 3 && (
                  <div className="mt-1 text-xs text-muted">
                    Multiple failed attempts detected. This event has been logged.
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="focus-ring w-full bg-signal hover:bg-signal-dim transition-colors text-base font-medium rounded px-3 py-2 text-sm text-black"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-border text-xs text-muted space-y-1 font-mono">
            <p>admin / Admin@123 — Administrator</p>
            <p>analyst / Analyst@123 — Security Analyst</p>
            <p>support / Support@123 — Support Staff</p>
          </div>
        </div>

        <p className="text-center text-xs text-muted mt-6">
          Educational prototype only. No real accounts or funds are involved.
        </p>
      </div>
    </div>
  );
}
