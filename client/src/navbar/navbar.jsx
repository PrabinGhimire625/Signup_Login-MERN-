import React, { useState } from "react";
import "./Navbar.css";
import Home from "./../Home/Home";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div>
        <nav className="navbar">
          <div className="navbar-left">
            <a href="#home">Home</a>
            <a href="#products">Products</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="navbar-right">
            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
            <Link to="/login" className="login-btn">
              Login
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
