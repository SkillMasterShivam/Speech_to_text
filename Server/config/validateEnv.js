/**
 * Validates that all required environment variables are set before the server starts.
 * Crashes immediately with a descriptive error if any are missing.
 */
const validateEnv = () => {
  const required = [
    { key: "MONGO_URI", hint: "MongoDB connection string" },
    { key: "JWT_SECRET", hint: "JWT signing secret (min 32 chars recommended)" },
    { key: "DEEPGRAM_API_KEY", hint: "Deepgram API key for transcription" },
  ];

  const missing = required.filter((v) => !process.env[v.key]);

  if (missing.length > 0) {
    console.error("\n❌  Missing required environment variables:\n");
    missing.forEach((v) => console.error(`   • ${v.key} — ${v.hint}`));
    console.error("\n   Add them to your .env file and restart.\n");
    process.exit(1);
  }

  // Warn if JWT_SECRET is too short
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    console.warn("⚠️  JWT_SECRET is shorter than 32 characters. Use a stronger secret in production.");
  }

  // Warn if CLIENT_URL is missing in production
  if (process.env.NODE_ENV === "production" && !process.env.CLIENT_URL) {
    console.error("\n❌  CLIENT_URL is required in production for CORS.\n");
    process.exit(1);
  }
};

export default validateEnv;
