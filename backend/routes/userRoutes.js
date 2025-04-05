// routes/userRoutes.js or similar

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
// routes/users.js
router.get("/others/:id", async (req, res) => {
  try {
    const currentUserId = req.params.id;
    console.log(currentUserId);
    const otherSellers = await User.find({ _id: { $ne: currentUserId }, role: 'seller' }); // assuming role field
     console.log(otherSellers);

    res.json(otherSellers);
  } catch (error) {
    console.error("Error fetching other sellers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Place an order (add product ID to user.orders)
router.post("/:id/order", async (req, res) => {
  
  const userId = req.params.id;
  const { productIds } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Add the new productIds to user's orders array (avoid duplicates)
    productIds.forEach((pid) => {
      if (!user.orders.includes(pid)) {
        user.orders.push(pid);
      }
    });
    
    await user.save();
    for (const pid of productIds) {
     
        await Product.findByIdAndUpdate(pid, { $inc: { ordersCount: 1 } });
      
    }
    
    // Populate orders and send product details back
    const updatedUser = await User.findById(userId).populate("orders");
    res.json({ message: "Order placed", orders: updatedUser.orders });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// In routes/userRoutes.js or similar
router.get("/:id/orders", async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate("orders");
      console.log("backend orders"+user.orders);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
module.exports = router;
