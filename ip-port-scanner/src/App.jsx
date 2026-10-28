import { useState } from 'react'
import { RadarIcon } from 'lucide-react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ScannerConfig from './components/ScannerConfig.jsx'
import ScanProgress from './components/ScanProgress.jsx'
import ScanSummary from './components/ScanSummary.jsx'
import ResultsTable from './components/ResultsTable.jsx'
import PortDetails from './components/PortDetails.jsx'
import SecurityNotes from './components/SecurityNotes.jsx'
import Footer from './components/Footer.jsx'
import { getPortsInRange } from './data/mockPorts.js'

// Scan lifecycle: 'idle' -> 'scanning' -> 'done'
export default function App() {
  const [scanState, setScanState] = useState('idle')
  const [target, setTarget] = useState('')
  const [range, setRange] = useState({ start: 1, end: 1024 })
  const [results, setResults] = useState([])
  const [selectedPort, setSelectedPort] = useState(null)

  function handleScan({ ip, start, end }) {
    setTarget(ip)
    setRange({ start, end })
    setSelectedPort(null)
    setScanState('scanning')
  }

  function handleScanComplete() {
    setResults(getPortsInRange(range.start, range.end))
    setScanState('done')
  }

  function handleClear() {
    setScanState('idle')
    setResults([])
    setSelectedPort(null)
  }

  const openCount = results.filter((r) => r.status === 'OPEN').length
  const portsScanned = range.end - range.start + 1

  return (
    <div className="min-h-screen pb-6">
      <Header />
      <Hero />

      <div className="flex flex-col gap-6">
        <ScannerConfig
          onScan={handleScan}
          onClear={handleClear}
          canClear={scanState === 'done'}
          isScanning={scanState === 'scanning'}
          disabled={scanState === 'scanning'}
        />

        {scanState === 'scanning' && (
          <ScanProgress target={target} range={range} onComplete={handleScanComplete} />
        )}

        {scanState === 'idle' && (
          <section className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="glass animate-fade-up flex flex-col items-center justify-center gap-3 rounded-2xl px-6 py-14 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-accent/10">
                <RadarIcon className="h-5 w-5 text-cyan-accent" aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold text-white">No scan results yet</h3>
              <p className="max-w-sm text-sm text-slate-500">
                Enter a target IP and port range, then click "Scan Ports" to begin.
              </p>
            </div>
          </section>
        )}

        {scanState === 'done' && (
          <>
            <ScanSummary
              target={target}
              portsScanned={portsScanned}
              openCount={openCount}
              status="Completed"
            />

            <section className="mx-auto max-w-6xl px-4 sm:px-6">
              <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                Scan completed successfully.
              </p>
            </section>

            <ResultsTable results={results} selectedPort={selectedPort} onSelectPort={setSelectedPort} />

            {selectedPort && (
              <section className="mx-auto max-w-6xl px-4 sm:px-6">
                <PortDetails port={selectedPort} onClose={() => setSelectedPort(null)} />
              </section>
            )}
          </>
        )}

        <SecurityNotes />
      </div>

      <Footer />
    </div>
  )
}
