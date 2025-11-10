import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import App from "./App.jsx";
import Home from "./pages/Home/home.jsx";
import Services from "./pages/Services/services.jsx";
import ServiceDetails from "./pages/ServiceDetails/serviceDetails.jsx";
import Profile from "./pages/Profile/profile.jsx";
import Providers from "./pages/Provider/provider.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Checkout from "./pages/Checkout/checkout.jsx";
import About from "./pages/About/about.jsx";
import Contact from "./pages/Contact/contact.jsx";
import Login from "./pages/Login/login.jsx";
import Register from "./pages/Register/register.jsx";
import AdminPage from "./pages/Admin/admin.jsx";
import CheckoutSuccess from "./pages/CheckoutSuccess/checkoutSuccess.jsx";
import OTPVerification from "./pages/OTPVerification/otpVerification.jsx";

import "./index.css";
import { CartProvider } from "./Context/CartContext.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";

// Initialize AOS
AOS.init({ duration: 800, once: true });

// Simple auth redirect component: checks localStorage for token and redirects
function AuthRedirect() {
  try {
    const token = localStorage.getItem("token");
    return token ? <Navigate to="/home" replace /> : <Navigate to="/register" replace />;
  } catch (err) {
    // if localStorage access fails, default to register
    return <Navigate to="/register" replace />;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <AuthProvider>
      {/* AuthProvider wraps children so Navbar and pages can access auth state */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<AuthRedirect />} />
            <Route path="home" element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="service/:id" element={<ServiceDetails />} />
            <Route path="providers" element={<Providers />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="success" element={<CheckoutSuccess />} /> {/*  success page */}
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="verify-otp" element={<OTPVerification />} />
            <Route path="profile" element={<Profile />} />
            {/* Map API-like paths to client auth pages so visiting /api/auth/register loads the SPA register page */}
            <Route path="api/auth/register" element={<Register />} />
            <Route path="api/auth/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </CartProvider>
  </React.StrictMode>
);
