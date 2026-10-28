import { Router } from "express";
import { authenticate } from "../middleware/authentication.js";
import { requireRole } from "../middleware/authorization.js";
import { validatePagination, validateIdParam } from "../middleware/validation.js";
import { demoUsers } from "../data/demoData.js";

const router = Router();

// Only administrators may list or inspect user accounts.
router.get("/", authenticate, requireRole("administrator"), validatePagination, (req, res) => {
  const { page, pageSize } = req.pagination;
  const start = (page - 1) * pageSize;
  const items = demoUsers.slice(start, start + pageSize);

  res.status(200).json({
    page,
    pageSize,
    total: demoUsers.length,
    items
  });
});

router.get("/:id", authenticate, requireRole("administrator"), validateIdParam("id"), (req, res) => {
  const user = demoUsers.find((u) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: "Resource not found" });
  }
  res.status(200).json(user);
});

// Any authenticated role may read its own profile summary.
router.get("/profile/me", authenticate, (req, res) => {
  const match = demoUsers.find((u) => u.username === req.user.username);
  res.status(200).json({
    username: req.user.username,
    role: req.user.role,
    displayName: match ? match.displayName : req.user.username
  });
});

export default router;
