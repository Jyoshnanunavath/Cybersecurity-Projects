import { demoAccount } from '../data/demoData.js';

export default function Profile() {
  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink">Profile</h1>
      <p className="mt-1 text-sm text-muted">Demonstration profile information.</p>

      <div className="mt-6 max-w-md space-y-4 rounded-lg border border-line bg-white p-5">
        <div>
          <p className="text-xs text-muted">Full name</p>
          <p className="mt-1 text-sm text-ink">{demoAccount.holder}</p>
        </div>
        <div>
          <p className="text-xs text-muted">Account ID</p>
          <p className="mt-1 font-mono text-sm text-ink">{demoAccount.accountId}</p>
        </div>
        <div>
          <p className="text-xs text-muted">Email</p>
          <p className="mt-1 text-sm text-ink">demo.customer@meridianpay.local</p>
        </div>
        <div>
          <p className="text-xs text-muted">Preferred currency</p>
          <p className="mt-1 text-sm text-ink">{demoAccount.currency}</p>
        </div>
      </div>
    </div>
  );
}
