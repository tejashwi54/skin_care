const ApiError = require("../utils/ApiError");
const productRepository = require("../repositories/product.repository");

const {
  PRODUCT_CACHE_PREFIX,
  getCache,
  setCache,
  invalidateProductCache,
} = require("../utils/cache");

const MAX_PRODUCT_LIMIT = 50;

const parsePositiveInteger = (
  value,
  fallback,
  maximum
) => {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.min(parsed, maximum);
};

// ==============================
// Create Product
// ==============================

const createProduct = async (data) => {
  const product =
    await productRepository.createProduct(data);

  // Clear cached product listings
  await invalidateProductCache();

  return product;
};

// ==============================
// Get All Products
// Search + Filter + Pagination
// + Sorting + Redis Cache
// ==============================

const getAllProducts = async (query = {}) => {
  const filter = {};

  // ==============================
  // Search
  // ==============================

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

  // ==============================
  // Category Filter
  // ==============================

  if (query.category) {
    filter.category = {
      $regex: query.category,
      $options: "i",
    };
  }

  // ==============================
  // Price Filter
  // ==============================

  if (query.minPrice || query.maxPrice) {
    filter.price = {};

    if (query.minPrice) {
      filter.price.$gte = Number(
        query.minPrice
      );
    }

    if (query.maxPrice) {
      filter.price.$lte = Number(
        query.maxPrice
      );
    }
  }

  // ==============================
  // Pagination
  // ==============================

  const page = parsePositiveInteger(
    query.page,
    1,
    Number.MAX_SAFE_INTEGER
  );

  const limit = parsePositiveInteger(
    query.limit,
    8,
    MAX_PRODUCT_LIMIT
  );

  const skip = (page - 1) * limit;

  // ==============================
  // Sorting
  // ==============================

  const sort =
    query.sort || "-createdAt";

  // ==============================
  // Redis Cache Key
  // ==============================

  const cacheKey =
    `${PRODUCT_CACHE_PREFIX}${JSON.stringify({
      search: query.search || "",
      category: query.category || "",
      minPrice: query.minPrice || "",
      maxPrice: query.maxPrice || "",
      page,
      limit,
      sort,
    })}`;

  // ==============================
  // Check Redis Cache
  // ==============================

  const cachedResult =
    await getCache(cacheKey);

  if (cachedResult) {
    return JSON.parse(cachedResult);
  }

  // ==============================
  // Fetch From MongoDB
  // ==============================

  const [
    products,
    totalItems,
  ] = await Promise.all([
    productRepository.getProducts(
      filter,
      {
        sort,
        skip,
        limit,
      }
    ),

    productRepository.countProducts(
      filter
    ),
  ]);

  // ==============================
  // Prepare Result
  // ==============================

  const result = {
    products,
    currentPage: page,
    totalPages: Math.ceil(
      totalItems / limit
    ),
    totalItems,
    totalProducts: totalItems,
    limit,
  };

  // ==============================
  // Save Result In Redis
  // TTL = 5 Minutes
  // ==============================

  await setCache(
    cacheKey,
    result,
    300
  );

  return result;
};

// ==============================
// Get Single Product
// ==============================

const getProductById = async (id) => {
  const product =
    await productRepository.getProductById(id);

  if (!product) {
    throw new ApiError(
      404,
      "Product not found"
    );
  }

  return product;
};

// ==============================
// Update Product
// ==============================

const updateProduct = async (
  id,
  data
) => {
  const product =
    await productRepository.updateProduct(
      id,
      data
    );

  if (!product) {
    throw new ApiError(
      404,
      "Product not found"
    );
  }

  // Clear cached product listings
  await invalidateProductCache();

  return product;
};

// ==============================
// Delete Product
// ==============================

const deleteProduct = async (id) => {
  const product =
    await productRepository.deleteProduct(
      id
    );

  if (!product) {
    throw new ApiError(
      404,
      "Product not found"
    );
  }

  // Clear cached product listings
  await invalidateProductCache();

  return product;
};

// ==============================
// Exports
// ==============================

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};