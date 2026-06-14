const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";

function setUserSession(user) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" }); // token valid for 1 hour
}

function getUserFromToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUserSession,
  getUserFromToken,
};
