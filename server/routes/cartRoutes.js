const express = require("express");
const cartController = require("../controllers/cartController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.get("/", cartController.getCart);
router.post("/", cartController.addToCart);
router.delete("/item", cartController.removeFromCart);
router.delete("/", cartController.clearCart);

module.exports = router;
