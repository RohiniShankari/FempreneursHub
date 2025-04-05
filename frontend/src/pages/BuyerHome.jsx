import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Container,
  Box,
  CircularProgress
} from "@mui/material";
import "../styling/BuyerHome.css";

const BuyerHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});
  
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  const handleOrder = async (productId) => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      alert("User not logged in");
      return;
    }
    
    try {
      const res = await axios.post(`http://localhost:5000/api/users/${userId}/order`, {
        productIds: [productId]  // 👈 Send as array
      });
      alert("Order placed successfully!");
      console.log("Ordered products:", res.data.orders);
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order.");
    }
  };
  
  const handleCart = () => {
    const id = localStorage.getItem("id"); // No need for JSON.parse
    if (id) {
      window.location.href = `/${id}/cart`; // 🔁 Redirect to user-specific route
    } else {
      console.error("User ID not found in localStorage.");
    }
  };

  const handleImageError = (productId) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <AppBar position="static" className="navbar" >
        <Toolbar className="navbar-toolbar">
          <Typography variant="h6">FempreneursHub</Typography>
          
          <Box className="navbar-buttons">
            <Button color="inherit" onClick={handleCart}>Cart</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container className="product-container"  maxWidth={false} // Remove default max-width constraints
  >
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card className="product-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ 
                  height: 220,
                  width:280,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f5f5f5',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  {product.image && !imageErrors[product._id] ? (
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      onError={() => handleImageError(product._id)}
                      sx={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'contain',
                        position: 'absolute'
                      }}
                    />
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No Image Available
                    </Typography>
                  )}
                </Box>
                
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    mb: 1
                  }}>
                    {product.description}
                  </Typography>
                  <Typography variant="subtitle1" color="error">
                    ₹{product.price}
                  </Typography>
                  <Typography variant="caption" color="success.main">
                    Category: {product.category}
                  </Typography>
                </CardContent>
                
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Button variant="contained" size="small"  onClick={() => handleOrder(product._id)}>
                    Add to cart
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default BuyerHome;