const Product = require("./../models/productModel");
const factory = require("./handlerFactory");
const catchAsync = require("./../utils/catchAsync");

exports.getFeaturedProducts = catchAsync(async (req, res, next) => {
  const products = await Product.aggregate([{ $sample: { size: 30 } }]);

  res.status(200).json({
    status: "success",
    results: products.length,
    data: products,
  });
});

exports.getPopularProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find().sort({ rating: -1 }).limit(8);

  res.status(200).json({
    status: "success",
    results: products.length,
    data: products,
  });
});

exports.getNewArrivals = catchAsync(async (req, res, next) => {
  const products = await Product.find().sort({ createdAt: -1 }).limit(8);

  res.status(200).json({
    status: "success",
    data: products,
  });
});

exports.getAllProducts = factory.getAll(Product, "category");
exports.getProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
