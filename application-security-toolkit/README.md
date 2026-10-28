# Application Security Demonstration Toolkit

## 1. Project Overview

The Application Security Demonstration Toolkit is a frontend-only React application built to
demonstrate fundamental application-security concepts for a college-level cybersecurity /
application-security assignment. It provides interactive, hands-on modules covering input
validation, authentication, authorization, secure password handling, basic security checks, error
handling, and security recommendations.

The project is **strictly an educational demonstration**. It uses only fixed demo accounts, never
collects or stores real credentials, and never contacts any external system.

## 2. Objective

Build a professional, interactive web application that clearly illustrates how core
application-security mechanisms work conceptually — while being explicit, throughout the UI and
this document, about which parts are simulated and which mirror real production concerns.

## 3. Features

- Interactive input-validation form with live error/valid states
- Simulated login system with demo accounts, failed-attempt tracking, and lockout
- Role-based authorization demo (Administrator vs. User) with an access-denied flow
- Password-strength evaluator, confirmation check, visibility toggle, and an educational
  in-browser SHA-256 hashing preview
- A security-checks module that evaluates predefined, simulated conditions and reports
  PASS / WARNING / FAIL
- A dashboard summarizing overall "security score" across all checks
- A dedicated security-recommendations reference section
- Consistent dark, cybersecurity-themed UI with accessible focus states and responsive layout

## 4. Security Concepts Demonstrated

| Concept | Where |
| --- | --- |
| Input validation | Input Validation module |
| Authentication | Authentication module |
| Authorization | Authorization module |
| Secure password handling | Password Security module |
| Basic security checks | Security Checks module |
| Error handling | Implemented throughout |
| Security recommendations | Recommendations module |

## 5. Technology Stack

- React 18
- Vite
- Tailwind CSS
- JavaScript (no TypeScript)
- lucide-react for icons

No backend, database, or external API is used. All data is local, in-memory, and reset on reload.

## 6. Installation

```bash
npm install
```

## 7. Running the Project

```bash
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

To build a production bundle of the demo (still frontend-only):

```bash
npm run build
npm run preview
```

## 8. Project Structure

```text
application-security-toolkit/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Header.jsx
    │   ├── Footer.jsx
    │   ├── common.jsx          # shared Panel / StatusPill / Field primitives
    │   ├── Dashboard.jsx
    │   ├── InputValidation.jsx
    │   ├── Authentication.jsx
    │   ├── Authorization.jsx
    │   ├── PasswordSecurity.jsx
    │   ├── SecurityChecks.jsx
    │   └── Recommendations.jsx
    └── data/
        ├── demoUsers.js
        └── securityChecks.js
```

## 9. Authentication Demonstration

The Authentication module implements a **simulated** login flow using two fixed demo accounts
(see below). It tracks failed attempts, shows a generic "Authentication Failed" message that does
not reveal whether the username or password was the specific problem, applies a temporary lockout
after repeated failures, and provides a logout control.

This is explicitly a client-side simulation. A production system would authenticate against a
server, store only hashed credentials, and issue a secure, server-validated session token.

## 10. Authorization Demonstration

After logging in, the assigned role (`Administrator` or `User`) is displayed. The Authorization
module shows a permission matrix and lets you attempt to open features that are restricted to
Administrators. Attempting a restricted feature as a `User` displays an "Access Denied" message
and is logged in an on-screen access-denied history.

This authorization check happens entirely in the browser for demonstration purposes. A real
application must re-verify authorization on the server for every request — the frontend state
here could otherwise be trivially bypassed by a malicious user.

## 11. Password-Security Approach

The Password Security module evaluates a typed password against five criteria (length, uppercase,
lowercase, number, special character) and shows a Weak → Very Strong meter. It also includes a
password-confirmation field and a visibility toggle.

An **educational only** SHA-256 hashing preview shows what a hash of the entered value looks like,
computed locally in the browser via the Web Crypto API. This is explicitly labeled as a
demonstration of "a hash looks nothing like the original input" — it is not how production systems
should hash passwords. Real systems should use a slow, salted algorithm such as bcrypt or Argon2,
computed on the server, and should never hash or transmit passwords from untrusted client code in
place of proper authentication.

No password entered anywhere in this application is stored, logged, or transmitted.

## 12. Input-Validation Approach

The Input Validation module validates username, email, password, age, and a general text field
against rules covering required fields, length bounds, format (email), allowed characters, and
numeric range — entirely client-side, before the (simulated) submission is treated as valid.

Client-side validation exists to improve user experience. It is **not** a security control by
itself — a real application must re-validate all input on the server, since client-side checks can
be bypassed.

## 13. Error-Handling Approach

Errors throughout the app are deliberately generic and user-friendly. For example, authentication
failures say "Invalid username or password" rather than which field was wrong, and no error
message anywhere exposes stack traces, internal implementation details, or simulated
"database" information.

## 14. Security Recommendations

See the in-app Recommendations module for the full list, organized by Authentication, Password
Security, Input Validation, Authorization, Error Handling, and Session Security.

## 15. Assignment Mapping

| Requirement | Implementation |
| --- | --- |
| Input validation | `src/components/InputValidation.jsx` |
| Authentication | `src/components/Authentication.jsx` |
| Authorization | `src/components/Authorization.jsx` |
| Secure password handling | `src/components/PasswordSecurity.jsx` |
| Basic security checks | `src/components/SecurityChecks.jsx` |
| Error handling | Implemented across application (see §13) |
| Security recommendations | `src/components/Recommendations.jsx` |

## 16. Demonstration Accounts

```text
Administrator
Username: admin
Password: Secure@123

User
Username: user
Password: User@123
```

These are fixed, publicly-documented demonstration credentials used only to illustrate the
authentication/authorization flow for this assignment. They are not real accounts and do not
grant access to any real system.

## 17. Limitations

This is a frontend-only prototype. As a result:

- Authentication is simulated; there is no real server-side verification.
- Authorization is enforced only on the client and could be bypassed by a motivated user.
- No real user database is used — accounts are hard-coded in `src/data/demoUsers.js`.
- Passwords shown are demonstration credentials only, visible in source.
- No production-grade password storage mechanism (salted hashing, server-side) is implemented.
- Security checks evaluate predefined, simulated application conditions — they do not scan real
  code, dependencies, or infrastructure.
- The application does not provide real security against a malicious actor and must not be
  treated as production-grade application security.

## 18. Future Enhancements

- Backend authentication service
- Database-backed user management
- Server-side authorization enforcement
- Secure password hashing using Argon2 or bcrypt
- Real session management (secure, httpOnly cookies; expiry)
- Multi-factor authentication
- Rate limiting on authentication endpoints
- Security event logging and monitoring
- Full role/permission management (not just two fixed roles)
- Server-side input validation and sanitization
- Security audit logging
- Automated security testing (SAST/DAST) in CI

## 19. License

MIT — for educational use.
