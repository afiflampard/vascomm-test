"use strict";
import { v4 as uuid } from "uuid";

export async function up(queryInterface, Sequelize) {
  const [users] = await queryInterface.sequelize.query(
    `SELECT id FROM users LIMIT 1`
  );

  await queryInterface.bulkInsert("products", [
    {
      id: uuid(),
      name: "Macbook Pro",
      price: 25000000,
      user_id: users[0].id,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("products", null, {});
}
