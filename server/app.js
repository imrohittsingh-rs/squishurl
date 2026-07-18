import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

import urlRoute from "./routes/url.js";
import userRoute from "./routes/user.js";
import { handleGetWebsite } from "./controllers/url.js";

import rateLimit from "express-rate-limit";

const app = express();

// When running behind a proxy (like Render), trust the proxy so express
// and express-rate-limit can use the X-Forwarded-* headers correctly.
app.set("trust proxy", 1);

const PORT = process.env.PORT || 8000;
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({
    origin: corsOrigin,
    credentials: true,
}))

// MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Global Rate limiter - 100 requests per 15 min per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes"
  }
});
app.use("/api", limiter);

// Stricter rate limiter for login and registration attempts
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
      success: false,
      message: "Too many login attempts, please try again after 15 minutes"
    }
});
app.use("/api/users/login", authLimiter);
app.use("/api/users/register", authLimiter);

// Base routes
app.get("/", (req, res) => {
    return res.send("Welcome to the URL Shortener API");
})

// Public routes
app.get("/favicon.ico", (req, res) => res.status(204).end());
app.use("/api/users", userRoute);
app.get("/:shortId", handleGetWebsite);

// Private routes
app.use("/api/urls", urlRoute);

// Global Error Handler
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;