import { createBrowserRouter } from "react-router-dom"; // ✅ correct

import MainLayOut from "../LayOut/MainLayOut";
import OrderDashBoard from "../Pages/orderDashboard/OrderDashBoard";
import HomePage from "../Pages/HomePage/HomePage";
import OrderManagement from "../Pages/OrderManagment/Ordermanagement";
import ProductList from "../Pages/Productlist/Productlist";
import ProductCreate from "../Pages/ProductCreate/ProductCreate";
import ProductDetails from "../Pages/Productdetails/Productdetails";
import CategoryPage from "../Pages/CategoryPage/CategoryPage";
import SellerStores from "../Pages/SellerStore/SellerStore";
import WithdrawalPage from "../Pages/SellerStore/WithdrawalPage";
import VendorPage from "../Pages/SellerStore/VendorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    children: [
      {
        path: "/",
        element: <HomePage/>,
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
      }

    ],
  },
]);

export default router;