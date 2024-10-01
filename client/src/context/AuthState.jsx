import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const AuthState = (props) => {
  const [user, setUser] = useState("");
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    // Check if user is logged in by verifying the token
    axios
      .get('http://localhost:3000/auth/profile', { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.data);
        }
      })
      .catch(() => {
        setUser("");
      });
  }, [flag]);

  const login = (userData) => {
    setUser(userData);
    setFlag(flag + 1); // Increment flag to re-render
  };

  // logout
  const logout = () => {
    axios
      .post('http://localhost:3000/auth/logout', {}, { withCredentials: true })
      .then(() => {
        setUser("");
        setFlag(flag + 1); // Increment flag to re-render
      })
      .catch((err) => {
        console.log("Error during logout:", err);
      });
  };

  return (
    <AuthContext.Provider value={{user, setUser, flag, setFlag}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
