const Product = require("../models/Product");

<<<<<<< HEAD
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
=======
const createProduct = (data) => Product.create(data);

const getProducts = (filter, options = {}) => {
  const {
    sort = "-createdAt",
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
    skip = 0,
    limit = 10,
  } = options;

  return Product.find(filter)
    .sort(sort)
    .skip(skip)
<<<<<<< HEAD
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
=======
    .limit(limit);
};

const countProducts = (filter) =>
  Product.countDocuments(filter);

const getProductById = (id) =>
  Product.findById(id);

>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
const updateProduct = (id, data) =>
  Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

<<<<<<< HEAD
// ==============================
// Delete Product
// ==============================
=======
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
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