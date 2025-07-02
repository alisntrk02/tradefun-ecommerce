const express = require("express");
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.get("/myorders", orderController.getMyOrders);

router.post("/", orderController.createOrder);

router.get("/:id", orderController.getOrderForUser);

router.use(authController.restrictTo("admin"));

router.get("/", orderController.getAllOrder);

router.patch("/:id", orderController.updateOrder);

router.delete("/:id", orderController.deleteOrder);

module.exports = router;
