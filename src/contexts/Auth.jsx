import axios from "axios";
import { createContext, useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/v1/";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser]  = useState(null)

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
    localStorage.removeItem("user"); 
  };

  const getCurrentUser = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const user = userData?.payload.userWithoutPassword;
    return user;
  };

  useEffect(()=>{
    const currentUser = getCurrentUser();
    setUser(currentUser);
  },[])

  const authInfo = {
    user,
    register,
    login,
    logout,
    loading,
    setLoading
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
