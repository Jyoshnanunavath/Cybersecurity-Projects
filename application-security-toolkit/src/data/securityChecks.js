// Each check evaluates a predefined, simulated application-security condition.
// The "evaluate" function receives a snapshot of relevant app state and
// returns a status of PASS, WARNING, or FAIL plus a short description.
// These checks illustrate concepts only — they do not scan real code,
// network traffic, or infrastructure.

export const SECURITY_CHECKS = [
  {
    id: 'input-validation',
    name: 'Input Validation',
    evaluate: (state) => ({
      status: 'PASS',
      description:
        'Required fields (username, email, password, age) all carry active validation rules.',
    }),
  },
  {
    id: 'authentication',
    name: 'Authentication Protection',
    evaluate: (state) => {
      if (state.failedAttempts >= state.maxAttempts) {
        return {
          status: 'WARNING',
          description: `Failed-attempt threshold reached (${state.failedAttempts}/${state.maxAttempts}). Lockout demonstration is active.`,
        }
      }
      return {
        status: 'PASS',
        description: 'Failed authentication attempts are tracked and generic errors are shown.',
      }
    },
  },
  {
    id: 'authorization',
    name: 'Authorization',
    evaluate: (state) => ({
      status: 'PASS',
      description: 'Protected features are gated by role-based permission checks.',
    }),
  },
  {
    id: 'password-policy',
    name: 'Password Policy',
    evaluate: (state) => {
      if (!state.lastPasswordScore && state.lastPasswordScore !== 0) {
        return {
          status: 'WARNING',
          description: 'No password has been evaluated yet in the Password Security module.',
        }
      }
      if (state.lastPasswordScore >= 4) {
        return { status: 'PASS', description: 'Configured policy requires strong, high-complexity passwords.' }
      }
      if (state.lastPasswordScore >= 2) {
        return { status: 'WARNING', description: 'Last evaluated password met only some complexity requirements.' }
      }
      return { status: 'FAIL', description: 'Last evaluated password did not meet the minimum policy.' }
    },
  },
  {
    id: 'error-handling',
    name: 'Error Handling',
    evaluate: (state) => ({
      status: 'PASS',
      description: 'User-facing errors avoid exposing stack traces or internal system details.',
    }),
  },
  {
    id: 'session-security',
    name: 'Session Security',
    evaluate: (state) => ({
      status: state.isAuthenticated ? 'PASS' : 'WARNING',
      description: state.isAuthenticated
        ? 'An active demo session exists and a logout mechanism is available.'
        : 'No active session. Log in to demonstrate session and logout handling.',
    }),
  },
]
