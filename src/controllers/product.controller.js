import { SuccessResponse, ErrorResponse } from "../utils/response.js";
import { 
    createProductService, 
    createBulkProductService, 
    listProductsService, 
    getProductService, 
    updateProductService, 
    deleteProductService 
} from "../services/product.service.js";

export const createProduct = async (req, res) => {
  try {
    const userID = req.user.id;
    const product = await createProductService(req.body, userID);
    return SuccessResponse(res, { data: product, message: "Product created successfully" });
  } catch (err) {
    return ErrorResponse(res, { code: 400, message: err.message });
  }
};

export const createProductBulk = async (req, res) => {
    try {
        const userID = req.user.id;
        const productBulk = await createBulkProductService(req.body, userID);
        return SuccessResponse(res, { data: productBulk, message: "Products created successfully" });
    } catch (error) {
        return ErrorResponse(res, { code: 400, message: error.message });
    }
}

export const listProducts = async (req, res) => {
  try {
    const productList = await listProductsService({
      take: parseInt(req.query.limit) || 10,
      skip: (parseInt(req.query.page) - 1) * (parseInt(req.query.limit) || 10),
      search: req.query.search || null,
    });
    return SuccessResponse(res, { data: productList, message: "Products listed successfully" });
  } catch (err) {
    return ErrorResponse(res, { code: 500, message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await getProductService(req.params.id);
    if (!product) {
      return ErrorResponse(res, { code: 404, message: "Product not found" });
    }
    return SuccessResponse(res, { data: product, message: "Product retrieved successfully" });
  } catch (err) {
    return ErrorResponse(res, { code: 500, message: err.message });
  }
};

export const updateProductPut = async (req, res) => {
  try {
    const product = await updateProductService(req.params.id, req.body, false);
    if (!product) {
      return ErrorResponse(res, { code: 404, message: "Product not found" });
    }
    return SuccessResponse(res, { data: product, message: "Product updated successfully" });
  } catch (err) {
    return ErrorResponse(res, { code: 400, message: err.message });
  }
};


export const updateProductPatch = async (req, res) => {
  try {
    const product = await updateProductService(req.params.id, req.body, true);
    if (!product) {
      return ErrorResponse(res, { code: 404, message: "Product not found" });
    }
    return SuccessResponse(res, { data: product, message: "Product updated successfully" });
  } catch (err) {
    return ErrorResponse(res, { code: 400, message: err.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const deleted = await deleteProductService(req.params.id);
    if (!deleted) {
      return ErrorResponse(res, { code: 404, message: "Product not found" });
    }
    return SuccessResponse(res, { message: "Product deleted successfully" });
  } catch (err) {
    return ErrorResponse(res, { code: 500, message: err.message });
  }
};


