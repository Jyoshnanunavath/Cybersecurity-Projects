import { ShieldCheck } from 'lucide-react';

const points = [
  'Never expose payment credentials in logs, URLs, or client-side storage.',
  'Use tokenization for real card or bank details — never handle raw numbers directly.',
  'Serve payment traffic over HTTPS/TLS, with certificate validation on every connection.',
  'Apply strict access control between customer, merchant, and admin surfaces.',
  'Validate all payment input on both the client and the server.',
  'Log security-relevant payment events for monitoring and audit.',
  'Avoid storing sensitive payment information unless strictly necessary.',
  'Apply transaction monitoring and fraud detection in a production system.',
];

export default function SecurityNote() {
  return (
    <div className="rounded-lg border border-line bg-white p-6">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-trust" strokeWidth={2.25} />
        <h2 className="font-display text-sm font-semibold text-ink">How real payment systems stay secure</h2>
      </div>
      <ul className="mt-4 space-y-2.5">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm text-muted">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-line" />
            {point}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted">
        This prototype does not implement real payment processing and never
        requests real card numbers, CVVs, or banking credentials.
      </p>
    </div>
  );
}
