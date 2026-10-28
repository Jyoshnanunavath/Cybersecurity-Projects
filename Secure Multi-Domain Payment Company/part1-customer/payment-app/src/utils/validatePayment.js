import { MAX_DEMO_AMOUNT, SUPPORTED_CURRENCIES } from '../data/demoData.js';

export function validatePaymentForm({ amount, currency, recipient, reference }) {
  const errors = {};

  const trimmedAmount = String(amount).trim();
  if (!trimmedAmount) {
    errors.amount = 'Please enter a payment amount.';
  } else {
    const numericAmount = Number(trimmedAmount);
    if (Number.isNaN(numericAmount)) {
      errors.amount = 'Please enter a valid payment amount.';
    } else if (numericAmount <= 0) {
      errors.amount = 'Payment amount must be greater than zero.';
    } else if (numericAmount > MAX_DEMO_AMOUNT) {
      errors.amount = `Demonstration payments are limited to ${MAX_DEMO_AMOUNT.toLocaleString()}.`;
    }
  }

  if (!SUPPORTED_CURRENCIES.includes(currency)) {
    errors.currency = 'Please select a supported currency.';
  }

  const trimmedRecipient = recipient.trim();
  if (!trimmedRecipient) {
    errors.recipient = 'Please enter a recipient.';
  } else if (trimmedRecipient.length < 2 || trimmedRecipient.length > 60) {
    errors.recipient = 'Recipient must be between 2 and 60 characters.';
  }

  const trimmedReference = reference.trim();
  if (!trimmedReference) {
    errors.reference = 'Please enter a payment reference.';
  } else if (!/^[A-Za-z0-9\-\s]{3,30}$/.test(trimmedReference)) {
    errors.reference = 'Reference must be 3–30 characters of letters, numbers, or hyphens.';
  }

  return errors;
}
