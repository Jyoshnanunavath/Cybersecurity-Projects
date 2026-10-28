import { useState } from 'react'
import { Panel, Field, inputClasses } from './common.jsx'
import { CheckCircle2 } from 'lucide-react'

const RULES = {
  username: {
    label: 'Username',
    hint: 'Must be 3–20 characters. Letters, numbers, and underscores only.',
    validate: (v) => {
      if (!v) return 'Username is required.'
      if (v.length < 3 || v.length > 20) return 'Username must contain 3–20 characters.'
      if (!/^[a-zA-Z0-9_]+$/.test(v)) return 'Only letters, numbers, and underscores are allowed.'
      return null
    },
  },
  email: {
    label: 'Email',
    hint: 'Standard email format, e.g. name@example.com.',
    validate: (v) => {
      if (!v) return 'Email is required.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address.'
      return null
    },
  },
  password: {
    label: 'Password',
    hint: 'At least 8 characters, with an uppercase letter, a number, and a symbol.',
    validate: (v) => {
      if (!v) return 'Password is required.'
      if (v.length < 8) return 'Password must be at least 8 characters.'
      if (!/[A-Z]/.test(v)) return 'Password must include an uppercase letter.'
      if (!/[0-9]/.test(v)) return 'Password must include a number.'
      if (!/[^A-Za-z0-9]/.test(v)) return 'Password must include a special character.'
      return null
    },
  },
  age: {
    label: 'Age',
    hint: 'A whole number between 13 and 120.',
    validate: (v) => {
      if (!v) return 'Age is required.'
      const n = Number(v)
      if (!Number.isInteger(n)) return 'Age must be a whole number.'
      if (n < 13 || n > 120) return 'Age must be between 13 and 120.'
      return null
    },
  },
  notes: {
    label: 'General Text Input',
    hint: 'Up to 200 characters. Angle brackets are not allowed.',
    validate: (v) => {
      if (v.length > 200) return 'Text input must be 200 characters or fewer.'
      if (/[<>]/.test(v)) return 'Angle brackets are not allowed in this field.'
      return null
    },
  },
}

const INITIAL = { username: '', email: '', password: '', age: '', notes: '' }

export default function InputValidation() {
  const [values, setValues] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [validCount, setValidCount] = useState(0)

  function handleChange(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  function handleValidate(e) {
    e.preventDefault()
    const nextErrors = {}
    Object.entries(RULES).forEach(([key, rule]) => {
      const err = rule.validate(values[key])
      if (err) nextErrors[key] = err
    })
    setErrors(nextErrors)
    setSubmitted(true)
    setValidCount(Object.keys(RULES).length - Object.keys(nextErrors).length)
  }

  function handleReset() {
    setValues(INITIAL)
    setErrors({})
    setSubmitted(false)
    setValidCount(0)
  }

  const allValid = submitted && Object.keys(errors).length === 0

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-medium text-ink-primary mb-1">Input Validation</h1>
        <p className="text-sm text-ink-secondary max-w-2xl">
          Validation runs entirely in the browser before the demo "processes" the form. Try
          submitting empty or malformed values, then correct them to see the state change.
        </p>
      </div>

      <Panel eyebrow="DEMO" title="Validate a form">
        <form onSubmit={handleValidate} className="grid grid-cols-1 sm:grid-cols-2 gap-5" noValidate>
          <Field
            label={RULES.username.label}
            hint={RULES.username.hint}
            error={submitted ? errors.username : null}
            valid={submitted && !errors.username}
          >
            <input
              className={inputClasses(submitted ? (errors.username ? 'error' : 'valid') : 'default')}
              value={values.username}
              onChange={(e) => handleChange('username', e.target.value)}
              placeholder="e.g. jane_doe"
            />
          </Field>

          <Field
            label={RULES.email.label}
            hint={RULES.email.hint}
            error={submitted ? errors.email : null}
            valid={submitted && !errors.email}
          >
            <input
              className={inputClasses(submitted ? (errors.email ? 'error' : 'valid') : 'default')}
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="jane@example.com"
            />
          </Field>

          <Field
            label={RULES.password.label}
            hint={RULES.password.hint}
            error={submitted ? errors.password : null}
            valid={submitted && !errors.password}
          >
            <input
              type="password"
              className={inputClasses(submitted ? (errors.password ? 'error' : 'valid') : 'default')}
              value={values.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="At least 8 characters"
            />
          </Field>

          <Field
            label={RULES.age.label}
            hint={RULES.age.hint}
            error={submitted ? errors.age : null}
            valid={submitted && !errors.age}
          >
            <input
              className={inputClasses(submitted ? (errors.age ? 'error' : 'valid') : 'default')}
              value={values.age}
              onChange={(e) => handleChange('age', e.target.value)}
              placeholder="e.g. 21"
              inputMode="numeric"
            />
          </Field>

          <Field
            label={RULES.notes.label}
            hint={RULES.notes.hint}
            error={submitted ? errors.notes : null}
            valid={submitted && !errors.notes}
          >
            <textarea
              className={`${inputClasses(submitted ? (errors.notes ? 'error' : 'valid') : 'default')} min-h-[84px]`}
              value={values.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Any free text"
            />
          </Field>

          <div className="sm:col-span-2 flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="rounded-md bg-signal-amber text-base-bg text-sm font-medium px-4 py-2 hover:brightness-110 transition"
            >
              Validate Input
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-md border border-base-border text-sm text-ink-secondary px-4 py-2 hover:text-ink-primary transition"
            >
              Reset
            </button>
            {submitted && (
              <span className="text-xs font-mono text-ink-muted ml-auto">
                {validCount}/{Object.keys(RULES).length} fields valid
              </span>
            )}
          </div>
        </form>
      </Panel>

      {allValid && (
        <Panel className="border-signal-pass/40">
          <div className="flex items-center gap-2 text-signal-pass text-sm">
            <CheckCircle2 size={16} />
            All fields passed validation. In a real application, this data would now be safely
            processed — and re-validated on the server.
          </div>
        </Panel>
      )}
    </div>
  )
}
