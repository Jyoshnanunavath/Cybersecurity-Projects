import { Router } from "express";
import { authenticate } from "../middleware/authentication.js";
import { requireRole } from "../middleware/authorization.js";
import { validatePagination, validateSearchQuery } from "../middleware/validation.js";
import { demoSecurityEvents } from "../data/demoData.js";

const router = Router();

const ALLOWED_SEVERITIES = new Set(["low", "medium", "high"]);

// Security logs are restricted to administrators and security analysts,
// matching the permission matrix (support staff cannot view these).
router.get(
  "/",
  authenticate,
  requireRole("administrator", "security_analyst"),
  validatePagination,
  validateSearchQuery,
  (req, res) => {
    const { severity } = req.query;

    if (severity !== undefined && !ALLOWED_SEVERITIES.has(String(severity).toLowerCase())) {
      return res.status(400).json({ error: "Invalid request parameters" });
    }

    let results = demoSecurityEvents;

    if (severity) {
      results = results.filter((e) => e.severity === String(severity).toLowerCase());
    }

    if (req.query.q) {
      const q = String(req.query.q).toLowerCase();
      results = results.filter(
        (e) => e.event.toLowerCase().includes(q) || e.user.toLowerCase().includes(q)
      );
    }

    const { page, pageSize } = req.pagination;
    const start = (page - 1) * pageSize;
    const items = results.slice(start, start + pageSize);

    res.status(200).json({
      page,
      pageSize,
      total: results.length,
      items
    });
  }
);

export default router;
