import { GraduationCap, FlaskConical } from 'lucide-react'

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-10 pb-6 sm:px-6 sm:pt-14">
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-accent/25 bg-cyan-accent/[0.07] px-3 py-1 text-xs font-medium text-cyan-accent">
          <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
          Educational Prototype
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-base-600 bg-base-900 px-3 py-1 text-xs font-medium text-slate-400">
          <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
          Demo Mode — Simulated Results
        </div>
      </div>

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        IP Port Scanner
      </h1>
      <p className="mt-2 max-w-2xl text-base text-slate-400">
        Analyze TCP ports and identify commonly associated network services.
      </p>
      <p className="mt-3 max-w-2xl text-sm text-slate-500">
        Simulated port scanning interface designed for cybersecurity education and demonstration.
      </p>
    </section>
  )
}
