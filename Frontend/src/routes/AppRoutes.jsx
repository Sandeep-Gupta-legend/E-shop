import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import ProtectedRoute from "./ProtectedRoute";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";

const AppRoutes = () => {
  return (
    <Routes>

      {/* User Routes */}
      <Route
        path="/"
        element={
          <UserLayout>
            <Home />
          </UserLayout>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>

             <UserLayout>
            <Cart />
          </UserLayout>
          </ProtectedRoute>
         
        }
      />

      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />

      <Route
        path="/register"
        element={
          <AuthLayout>
            <Register />
          </AuthLayout>
        }
      />

      <Route
  path="/products"
  element={
    <UserLayout>
      <Products />
    </UserLayout>
  }
/>

<Route
  path="/product/:id"
  element={
    <UserLayout>
      <ProductDetails />
    </UserLayout>
  }
/>


    </Routes>
  );
};

export default AppRoutes;
