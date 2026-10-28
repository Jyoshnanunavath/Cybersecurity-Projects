import { KeyRound, Lock, Fingerprint, TimerReset, Activity, Network } from 'lucide-react';

const practices = [
  {
    icon: Fingerprint,
    title: 'Secure authentication',
    description: 'Credentials are checked against a dedicated login boundary, separate from public pages.',
  },
  {
    icon: Lock,
    title: 'Encryption in transit',
    description: 'Production payment systems carry all traffic over TLS, never in plain text.',
  },
  {
    icon: KeyRound,
    title: 'Access control',
    description: 'Customer sessions are scoped to customer features only, with no path to admin tooling.',
  },
  {
    icon: TimerReset,
    title: 'Session protection',
    description: 'Sessions expire after inactivity and are fully cleared on logout.',
  },
  {
    icon: Activity,
    title: 'Monitoring',
    description: 'Security-relevant events are logged for review in a production deployment.',
  },
  {
    icon: Network,
    title: 'Secure API communication',
    description: 'Service-to-service calls are authenticated and encrypted end to end.',
  },
];

export default function SecuritySection() {
  return (
    <section id="security" className="rule bg-ink">
      <div className="container-page py-20 text-paper">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight lg:text-3xl">
            How this architecture protects customer data
          </h2>
          <p className="mt-3 text-slate-400">
            These are the principles this prototype is built to illustrate.
            They describe intent, not a guarantee — see the limitations
            noted in the project README.
          </p>
        </div>

        <dl className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {practices.map(({ icon: Icon, title, description }) => (
            <div key={title} className="border-l border-white/15 pl-5">
              <Icon className="h-5 w-5 text-trust" strokeWidth={2} />
              <dt className="mt-3 font-display text-sm font-semibold">{title}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-slate-400">{description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
