
const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");
const path = require("path");

const router = express.Router();

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });
router.post("/add", upload.single("image"), async (req, res) => {
  console.log("req reached");
  try {
    console.log("Request Body:", req.body); // Debugging
    console.log("Uploaded File:", req.file); // Debugging

    const { name, description, price, category, owner } = req.body;

    if (!name || !description || !price || !category || !owner) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image: imageUrl,
      ordersCount:0,
      owner // seller ID coming from frontend
    });

    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Error adding product" });
  }
});

router.get("/", async (req, res) => {
  try {
    const baseURL = "http://localhost:5000"; // Adjust if deployed
    const products = await Product.find();
    
    // Update each product's image field
    const updatedProducts = products.map(product => ({
      ...product._doc,
      image: product.image ? `${baseURL}${product.image}` : null
    }));

    res.status(200).json(updatedProducts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

router.get("/seller/:id",async(req,res)=>{
  
  const sellerId=req.params.id;
  try {
    const products = await Product.find({ owner: sellerId });
    
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this seller." });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching seller's products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})
module.exports=router;