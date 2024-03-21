import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import About from "../Pages/About/About";
import Cart from "../Pages/Cart/Cart";
import Checkout from "../Pages/Checkout/Checkout";
import Contact from "../Pages/Contact/Contact";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import NotFound from "../Pages/NotFound/NotFound";
import Product from "../Pages/Product/Product";
import Register from "../Pages/Register/Register";
import ActivateUser from "../Pages/RegisterVerify/ActivateUser";
import Footer from "../components/Common/Footer";
import Navbar from "../components/Common/Navbar";
import PrivateRoute from "./PrivateRoute";
import MasterLayout from "../Layout/MasterLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Products from "../Pages/Dashboard/Products/Products";
import Posts from "../Pages/Dashboard/Posts/Posts";
import Orders from "../Pages/Dashboard/Orders/Orders";
import Users from "../Pages/Dashboard/Users/Users";
import Settings from "../Pages/Dashboard/Settings/Settings";
import Contacts from "../Pages/Dashboard/Contact/Contact";
import FlashSale from "../Pages/FlashSale/FlashSale";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error/>,
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/api/v1/users/activate/:activationToken",
        element: <ActivateUser />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/flash-sale",
        element: <FlashSale />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <Error/>,
    element: <MasterLayout/>,
    children:[
      {
        path: "/dashboard",
        element: <Dashboard/>
      },
      {
        path: "/dashboard/posts",
        element: <Posts/>
      },
      {
        path: "/dashboard/products",
        element: <Products/>
      },
      {
        path: "/dashboard/orders",
        element: <Orders/>
      },
      // {
      //   path: "/dashboard/pages",
      //   element: <Dashboard/>
      // },
      {
        path: "/dashboard/users",
        element: <Users/>
      },
      {
        path: "/dashboard/settings",
        element: <Settings/>
      },
      {
        path: "/dashboard/contact",
        element: <Contacts/>
      },
    ]
  },
  {
    path: "*",
    element: (
      <>
        <Navbar />
        <NotFound />
        <Footer />
      </>
    ),
  },
]);
