const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

const multer = require("multer");
dotenv.config();
 connectDB();
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");


const app = express();

app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/msmeApp",
      collectionName: "sessions",
    }),
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }, // 1-day session
  })
);
app.use("/uploads", express.static("uploads"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/api/auth", authRoutes);


app.use("/api/users",userRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
