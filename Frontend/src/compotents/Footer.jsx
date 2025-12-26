import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">E-Shop</h2>
          <p className="text-sm leading-relaxed">
            Your trusted online store for electronics, fashion, and daily
            essentials. Secure payments & fast delivery.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-white transition">
                Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-white transition">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-white transition">
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>FAQs</li>
            <li>Returns & Refunds</li>
            <li>Shipping Policy</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact Us
          </h3>
          <p className="text-sm">📧 support@eshop.com</p>
          <p className="text-sm mt-1">📞 +91 98765 43210</p>

          <div className="flex gap-4 mt-4">
            <span className="cursor-pointer hover:text-white">🌐</span>
            <span className="cursor-pointer hover:text-white">📘</span>
            <span className="cursor-pointer hover:text-white">📸</span>
            <span className="cursor-pointer hover:text-white">🐦</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} E-Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
