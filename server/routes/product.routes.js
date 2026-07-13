const express = require("express");

const router = express.Router();

const productController = require("../controllers/product.controller");

const { protect } = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

const validate = require("../middlewares/validate.middleware");

const {
  productValidator,
} = require("../validators/product.validator");

// Public Routes
router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);

// Admin Routes
router.post(
  "/",
  protect,
  authorize("admin"),
  productValidator,
  validate,
  productController.createProduct
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  productValidator,
  validate,
  productController.updateProduct
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  productController.deleteProduct
);

module.exports = router;