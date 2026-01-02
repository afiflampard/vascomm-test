import { loginService, registerService } from "../services/auth.service.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.js";

export const register = async (req, res) => {
  try {
    const user = await registerService(req.body);
    SuccessResponse(res, { id: user.id, email: user.email });
  } catch (err) {
    ErrorResponse(res, { error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const token = await loginService(req.user);
    if (!token) return ErrorResponse(res, { error: "Invalid credentials" });

    SuccessResponse(res, { message: "Login successful", data: { token } });
  } catch (err) {
    ErrorResponse(res, { error: err.message });
  }
};
