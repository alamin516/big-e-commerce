import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaShoppingBag,
  FaSignOutAlt,
  FaFileAlt,
  FaShoppingCart,
  FaCog,
  FaUser,
  FaPhone,
} from "react-icons/fa";

const Sidebar = () => {
  const [showCollapse, setCollapse] = useState(false);
  const location = useLocation();

  const toggleDashboard = () => {
    setCollapse(!showCollapse);
  };

  const links = [
    { path: "/dashboard", title: "Dashboard", icon: FaTachometerAlt },
    { path: "/dashboard/posts", title: "Posts", icon: FaFileAlt },
    { path: "/dashboard/products", title: "Products", icon: FaShoppingBag },
    { path: "/dashboard/orders", title: "Orders", icon: FaShoppingCart },
    { path: "/dashboard/users", title: "Users", icon: FaUser },
    { path: "/dashboard/settings", title: "Settings", icon: FaCog},
    { path: "/dashboard/contact", title: "Contact", icon: FaPhone },
  ];

  return (
    <div
      className={`sticky top-0 hidden md:!block bg-white transition-all duration-[400ms] ease-in-out border-r max-h-screen min-h-screen w-auto ${
        showCollapse
          ? "md:!w-[72px] md:!min-w-[72px] md:!max-w-[72px] tab"
          : "md:!w-[250px] md:!min-w-[250px] md:!max-w-[250px]"
      }`}
    >
      <div className="w-full h-[72px] flex items-center gap-2 p-4 border-b bg-[#F85606] transition-all duration-400 ease-linear">
        <button
          onClick={toggleDashboard}
          className="flex justify-center items-center rounded bg-ostad-black-opac-2 h-10 w-10 min-w-10 cursor-pointer bg-white"
          title={`${showCollapse ? "Expand" : "Collapse"}`}
        >
          <img
            className={`w-6 h-6 transition-all duration-400 ease-linear`}
            style={{ transform: showCollapse ? "scaleX(-1)" : "none" }}
            src="https://cdn.ostad.app/public/upload/2023-12-19T09-14-09.533Z-menu-fold-line.svg"
          />
        </button>
        <Link id="" to="/">
          <div
            className={`flex text-white text-xl items-center transition-all duration-400 ease-linear overflow-hidden ${
              showCollapse ? "w-[0] opacity-0" : "w-[146px] opacity-100"
            }`}
          >
            <img className="md:!w-full md:!min-w-full md:!max-w-full" src="/logo.png" alt="logo" />
          </div>
        </Link>
      </div>
      <div className="flex h-[calc(100vh-96px)] flex-col justify-between">
        <nav className="flex flex-col justify-between px-4 gap-2 self-stretch max-h-[calc(100vh-90px)] overflow-y-hidden hover:overflow-auto scrollbar">
          <ul className="mt-6 flex flex-col gap-2">
            {links.map((item, idx) => (
              <Link key={idx} to={item.path}>
                <li
                  className={`${
                    location?.pathname === item.path
                      ? "bg-[#F85606] text-white"
                      : ""
                  } ${
                    showCollapse ? "p-2 py-3" : "px-6 py-3"
                  } flex justify-center items-center group w-full rounded cursor-pointer transition-all duration-400 relative overflow-hidden bg-none hover:bg-[#f79a6c]`}
                  title={`${showCollapse ? "Dashboard" : ""}`}
                >
                  <item.icon className="inline-block text-xl" />
                  <div
                    className={`flex items-center transition-all duration-400 ease-linear flex-nowrap justify-between ${
                      showCollapse ? "opacity-0 w-[0]" : "opacity-100 w-full"
                    }`}
                  >
                    <p className="text-body-b2 text-ostad-black-40 group-hover:text-ostad-black-100 capitalize whitespace-nowrap ml-[13px] opacity-100 transition-opacity duration-150 ease-linear">
                      {item.title}
                    </p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </nav>

        <div className="px-4 flex justify-center items-center overflow-hidden">
          <div
            className={`${
              showCollapse ? "block" : "hidden"
            } h-14 min-w-14 bg-[#f9f9fa] cursor-pointer transition-all duration-700 ease-in-out flex justify-center items-center rounded-full text-[#667085]`}
          >
            <FaSignOutAlt className="inline-block ml-[3px] text-xl" />
          </div>
          <div
            className={`${
              showCollapse ? "hidden" : "block"
            } transition-all duration-700 ease-in-out flex px-2 items-center self-stretch gap-1 rounded-lg border`}
          >
            <div className="h-14 min-w-14 bg-[#FFFFFF] cursor-pointer transition-all duration-700 ease-in-out flex justify-center items-center rounded-full text-[#667085]">
              <FaSignOutAlt className="inline-block ml-[3px] text-xl" />
            </div>
            <button
              id=""
              type="button"
              className={`group w-full flex gap-2 justify-center items-center transition-all duration-200 active:scale-[98%] h-10 px-6 py-2 rounded-md bg-[#101828] hover:bg-ostad-black-80 active:bg-ostad-black-100`}
            >
              <p className="uppercase whitespace-nowrap transition-all duration-200 text-button text-white">
                SignOut
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
