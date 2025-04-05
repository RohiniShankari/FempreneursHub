import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/LoginLanding.css'; // we'll style it here
import loginImage from "../assets/landingimage.jpeg";
export default function LoginLanding() {
  const navigate = useNavigate();

  return (
    <div className="split-container">
      <div className="left-pane">
        <img src={loginImage} alt="Login Visual" />
      </div>
      <div className="right-pane">
        <h1>Welcome to FempreneursHub</h1>
        {/* <button onClick={() => navigate('/login/seller')}>Login as Seller</button> */}
        <button  onClick={() => navigate('/login')}>Login</button>
        <button  onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  );
}
