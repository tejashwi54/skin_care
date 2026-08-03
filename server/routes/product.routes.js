const express = require("express");

const router = express.Router();

const productController = require("../controllers/product.controller");

const { protect } = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  productValidator,
} = require("../validators/product.validator");

// Create Product
router.post(
  "/",
  protect,
  authorize("admin"),
  productValidator,
  validate,
  productController.createProduct
);

// Get All Products
router.get(
  "/",
  productController.getAllProducts
);

// Get Product By ID
router.get(
  "/:id",
  productController.getProductById
);

// Update Product
router.put(
  "/:id",
  protect,
  authorize("admin"),
  productValidator,
  validate,
  productController.updateProduct
);

// Delete Product
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  productController.deleteProduct
);

module.exports = router;