import { KeyRound, ShieldAlert, MonitorSmartphone, Clock } from 'lucide-react';
import { demoSecurityStatus } from '../data/demoData.js';

const items = [
  { icon: KeyRound, label: 'Password last changed', value: demoSecurityStatus.passwordLastChanged },
  { icon: ShieldAlert, label: 'Two-factor authentication', value: demoSecurityStatus.twoFactor },
  { icon: Clock, label: 'Last login', value: demoSecurityStatus.lastLogin },
  { icon: MonitorSmartphone, label: 'Active sessions', value: String(demoSecurityStatus.activeSessions) },
];

export default function SecurityStatus() {
  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink">Security</h1>
      <p className="mt-1 text-sm text-muted">Demonstration security status for this account.</p>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-3 rounded-lg border border-line bg-white p-4">
            <Icon className="mt-0.5 h-4 w-4 text-trust" strokeWidth={2} />
            <div>
              <dt className="text-xs text-muted">{label}</dt>
              <dd className="mt-0.5 text-sm text-ink">{value}</dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="mt-8 rounded-lg border border-line bg-white p-5">
        <h2 className="font-display text-sm font-semibold text-ink">Secure communication</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          In production, this portal would run entirely over HTTPS with TLS,
          use secure and HTTP-only cookies, enforce HSTS, and validate
          certificates on every connection. This prototype is a frontend-only
          demonstration and does not implement transport-layer encryption
          itself.
        </p>
      </div>
    </div>
  );
}
