export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable("users", {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("NOW()"),
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("NOW()"),
    },
    deleted_at: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    role: {
      type: Sequelize.ENUM("ADMIN", "USER"),
      allowNull: false,
      defaultValue: "USER",
    },
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable("users");
  await queryInterface.sequelize.query(
    'DROP TYPE IF EXISTS "enum_Users_role";'
  );
};
