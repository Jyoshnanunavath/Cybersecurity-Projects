import { Lock, Layers, RefreshCcw, KeyRound, Activity, ShieldCheck } from 'lucide-react'

const NOTES = [
  {
    icon: Lock,
    title: 'Only scan authorized systems',
    body: 'Only scan systems that you own or have explicit permission to test.',
  },
  {
    icon: Layers,
    title: 'Minimize exposed services',
    body: 'Unnecessary open ports can increase the attack surface.',
  },
  {
    icon: RefreshCcw,
    title: 'Keep services updated',
    body: 'Services should be patched and securely configured.',
  },
  {
    icon: KeyRound,
    title: 'Restrict administrative services',
    body: 'Services such as SSH and RDP should be restricted to trusted networks where appropriate.',
  },
  {
    icon: Activity,
    title: 'Monitor network exposure',
    body: 'Regular port reviews can help identify unintended services.',
  },
]

export default function SecurityNotes() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6" aria-labelledby="security-notes-heading">
      <div className="glass animate-fade-up rounded-2xl p-5 sm:p-7">
        <div className="mb-5 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-cyan-accent" aria-hidden="true" />
          <h2 id="security-notes-heading" className="text-lg font-semibold text-white">
            Security Notes
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {NOTES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-3 rounded-xl border border-base-700 bg-base-900/40 p-4">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-accent/10">
                <Icon className="h-4 w-4 text-cyan-accent" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">{title}</p>
                <p className="mt-0.5 text-sm text-slate-500">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 border-t border-base-700 pt-4 text-xs text-slate-500">
          VD does not perform real network scanning. All results shown in this prototype are generated
          from a static, predefined demonstration dataset for educational purposes only.
        </p>
      </div>
    </section>
  )
}
