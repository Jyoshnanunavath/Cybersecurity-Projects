# Meridian Pay — Part 1: Customer-Facing Applications

An educational prototype of the customer-facing surfaces of a fictional
multi-domain payment company. This is **not a real payment gateway** and
does not process real financial transactions or real payment credentials
anywhere in the codebase.

This directory (`part1-customer/`) covers three self-contained applications.
Part 2 (administrative surfaces) and any backend/integration layer are out
of scope here and are not documented in this README.

## Applications

| App | Path | Conceptual domain | Default port |
| --- | --- | --- | --- |
| Main website | `main-website/` | `www.meridianpay.local` | 5173 |
| Customer portal | `customer-portal/` | `customer.meridianpay.local` | 5174 |
| Payment application | `payment-app/` | `pay.meridianpay.local` | 5175 |

Each app is an independent Vite + React project with its own
`package.json`. They are not linked by a shared build — cross-app
navigation (e.g. "Customer login" on the main site, "Back to portal" in
the payment app) uses plain links to the other app's local dev URL, which
is how separate domains would link to one another in a real deployment.

## Authentication

The customer portal uses a single hardcoded demonstration account:

```
Username: customer
Password: Customer@123
```

This is intentionally insecure and is only meant to illustrate a login
flow, a generic "Invalid username or password" error (which never reveals
which field was wrong), and an authenticated session state. A real system
would authenticate against a backend, hash and salt stored passwords, and
never expose credentials in source code.

## Authorization

The customer portal only exposes customer-level routes. An "Admin
console" link is present in the dashboard navigation purely to demonstrate
what happens when a customer session reaches a route it isn't authorized
for: it always renders an **Access Denied** screen. There is no admin
functionality implemented in Part 1.

This authorization check happens entirely in the browser (a React route
guard). **Client-side authorization is a UX convenience, not a security
boundary.** A real system must enforce the same checks on the server,
since any client-side check can be bypassed by a motivated user.

## Session management

The customer portal simulates session behavior:

- A 10-minute countdown is shown in the dashboard header once signed in.
- The session can be manually extended from the banner once it's running low.
- When the countdown reaches zero, the session is cleared and the user is
  returned to the login page.
- Logout immediately clears the session and blocks access to protected
  routes.

This is a client-only simulation (a `setInterval` timer in React state),
not a real session token, cookie, or server-side expiry mechanism.

## Payment simulation

The payment application walks through a three-step flow: **Details →
Confirm → Done**. It never asks for real card numbers, CVVs, bank
passwords, or other real payment credentials — only an amount, currency,
recipient, and free-text reference.

Client-side validation covers:

- Empty amount
- Non-numeric / invalid amount
- Zero or negative amount
- Amount exceeding a demonstration ceiling
- Unsupported currency
- Missing or malformed recipient
- Missing or malformed reference

On confirmation, a fake transaction ID (`DEMO-TXN-#####`) is generated
client-side and displayed with an explicit "demonstration transaction
only" notice. No network request, real payment processor, or backend is
involved.

## Input validation

Both the customer portal (login form) and the payment application
(payment form) validate input before allowing the user to proceed, and
surface specific, plain-language error messages rather than silent
failures. As with authorization, this validation is illustrative only —
a production system must also validate and sanitize every input
server-side.

## Security considerations

Each app includes an in-product explanation of the security principles it
is illustrating (secure authentication, encryption in transit, access
control, session protection, monitoring, tokenization, and so on). None of
these principles are actually implemented at the transport or
infrastructure level — this is a frontend-only prototype, so:

- There is no real TLS/HTTPS termination configured by this code.
- There are no secure, HTTP-only, or signed cookies.
- There is no server, so there is nothing enforcing these rules outside
  the browser.

Treat every "secure" label in the UI as a description of what a
production version of this architecture *would* do, not a guarantee about
this codebase.

## Limitations

- No backend: all data is static demonstration data defined in
  `src/data/` files within each app.
- No real authentication, encryption, tokenization, or fraud detection.
- Client-side authorization and session handling only — trivially
  bypassable by anyone with browser dev tools.
- Not accessible over real `*.paymentcompany.local` domains; the
  "domains" in this README are conceptual labels for three separate local
  dev servers.
- Not audited, load-tested, or hardened for production use in any way.

## Ethical scope

This project exists to demonstrate frontend security *patterns* —
authentication flows, authorization boundaries, input validation, and
session lifecycle — for educational purposes. It intentionally avoids any
behavior that could be mistaken for a real payment product: no real
credential collection, no real transaction processing, and no misleading
claims about the security of the code itself.

## Installation

Each app is installed and run independently. From this directory:

```bash
cd main-website && npm install
cd ../customer-portal && npm install
cd ../payment-app && npm install
```

## Running

Open three terminals (or run in sequence), one per app, so all three are
available at once for cross-app navigation to work:

```bash
# Terminal 1
cd main-website && npm run dev      # http://localhost:5173

# Terminal 2
cd customer-portal && npm run dev   # http://localhost:5174

# Terminal 3
cd payment-app && npm run dev       # http://localhost:5175
```

Then visit `http://localhost:5173` and follow the "Access Customer
Portal" link, sign in with the demo credentials above, and use the
"Payment activity" or payment app flow to try the simulated payment
workflow.
