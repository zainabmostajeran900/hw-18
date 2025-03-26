import React from "react";
import { useAppSelector, useAppDispatch } from "../redux/Hook";
import { CartActions } from "../redux/slices/cartSlice";
import { FaTrash } from "react-icons/fa";
import { TotalAside } from "../components/totalAside";

export const ShoppingCart: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col lg:flex-row py-16">
      <div className="flex-grow">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-8 border p-4 mt-2"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-grow">
                <p className="font-semibold">{item.title}</p>
                <p>${item.price}</p>
              </div>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  dispatch(
                    CartActions.updateQuantity({
                      id: item.id,
                      quantity: Number(e.target.value),
                    })
                  )
                }
                className="w-16 border border-gray-300 rounded-md text-center"
              />
              <button
                onClick={() => dispatch(CartActions.remove(item.id))}
                className="text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>
      <TotalAside />
    </div>
  );
};
