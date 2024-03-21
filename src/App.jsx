import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import AuthService from "./Auth/Auth";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    image: "", // This will store the selected image file
    check: false,
  });

  const currentUser = AuthService.getCurrentUser();
  const user = currentUser?.payload.userWithoutPassword;
  const [errorHandle, setErrorHandle] = useState("");
  // const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  // if (loading) {
  //   return (
  //     <div className="fixed bg-white inset-0  flex items-center justify-center">
  //       <div className="loader w-16 h-16 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else if (e.target.type === "checkbox") {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  console.log(formData.image);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.image,
        address: formData.address,
        phone: formData.phone,
      };

      await axios
        .post("http://localhost:5000/api/v1/users/process-register", userData)
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
            image: "",
          });
        })
        .catch((error) => {
          console.error("Error:", error.response);
        });
    } catch (error) {
      console.error("Error:", error);
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

        AuthService.login(userLoginData)
          .then(() => {
            toast.success("Logged in successfully!");
            setLoading(false);
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

  const handleLogout = async () => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      await AuthService.logout();
      toast.success("Logged Out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error logging out. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (currentUser) {
    const imageUrl = `http://localhost:5000/${user.image}`;
    const modifiedUrl = imageUrl.replace("/public", "");
    return (
      <>
        <div className="w-10/12 py-10">
          <h2 className="text-center uppercase">
            {!currentUser && `Register And Login`}
            {currentUser && (
              <>
                <img
                  className="mx-auto w-10 h-10 object-cover rounded-full inline-block"
                  src={modifiedUrl}
                  alt=""
                />{" "}
                {!currentUser ? " " : user?.name} {"  "}
                <button
                  className="bg-blue-500 text-white font-semibold px-5 py-2 rounded-sm"
                  onClick={handleLogout}
                >
                  {loading ? (
                    <>
                      <div className="flex items-center justify-center">
                        <div className="loader w-6 h-6 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
                      </div>
                    </>
                  ) : (
                    "LogOut"
                  )}
                </button>
              </>
            )}
          </h2>
          <div className="pt-10">
            <h2>{user["name"]}</h2>
            <h2>{user["email"]}</h2>
            <h2>{user["phone"]}</h2>
            <img
              className="mx-auto w-40 h-40 object-cover"
              src={modifiedUrl}
              alt=""
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-10/12 py-10">
        <h2 className="text-center uppercase">Register And Login</h2>
        {!currentUser && (
          <div className="flex items-center gap-10 mt-10">
            <div className="w-1/2 p-3 bg-white rounded-md border border-gray-300 shadow-md">
              <h3 className="py-6">Register</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mb-4 bg-gray-100 rounded-md"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mb-4 bg-gray-100 rounded-md"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mb-4 bg-gray-100 rounded-md"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mb-4 bg-gray-100 rounded-md"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mb-4 bg-gray-100 rounded-md"
                  required
                />
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  className="block w-full px-4 py-2 mb-4 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                >
                  Register
                </button>
              </form>
            </div>
            <div className="w-1/2 p-3 bg-white rounded-md border border-gray-300 shadow-md">
              <h3 className="py-6">Login</h3>
              <div className="w-full flex py-10">
                <form onSubmit={handleSubmitLogin} className="w-full">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 mb-4 bg-gray-100 rounded-md"
                    />
                  </div>
                  {errorHandle === "Email is Required!" ? (
                    <p className="max-w-full text-red-500 text-left mb-3">
                      {errorHandle}
                    </p>
                  ) : (
                    ""
                  )}
                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-2 mb-4 bg-gray-100 rounded-md"
                    />
                  </div>
                  {errorHandle === "Password is Required!" ? (
                    <p className="max-w-full text-red-500 text-left mb-3">
                      {errorHandle}
                    </p>
                  ) : (
                    ""
                  )}
                  <div className="flex items-center gap-5 mb-4">
                    <input
                      className="w-5 h-5 block p-2"
                      type="checkbox"
                      name="check"
                      onChange={handleChange}
                      id="check"
                    />
                    <label htmlFor="check" className="leading-5">
                      Privacy and policy
                    </label>
                  </div>
                  <button
                    type="submit"
                    className={`w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600`}
                    disabled={!formData?.check}
                  >
                    {loading ? (
                      <>
                        <div className="flex items-center justify-center">
                          <div className="loader w-6 h-6 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
                        </div>
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        <Toaster position="bottom-center" />
      </div>
    </>
  );
}

export default App;
