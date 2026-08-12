const Product = require("../models/Product");

const createProduct = (data) => Product.create(data);

const getProducts = (filter, options = {}) => {
  const {
    sort = "-createdAt",
    skip = 0,
    limit = 10,
  } = options;

  return Product.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();
};

const countProducts = (filter) =>
  Product.countDocuments(filter);

const getProductById = (id) =>
  Product.findById(id).lean();

const updateProduct = (id, data) =>
  Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

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
