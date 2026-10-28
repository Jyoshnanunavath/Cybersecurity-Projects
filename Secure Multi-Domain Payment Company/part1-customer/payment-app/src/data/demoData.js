// All values in this file are illustrative. No real payment processing
// occurs anywhere in this application.

export const SUPPORTED_CURRENCIES = ['INR', 'USD', 'EUR', 'GBP'];

export const MAX_DEMO_AMOUNT = 100000;

export const initialPaymentForm = {
  amount: '',
  currency: 'INR',
  recipient: '',
  reference: '',
};

let sequence = 10001;

export function generateDemoTransactionId() {
  sequence += 1;
  return `DEMO-TXN-${sequence}`;
}
