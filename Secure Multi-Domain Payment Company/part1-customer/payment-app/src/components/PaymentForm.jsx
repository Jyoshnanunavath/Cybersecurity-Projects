import { useState } from 'react';
import { SUPPORTED_CURRENCIES } from '../data/demoData.js';
import { validatePaymentForm } from '../utils/validatePayment.js';

export default function PaymentForm({ initialValues, onContinue }) {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validatePaymentForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      onContinue(form);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-lg border border-line bg-white p-6">
      <div>
        <label htmlFor="amount" className="field-label">
          Payment amount
        </label>
        <input
          id="amount"
          type="text"
          inputMode="decimal"
          placeholder="1500"
          className={`field-input ${errors.amount ? 'field-input-error' : ''}`}
          value={form.amount}
          onChange={(e) => update('amount', e.target.value)}
          aria-invalid={Boolean(errors.amount)}
          aria-describedby={errors.amount ? 'amount-error' : undefined}
        />
        {errors.amount && (
          <p id="amount-error" role="alert" className="field-error">
            {errors.amount}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="currency" className="field-label">
          Currency
        </label>
        <select
          id="currency"
          className={`field-input ${errors.currency ? 'field-input-error' : ''}`}
          value={form.currency}
          onChange={(e) => update('currency', e.target.value)}
        >
          {SUPPORTED_CURRENCIES.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        {errors.currency && (
          <p role="alert" className="field-error">
            {errors.currency}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="recipient" className="field-label">
          Recipient
        </label>
        <input
          id="recipient"
          type="text"
          placeholder="Demo Merchant"
          className={`field-input ${errors.recipient ? 'field-input-error' : ''}`}
          value={form.recipient}
          onChange={(e) => update('recipient', e.target.value)}
          aria-invalid={Boolean(errors.recipient)}
          aria-describedby={errors.recipient ? 'recipient-error' : undefined}
        />
        {errors.recipient && (
          <p id="recipient-error" role="alert" className="field-error">
            {errors.recipient}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="reference" className="field-label">
          Payment reference
        </label>
        <input
          id="reference"
          type="text"
          placeholder="ORDER-1001"
          className={`field-input ${errors.reference ? 'field-input-error' : ''}`}
          value={form.reference}
          onChange={(e) => update('reference', e.target.value)}
          aria-invalid={Boolean(errors.reference)}
          aria-describedby={errors.reference ? 'reference-error' : undefined}
        />
        {errors.reference && (
          <p id="reference-error" role="alert" className="field-error">
            {errors.reference}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-trust px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-trust-dim"
      >
        Review payment
      </button>
    </form>
  );
}
