export const up = async (queryInterface, Sequelize) => {
    await queryInterface.createTable("products", {
      id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("NOW()"),
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("NOW()"),
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    })
}

export const down = async (queryInterface) => {
  await queryInterface.dropTable("products");
}