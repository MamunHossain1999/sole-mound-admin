import { Outlet } from "react-router-dom";
import Navbar from "../Components/navber/Navber";
import Sidebar from "../Pages/sidebar/Sidebar";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import ScrollToTop from "../Components/ScrollTop/ScrollTop";

const MainLayOut = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block`}
      >
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Navbar */}
        <header className="sticky top-0 z-30 flex items-center px-4 py-3">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden mr-3"
            onClick={() => setIsOpen(true)}
          >
            <FiMenu className="w-6 h-6" />
          </button>

          <div className="flex-1">
            <Navbar />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 overflow-y-auto">
            <ScrollToTop />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayOut;