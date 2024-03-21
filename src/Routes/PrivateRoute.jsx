import { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { AuthContext } from "../contexts/Auth";

const PrivateRoute = ({ children }) => {
  const { user} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  
  setTimeout(() => {
    setLoading(false); 
  }, 1000);

  if (loading) {
    return <Loading />;
  }
  
  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
