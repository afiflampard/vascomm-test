import { createUserService, listUsersService, updateUserService, getUserService, deleteUserService } from "../services/user.service.js";
import { SuccessResponse, ErrorResponse } from "../utils/response.js";

export const createUser = async (req, res) => {
  try {
    const user = await createUserService(req.body);
    return SuccessResponse(res, { data: user, message: "User created successfully" });
  } catch (err) {
    return ErrorResponse(res, { code: 400, message: err.message });
  }
};

export const listUsers = async (req, res) => {
  try {
    if(req.user.role !== 'ADMIN') {
      return ErrorResponse(res, { code: 403, message: "Forbidden: Admin access required" });
    }
    const users = await listUsersService({
      take: parseInt(req.query.limit) || 10,
      skip: (parseInt(req.query.page) - 1) * (parseInt(req.query.limit) || 10),
      search: req.query.search || null,
    });
    
    return SuccessResponse(res, { data: users, message: "Users retrieved successfully" });
  } catch (err) {
    return ErrorResponse(res, { code: 500, message: err.message });
  }
};

export const getUserByMe = async (req, res) => {
  try {
    const user = await getUserService(req.user.id);
    if (!user) {
      return ErrorResponse(res, { code: 404, message: "User not found" });
    }
    return SuccessResponse(res, { data: user, message: "User retrieved successfully" });
  } catch (err) {
    return ErrorResponse(res, { code: 500, message: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    if(req.user.role !== 'ADMIN') {
      return ErrorResponse(res, { code: 403, message: "Forbidden: Admin access required" });
    }
    const user = await getUserService(req.params.id);
    if (!user) {
      return ErrorResponse(res, { code: 404, message: "User not found" });
    }
    return SuccessResponse(res, { data: user, message: "User retrieved successfully" });
  } catch (err) {
    return ErrorResponse(res, { code: 500, message: err.message });
  }
};

export async function patchUser(req, res) {
  try {
    const user = await updateUserService(
      req.params.id,
      req.body,
      true
    );

    if (!user) return ErrorResponse(res, { code: 404, message: "User not found" });

    return SuccessResponse(res, { data: user, message: "User updated" });
  } catch (err) {
    return ErrorResponse(res, { code: 400, message: err.message });
  }
}

export async function putUser(req, res) {
  try {
    const user = await updateUserService(
      req.params.id,
      req.body,
      false
    );

    if (!user) return ErrorResponse(res, { code: 404, message: "User not found" });

    return SuccessResponse(res, { data: user, message: "User replaced" });
  } catch (err) {
    return ErrorResponse(res, { code: 400, message: err.message });
  }
}

export const deleteUser = async (req, res) => {
  try {
    if(req.user.role != 'ADMIN'){
      return ErrorResponse(res, { code: 403, message: "Forbidden: Admin access required" });
    }
    const deleted = await deleteUserService(req.params.id);
    if (!deleted) {
      return ErrorResponse(res, { code: 404, message: "User not found" });
    }
    return SuccessResponse(res, { message: "User deleted successfully" });
  } catch (err) {
    return ErrorResponse(res, { code: 500, message: err.message });
  }
};
