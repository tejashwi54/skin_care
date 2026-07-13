const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const productService = require("../services/product.service");

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.getProducts(req.query);

  res.status(200).json(
    new ApiResponse(
      200,
      "Products fetched successfully",
      products
    )
  );
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProduct(req.params.id);

  res.status(200).json(
    new ApiResponse(
      200,
      "Product fetched successfully",
      product
    )
  );
});

const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body);

  res.status(201).json(
    new ApiResponse(
      201,
      "Product created successfully",
      product
    )
  );
});

const updateProduct = asyncHandler(async (req, res) => {

  const product = await productService.updateProduct(
    req.params.id,
    req.body
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Product updated successfully",
      product
    )
  );

});

const deleteProduct = asyncHandler(async (req, res) => {

  await productService.deleteProduct(req.params.id);

  res.status(200).json(
    new ApiResponse(
      200,
      "Product deleted successfully"
    )
  );

});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};