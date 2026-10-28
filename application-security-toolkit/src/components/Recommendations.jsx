import { Panel } from './common.jsx'
import { KeyRound, Lock, ClipboardCheck, ShieldCheck, AlertTriangle, Timer } from 'lucide-react'

const SECTIONS = [
  {
    icon: KeyRound,
    title: 'Authentication',
    items: [
      'Use strong authentication mechanisms.',
      'Implement account lockout or rate limiting.',
      'Consider multi-factor authentication.',
    ],
  },
  {
    icon: Lock,
    title: 'Password Security',
    items: [
      'Never store plaintext passwords.',
      'Use strong, salted password hashing.',
      'Enforce reasonable password policies.',
    ],
  },
  {
    icon: ClipboardCheck,
    title: 'Input Validation',
    items: [
      'Validate input on both client and server sides.',
      'Use allowlists where appropriate.',
      'Sanitize and safely process user input.',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Authorization',
    items: [
      'Apply least-privilege principles.',
      'Verify permissions for protected resources.',
      'Do not rely solely on frontend authorization.',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Error Handling',
    items: [
      'Use generic messages for authentication failures.',
      'Avoid exposing internal application details.',
      'Log security events securely on the server.',
    ],
  },
  {
    icon: Timer,
    title: 'Session Security',
    items: [
      'Expire inactive sessions.',
      'Use secure session mechanisms.',
      'Provide a reliable logout mechanism.',
    ],
  },
]

export default function Recommendations() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-medium text-ink-primary mb-1">Security Recommendations</h1>
        <p className="text-sm text-ink-secondary max-w-2xl">
          Practical guidance for moving from this demonstration toward a production-grade
          implementation of each concept.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SECTIONS.map((section) => {
          const Icon = section.icon
          return (
            <Panel key={section.title}>
              <div className="flex items-center gap-2 mb-3">
                <Icon size={16} className="text-signal-amber" strokeWidth={1.75} />
                <h2 className="text-sm font-medium text-ink-primary">{section.title}</h2>
              </div>
              <ul className="flex flex-col gap-1.5 text-sm text-ink-secondary list-disc list-inside">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Panel>
          )
        })}
      </div>
    </div>
  )
}
