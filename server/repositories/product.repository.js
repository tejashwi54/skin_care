const Product = require("../models/Product");

// ==============================
// Create Product
// ==============================
const createProduct = (data) =>
  Product.create(data);

// ==============================
// Get Products
// ==============================
const getProducts = (
  filter,
  options = {}
) => {
  const {
    sort = { createdAt: -1 },
    skip = 0,
    limit = 10,
  } = options;

  return Product.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();
};

// ==============================
// Count Products
// ==============================
const countProducts = (filter) =>
  Product.countDocuments(filter);

// ==============================
// Get Product By ID
// ==============================
const getProductById = (id) =>
  Product.findById(id).lean();

// ==============================
// Update Product
// ==============================
const updateProduct = (id, data) =>
  Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

// ==============================
// Delete Product
// ==============================
const deleteProduct = (id) =>
  Product.findByIdAndDelete(id);

module.exports = {
  createProduct,
  getProducts,
  countProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};