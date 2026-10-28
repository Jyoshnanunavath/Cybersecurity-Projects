import { ShieldCheck } from 'lucide-react';

const columns = [
  {
    heading: 'Company',
    links: ['Security', 'Privacy', 'Terms', 'Contact'],
  },
];

const domains = [
  { label: 'www.meridianpay.local', note: 'Main website' },
  { label: 'customer.meridianpay.local', note: 'Customer portal' },
  { label: 'pay.meridianpay.local', note: 'Payment application' },
];

export default function Footer() {
  return (
    <footer className="rule">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-trust" strokeWidth={2.25} />
            <span className="font-display text-sm font-semibold">Meridian Pay</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted">
            An educational prototype. No real payments are processed anywhere
            on this platform.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <h3 className="text-sm font-medium text-ink">{col.heading}</h3>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted hover:text-ink">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-sm font-medium text-ink">Application domains</h3>
          <ul className="mt-3 space-y-2 font-mono text-xs text-muted">
            {domains.map((d) => (
              <li key={d.label}>
                <div className="text-ink">{d.label}</div>
                <div>{d.note}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="rule">
        <p className="container-page py-6 text-xs text-muted">
          © {new Date().getFullYear()} Meridian Pay — demonstration project. Not a real financial institution.
        </p>
      </div>
    </footer>
  );
}
