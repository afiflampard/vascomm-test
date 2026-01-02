import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { ErrorResponse } from "../utils/response.js";

export function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return ErrorResponse(res, {code: 401, message: "Missing token", errors: null});

  const token = header.split(" ")[1];

  try {
    const decodeToken = jwt.verify(token, config.jwtSecret)
    req.user = {
      id: decodeToken.id,
      email: decodeToken.email,
      role: decodeToken.role
    }

    next();
  } catch(e) {
    return ErrorResponse(res, {code: 401, message: "Invalid token", errors: null, error: e.message});
  }
}
