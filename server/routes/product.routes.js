const express = require("express");

const router = express.Router();

const productController = require("../controllers/product.controller");

const { protect } = require("../middlewares/auth.middleware");

const authorize = require("../middlewares/role.middleware");

const validate = require("../middlewares/validate.middleware");

const upload = require("../middlewares/upload.middleware");

const {
  createProductValidator,
  updateProductValidator,
  productIdValidator,
  productQueryValidator,
} = require("../validators/product.validator");

// Create Product
router.post(
  "/",
  protect,
  authorize(["admin"]),
  upload.single("image"),
  createProductValidator,
  validate,
  productController.createProduct
);

// Get All Products
router.get(
  "/",
  productQueryValidator,
  validate,
  productController.getAllProducts
);

// Get Single Product
router.get(
  "/:id",
  productIdValidator,
  validate,
  productController.getProductById
);

// Update Product
router.put(
  "/:id",
  protect,
  authorize(["admin"]),
  upload.single("image"),
  productIdValidator,
  updateProductValidator,
  validate,
  productController.updateProduct
);

// Delete Product
router.delete(
  "/:id",
  protect,
  authorize(["admin"]),
  productIdValidator,
  validate,
  productController.deleteProduct
);

module.exports = router;

