import db from "../models/index.js";
import { Op } from "sequelize";
const Product = db.Product;

const ALLOWED_FIELDS = [
  "name",
  "description",
  "price",
];

export async function createBulkProductService(data, userID) {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Data must be a non-empty array");
  }

  const payload = data.map((item) => {
    if (!item.name) throw new Error("Product name is required");

    return {
      name: item.name,
      description: item.description || null,
      price: item.price || 0,
      user_id: userID
    };
  });

  const result = await db.Product.bulkCreate(payload, {
    validate: true,
    returning: true,
  });

  return result;
}

export async function createProductService(data, userID) {
    return await Product.create({ ...data, user_id: userID });
}

export async function listProductsService({ take, skip, search }) {
    const limit = parseInt(take) || 10;
    const offset = parseInt(skip) || 0;
    const where = {};

    if (search) {
        where[Op.or] = [
            { name: { [Op.iLike]: `%${search}%` } },
            { description: { [Op.iLike]: `%${search}%` } },
        ];
    }
    
    const { rows, count} = await Product.findAndCountAll({
        limit,
        offset,
        where,
        order: [["created_at", "DESC"]],
    });

    return { data: rows, count };
}

export async function getProductService(id) {
    return await Product.findByPk(id);
}

export async function updateProductService(id, data, isPatch = false) {
    const filteredData = {};
    for (const key of ALLOWED_FIELDS) {
        if (isPatch) {
            if (data[key] !== undefined) filteredData[key] = data[key];
        } else {
            filteredData[key] = data[key] ?? null;
        }
    }
    const [updated] = await Product.update(filteredData, { where: { id } });
    if (!updated) {
        return null;
    }
    return await Product.findByPk(id);
}

export async function deleteProductService(id) {
   return await Product.destroy({ where: { id } });
}
