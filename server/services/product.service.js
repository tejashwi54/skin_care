const ApiError = require("../utils/ApiError");
const productRepository = require("../repositories/product.repository");

// Create Product
const createProduct = async (data) => {
  return await productRepository.createProduct(data);
};

// Get All Products (Search + Filter + Pagination + Sorting)
const getAllProducts = async (query = {}) => {
  const filter = {};

  // Search by Name, Category, Description
  if (query.search) {
    filter.$or = [
      {
        name: {
          $regex: query.search,
          $options: "i",
        },
      },
      {
        category: {
          $regex: query.search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: query.search,
          $options: "i",
        },
      },
    ];
  }

  // Category Filter
  if (query.category) {
    filter.category = {
      $regex: query.category,
      $options: "i",
    };
  }

  // Price Filter
  if (query.minPrice || query.maxPrice) {
    filter.price = {};

    if (query.minPrice) {
      filter.price.$gte = Number(query.minPrice);
    }

    if (query.maxPrice) {
      filter.price.$lte = Number(query.maxPrice);
    }
  }

  // Pagination
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 8;
  const skip = (page - 1) * limit;

  // Sorting
  const sort = query.sort || "-createdAt";

  // Fetch Products
  const products = await productRepository.getProducts(filter, {
    sort,
    skip,
    limit,
  });

  // Total Products Count
  const totalProducts = await productRepository.countProducts(filter);

  return {
    products,
    currentPage: page,
    totalPages: Math.ceil(totalProducts / limit),
    totalProducts,
    limit,
  };
};

// Get Single Product
const getProductById = async (id) => {
  const product = await productRepository.getProductById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

// Update Product
const updateProduct = async (id, data) => {
  const product = await productRepository.updateProduct(id, data);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

// Delete Product
const deleteProduct = async (id) => {
  const product = await productRepository.deleteProduct(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};