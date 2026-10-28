import { ShieldCheck } from 'lucide-react';

const CUSTOMER_PORTAL_URL = 'http://localhost:5174';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'Security', href: '#security' },
  { label: 'About', href: '#about' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5">
          <ShieldCheck className="h-5 w-5 text-trust" strokeWidth={2.25} />
          <span className="font-display text-lg font-semibold tracking-tight">Meridian Pay</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={CUSTOMER_PORTAL_URL}
          className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-trust"
        >
          Customer login
        </a>
      </div>
    </header>
  );
}
