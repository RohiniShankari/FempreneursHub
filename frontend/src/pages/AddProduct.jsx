import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image: null,
    sellerId: localStorage.getItem('id'),
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("category", formData.category);
    form.append("price", formData.price);
    form.append("owner", formData.sellerId); // your backend expects this as `owner`
    form.append("image", formData.image); // actual file
//https://rohinishankari-fempreneurshub-backend.onrender.com
    try {
     await axios.post("http://localhost:5000/api/products/add", form, {
        // await axios.post("https://rohinishankari-fempreneurshub-backend.onrender.com/api/products/add", form, {
         headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product added successfully!");
      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        image: null,
        sellerId: localStorage.getItem('id'),
      });
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      alert("Failed to add product.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Add New Product
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            required
          />
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <TextField
            label="Price (in ₹)"
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            required
          />
          <Button variant="outlined" component="label">
            Upload Image
            <input type="file" name="image" accept="image/*" hidden onChange={handleImageChange} />
          </Button>

          {imagePreview && (
            <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', borderRadius: 8 }} />
          )}

          <Button type="submit" variant="contained" sx={{ backgroundColor: '#e91e63' }}>
            Add Product
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddProduct;
