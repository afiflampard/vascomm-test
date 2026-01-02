import {v4 as uuid} from "uuid"; 
import db from "../models/index.js";
import { ValidationUserCreate } from "../validation/user_validation.validation.js";
import { password } from "bun";
const User = db.User;

const ALLOWED_FIELDS = [
  "first_name",
  "last_name",
  "email",
  "password",
];

export async function createUserService(data) {
  try {
    ValidationUserCreate(data);
    const getUserByEmail = await getUserByEmailService(data.email);
    if(getUserByEmail){
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }
    return await User.create({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    });
  } catch (error) {
    throw error;
  }
  
}

export async function listUsersService({take, skip, search}) {
  const limit = parseInt(take) || 10;
  const offset = parseInt(skip) || 0;
  const where = {};
  
  if (search) {
    where.name = { [Op.iLike]: `%${search}%` };
  };

  
  const { rows, count } = await User.findAndCountAll({
    limit,
    offset,
    where,
    order: [["created_at", "DESC"]],
  });
  return { users: rows, total: count };
}

export async function getUserService(id) {
  return await User.findByPk(id, {
    attributes: {
      exclude: ["password"]
    }
  });
}

export async function updateUserService(id, data, isPatch = false) {
  const filteredData = {};
  for (const key of ALLOWED_FIELDS) {
    if (isPatch) {
      if (data[key] !== undefined) filteredData[key] = data[key];
    } else {
      filteredData[key] = data[key] ?? null;
    }
  }
  
  const [updated] = await User.update(filteredData, { where: { id } });
  if (!updated) {
    return null;
  }
  return await User.findByPk(id, {
    attributes: {
      exclude: ["password"]
    }
  });
}

export async function deleteUserService(id) {
  return await User.destroy({ where: { id } });
}

export async function getUserByEmailService(email) {
  return await User.findOne({ where: { email } });
}