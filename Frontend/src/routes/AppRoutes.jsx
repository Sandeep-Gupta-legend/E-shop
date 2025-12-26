import { Routes, Route } from "react-router-dom";

import UserLayout from "../layouts/UserLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import OrderSuccess from "../pages/OrderSuccess";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* HOME */}
      <Route
        path="/"
        element={
          <UserLayout>
            <Home />
          </UserLayout>
        }
      />

      {/* PRODUCTS */}
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

      {/* CART (Protected) */}
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

      {/* ORDER SUCCESS */}
      <Route
        path="/order-success"
        element={
          <ProtectedRoute>
            <UserLayout>
              <OrderSuccess />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      {/* AUTH */}
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
    </Routes>
  );
};

export default AppRoutes;
