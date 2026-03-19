import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// React Icons
import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { FiUsers, FiSettings, FiLock } from "react-icons/fi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BiConversation } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import { HiOutlineLogout } from "react-icons/hi";

const Sidebar: React.FC = () => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const handleSubMenu = (menu: string) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  const activeClass = "bg-purple-100 text-purple-700";

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg fixed flex flex-col justify-between">
      {/* Logo */}
      <div className="px-6 py-4">
        <img src="/logo.png" alt="Sole Mound" className="w-32 h-auto" />
      </div>

      {/* Menu */}
      <div className="flex-1 px-2 space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-purple-100 ${
              isActive ? activeClass : ""
            }`
          }
        >
          <AiOutlineDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="orders"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-purple-100 ${
              isActive ? activeClass : ""
            }`
          }
        >
          <AiOutlineShoppingCart className="w-5 h-5" />
          <span>Orders</span>
        </NavLink>

        {/* Order Management Submenu */}
        <div className="flex flex-col">
          <div
            onClick={() => handleSubMenu("orderManagement")}
            className="flex items-center gap-3 p-2 hover:bg-purple-100 rounded cursor-pointer"
          >
            <BsFillCartCheckFill className="w-5 h-5" />
            <span>Order Management</span>
            <span>{openSubMenu === "orderManagement" ? "▲" : "▼"}</span>
          </div>
          {openSubMenu === "orderManagement" && (
            <ul className="pl-8 space-y-1">
              <NavLink
                to="/order-management/pending"
                className={({ isActive }) =>
                  `block p-1 rounded cursor-pointer hover:bg-purple-50 ${
                    isActive ? "bg-purple-200" : ""
                  }`
                }
              >
                Pending
              </NavLink>
              <NavLink
                to="/order-management/completed"
                className={({ isActive }) =>
                  `block p-1 rounded cursor-pointer hover:bg-purple-50 ${
                    isActive ? "bg-purple-200" : ""
                  }`
                }
              >
                Completed
              </NavLink>
            </ul>
          )}
        </div>

{/* Products */}
        <div className="flex flex-col">
          <div
            onClick={() => handleSubMenu("products")}
            className="flex items-center gap-3 p-2 hover:bg-purple-100 rounded cursor-pointer"
          >
            <BsFillCartCheckFill className="w-5 h-5" />
            <span>Products</span>
            <span>{openSubMenu === "products" ? "▲" : "▼"}</span>
          </div>
          {openSubMenu === "products" && (
            <ul className="pl-8 space-y-1">
              <NavLink
                to="/products/list"
                className={({ isActive }) =>
                  `block p-1 rounded cursor-pointer hover:bg-purple-50 ${
                    isActive ? "bg-purple-200" : ""
                  }`
                }
              >
                List
              </NavLink>
              <NavLink
                to="/products/create"
                className={({ isActive }) =>
                  `block p-1 rounded cursor-pointer hover:bg-purple-50 ${
                    isActive ? "bg-purple-200" : ""
                  }`
                }
              >
                Create
              </NavLink>
               <NavLink
                to="/products/details"
                className={({ isActive }) =>
                  `block p-1 rounded cursor-pointer hover:bg-purple-50 ${
                    isActive ? "bg-purple-200" : ""
                  }`
                }
              >
                Details
              </NavLink>
            </ul>
          )}
        </div>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-purple-100 ${
              isActive ? activeClass : ""
            }`
          }
        >
          <MdOutlineCategory className="w-5 h-5" />
          <span>Categories</span>
        </NavLink>

{/* seller store */}
<div className="flex flex-col">
          <div
            onClick={() => handleSubMenu("seller")}
            className="flex items-center gap-3 p-2 hover:bg-purple-100 rounded cursor-pointer"
          >
            <BsFillCartCheckFill className="w-5 h-5" />
            <span>Sellers</span>
            <span>{openSubMenu === "seller" ? "▲" : "▼"}</span>
          </div>
          {openSubMenu === "seller" && (
            <ul className="pl-8 space-y-1">
              <NavLink
                to="/seller/store"
                className={({ isActive }) =>
                  `block p-1 rounded cursor-pointer hover:bg-purple-50 ${
                    isActive ? "bg-purple-200" : ""
                  }`
                }
              >
                Stores
              </NavLink>
              <NavLink
                to="/seller/withdrawal"
                className={({ isActive }) =>
                  `block p-1 rounded cursor-pointer hover:bg-purple-50 ${
                    isActive ? "bg-purple-200" : ""
                  }`
                }
              >
                Withdrawal
              </NavLink>
               <NavLink
                to="/seller/vendors"
                className={({ isActive }) =>
                  `block p-1 rounded cursor-pointer hover:bg-purple-50 ${
                    isActive ? "bg-purple-200" : ""
                  }`
                }
              >
                Vendors
              </NavLink>
            </ul>
          )}
        </div>

        <NavLink
          to="/customers"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-purple-100 ${
              isActive ? activeClass : ""
            }`
          }
        >
          <FiUsers className="w-5 h-5" />
          <span>Customers</span>
        </NavLink>

        <NavLink
          to="/payments"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-purple-100 ${
              isActive ? activeClass : ""
            }`
          }
        >
          <RiMoneyDollarCircleLine className="w-5 h-5" />
          <span>Payments</span>
        </NavLink>

        {/* Invoice Submenu */}
        <div className="flex flex-col">
          <div
            onClick={() => handleSubMenu("invoice")}
            className="flex items-center gap-3 p-2 hover:bg-purple-100 rounded cursor-pointer"
          >
            <TbTruckDelivery className="w-5 h-5" />
            <span>Invoice</span>
            <span>{openSubMenu === "invoice" ? "▲" : "▼"}</span>
          </div>
          {openSubMenu === "invoice" && (
            <ul className="pl-8 space-y-1">
              <NavLink
                to="/invoice/pending"
                className={({ isActive }) =>
                  `block p-1 rounded cursor-pointer hover:bg-purple-50 ${
                    isActive ? "bg-purple-200" : ""
                  }`
                }
              >
                Pending
              </NavLink>
              <NavLink
                to="/invoice/paid"
                className={({ isActive }) =>
                  `block p-1 rounded cursor-pointer hover:bg-purple-50 ${
                    isActive ? "bg-purple-200" : ""
                  }`
                }
              >
                Paid
              </NavLink>
            </ul>
          )}
        </div>

        <NavLink
          to="/conversations"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-purple-100 ${
              isActive ? activeClass : ""
            }`
          }
        >
          <BiConversation className="w-5 h-5" />
          <span>Conversations</span>
          <span className="text-xs bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center">
            16
          </span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded mt-3 cursor-pointer ${
              isActive ? activeClass : ""
            }`
          }
        >
          <FiSettings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>

        {/* Authentication Submenu */}
        <div className="flex flex-col">
          <div
            onClick={() => handleSubMenu("authentication")}
            className="flex items-center gap-3 p-2 hover:bg-purple-100 rounded cursor-pointer"
          >
            <FiLock className="w-5 h-5" />
            <span>Authentication</span>
            <span>{openSubMenu === "authentication" ? "▲" : "▼"}</span>
          </div>
          {openSubMenu === "authentication" && (
            <ul className="pl-8 space-y-1">
              <NavLink
                to="/auth/login"
                className={({ isActive }) =>
                  `block p-1 rounded cursor-pointer hover:bg-purple-50 ${
                    isActive ? "bg-purple-200" : ""
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/auth/register"
                className={({ isActive }) =>
                  `block p-1 rounded cursor-pointer hover:bg-purple-50 ${
                    isActive ? "bg-purple-200" : ""
                  }`
                }
              >
                Register
              </NavLink>
            </ul>
          )}
        </div>

        <NavLink
          to="/support"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-purple-100 ${
              isActive ? activeClass : ""
            }`
          }
        >
          <FiUsers className="w-5 h-5" />
          <span>Support</span>
        </NavLink>

        <NavLink
          to="/roles"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-purple-100 ${
              isActive ? activeClass : ""
            }`
          }
        >
          <FiUsers className="w-5 h-5" />
          <span>Roles</span>
        </NavLink>
      </div>

      {/* Logout */}
      <div className="px-6 py-4 border-t border-gray-200 cursor-pointer flex items-center gap-3 text-red-500 hover:bg-red-50">
        <HiOutlineLogout className="w-5 h-5" />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;