import DomainMesh from './DomainMesh.jsx';

const CUSTOMER_PORTAL_URL = 'http://localhost:5174';

export default function Hero() {
  return (
    <section id="home" className="container-page grid gap-12 py-20 lg:grid-cols-2 lg:gap-8 lg:py-28">
      <div className="flex flex-col justify-center">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs text-muted">
          Educational prototype · demonstration data only
        </span>
        <h1 className="mt-6 max-w-lg font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink lg:text-5xl">
          Secure digital payments, built with a security-first architecture.
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
          Meridian Pay separates its website, customer portal, and payment
          application into distinct domains, each with its own authentication,
          authorization, and monitoring boundary.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={CUSTOMER_PORTAL_URL}
            className="rounded-md bg-trust px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-trust-dim"
          >
            Access customer portal
          </a>
          <a href="#security" className="text-sm font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
            How we secure your data
          </a>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <DomainMesh />
        </div>
      </div>
    </section>
  );
}
