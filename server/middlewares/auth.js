import { getUserFromToken } from "../service/auth.js";

async function authMiddleware(req, res, next) {
  const cookieName = process.env.COOKIE_NAME || "uid";
  const token = req.cookies?.[cookieName];
  if (!token) {
    return res.status(401).redirect("/login");
  }
  const user = getUserFromToken(token);
  if (!user) {
    return res.status(401).redirect("/login");
  }
  req.user = user; // Attach user info to request object for downstream use
  res.locals.user = user; // Expose user info to views
  next();
}

export default authMiddleware;