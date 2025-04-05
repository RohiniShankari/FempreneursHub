import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sellerId = localStorage.getItem('id');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/seller/${sellerId}`);
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sellerId]);

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        My Products
      </Typography>
      {products.length === 0 ? (
        <Typography>No products found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="180"
                  image={`http://localhost:5000${product.image}`}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">orders count:{product.ordersCount}</Typography>
                  <Typography variant="body2">{product.description}</Typography>
                  <Typography variant="subtitle1">₹{product.price}</Typography>
                  <Typography variant="caption">Category: {product.category}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ViewProducts;
