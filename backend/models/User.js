const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  businessType: String,
  isVerified: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ['seller', 'buyer'],
    required: true
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
});

module.exports = mongoose.model("User", UserSchema);
