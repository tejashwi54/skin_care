const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const productService = require("../services/product.service");

// Create Product
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

// Get All Products
const getAllProducts = asyncHandler(async (req, res) => {
  const result = await productService.getAllProducts(req.query);

  res.status(200).json(
    new ApiResponse(
      200,
      "Products fetched successfully",
      result
    )
  );
});

// Get Product By ID
const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(
    req.params.id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Product fetched successfully",
      product
    )
  );
});

// Update Product
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

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id);

  res.status(200).json(
    new ApiResponse(
      200,
      "Product deleted successfully",
      null
    )
  );
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};