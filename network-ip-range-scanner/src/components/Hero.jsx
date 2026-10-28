import { ShieldAlert } from 'lucide-react'

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-12 pb-8">
      <p className="font-mono text-xs uppercase tracking-widest text-signal-progress">
        Cybersecurity education project
      </p>
      <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight text-ink-primary sm:text-4xl">
        Watch host discovery happen, one IP at a time
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-secondary">
        Enter a small IP range from your own lab network and step through how a discovery
        scan works: each address is checked in turn, marked active or inactive, and logged
        to a results table you can search and filter. Built for learning the mechanics of
        network reconnaissance, not for running one.
      </p>

      <div className="mt-6 flex items-start gap-3 border border-line bg-base-900 px-4 py-3 max-w-xl">
        <ShieldAlert size={18} className="mt-0.5 shrink-0 text-signal-warn" strokeWidth={1.75} />
        <p className="text-xs leading-relaxed text-ink-secondary">
          This tool only scans private/lab address ranges you enter yourself, and every
          result on this page is simulated — no packets are sent and no real host is
          contacted. Only run discovery tools like this against networks you own or are
          explicitly authorized to test.
        </p>
      </div>
    </section>
  )
}
