import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  CircularProgress
} from "@mui/material";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${userId}/orders`)
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>My Orders</Typography>
      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <Grid container spacing={3}>
             {orders.map((product) => (
                    <Card key={product._id} sx={{ width: 300, m: 2 }}>
                        <CardMedia
                        component="img"
                        height="140"
                        // image={`http://localhost:5000/${product.image}`}
                        image={`http://localhost:5000${product.image.startsWith('/') ? product.image : `/uploads/${product.image}`}`}

                        alt={product.name}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/fallback.jpg";
                        }}
                        />
                        <CardContent>
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            ₹{product.price}
                        </Typography>
                        </CardContent>
                    </Card>
                    ))}

            
         
        </Grid>
      )}
    </Container>
  );
};

export default Orders;

