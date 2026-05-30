import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus =
    dbState === 1 ? "connected" :
    dbState === 2 ? "connecting" :
    dbState === 0 ? "disconnected" : "unknown";

  const memoryMB = (process.memoryUsage().rss / 1024 / 1024).toFixed(1);
  const uptimeSeconds = Math.floor(process.uptime());
  const isHealthy = dbState === 1;

  res.status(isHealthy ? 200 : 503).json({
    success: isHealthy,
    status: isHealthy ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    uptime: uptimeSeconds,
    database: dbStatus,
    memory: `${memoryMB} MB`,
    environment: process.env.NODE_ENV || "development",
  });
});

export default router;
