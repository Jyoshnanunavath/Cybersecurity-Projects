import { CreditCard, LayoutGrid, UserCircle, Building2, Code2 } from 'lucide-react';

const products = [
  {
    icon: CreditCard,
    title: 'Online payments',
    description:
      'Accept and send demonstration payments through a validated, confirmation-gated workflow.',
  },
  {
    icon: LayoutGrid,
    title: 'Payment management',
    description:
      'Review simulated transaction history and payment status from a single dashboard.',
  },
  {
    icon: UserCircle,
    title: 'Customer accounts',
    description:
      'Authenticate into a dedicated customer portal, separate from public marketing pages.',
  },
  {
    icon: Building2,
    title: 'Merchant services',
    description:
      'Conceptual tooling for merchants to reference payments made against demo orders.',
  },
  {
    icon: Code2,
    title: 'Secure APIs',
    description:
      'Illustrative API boundary intended to run over authenticated, encrypted channels.',
  },
];

export default function Products() {
  return (
    <section id="products" className="rule">
      <div className="container-page py-20">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl">
            Services across the platform
          </h2>
          <p className="mt-3 text-muted">
            Each service below is a demonstration surface, split across the
            applications that make up this prototype.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {products.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white p-6">
              <Icon className="h-5 w-5 text-trust" strokeWidth={2} />
              <h3 className="mt-4 font-display text-base font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
