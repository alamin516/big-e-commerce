import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Routes/Routes.jsx";
import "./index.css";
import AuthProvider from "./contexts/Auth.jsx";
import { ProductProvider } from "./contexts/Products/ProductProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ProductProvider>
    <RouterProvider router={router}></RouterProvider>
    </ProductProvider>
  </AuthProvider>
);
