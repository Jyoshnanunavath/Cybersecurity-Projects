// Demonstration authorization middleware.
// Enforces role-based access control (RBAC) on top of an already-authenticated request.
// This is a conceptual demonstration, not a production authorization engine.

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      // Authorization should never run before authentication.
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
}
