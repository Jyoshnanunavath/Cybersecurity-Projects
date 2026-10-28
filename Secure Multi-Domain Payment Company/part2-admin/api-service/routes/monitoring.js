import { Router } from "express";
import { authenticate } from "../middleware/authentication.js";
import { requireRole } from "../middleware/authorization.js";
import { demoMonitoringEvents } from "../data/demoData.js";

const router = Router();

router.get(
  "/events",
  authenticate,
  requireRole("administrator", "security_analyst"),
  (req, res) => {
    res.status(200).json({ items: demoMonitoringEvents });
  }
);

router.get(
  "/status",
  authenticate,
  requireRole("administrator", "security_analyst"),
  (req, res) => {
    res.status(200).json({
      status: "operational",
      services: [
        { name: "admin-portal", status: "operational" },
        { name: "api-service", status: "operational" },
        { name: "monitoring", status: "operational" }
      ]
    });
  }
);

export default router;
