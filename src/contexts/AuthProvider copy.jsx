import axios from "axios";
import { createContext, useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/v1/";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const register = (username, email, password) => {
    return axios.post(API_URL + "users/process-register", {
      username,
      email,
      password,
    });
  };

  const login = (userLoginData) => {
    setLoading(true);
    return axios
      .post(API_URL + "auth/login", userLoginData)
      .then((response) => {
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch((error)=>{
        console.log(error)
        setLoading(false)
      })
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataFromLocalStorage = JSON.parse(
          localStorage.getItem("user")
        );
        const data = userDataFromLocalStorage?.payload.userWithoutPassword;
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const authInfo = {
    user,
    register,
    login,
    logout,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
