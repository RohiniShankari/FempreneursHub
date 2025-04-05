

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct";
// import ViewProducts from "./pages/ViewProducts";
import LoginLanding from "./pages/LoginLanding";
import BuyerHome from "./pages/BuyerHome";
import SellerHome from "./pages/SellerHome";
import CartPage from "./pages/CartPage";

import "./App.css";
function App() {


  // Check if user is logged in on page refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    
    <Routes>
      
      <Route path="/" element={<LoginLanding />} />
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/home/buyer" element={<BuyerHome/>}/>
      <Route path="/home/seller" element={<SellerHome/>}/>
      <Route path="/register" element={<Register />} />
      
      {/* <Route path="/home/seller/:id/viewProducts" element={<ViewProducts />} /> */}
      <Route path="/:id/cart" element={<CartPage />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/home/seller/:id/products" element={<AddProduct/>}/>
    </Routes>
    
  );
}

export default App;
//{/* <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} /> */}

