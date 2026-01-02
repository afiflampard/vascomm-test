import jwt from "jsonwebtoken";
import config from "../config/index.js";

export function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Missing token" });

  const token = header.split(" ")[1];

  try {
    const decodeToken = jwt.verify(token, config.jwtSecret)
    req.user = {
      id: decodeToken.id,
      email: decodeToken.email,
      role: decodeToken.role
    }

    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
