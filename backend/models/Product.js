const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  ordersCount:Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  image: String,
});
//owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
module.exports = mongoose.model("Product", ProductSchema);
