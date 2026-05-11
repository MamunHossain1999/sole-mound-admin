import { Outlet } from "react-router-dom";
import LoginNavbar from "../Components/loginNavbar/LoginNavbar";


const AuthenticationLayout: React.FC = () => {
  return (
    <div className=" flex flex-col bg-gray-50">
      
      {/* Top Navbar */}
      <LoginNavbar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full p-6 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthenticationLayout;