import React from "react";
import { BiBell, BiEnvelope } from "react-icons/bi";



const Navbar: React.FC = () => {
  return (
    <nav className="bg-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Left: Search */}
      <div className="flex-1 max-w-md">
        <input
          type="text"
          placeholder="Search product"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Right: Icons & User */}
      <div className="flex items-center space-x-4">
        {/* Messages */}
        <div className="relative cursor-pointer">
          <BiEnvelope className="w-6 h-6 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            2
          </span>
        </div>

        {/* Notifications */}
        <div className="relative cursor-pointer">
          <BiBell className="w-6 h-6 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        {/* User */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="text-gray-700 text-sm font-medium">
            <p>Guy Hawkins</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;