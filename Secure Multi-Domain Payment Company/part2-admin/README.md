# Part 2 — Admin and Backend Security Ecosystem

Educational prototype of the internal/admin and backend-facing portion of a simulated
multi-domain payment company. **This is not a real payment gateway** and does not process,
store, or transmit real financial transactions or real user data.

This directory (`part2-admin/`) is self-contained and does not modify or depend on
`part1-customer/` or `integration/`.

## Project purpose

Part 2 demonstrates, for learning purposes:

- A secure-by-design **admin portal** with authentication, role-based authorization, and
  security/transaction monitoring views.
- A local **API service** that demonstrates authentication, authorization, input validation,
  and rate-limiting concepts on a small Express backend.
- A **monitoring dashboard** aggregating simulated security and system events.
- Written explanations of **domain/application separation**, **secure communication**, and
  **payment security** concepts, clearly separated from what is actually implemented.

Everything above uses fabricated, local demonstration data.

## Structure

```text
part2-admin/
├── admin-portal/     React + Vite + Tailwind admin dashboard (conceptually admin.paymentcompany.local)
├── api-service/      Node + Express demo API (conceptually api.paymentcompany.local)
└── monitoring/       React + Vite monitoring dashboard (conceptually monitoring.paymentcompany.local)
```

The three "domains" above are conceptual demonstrations of application separation — this
prototype runs them as three local dev servers, not as separately deployed, TLS-terminated
domains.

## Admin portal

- **Authentication**: demo login screen with hardcoded demo accounts (see below). Invalid
  attempts show a single generic message ("Invalid username or password.") rather than
  revealing whether the username or password was wrong. Repeated failures are noted in the UI
  as a simulated logging event.
- **Authorization**: role-based access control with three roles — Administrator, Security
  Analyst, Support Staff — enforced both in navigation (disabled/greyed links) and at the route
  level (an "Access Denied" screen if a role reaches a page it isn't permitted to use).
- **Dashboard**: system overview metrics (active users, transactions, failed logins, security
  events, API requests, alerts) and a high-severity events feed — all demonstration data.
- **Transaction monitoring**: a table of demo transactions with status and risk level.
- **Security event logs**: searchable, filterable audit/security log table (Administrator and
  Security Analyst only).
- **User management**: a read-only demo user list (Administrator only).
- **Architecture, secure communication, and payment security pages**: educational reference
  content, described further below.

### Demo credentials

| Username | Password      | Role              |
| -------- | ------------- | ----------------- |
| admin    | Admin@123     | Administrator     |
| analyst  | Analyst@123   | Security Analyst  |
| support  | Support@123   | Support Staff     |

These are demonstration-only credentials hardcoded in `admin-portal/src/data/demoData.js`.
They are not real accounts and must never be reused for anything real.

### Permission matrix

| Feature                 | Administrator | Security Analyst | Support Staff |
| ------------------------ | :-----------: | :---------------: | :------------: |
| Dashboard                |      Yes      |        Yes        |       Yes       |
| Transaction monitoring   |      Yes      |        Yes        |       Yes       |
| Security logs            |      Yes      |        Yes        |       No        |
| User management          |      Yes      |        No         |       No        |
| Security configuration   |      Yes      |        Yes        |       No        |
| Audit logs               |      Yes      |        Yes        |       No        |

## API service

A small Express app demonstrating API security concepts on local demo data only. It is not
exposed to the internet and should only ever be run locally.

Endpoints:

```text
GET /api/health
GET /api/users                 (administrator only)
GET /api/users/:id             (administrator only)
GET /api/users/profile/me      (any authenticated role)
GET /api/transactions          (administrator, security_analyst, support_staff)
GET /api/transactions/:id      (administrator, security_analyst, support_staff)
GET /api/security-events       (administrator, security_analyst)
GET /api/monitoring/events     (administrator, security_analyst)
GET /api/monitoring/status     (administrator, security_analyst)
```

Concepts demonstrated:

- **Authentication** (`middleware/authentication.js`): a `Bearer` token is required on every
  protected route; missing or unrecognized tokens receive a generic `401 Unauthorized`. Demo
  tokens are `demo-token-admin`, `demo-token-analyst`, `demo-token-support`.
- **Authorization** (`middleware/authorization.js`): role checks run after authentication;
  authenticated-but-unpermitted requests receive `403 Forbidden`.
- **Input validation** (`middleware/validation.js`): pagination values, resource IDs, and
  search parameters are validated; invalid input receives a generic `400` response rather than
  an implementation-specific error.
- **Rate limiting** (`middleware/rateLimit.js`): a simulated in-memory sliding-window limiter
  (100 requests/minute per client) that returns `429 Too Many Requests` when exceeded. A real
  deployment would use a shared store (e.g. Redis) instead of in-process memory.
- **Safe error handling** (`server.js`): a centralized error handler that never returns stack
  traces, database errors, internal paths, credentials, or tokens to the client.

### Trying the API

```bash
# Unauthenticated — expect 401
curl http://localhost:4000/api/transactions

# Authenticated as an administrator
curl -H "Authorization: Bearer demo-token-admin" http://localhost:4000/api/users

# Authenticated but insufficient role — expect 403
curl -H "Authorization: Bearer demo-token-support" http://localhost:4000/api/users
```

## Monitoring dashboard

A standalone read-only dashboard showing simulated system status, security alerts, and an
event stream with `INFO` / `WARNING` / `HIGH` / `CRITICAL` severities. Passwords, tokens, full
payment credentials, and other sensitive personal information are never included in these
events, by design — see `monitoring/src/data/demoData.js` for the full set of sample events.

## Domain / application separation

The admin portal includes an **Architecture** page illustrating how the customer-facing site,
payment app, API layer, admin portal, and monitoring are conceptually separated, and why that
separation helps (reduced attack surface, independent access controls, isolation, clearer trust
boundaries, better monitoring, easier policy enforcement). It also states plainly that domain
separation alone does not make an application secure.

## Secure communication

The admin portal's **Secure communication** page is an educational reference covering HTTPS,
TLS, certificate validation, secure API communication, encryption in transit, HSTS, and secure
cookies. This prototype itself runs over plain local HTTP for development convenience — no
fake TLS handshake or HTTPS behavior is simulated in code.

## Payment security considerations

The admin portal's **Payment security** page covers tokenization, least privilege, secure API
communication, transaction authorization, audit logging, fraud monitoring, sensitive-data
minimization, and secure payment processing architecture, and states explicitly that this
prototype does not process real payments, store real financial information, or implement real
card processing.

## Error handling

Both the admin portal and API service use generic, production-style messages for authentication
failure, authorization failure, invalid requests, missing parameters, invalid resource IDs,
rate-limit conditions, and unexpected server errors. None of these ever expose stack traces,
database errors, internal file paths, credentials, tokens, or secrets.

## Installation and running

Each of the three sub-projects has its own `package.json` and runs independently.

```bash
# API service
cd api-service
npm install
npm start          # http://localhost:4000

# Admin portal (in a separate terminal)
cd admin-portal
npm install
npm run dev         # http://localhost:5173

# Monitoring dashboard (in a separate terminal)
cd monitoring
npm install
npm run dev         # http://localhost:5174
```

The admin portal's UI works standalone with its own local demo data even if the API service
isn't running; the `api-service` endpoints exist to demonstrate the API-security concepts
independently (see "Trying the API" above).

## Limitations

- All data is fabricated and local; nothing here represents real users, transactions, or
  credentials.
- Authentication is a client-side demonstration, not a real session/token system with hashing,
  salting, or secure storage.
- No real TLS/HTTPS is implemented; secure-communication content is documentation only.
- The rate limiter is in-memory and per-process; it does not scale across multiple instances.
- Role-based access control is enforced in the browser and demo API middleware, not backed by a
  real identity provider.
- This project has not been security-tested and must never be exposed to the public internet or
  used with real accounts or funds.

## Future enhancements (not implemented here)

- Real password hashing (e.g. bcrypt/argon2) and server-issued session tokens or JWTs.
- A persistent data store instead of in-memory demo arrays.
- Real TLS termination and HSTS in a deployed environment.
- Centralized structured logging with alerting integrations.
- Automated security testing (SAST/DAST) as part of a CI pipeline.

## Ethical scope

This project is an educational security-architecture exercise. It intentionally avoids
implementing anything that could be mistaken for a production payment system, and it does not
scan, probe, or access any external system. It should not be deployed, exposed publicly, or
used to handle real user data or funds.
