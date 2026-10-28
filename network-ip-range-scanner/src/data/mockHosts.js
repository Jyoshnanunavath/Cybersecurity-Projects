// SIMULATION ONLY.
// This module never opens a socket or sends a packet. It deterministically
// derives a plausible "active / inactive" demonstration result from the IP
// address itself, so the same range always produces the same results.

function hashIp(ip) {
  let hash = 0
  for (let i = 0; i < ip.length; i += 1) {
    hash = (hash * 31 + ip.charCodeAt(i)) >>> 0
  }
  return hash
}

const INACTIVE_REASONS = [
  'No response (simulated timeout)',
  'Host unreachable (simulated)',
  'No reply received (simulated)',
]

const ACTIVE_SERVICES = ['simulated response: 1 hop', 'simulated response: 2 hops', 'simulated echo reply']

/**
 * Produces a deterministic, clearly-labelled simulated discovery result
 * for a single IP address. No real network traffic is generated.
 */
export function simulateHostResult(ip) {
  const hash = hashIp(ip)
  const isActive = hash % 100 < 38 // ~38% of demo hosts appear "active"
  const latency = isActive ? 1 + (hash % 40) : null

  return {
    ip,
    status: isActive ? 'active' : 'inactive',
    result: isActive
      ? `${ACTIVE_SERVICES[hash % ACTIVE_SERVICES.length]}, ${latency} ms (simulated)`
      : INACTIVE_REASONS[hash % INACTIVE_REASONS.length],
    latencyMs: latency,
    timestamp: null, // filled in at scan time
  }
}
