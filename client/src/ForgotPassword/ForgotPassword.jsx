import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import "../login/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Assuming you are using React Router for navigation

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/forgotPassword", { email })
      .then((res) => {
        if (res.data.status) {
          alert("Check your email for reset password link!");
          navigate("/login");
        } else {
          alert("Failed to send reset link. Please try again.");
        }m
      })
      .catch((err) => {
        console.log("Error:", err);
        alert("Failed to send reset link. Please try again later.");
      });
  };

  return (
    <div className="container">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Forgot Password</h1>
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
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
