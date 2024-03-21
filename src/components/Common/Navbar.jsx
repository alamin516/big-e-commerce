import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    try {
      const cartItemsFetch = async () => {
        const items = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(items);
      };
      cartItemsFetch();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const imageUrl = `http://localhost:5000/${user?.image}`;
  const modifiedUrl = imageUrl.replace("/public", "");

  const handleLogout = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(true);
      if (user) {
        logout();
        navigate("/login", { replace: true });
      }
      toast.success("Logged Out successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error logging out. Please try again later.");
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   setLoading(false);
  // }, [setLoading]);

  return (
    <nav className="bg-[#F85606]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Left side of the navbar (Logo) */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-xl font-bold">
              <img className="md:!w-[180px] md:!min-w-[180px] md:!max-w-[180px]" src="/logo.png" alt="logo" />
            </Link>
          </div>

          {/* Mobile menu button (hidden by default on larger screens) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {/* Icon for mobile menu */}
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Right side of the navbar (Navigation menu and buttons) */}
          <div
            className={`md:flex flex-grow justify-end items-center space-x-4 ${
              isMenuOpen ? "block fixed inset-0 bg-[#F85606] z-50" : "hidden"
            }`}
          >
            {/* Navigation menu */}
            <ul className="md:flex space-x-4">
              <li>
                <Link
                  to="/"
                  className={
                    location.pathname === "/"
                      ? "text-black block py-2 px-4"
                      : "text-white block py-2 px-4"
                  }
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={
                    location.pathname === "/about"
                      ? "text-black block py-2 px-4"
                      : "text-white block py-2 px-4"
                  }
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={
                    location.pathname === "/contact"
                      ? "text-black block py-2 px-4"
                      : "text-white block py-2 px-4"
                  }
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* Authentication buttons */}
            {user ? (
              <div className="flex items-center space-x-4">
                {/* User profile image */}
                <img
                  src={modifiedUrl}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full"
                />
                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="text-white bg-transparent border border-white py-1 px-3 rounded hover:bg-white hover:text-gray-800 transition duration-300"
                >
                  {loading ? (
                    <>
                      <div className="flex items-center justify-center">
                        <div className="loader w-6 h-6 border-t-4 border-[#F85606] border-solid rounded-full animate-spin"></div>
                      </div>
                    </>
                  ) : (
                    "LogOut"
                  )}
                </button>
              </div>
            ) : (
              <div className="flex space-x-4 items-center">
                <button className="text-white bg-transparent border border-white py-1 px-3 rounded hover:bg-white hover:text-gray-800 transition duration-300">
                  <Link to={"/login"}>Login</Link>
                </button>
                <span className="text-white">{" | "}</span>
                <button className="text-white bg-transparent border border-white py-1 px-3 rounded hover:bg-white hover:text-gray-800 transition duration-300">
                  <Link to={"/register"}>Sign Up</Link>
                </button>
              </div>
            )}
            <div>
              <Link to="/cart" className="text-white block py-2 px-4 relative">
                <span className="cart-icon">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.51345 5H1.33325V3H6.15306L7.21972 8.33333H30.5315L27.5012 25H8.51345L4.51345 5ZM7.61972 10.3333L10.1531 23H25.832L28.135 10.3333H7.61972Z"
                      fill="white"
                    ></path>
                    <path
                      d="M11.9999 28C11.9999 28.7364 11.403 29.3333 10.6666 29.3333C9.93021 29.3333 9.33325 28.7364 9.33325 28C9.33325 27.2636 9.93021 26.6667 10.6666 26.6667C11.403 26.6667 11.9999 27.2636 11.9999 28Z"
                      fill="white"
                    ></path>
                    <path
                      d="M25.3333 29.3333C26.0696 29.3333 26.6666 28.7364 26.6666 28C26.6666 27.2636 26.0696 26.6667 25.3333 26.6667C24.5969 26.6667 23.9999 27.2636 23.9999 28C23.9999 28.7364 24.5969 29.3333 25.3333 29.3333Z"
                      fill="white"
                    ></path>
                  </svg>
                </span>

                <span className="absolute top-0 right-0 w-5 h-5 rounded-full text-sm text-black bg-white flex items-center justify-center z-0">
                  {cartItems?.length}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
