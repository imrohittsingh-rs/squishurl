import jwt from "jsonwebtoken";
const SECRET_KEY = "your_secret_key";

export function setUserSession(user) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
}

export function getUserFromToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}
