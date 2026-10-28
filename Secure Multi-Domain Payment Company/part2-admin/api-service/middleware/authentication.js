// Demonstration authentication middleware.
// This does NOT implement real cryptographic session handling.
// It simulates the concept of verifying a client's identity via a bearer token
// before any request reaches a protected route.

// In this prototype, valid demo tokens map to a demo user/role.
// A real system would verify a signed session token or JWT against a store,
// never a static lookup table like this.
const DEMO_TOKENS = {
  "demo-token-admin": { username: "admin", role: "administrator" },
  "demo-token-analyst": { username: "analyst01", role: "security_analyst" },
  "demo-token-support": { username: "support01", role: "support_staff" }
};

export function authenticate(req, res, next) {
  const header = req.headers["authorization"] || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const identity = DEMO_TOKENS[token];
  if (!identity) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Attach the authenticated identity to the request for downstream checks.
  req.user = identity;
  next();
}
