import { Info } from 'lucide-react'

export default function SecurityNotice() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <div className="border border-line bg-base-900/40 p-6">
        <div className="flex items-start gap-3">
          <Info size={18} className="mt-0.5 shrink-0 text-signal-progress" strokeWidth={1.75} />
          <div className="text-xs leading-relaxed text-ink-secondary">
            <p className="font-medium text-ink-primary">Simulation mode</p>
            <p className="mt-1.5">
              No real network traffic is generated. Results are simulated for educational
              purposes using a deterministic algorithm, not a live scan of any device.
            </p>
            <p className="mt-3">
              This project is a teaching aid for understanding how discovery scanning works
              conceptually. It contains no stealth, evasion, exploitation, credential-attack,
              or firewall-bypass functionality, and is not a substitute for a licensed
              security tool. Only test networks you own or have explicit written
              authorization to assess.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
