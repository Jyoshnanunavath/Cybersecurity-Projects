import { CheckCircle2 } from 'lucide-react';

export default function SuccessScreen({ form, transactionId, onNewPayment }) {
  return (
    <div className="rounded-lg border border-line bg-white p-6 text-center">
      <CheckCircle2 className="mx-auto h-8 w-8 text-secure" strokeWidth={2} />
      <h2 className="mt-4 font-display text-lg font-semibold text-ink">Payment successful</h2>

      <p className="mt-1 text-sm text-muted">Transaction ID</p>
      <p className="font-mono text-sm text-ink">{transactionId}</p>

      <dl className="mt-5 divide-y divide-line rounded-md border border-line text-left">
        <div className="flex items-center justify-between px-4 py-3">
          <dt className="text-sm text-muted">Amount</dt>
          <dd className="font-mono text-sm text-ink">
            {form.currency} {Number(form.amount).toLocaleString()}
          </dd>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <dt className="text-sm text-muted">Recipient</dt>
          <dd className="text-sm text-ink">{form.recipient}</dd>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <dt className="text-sm text-muted">Reference</dt>
          <dd className="font-mono text-sm text-ink">{form.reference}</dd>
        </div>
      </dl>

      <div className="mt-5 rounded-md bg-secure-tint px-4 py-3 text-sm text-secure">
        Demonstration transaction only. No real payment was processed.
      </div>

      <button
        type="button"
        onClick={onNewPayment}
        className="mt-6 w-full rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-paper hover:bg-trust"
      >
        Make another demo payment
      </button>
    </div>
  );
}
