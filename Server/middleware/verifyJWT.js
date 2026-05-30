import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Middleware to verify JWT from the Authorization header.
 * Sets req.user with the authenticated user document.
 */
const verifyJWT = async (req, res, next) => {
  let token;

  // Extract token from "Bearer <token>" header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    const error = new Error("Authentication required. Please log in.");
    error.statusCode = 401;
    return next(error);
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user — exclude password
    const user = await User.findById(decoded.id);

    if (!user) {
      const error = new Error("User belonging to this token no longer exists.");
      error.statusCode = 401;
      return next(error);
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    // Let the global error handler deal with JsonWebTokenError / TokenExpiredError
    next(err);
  }
};

export default verifyJWT;
