// Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import './Navbar.css';

function Navbar() {
  const { user, logout, flag, setFlag} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setFlag(flag+1)
  };

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
            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
            <Link to="/login" className="login-btn">
              Login
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
