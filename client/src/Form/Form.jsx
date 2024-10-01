import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

import "./../login/login.css";
// import { AuthContext } from "../context/AuthContext.jsx";


function Form({ type, username, setUsername, email, setEmail, password, setPassword, handleSubmit }) {
  // const {flag}=useContext(AuthContext)
  return (
    <div className="container">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>{type}</h1>
          {type === "Signup" && (
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FaUser className="icon" />
            </div>
          )}

          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MdEmail className="icon" />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox"/>
              Remember me
            </label>
            <Link to="/forgotPassword">Forgot Password?</Link>
          </div>

          {/* display signup button for register and login button for login */}
          {type === "Signup" ? (
            <button type="submit">Signup</button>
          ) : (
            <button type="submit">Login</button>
          )}

          <div className="register-link">
            {type === "Signup" ? (
              <Link to="/login" className="signup-btn">
                Already have an account? Login
              </Link>
            ) : (
              <Link to="/signup" className="signup-btn">
                Don't have an account? Signup
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
