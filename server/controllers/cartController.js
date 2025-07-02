const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );

  res.status(200).json({
    status: "success",
    data: {
      cart: cart || { user: req.user._id, items: [] },
    },
  });
});

exports.addToCart = catchAsync(async (req, res, next) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return next(new AppError("Product ID is required", 400));
  }

  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  if (quantity > product.countInStock) {
    return next(new AppError("Not enough stock available", 400));
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [{ product: productId, quantity }],
    });
  } else {
    const existingItem = cart.items.find((item) =>
      item.product.equals(productId)
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity > product.countInStock) {
        return next(new AppError("Not enough stock available", 400));
      }

      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
  }

  await cart.populate("items.product");

  res.status(200).json({
    status: "success",
    data: { cart },
  });
});

exports.removeFromCart = catchAsync(async (req, res, next) => {
  const { productId } = req.body;

  if (!productId) {
    return next(new AppError("Product ID is required", 400));
  }

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  cart.items = cart.items.filter((item) => !item.product.equals(productId));

  await cart.save();
  await cart.populate("items.product");

  res.status(200).json({
    status: "success",
    data: { cart },
  });
});

exports.clearCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { items: [] },
    { new: true }
  );

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { cart },
  });
});
