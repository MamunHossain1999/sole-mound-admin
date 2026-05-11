import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/navbarIcon/logo 3.png";

interface NavbarTitle {
  text: string;
  path: string;
}

const LoginNavbar: React.FC = () => {
  const location = useLocation();
  
  const navbarTitles: NavbarTitle[] = [
    { text: "Log In", path: "/auth/login-page" },
    { text: "Sign Up", path: "/register/sign-up" },
    { text: "Log In", path: "/seller/seller-login-page" },
    { text: "Sign up as a supplier", path: "/seller-sign/seller-sign-up" },
  ];

  const currentTitle = navbarTitles.find(title => title.path === location.pathname);

  return (
    <div className="w-full">
      {/* Top Navbar */}
      <div className="bg-[#E3AADD] px-4 md:px-12 lg:px-24 xl:px-36 h-[99px] flex items-center z-50 transition-all duration-300 ">
        {/* logo area */}
        <NavLink to="/">
          <img 
            src={logo} 
            alt="Logo" 
            className="lg:w-[106px] w-[80px] lg:h-[90px] h-[70px] cursor-pointer" 
          />
        </NavLink>

        {/* Conditional Titles */}
        {currentTitle && (
          <div
            className="text-4xl text-[#505050] pl-12"
            style={{ fontFamily: "Oleo Script, cursive" }}
          >
            {currentTitle.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginNavbar;
