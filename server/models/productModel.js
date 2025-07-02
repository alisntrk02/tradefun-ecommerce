const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    image: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    countInStock: { type: Number, default: 0, required: true },
    rating: {
      type: Number,
      default: () => parseFloat((Math.random() * 4 + 1).toFixed(1)),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
