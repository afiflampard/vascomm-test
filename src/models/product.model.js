import { DataTypes, Sequelize } from "sequelize";

export default function (sequelize){
    const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      tableName: "products",
      underscored: true,
      paranoid: true,
      deletedAt: "deleted_at",
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  return Product;
}