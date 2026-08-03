const ApiError = require("../utils/ApiError");
const productRepository = require("../repositories/product.repository");

<<<<<<< HEAD
// ==============================
// Create Product
// ==============================
=======
// Create Product
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
const createProduct = async (data) => {
  return await productRepository.createProduct(data);
};

<<<<<<< HEAD
// ==============================
// Get All Products
// ==============================
const getAllProducts = async (query = {}) => {
  const filter = {};

  // Search
=======
// Get All Products (Search + Filter + Pagination + Sorting)
const getAllProducts = async (query = {}) => {
  const filter = {};

  // Search by Name, Category, Description
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
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

<<<<<<< HEAD
  // Category
=======
  // Category Filter
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
  if (query.category) {
    filter.category = {
      $regex: query.category,
      $options: "i",
    };
  }

<<<<<<< HEAD
  // Price
=======
  // Price Filter
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
  if (query.minPrice || query.maxPrice) {
    filter.price = {};

    if (query.minPrice) {
      filter.price.$gte = Number(query.minPrice);
    }

    if (query.maxPrice) {
      filter.price.$lte = Number(query.maxPrice);
    }
  }

<<<<<<< HEAD
  // Rating
  if (query.rating) {
    filter.rating = {
      $gte: Number(query.rating),
    };
  }

  // Pagination
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(
    Math.max(Number(query.limit) || 8, 1),
    50
  );

  const skip = (page - 1) * limit;

  // Sorting
  let sort = { createdAt: -1 };

  switch (query.sort) {
    case "priceLow":
      sort = { price: 1 };
      break;

    case "priceHigh":
      sort = { price: -1 };
      break;

    case "popular":
      sort = { reviews: -1 };
      break;

    case "rating":
      sort = { rating: -1 };
      break;

    case "latest":
    default:
      sort = { createdAt: -1 };
  }

  // Fetch
  const products = await productRepository.getProducts(
    filter,
    {
      sort,
      skip,
      limit,
    }
  );

  const totalProducts =
    await productRepository.countProducts(filter);

  return {
    products,
    pagination: {
      page,
      limit,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      hasNextPage:
        page < Math.ceil(totalProducts / limit),
      hasPrevPage: page > 1,
    },
  };
};

// ==============================
// Get Product By ID
// ==============================
const getProductById = async (id) => {
  const product =
    await productRepository.getProductById(id);
=======
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
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

<<<<<<< HEAD
// ==============================
// Update Product
// ==============================
const updateProduct = async (id, data) => {
  const product =
    await productRepository.updateProduct(id, data);
=======
// Update Product
const updateProduct = async (id, data) => {
  const product = await productRepository.updateProduct(id, data);
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

<<<<<<< HEAD
// ==============================
// Delete Product
// ==============================
const deleteProduct = async (id) => {
  const product =
    await productRepository.deleteProduct(id);
=======
// Delete Product
const deleteProduct = async (id) => {
  const product = await productRepository.deleteProduct(id);
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df

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