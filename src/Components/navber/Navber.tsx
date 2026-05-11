import React, { useState } from "react";
import { BiBell, BiEnvelope } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="bg-white px-4 md:px-6 py-3 flex items-center justify-between shadow-md">
      
      {/* 🔍 Mobile Search Icon */}
      <div className="md:hidden">
        <button onClick={() => setShowSearch(!showSearch)}>
          <FiSearch className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* 🔍 Search (Desktop + Mobile toggle) */}
      <div
        className={`${
          showSearch ? "flex" : "hidden"
        } absolute top-16 left-0 w-full bg-white px-4 py-3 md:static md:flex md:flex-1 md:max-w-md`}
      >
        <input
          type="text"
          placeholder="Search product"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Messages */}
        <div className="relative cursor-pointer">
          <BiEnvelope className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] md:text-xs w-4 h-4 rounded-full flex items-center justify-center">
            2
          </span>
        </div>

        {/* Notifications */}
        <div className="relative cursor-pointer">
          <BiBell className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] md:text-xs w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        {/* User */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="User Avatar"
            className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover"
          />

          {/* Hide text on small device */}
          <div className="hidden sm:block text-gray-700 text-sm font-medium">
            <p>Guy Hawkins</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;