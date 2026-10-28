export default function ConfirmationScreen({ form, onConfirm, onCancel, submitting }) {
  return (
    <div className="rounded-lg border border-line bg-white p-6">
      <h2 className="font-display text-base font-semibold text-ink">Payment confirmation</h2>
      <p className="mt-1 text-sm text-muted">Review the details below before sending this demonstration payment.</p>

      <dl className="mt-5 divide-y divide-line rounded-md border border-line">
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

      <p className="mt-4 text-xs text-muted">
        Demonstration transaction only. No real payment will be processed.
      </p>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-md border border-line px-4 py-2.5 text-sm font-medium text-ink hover:bg-paper"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={submitting}
          className="flex-1 rounded-md bg-trust px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-trust-dim disabled:opacity-60"
        >
          {submitting ? 'Processing…' : 'Confirm payment'}
        </button>
      </div>
    </div>
  );
}
