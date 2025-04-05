const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, businessType,role } = req.body;
  console.log(req.body);
  try {
    const user = await User.create({ name, email, password, businessType,role });
    res.status(201).json({ message: "User registered", userId: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ error: "User not found" });

  // ❌ Direct password comparison (No hashing)
  if (user.password !== password) return res.status(401).json({ error: "Invalid credentials" });

  // 🔹 Store user session
  req.session.user = { id: user._id, name: user.name, businessType: user.businessType };
  res.json({ message: "Login successful", role: user.role ,email:email,id:user._id,name:user.name});
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logout successful" });
  });
});

// 🔹 Route to check if user is logged in
router.get("/me", (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: "Not authenticated" });
  res.json({ user: req.session.user });
});

module.exports = router;






// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const router = express.Router();

// router.post("/register", async (req, res) => {
//   const { name, email, password, businessType } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   try {
//     const user = await User.create({ name, email, password: hashedPassword, businessType });
//     res.status(201).json({ message: "User registered", userId: user._id });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(404).json({ error: "User not found" });

//   const isValid = await bcrypt.compare(password, user.password);
//   if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

//   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
//   res.json({ token, userId: user._id });
// });

// module.exports = router;
