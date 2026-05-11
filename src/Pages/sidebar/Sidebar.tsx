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
  const [subMenuActive, setSubMenuActive] = useState<{ [key: string]: string }>({});

  const activeClass = "bg-purple-100 text-purple-700";

  const handleSubMenu = (menu: string, firstItem?: string) => {
    if (openSubMenu === menu) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(menu);
      if (firstItem) {
        setSubMenuActive(prev => ({ ...prev, [menu]: firstItem }));
      }
    }
  };

  const renderSubMenu = (menu: string, items: { name: string; to: string }[]) => {
    return (
      openSubMenu === menu && (
        <ul className="pl-8 space-y-1">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block p-1 rounded cursor-pointer hover:bg-purple-50 ${
                  subMenuActive[menu] === item.to || isActive ? "bg-purple-200" : ""
                }`
              }
              onClick={() =>
                setSubMenuActive((prev) => ({ ...prev, [menu]: item.to }))
              }
            >
              {item.name}
            </NavLink>
          ))}
        </ul>
      )
    );
  };

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
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-purple-100 ${
              isActive ? activeClass : ""
            }`
          }
        >
          <AiOutlineShoppingCart className="w-5 h-5" />
          <span>Orders</span>
        </NavLink>

        {/* Order Management */}
        <div className="flex flex-col">
          <div
            onClick={() =>
              handleSubMenu("orderManagement", "/order-management/pending")
            }
            className="flex items-center gap-3 p-2 hover:bg-purple-100 rounded cursor-pointer"
          >
            <BsFillCartCheckFill className="w-5 h-5" />
            <span>Order Management</span>
            <span>{openSubMenu === "orderManagement" ? "▲" : "▼"}</span>
          </div>
          {renderSubMenu("orderManagement", [
            { name: "Pending", to: "/order-management/pending" },
            { name: "Completed", to: "/order-management/completed" },
          ])}
        </div>

        {/* Products */}
        <div className="flex flex-col">
          <div
            onClick={() =>
              handleSubMenu("products", "/products/list")
            }
            className="flex items-center gap-3 p-2 hover:bg-purple-100 rounded cursor-pointer"
          >
            <BsFillCartCheckFill className="w-5 h-5" />
            <span>Products</span>
            <span>{openSubMenu === "products" ? "▲" : "▼"}</span>
          </div>
          {renderSubMenu("products", [
            { name: "List", to: "/products/list" },
            { name: "Create", to: "/products/create" },
            { name: "Details", to: "/products/details" },
          ])}
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

        {/* Sellers */}
        <div className="flex flex-col">
          <div
            onClick={() => handleSubMenu("seller", "/seller/store")}
            className="flex items-center gap-3 p-2 hover:bg-purple-100 rounded cursor-pointer"
          >
            <BsFillCartCheckFill className="w-5 h-5" />
            <span>Sellers</span>
            <span>{openSubMenu === "seller" ? "▲" : "▼"}</span>
          </div>
          {renderSubMenu("seller", [
            { name: "Stores", to: "/seller/store" },
            { name: "Withdrawal", to: "/seller/withdrawal" },
            { name: "Vendors", to: "/seller/vendors" },
          ])}
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

        {/* Invoice */}
        <div className="flex flex-col">
          <div
            onClick={() => handleSubMenu("invoice", "/invoice/lists")}
            className="flex items-center gap-3 p-2 hover:bg-purple-100 rounded cursor-pointer"
          >
            <TbTruckDelivery className="w-5 h-5" />
            <span>Invoice</span>
            <span>{openSubMenu === "invoice" ? "▲" : "▼"}</span>
          </div>
          {renderSubMenu("invoice", [
            { name: "List", to: "/invoice/lists" },
            { name: "Details", to: "/invoice/details" },
            { name: "Create", to: "/invoice/create" },
          ])}
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

        {/* Authentication */}
        <div className="flex flex-col">
          <div
            onClick={() => handleSubMenu("authentication", "/auth/login")}
            className="flex items-center gap-3 p-2 hover:bg-purple-100 rounded cursor-pointer"
          >
            <FiLock className="w-5 h-5" />
            <span>Authentication</span>
            <span>{openSubMenu === "authentication" ? "▲" : "▼"}</span>
          </div>
          {renderSubMenu("authentication", [
            { name: "Login", to: "/auth/login" },
            { name: "Register", to: "/auth/signup" },
          ])}
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