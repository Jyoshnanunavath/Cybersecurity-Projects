import { Router } from "express";
import { authenticate } from "../middleware/authentication.js";
import { requireRole } from "../middleware/authorization.js";
import { validatePagination, validateIdParam } from "../middleware/validation.js";
import { demoTransactions } from "../data/demoData.js";

const router = Router();

// Administrators, security analysts, and support staff may all view
// transaction monitoring data (per the role/permission matrix).
router.get(
  "/",
  authenticate,
  requireRole("administrator", "security_analyst", "support_staff"),
  validatePagination,
  (req, res) => {
    const { page, pageSize } = req.pagination;
    const start = (page - 1) * pageSize;
    const items = demoTransactions.slice(start, start + pageSize);

    res.status(200).json({
      page,
      pageSize,
      total: demoTransactions.length,
      items
    });
  }
);

router.get(
  "/:id",
  authenticate,
  requireRole("administrator", "security_analyst", "support_staff"),
  validateIdParam("id"),
  (req, res) => {
    const txn = demoTransactions.find((t) => t.id === req.params.id);
    if (!txn) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json(txn);
  }
);

export default router;
