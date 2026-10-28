export default function About() {
  return (
    <section id="about" className="rule">
      <div className="container-page grid gap-10 py-20 lg:grid-cols-[2fr,3fr] lg:gap-16">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl">
          About this project
        </h2>
        <div className="space-y-4 text-muted">
          <p>
            Meridian Pay is a fictional company built to demonstrate how a
            payment platform can separate its public website, its customer
            portal, and its payment application into distinct domains — each
            with its own authentication boundary, session handling, and
            input validation.
          </p>
          <p>
            No real payment processing, real financial data, or real
            credentials are used anywhere in this prototype. All account
            information, transactions, and confirmations shown across the
            platform are clearly marked as demonstration data.
          </p>
          <p>
            This site is Part 1 of a larger educational exercise and covers
            customer-facing surfaces only.
          </p>
        </div>
      </div>
    </section>
  );
}
