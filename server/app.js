import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

import urlRoute from "./routes/url.js";
import userRoute from "./routes/user.js";
import { handleGetWebsite } from "./controllers/url.js";

const app = express();

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

// Public routes
app.use("/api/user", userRoute);
app.get("/api/:shortId", handleGetWebsite);

// Global Error Handler
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;