import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../store/cartSlice";
import { clearCart } from "../store/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();

  const handleRemove = (productId) => {
    dispatch(removeItem(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Your Cart</h2>
      {cartItems.length > 0 && (
        <button
          onClick={handleClearCart}
          className="bg-red-600 text-white px-4 py-2 mb-16 rounded-lg shadow-md hover:bg-red-700 transition flex items-center gap-2"
        >
          🗑️ Clear Cart
        </button>
      )}

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty 🛒</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cartItems.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-32 h-40 object-contain mb-4"
              />
              <h4 className="text-lg font-semibold">{product.title}</h4>
              <h3 className="text-xl font-bold text-blue-600">
                ${product.price}
              </h3>
              <button
                onClick={() => handleRemove(product.id)}
                className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Remove from Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
