"use strict";
import { v4 as uuid } from "uuid";

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert("users", [
    {
      id: uuid(),
      first_name: "Admin",
      last_name: "Admin",
      email: "musyayyidinafif32@gmail.com",
      password: null,
      role: "ADMIN",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuid(),
      first_name: "User",
      last_name: "User",
      email: "afiflampard32@gmail.com",
      password: null,
      role: "USER",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("users", null, {});
}
