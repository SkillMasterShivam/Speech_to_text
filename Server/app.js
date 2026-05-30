import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const isProd = process.env.NODE_ENV === "production";

/* ── Security Headers ── */
app.use(helmet());

/* ── CORS ── */
const allowedOrigins = [
  process.env.CLIENT_URL,
  ...(isProd ? [] : ["http://localhost:5173", "http://127.0.0.1:5173"]),
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

/* ── Rate Limiting ── */
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests. Please try again later." },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many authentication attempts. Please try again later." },
});

app.use(globalLimiter);

/* ── Body Parsing ── */
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

/* ── Logging ── */
if (isProd) {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

/* ── Routes ── */
app.use("/api/health", healthRoutes);
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/uploads", uploadRoutes);

/* ── Error Handling ── */
app.use(notFound);
app.use(errorHandler);

export default app;
