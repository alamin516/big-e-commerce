import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorHandle, setErrorHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from.pathname || '/'

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else if (e.target.type === "checkbox") {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Login
  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      if (!formData.email) {
        setErrorHandle("Email is Required!");
      } else if (!formData.password) {
        setErrorHandle("Password is Required!");
      } else {
        setErrorHandle("");
        setLoading(true);

        const userLoginData = {
          email: formData.email,
          password: formData.password,
        };

      await new Promise((resolve) => setTimeout(resolve, 3000));

        login(userLoginData)
          .then(() => {
            toast.success("Logged in successfully!");
            setLoading(false);
            navigate(from, { replace: true });
            setFormData({
              email: "",
              password: "",
              check: false,
            });
          })
          .catch((error) => {
            toast.error(error.response.data.message);
            setErrorHandle(error.response.data.message);
            setLoading(false);
          });
      }
    } catch (error) {
      console.error("Error:", error.response);
    }
  };

  useEffect(() => {
    if (user) {
      return navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  return (
    <>
      <div className="w-full lg:max-w-lg max-w-xs mx-auto lg:py-20 mt-10">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form onSubmit={handleSubmitLogin}>
            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {errorHandle && (
              <p className="text-red-500 text-xs italic mb-4">{errorHandle}</p>
            )}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className={`w-full bg-[#F85606] hover:bg-[#D0611E] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!formData.email || !formData.password || loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="loader w-6 h-6 border-t-4 border-[#fff] border-solid rounded-full animate-spin"></div>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          <p className="text-center font-bold my-2">OR</p>
          <div>
            <Link to="/register">
              <button className="w-full px-4 py-2 text-white bg-[#F85606] rounded-md  hover:bg-[#D0611E] focus:outline-none focus:bg-[#F85606]">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
