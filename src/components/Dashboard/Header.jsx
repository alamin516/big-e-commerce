import { FaBars, FaBell } from "react-icons/fa";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-[#F85606] border-b py-4 px-6 h-[72px]">
      <div className="flex justify-between items-center">
        <div>
          <button
            className="text-white focus:outline-none lg:hidden"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
        </div>
        {/* Search bar */}
        <div className="flex mr-4 w-6/12">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-5 text-white">
          {/* Notifications */}
          <div className="relative">
            <button className="relative bg-transparent text-gray-600">
              <FaBell className="inline-block mr-2" />
              {/* Notification dot */}
              <div className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 w-4 h-4 rounded-full text-white text-[10px]">0</div>
            </button>
          </div>

          {/* User profile */}
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/40"
              alt="User profile"
              className="w-8 h-8 rounded-full"
            />
            {/* <span className="ml-2 text-gray-800">John Doe</span> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
