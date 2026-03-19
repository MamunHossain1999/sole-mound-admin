import { Outlet } from "react-router-dom";
import Navbar from "../Components/navber/Navber";
import Sidebar from "../Pages/sidebar/Sidebar";

const MainLayOut = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-md sticky top-0 z-10">
          <Navbar />
        </header>

        {/* Page content */}
        <main className="w-full flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayOut;
