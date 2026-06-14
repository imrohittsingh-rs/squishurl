const { getUserFromToken } = require("../service/auth");

async function authMiddleware(req, res, next) {
  const token  = req.cookies?.uid;
  if(!token) {
    return res.status(401).redirect("/login");
  }
  const user = getUserFromToken(token);
  if (!user) {
    return res.status(401).redirect("/login");
  }
  req.user = user; // Attach user info to request object for downstream use
  next();
}

module.exports = authMiddleware;