import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import validateEnv from "./config/validateEnv.js";

dotenv.config();

/* ── Validate environment before anything else ── */
validateEnv();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
  });
});
