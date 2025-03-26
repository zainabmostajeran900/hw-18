import React from "react";
import { IProduct } from "../types/products";
import { useAppDispatch, useAppSelector } from "../redux/Hook";
import { CartActions } from "../redux/slices/cartSlice";

export const ProductCart: React.FC<IProduct> = (product) => {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) =>
    state.cart.cart.find((item) => item.id === product.id)
  );

  const toggleCart = () => {
    if (cartItem) {
      dispatch(CartActions.remove(product.id));
    } else {
      dispatch(CartActions.add(product));
    }
  };

  return (
    <div className="flex flex-col items-start border border-gray-300 rounded-lg p-5 shadow-md">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover rounded"
      />
      <p className="font-bold text-lg">{product.title}</p>
      <p className="font-bold text-blue-500">${product.price}</p>
      <p className="line-clamp-2 text-gray-700">{product.description}</p>
      <button
        onClick={toggleCart}
        className={`mt-2  p-2 rounded-lg text-white w-full ${cartItem?" bg-red-500":"bg-blue-500"}`}
      >
        {cartItem ? "Remove from cart" : "Add to cart"}
      </button>
    </div>
  );
};
