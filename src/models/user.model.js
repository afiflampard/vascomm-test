import { DataTypes, Sequelize } from "sequelize";

export default function (sequelize) {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING, allowNull: true },
      role:{
        type: DataTypes.ENUM("ADMIN", "USER"),
        defaultValue: "USER",
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
      }
    },
    {
      tableName: "users",
      timestamps: true,
      underscored: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Product, {
      foreignKey: "user_id",
      as: "products",
    });
  };

  return User;
}
