import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const ActivateUser = () => {
  const { activationToken } = useParams();
  const [loading, setLoading] = useState(true); 
  const [message, setMessage] = useState("");

  useEffect(() => {
    const activateUser = async () => {
      try {
        setMessage("");
        setLoading(true);
        const response = await axios.post("http://localhost:5000/api/v1/users/activate", { token: activationToken });
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    activateUser();
  }, [activationToken]); 

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-semibold mb-8 text-center">{message}</h1>
      <Link to={"/login"} className="px-8 py-3 bg-green-500 rounded-lg text-white text-lg font-semibold hover:bg-green-600 transition duration-300 ease-in-out">
        Login
      </Link>
    </div>
  );
};

export default ActivateUser;
