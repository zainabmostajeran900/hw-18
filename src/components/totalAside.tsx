import { useAppSelector } from "../redux/Hook";
import { Link } from "react-router-dom";

export const TotalAside: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.cart);

  const total = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <aside className="max-w-sm w-full border border-gray-300 rounded-lg bg-slate-900 text-white shadow-md p-4 m-4">
      <p className="text-xl font-semibold">Order Summary</p>
      <div className="mt-4">
        <p>Items: {cartItems.length}</p>
        <p className="text-2xl font-bold">Total: ${total.toFixed(2)}</p>
      </div>
      <Link to="/order">
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg w-full">
          Proceed to Checkout
        </button>
      </Link>
    </aside>
  );
};
