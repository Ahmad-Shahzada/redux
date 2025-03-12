import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartItems = useSelector((store)=>store.cart.items)
  return (
    <nav className="w-full bg-white dark:bg-blue-700 text-gray-900 dark:text-white shadow-xl border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:opacity-80 transition"
        >
          React Redux
        </Link>

        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="hover:text-gray-500 dark:hover:text-gray-300 transition"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center hover:text-gray-500 dark:hover:text-gray-300 transition"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
