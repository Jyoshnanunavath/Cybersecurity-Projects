// All data in this file is fictional demonstration data.
// No real account, transaction, or financial information is used.

export const DEMO_CREDENTIALS = {
  username: 'customer',
  password: 'Customer@123',
};

export const demoAccount = {
  holder: 'Demo Customer',
  accountId: 'ACCT-DEMO-3312',
  status: 'Active',
  balance: '₹42,318.00',
  currency: 'INR',
};

export const demoTransactions = [
  { id: 'DEMO-TXN-10001', date: '2026-09-08', recipient: 'Demo Merchant', amount: '−₹1,500.00', status: 'Completed' },
  { id: 'DEMO-TXN-09988', date: '2026-09-05', recipient: 'Demo Utility Co.', amount: '−₹2,200.00', status: 'Completed' },
  { id: 'DEMO-TXN-09954', date: '2026-09-02', recipient: 'Demo Refund', amount: '+₹450.00', status: 'Completed' },
  { id: 'DEMO-TXN-09901', date: '2026-08-27', recipient: 'Demo Subscription', amount: '−₹399.00', status: 'Completed' },
];

export const demoSecurityStatus = {
  passwordLastChanged: '61 days ago',
  twoFactor: 'Not enabled (demo)',
  lastLogin: 'Simulated session',
  activeSessions: 1,
};
