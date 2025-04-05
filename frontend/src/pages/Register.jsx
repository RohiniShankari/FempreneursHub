
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Alert, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", businessType: "", role: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>Register</Typography>

      {successMessage ? (
        <>
          <Alert severity="success">{successMessage}</Alert>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            sx={{ marginTop: 2 }}
          >
            Go to Login
          </Button>
        </>
      ) : (
        <>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField fullWidth margin="normal" label="Name" name="name" onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Email" name="email" type="email" onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Password" name="password" type="password" onChange={handleChange} required />

            <FormControl fullWidth margin="normal" required>
              <InputLabel>Role</InputLabel>
              <Select name="role" value={formData.role} onChange={handleChange}>
                <MenuItem value="seller">Seller</MenuItem>
                <MenuItem value="buyer">Buyer</MenuItem>
              </Select>
            </FormControl>

            {/* Show Business Type only if role is seller */}
            {formData.role === "seller" && (
              <TextField
                fullWidth
                margin="normal"
                label="Business Type"
                name="businessType"
                onChange={handleChange}
                required
              />
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
              Register
            </Button>
          </form>
        </>
      )}
    </Container>
  );
};

export default Register;
