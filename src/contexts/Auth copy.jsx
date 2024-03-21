import axios from "axios";
import { createContext, useState } from "react";

const API_URL = "http://localhost:5000/api/v1/";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const register = (username, email, password) => {
    setLoading(true);
    return axios.post(API_URL + "users/process-register", {
      username,
      email,
      password,
    })
      .finally(() => setLoading(false)); 
  };

  const login = (userLoginData) => {
    setLoading(true); 
    return axios.post(API_URL + "auth/login", userLoginData)
      .then((response) => {
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .finally(() => setLoading(false));
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("user");
    setLoading(false); 
    const message = "Logged out successfully!";
    console.log("hello");
    return message;
  };

  const getCurrentUser = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const user = userData?.payload.userWithoutPassword;
    return user;
  };

  const authInfo = {
    register,
    login,
    logout,
    getCurrentUser,
    loading,
    setLoading
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
