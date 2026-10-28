import { demoAccount, demoTransactions } from '../data/demoData.js';

export default function AccountOverview() {
  const recent = demoTransactions.slice(0, 3);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold text-ink">Account overview</h1>
        <span className="rounded-full bg-secure-tint px-2.5 py-1 text-xs font-medium text-secure">
          {demoAccount.status}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted">Demonstration data — not a real account.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-line bg-white p-5">
          <p className="text-xs text-muted">Account holder</p>
          <p className="mt-1 font-display text-base font-medium text-ink">{demoAccount.holder}</p>
          <p className="mt-3 font-mono text-xs text-muted">{demoAccount.accountId}</p>
        </div>
        <div className="rounded-lg border border-line bg-white p-5">
          <p className="text-xs text-muted">Available balance (demo)</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink">{demoAccount.balance}</p>
          <p className="mt-3 text-xs text-muted">{demoAccount.currency} · simulated figure</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-base font-semibold text-ink">Recent transactions</h2>
        <div className="mt-3 overflow-hidden rounded-lg border border-line bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs text-muted">
                <th className="px-4 py-2.5 font-medium">Reference</th>
                <th className="px-4 py-2.5 font-medium">Recipient</th>
                <th className="px-4 py-2.5 font-medium">Date</th>
                <th className="px-4 py-2.5 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((txn) => (
                <tr key={txn.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-mono text-xs text-muted">{txn.id}</td>
                  <td className="px-4 py-3 text-ink">{txn.recipient}</td>
                  <td className="px-4 py-3 text-muted">{txn.date}</td>
                  <td className="px-4 py-3 text-right font-mono text-ink">{txn.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
