const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const productRouter = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const userRouter = require("./routes/userRoutes");
const cartRouter = require("./routes/cartRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/categorys", categoryRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cart", cartRouter);

module.exports = app;
