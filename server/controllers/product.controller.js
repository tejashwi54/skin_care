const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const productService = require("../services/product.service");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

// Create Product
const createProduct = asyncHandler(async (req, res) => {
  let imageUrl = req.body.image;

  if (req.file) {
    const uploadedImage = await uploadToCloudinary(
      req.file.buffer
    );

    imageUrl = uploadedImage.secure_url;
  }

  const product = await productService.createProduct({
    ...req.body,
    image: imageUrl,
  });

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
  let productData = {
    ...req.body,
  };

  if (req.file) {
    const uploadedImage = await uploadToCloudinary(
      req.file.buffer
    );

    productData.image = uploadedImage.secure_url;
  }

  const product = await productService.updateProduct(
    req.params.id,
    productData
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