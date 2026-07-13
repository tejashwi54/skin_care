const Product = require("../models/Product");

const createProduct = (data) => Product.create(data);

const getProducts = (filter, options) => {
  return Product.find(filter)
    .sort(options.sort)
    .skip(options.skip)
    .limit(options.limit);
};

const getProductsCount = (filter) => {
  return Product.countDocuments(filter);
};

const getProductById = (id) => Product.findById(id);

const updateProduct = (id, data) =>
  Product.findByIdAndUpdate(id, data, { new: true });

const deleteProduct = (id) =>
  Product.findByIdAndDelete(id);

module.exports = {
  createProduct,
  getProducts,
  getProductsCount,
  getProductById,
  updateProduct,
  deleteProduct,
};