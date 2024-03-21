import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    check: false,
  });
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();



  const [errorHandle, setErrorHandle] = useState("");
  // const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else if (e.target.type === "checkbox") {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        phone: formData.phone,
      };

      setLoading(true);
      setErrorHandle("");

      await axios
        .post("http://localhost:5000/api/v1/users/process-Register", userData)
        .then((response) => {
          console.log(response.data);
          toast.success("Check your email to verify");
          setLoading(false);
          setFormData({
            name: "",
            email: "",
            password: "",
            address: "",
            phone: "",
          });
        })
        .catch((error) => {
          console.error("Error:", error.response);
          setErrorHandle(error.response.data.message);
        });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      return navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="w-full lg:max-w-lg mx-auto py-20 mt-10">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleSubmit} className="">
          <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 rounded-md"
            />
          </div>
          {errorHandle && (
            <p className="text-red-500 text-xs italic mb-4">{errorHandle}</p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[#F85606] rounded-md  hover:bg-[#D0611E] focus:outline-none focus:bg-[#F85606]"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="loader w-6 h-6 border-t-4 border-[#FFF] border-solid rounded-full animate-spin"></div>
              </div>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <p className="text-center font-bold my-2">OR</p>
        <div>
          <Link to="/login">
            <button className="w-full px-4 py-2 text-white bg-[#F85606] rounded-md  hover:bg-[#D0611E] focus:outline-none focus:bg-[#F85606]">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
