import express from "express";
import cors from "cors";

import usersRouter from "./routes/users.js";
import transactionsRouter from "./routes/transactions.js";
import securityEventsRouter from "./routes/securityEvents.js";
import monitoringRouter from "./routes/monitoring.js";
import { rateLimit } from "./middleware/rateLimit.js";

const app = express();
const PORT = process.env.PORT || 4000;

// This service is a local educational demonstration only.
// It is not hardened for exposure to the public internet.
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"]
  })
);
app.use(express.json());
app.use(rateLimit);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/users", usersRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/security-events", securityEventsRouter);
app.use("/api/monitoring", monitoringRouter);

// Fallback for unknown routes.
app.use((req, res) => {
  res.status(404).json({ error: "Resource not found" });
});

// Centralized error handler: never leak stack traces, internal paths,
// or implementation details to the client.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("[api-service] Unhandled error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`[api-service] Demo API listening on http://localhost:${PORT}`);
  console.log("[api-service] This is an educational prototype. No real payments are processed.");
});
