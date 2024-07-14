// export default Signup;
import React, { useState } from "react";
import "./../login/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "../Form/Form.jsx";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/signup", { username, email, password })
      .then((res) => {
        alert("User is successfully registered!");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Form
      type="Signup"
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
}

export default Signup;
