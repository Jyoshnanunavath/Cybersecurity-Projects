import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { DEMO_CREDENTIALS } from '../data/demoData.js';

const SESSION_SECONDS = 600; // 10 minute simulated session, for demonstration only

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(SESSION_SECONDS);
  const intervalRef = useRef(null);

  const clearSessionTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setSecondsLeft(SESSION_SECONDS);
    clearSessionTimer();
  }, [clearSessionTimer]);

  const login = useCallback(
    ({ username, password }) => {
      // Demonstration-only check against static demo credentials.
      // A real system authenticates against a backend and never compares
      // plaintext passwords on the client.
      if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
        setIsAuthenticated(true);
        setSecondsLeft(SESSION_SECONDS);
        return { ok: true };
      }
      return { ok: false, error: 'Invalid username or password.' };
    },
    []
  );

  const extendSession = useCallback(() => {
    setSecondsLeft(SESSION_SECONDS);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return undefined;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearSessionTimer();
          setIsAuthenticated(false);
          return SESSION_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearSessionTimer();
  }, [isAuthenticated, clearSessionTimer]);

  const value = {
    isAuthenticated,
    login,
    logout,
    secondsLeft,
    sessionSeconds: SESSION_SECONDS,
    extendSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
