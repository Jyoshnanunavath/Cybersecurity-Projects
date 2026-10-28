// IPv4 validation and conversion helpers.
// Kept deliberately simple: this project performs no real network access,
// so these utilities only ever operate on strings and numbers in-memory.

const OCTET_PATTERN = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/

export function isValidIPv4(value) {
  if (typeof value !== 'string') return false
  const match = value.trim().match(OCTET_PATTERN)
  if (!match) return false
  return match.slice(1, 5).every((part) => {
    if (part.length > 1 && part.startsWith('0')) return false
    const n = Number(part)
    return n >= 0 && n <= 255
  })
}

export function ipToInt(ip) {
  return ip
    .trim()
    .split('.')
    .reduce((acc, octet) => acc * 256 + Number(octet), 0)
}

export function intToIp(int) {
  return [24, 16, 8, 0].map((shift) => (int >>> shift) & 255).join('.')
}

export function isPrivateOrLoopback(ip) {
  const n = ipToInt(ip)
  const inRange = (start, end) => n >= ipToInt(start) && n <= ipToInt(end)
  return (
    inRange('10.0.0.0', '10.255.255.255') ||
    inRange('172.16.0.0', '172.31.255.255') ||
    inRange('192.168.0.0', '192.168.255.255') ||
    inRange('127.0.0.0', '127.255.255.255') ||
    inRange('169.254.0.0', '169.254.255.255')
  )
}

/**
 * Validates a start/end IP pair against the rules this lab tool enforces.
 * Returns { valid: boolean, error?: string, hostCount?: number }
 */
export function validateRange(startIp, endIp, maxHosts) {
  if (!startIp.trim() || !endIp.trim()) {
    return { valid: false, error: 'Both a start and end IP address are required.' }
  }
  if (!isValidIPv4(startIp)) {
    return { valid: false, error: `"${startIp}" is not a valid IPv4 address.` }
  }
  if (!isValidIPv4(endIp)) {
    return { valid: false, error: `"${endIp}" is not a valid IPv4 address.` }
  }

  const start = ipToInt(startIp)
  const end = ipToInt(endIp)

  if (start > end) {
    return { valid: false, error: 'The starting IP must not be greater than the ending IP.' }
  }

  const hostCount = end - start + 1

  if (hostCount > maxHosts) {
    return {
      valid: false,
      error: `Range is too large (${hostCount.toLocaleString()} hosts). This lab tool limits scans to ${maxHosts.toLocaleString()} hosts at a time.`,
    }
  }

  if (!isPrivateOrLoopback(startIp) || !isPrivateOrLoopback(endIp)) {
    return {
      valid: false,
      error:
        'This educational tool only simulates scans against private/lab address ranges (10.x, 172.16–31.x, 192.168.x, 127.x).',
    }
  }

  return { valid: true, hostCount }
}
