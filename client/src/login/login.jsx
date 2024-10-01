import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "../Form/Form.jsx";
import "./../login/login.css";
import { AuthContext } from "../context/AuthContext.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {setUser,flag,setFlag} = useContext(AuthContext)

  axios.defaults.withCredentials = true;   // ensures that cookies are included with every Axios request.allows you to parse and access cookies sent in HTTP requests.

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/login", { email, password })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data === "visitor") {
            console.log("Response data:", res.data);
            setUser(res.data.data)
            setFlag(flag+1)
            navigate("/profile");
          } else {
            navigate("/dashboard");
          }
        }
      })
      .catch((err) => console.log("Error:", err));
  };

  return (
    <Form
      type="Login"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
}

export default Login;
