"use client";
import { FaShoppingCart } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import { useAppSelector } from "../redux/Hook";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";

export const Navbar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const cart = useAppSelector((state) => state.cart.cart);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCartClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <nav className="bg-slate-900 text-white py-4 px-8 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex gap-x-2">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 576 512"
            className="size-8 fill-white"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"></path>
          </svg>
          <Link to="/">
            <p className="font-bold text-xl">Shopping Cart</p>
          </Link>
        </div>

        <input
          placeholder="Search a product"
          className="bg-white rounded-lg w-96 h-10 px-2 text-gray-600 outline-none"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="relative">
          <button
            className="bg-green-600 px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={handleCartClick}
          >
            <FaShoppingCart />
            {cartItemCount}
            <GoTriangleDown />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white text-gray-800 shadow-lg w-72 rounded-lg py-2">
              <div className="px-4 py-2">
                <h3 className="font-bold">Cart Items</h3>
              </div>
              {cart.length === 0 ? (
                <p className="px-4 py-2 text-gray-600">Your cart is empty</p>
              ) : (
                <div>
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 px-4 py-2 border-b">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-12 h-12 object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold">{item.title}</span>
                        <span className="text-sm text-gray-600">
                          ${item.price} x {item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="px-4 py-2">
                <p className="font-semibold">Total: ${totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-center py-2">
                <Link to="/shoppingcart">
                  <button className="bg-green-600 text-white py-2 px-4 rounded-lg">
                    Go to Cart
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
