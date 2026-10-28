# Subdomain Enumeration 

A single-page, client-side subdomain enumeration tool. It has no backend — every
lookup happens in the browser using public DNS-over-HTTPS (DoH) resolvers, so it can
be hosted as a static site (GitHub Pages, Netlify, Render static, etc.) with zero
server-side code.

## Problem Statement

Subdomain enumeration is a standard first step in an authorized security
assessment: it maps out an organization's exposed attack surface (staging
environments, admin panels, forgotten dev servers, mail infrastructure) before any
deeper testing happens. Most classroom versions of this tool run as a Python/CLI
script that shells out to `dig`/`nslookup`, which needs a backend or a local
runtime. This version deliberately does it with **no backend at all** — using
DNS-over-HTTPS from the browser — to show that the same reconnaissance concept can
be built as a pure static web app.

## Objective

Demonstrate, in a working prototype, how subdomains of an authorized target can be
discovered using passive, publicly-available DNS resolution — entirely from
client-side JavaScript — while being explicit about the legal/ethical boundary
around when this is appropriate to run.

## Features

- Domain input with basic validation and normalization (strips `http(s)://`, `www.`)
- Choice of two public DNS-over-HTTPS resolvers: Google (`dns.google`) and
  Cloudflare (`cloudflare-dns.com`)
- Built-in wordlist of 100 common subdomain prefixes, or a custom pasted wordlist
- Concurrent lookups (configurable, default 8 in flight) with a live progress bar
- Live scan console showing each hit as it's found
- Results table: subdomain, record type (A / CNAME), resolved value
- Stop/abort mid-scan
- Copy full result list to clipboard
- Export results as CSV or JSON
- Persistent on-page warning about authorized-use-only scanning
- Fully responsive, dark "recon console" interface with no external dependencies

## Technologies Used

- Vanilla HTML, CSS, and JavaScript (no framework, no build step)
- Browser `fetch()` against public DNS-over-HTTPS JSON APIs:
  - `https://dns.google/resolve?name=...&type=...`
  - `https://cloudflare-dns.com/dns-query?name=...&type=...`
- `Blob` + `URL.createObjectURL` for client-side CSV/JSON export
- `navigator.clipboard` for copy-to-clipboard

## Installation / Setup

No build tools or dependencies required.

```bash
git clone <this-repo-url>
cd subdomain-enumeration
# just open the file directly, or serve it locally:
python3 -m http.server 8080
```

Then visit `http://localhost:8080` (or open `index.html` directly in a browser).
To deploy: push `index.html` to a GitHub Pages branch, or drag the folder into
Netlify — there is nothing else to configure.

## How It Works

1. The user enters a target domain and (optionally) a custom wordlist.
2. For each candidate word, the app builds `word.domain.com` and sends a DNS
   query for that name to the selected DoH resolver via `fetch()`, requesting an
   `A` record and falling back to `CNAME` if there's no `A` record.
3. DoH resolvers return plain JSON over HTTPS (no special DNS socket access is
   needed from a browser), so this works entirely client-side and is CORS-enabled
   on both providers used here.
4. A small worker pool (default 8 concurrent requests) works through the wordlist
   so the scan doesn't run one lookup at a time.
5. Any name that resolves is added to the results table in real time; anything
   that doesn't resolve is simply skipped — this is a **wordlist-bound** scan, so
   it will only ever find subdomains whose prefix appears in the list used.
6. Results can be copied, or exported as CSV/JSON for use in a report.

## Screenshots

_Add screenshots here after running a scan against a domain you're authorized to
test — e.g. a domain you own, or a deliberately vulnerable lab target._

## Demo / Live Link

_Add your deployed GitHub Pages / Netlify link here after deployment._

## Security Considerations

- **Authorized use only.** This tool only performs passive, public DNS
  resolution — but running it against a domain you don't own or don't have
  written permission to assess can still violate computer-misuse laws in many
  jurisdictions, and the tool displays a persistent warning to that effect.
- **No secrets, no server.** Because there is no backend, there is nothing to
  configure, patch, or leak — the only network calls are outbound `fetch()`
  requests from the visitor's own browser to Google/Cloudflare's public
  resolvers.
- **Passive technique only.** This performs DNS resolution against a
  fixed wordlist — it does not brute-force zone transfers, does not attempt
  certificate-transparency scraping, and sends no traffic to the target's
  actual servers (only to the DNS resolvers).
- **False negatives are expected.** A subdomain not appearing in results does
  not mean it doesn't exist — it means it wasn't in the tested wordlist, or
  didn't have an A/CNAME record at scan time.
- **Rate limiting.** Concurrency is capped client-side (max 20) to avoid
  hammering the public resolvers.

## Future Improvements

- Add certificate-transparency lookups (e.g. crt.sh's JSON API) as a second,
  passive enumeration source alongside DoH brute-forcing
- Add wildcard-DNS detection (some domains resolve *every* subdomain to the same
  IP, which produces false positives that a real tool should flag)
- Persist scan history locally (e.g. `localStorage`) so past scans can be revisited
- Add MX/TXT/NS record types for more complete reconnaissance
- Add a permission/scope acknowledgment checkbox that must be ticked before the
  scan button becomes clickable
