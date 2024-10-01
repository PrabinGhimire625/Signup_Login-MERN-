import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';


function Navbar() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const {flag}=useContext(AuthContext)

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/isLoggedIn");
      if (response.status === 200) {
        setUser(response.data.user);
      } else {
        setUser(null);
        setMessage(response.data.message);
      }
    } catch (err) {
      console.log("Error fetching user data:", err);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/logout");
      if (response.status === 200) {
        setUser(null);
        navigate("/login");
      } else {
        setMessage(response.data.message);
      }
    } catch (err) {
      console.log("Error logging out:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [flag]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
            <Link to="/login" className="login-btn">Login</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
