const express = require("express");
const categoryController = require("./../controllers/categoryController");
const productRouter = require("./../routes/productRoutes");
const authController = require("./../controllers/authController");

const router = express.Router();

router.use("/:categoryId/products", productRouter);

router
  .route("/")
  .get(categoryController.getAllCategory)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    categoryController.createCategory
  );

router
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    categoryController.updateCategory
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    categoryController.deleteCategory
  );

module.exports = router;
