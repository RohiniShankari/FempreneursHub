
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    window.location.reload(); // Refresh page to update UI
  };

  return (
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h3" gutterBottom>Welcome to Fempreneurs</Typography>
      <Typography variant="h5" gutterBottom>Empowering Women Entrepreneurs</Typography>

    </Container>
  );
};

export default HomePage;
