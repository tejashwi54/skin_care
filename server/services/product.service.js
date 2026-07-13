const ApiError = require("../utils/ApiError");
const productRepository = require("../repositories/product.repository");

const getProducts = async (query) => {

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const filter = {
    isActive: true,
  };

  if (query.category) {
    filter.category = query.category;
  }

  if (query.search) {
    filter.name = {
      $regex: query.search,
      $options: "i",
    };
  }

  let sort = {
    createdAt: -1,
  };

  if (query.sort === "low") {
    sort = { price: 1 };
  }

  if (query.sort === "high") {
    sort = { price: -1 };
  }

  if (query.sort === "rating") {
    sort = { rating: -1 };
  }

  const products =
    await productRepository.getProducts(filter, {
      sort,
      skip,
      limit,
    });

  const total =
    await productRepository.getProductsCount(filter);

  return {
    products,
    page,
    totalPages: Math.ceil(total / limit),
    totalProducts: total,
  };
};

const getProduct = async (id) => {
  const product =
    await productRepository.getProductById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

const createProduct = async (data) => {
  return productRepository.createProduct(data);
};

const updateProduct = async (id, data) => {
  const product = await productRepository.updateProduct(id, data);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

const deleteProduct = async (id) => {
  const product = await productRepository.deleteProduct(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};