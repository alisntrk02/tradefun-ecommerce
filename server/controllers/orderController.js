const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Order = require("./../models/orderModel");
const factory = require("./handlerFactory");

exports.getMyOrders = catchAsync(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });

  res.status(200).json({
    status: "success",
    data: {
      data: order,
    },
  });
});

exports.getOrderForUser = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user");

  if (!order) {
    return next(new AppError("No order found with that ID", 404));
  }

  if (
    order.user._id.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(
      new AppError("You do not have permission to view this order.", 403)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      data: order,
    },
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return next(new AppError("No order items", 400));
  }

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid: true,
    paidAt: Date.now(),
    paymentResult: {
      id: "demo_payment_id_123",
      status: "COMPLETED",
      update_time: new Date(),
      email_address: req.user.email,
    },
    isDelivered: false,
    deliveredAt: Date.now(),
  });

  setTimeout(async () => {
    try {
      const updatedOrder = await Order.findById(order._id);
      if (updatedOrder) {
        updatedOrder.isDelivered = true;
        updatedOrder.deliveredAt = Date.now();
        await updatedOrder.save();
        console.log(`Order ${order._id} marked as delivered.`);
      }
    } catch (err) {
      console.error("Error updating delivery status:", err);
    }
  }, 30 * 1000);

  res.status(201).json({ status: "success", data: { order } });
});

exports.getAllOrder = factory.getAll(Order);
exports.getOrder = factory.getOne(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
