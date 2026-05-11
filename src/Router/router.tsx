import { createBrowserRouter } from "react-router-dom"; // ✅ correct

import MainLayOut from "../LayOut/MainLayOut";
import OrderDashBoard from "../Pages/orderDashboard/OrderDashBoard";
import OrderManagement from "../Pages/OrderManagment/Ordermanagement";
import ProductList from "../Pages/Productlist/Productlist";
import ProductCreate from "../Pages/ProductCreate/ProductCreate";
import ProductDetails from "../Pages/Productdetails/Productdetails";
import CategoryPage from "../Pages/CategoryPage/CategoryPage";
import SellerStores from "../Pages/SellerStore/SellerStore";
import WithdrawalPage from "../Pages/SellerStore/WithdrawalPage";
import VendorPage from "../Pages/SellerStore/VendorPage";
import AllCustomers from "../Pages/AllCustomars/AllCustomers";
import Conversations from "../Pages/Conversations/Conversations";
import SettingsPage from "../Pages/SettingPage/Setting";
import InvoicePage from "../Pages/Invoice/InvoiceList";
import InvoiceDetails from "../Pages/Invoice/InvoiceDetail";
import InvoiceCreate from "../Pages/Invoice/InvoiceCreate";
import Dashboard from "../Pages/HomePage/Dashboard";
import AuthenticationLayout from "../LayOut/AuthinticationLayout";
import AdminSignUpPage from "../Components/adminSignUpPage/AdminSignUpPage";
import AdminLoginPage from "../Components/adminSignUpPage/AdminLoginPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    children: [
      {
        path: "/",
        element: <Dashboard/>,
      },
      {
        path: "/orders",
        element: <OrderDashBoard />,
      },
      {
        path: "/order-management/pending",
        element: <OrderManagement />,
      },
      {
        path: "/products/list",
        element: <ProductList />,
      },
      {
        path: "/products/create",
        element: <ProductCreate />,
      },
      {
        path: "/products/details",
        element: <ProductDetails/>,
      },
      {
        path: "/categories",
        element: <CategoryPage />
      },
      {
        path: "/seller/store",
        element: <SellerStores />
      },
      {
        path: "/seller/withdrawal",
        element: <WithdrawalPage />
      },
      {
        path: "/seller/vendors",
        element: <VendorPage />
      },
      {
        path: "/customers",
        element: <AllCustomers />
      },
      {
        path: "/conversations",
        element: <Conversations />
      },
      {
        path: "/settings",
        element: <SettingsPage />
      },
      {
        path: "/invoice/lists",
        element: <InvoicePage />
      },
      {
        path: "/invoice/details",
        element: <InvoiceDetails />
      },
      {
        path: "/invoice/create",
        element: <InvoiceCreate />
      }

    ],
  },
  {
    path: "/auth",
    element:<AuthenticationLayout />,
    children:[
      {
        path: "signup",
        element:<AdminSignUpPage />
      },
      {
        path: "login",
        element:<AdminLoginPage />
      }
    ]
  }
]);

export default router;