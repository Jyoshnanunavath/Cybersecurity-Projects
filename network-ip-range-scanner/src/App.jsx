import { useCallback, useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ScannerConfig from './components/ScannerConfig.jsx'
import ScanProgress from './components/ScanProgress.jsx'
import ScanSummary from './components/ScanSummary.jsx'
import ResultsTable from './components/ResultsTable.jsx'
import HostDetails from './components/HostDetails.jsx'
import SecurityNotice from './components/SecurityNotice.jsx'
import Footer from './components/Footer.jsx'
import { validateRange, intToIp, ipToInt } from './utils/ip.js'
import { simulateHostResult } from './data/mockHosts.js'

const MAX_HOSTS = 64
const STEP_DELAY_MS = 55

export default function App() {
  const [startIp, setStartIp] = useState('192.168.1.1')
  const [endIp, setEndIp] = useState('192.168.1.20')
  const [authorized, setAuthorized] = useState(false)
  const [inputError, setInputError] = useState('')

  const [status, setStatus] = useState('ready') // ready | scanning | completed | error
  const [rangeLabel, setRangeLabel] = useState('')
  const [results, setResults] = useState([])
  const [currentIp, setCurrentIp] = useState('')
  const [processed, setProcessed] = useState(0)
  const [total, setTotal] = useState(0)
  const [selectedIp, setSelectedIp] = useState(null)

  const timerRef = useRef(null)
  const cancelledRef = useRef(false)

  useEffect(() => () => {
    cancelledRef.current = true
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const resetOutput = useCallback(() => {
    setResults([])
    setCurrentIp('')
    setProcessed(0)
    setTotal(0)
    setSelectedIp(null)
    setInputError('')
  }, [])

  const handleClear = useCallback(() => {
    cancelledRef.current = true
    if (timerRef.current) clearTimeout(timerRef.current)
    setStartIp('')
    setEndIp('')
    setAuthorized(false)
    setStatus('ready')
    setRangeLabel('')
    resetOutput()
  }, [resetOutput])

  const handleClearResults = useCallback(() => {
    setResults([])
    setSelectedIp(null)
  }, [])

  const runScan = useCallback(
    (startInt, endInt) => {
      cancelledRef.current = false
      const hostTotal = endInt - startInt + 1
      let index = 0

      const step = () => {
        if (cancelledRef.current) return

        if (index >= hostTotal) {
          setStatus('completed')
          setCurrentIp('')
          return
        }

        const ip = intToIp(startInt + index)
        let result
        try {
          result = { ...simulateHostResult(ip), timestamp: Date.now() }
        } catch {
          result = {
            ip,
            status: 'error',
            result: 'Unexpected simulation error while processing this host.',
            latencyMs: null,
            timestamp: Date.now(),
          }
        }

        setResults((prev) => [...prev, result])
        setCurrentIp(ip)
        setProcessed(index + 1)
        index += 1

        timerRef.current = setTimeout(step, STEP_DELAY_MS)
      }

      step()
    },
    [],
  )

  const handleScan = useCallback(() => {
    const validation = validateRange(startIp, endIp, MAX_HOSTS)

    if (!validation.valid) {
      resetOutput()
      setInputError(validation.error)
      setStatus('error')
      return
    }

    if (!authorized) {
      setInputError('Please confirm you are authorized to scan this range before starting.')
      return
    }

    setInputError('')
    resetOutput()
    setRangeLabel(`${startIp} – ${endIp}`)
    setTotal(validation.hostCount)
    setStatus('scanning')

    const startInt = ipToInt(startIp)
    const endInt = ipToInt(endIp)
    runScan(startInt, endInt)
  }, [startIp, endIp, authorized, resetOutput, runScan])

  const activeCount = results.filter((r) => r.status === 'active').length
  const inactiveCount = results.filter((r) => r.status === 'inactive').length
  const errorCount = results.filter((r) => r.status === 'error').length

  const selectedHost = results.find((r) => r.ip === selectedIp) ?? null

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ScannerConfig
          startIp={startIp}
          endIp={endIp}
          onStartIpChange={setStartIp}
          onEndIpChange={setEndIp}
          authorized={authorized}
          onAuthorizedChange={setAuthorized}
          onScan={handleScan}
          onClear={handleClear}
          error={inputError}
          status={status}
          maxHosts={MAX_HOSTS}
        />
        <ScanProgress status={status} currentIp={currentIp} processed={processed} total={total} />
        <ScanSummary
          rangeLabel={rangeLabel}
          total={total}
          active={activeCount}
          inactive={inactiveCount}
          errors={errorCount}
          status={status}
        />
        <ResultsTable
          results={results}
          selectedIp={selectedIp}
          onSelect={setSelectedIp}
          onClearResults={handleClearResults}
          status={status}
        />
        <HostDetails host={selectedHost} onClose={() => setSelectedIp(null)} />
        <SecurityNotice />
      </main>
      <Footer />
    </div>
  )
}
