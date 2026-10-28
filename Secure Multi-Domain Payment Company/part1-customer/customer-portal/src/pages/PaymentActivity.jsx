import { demoTransactions } from '../data/demoData.js';

export default function PaymentActivity() {
  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink">Payment activity</h1>
      <p className="mt-1 text-sm text-muted">Demonstration transaction history — no real payments involved.</p>

      <div className="mt-6 overflow-hidden rounded-lg border border-line bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs text-muted">
              <th className="px-4 py-2.5 font-medium">Reference</th>
              <th className="px-4 py-2.5 font-medium">Recipient</th>
              <th className="px-4 py-2.5 font-medium">Date</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {demoTransactions.map((txn) => (
              <tr key={txn.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-mono text-xs text-muted">{txn.id}</td>
                <td className="px-4 py-3 text-ink">{txn.recipient}</td>
                <td className="px-4 py-3 text-muted">{txn.date}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-secure-tint px-2 py-0.5 text-xs font-medium text-secure">
                    {txn.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-mono text-ink">{txn.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
