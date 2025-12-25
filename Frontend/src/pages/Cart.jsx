import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const cartState = useSelector((state) => state.cart);
  const cartItems = Array.isArray(cartState?.cartItems)
    ? cartState.cartItems
    : [];

  const total = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 1),
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item._id}
          className="flex gap-4 border-b py-4"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover"
            onError={(e) => {
              e.target.src = "https://picsum.photos/200/200";
            }}
          />

          <div className="flex-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p>₹{item.price}</p>

            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => dispatch(decreaseQty(item._id))}
                className="px-2 border"
              >
                -
              </button>

              <span>{item.qty}</span>

              <button
                onClick={() => dispatch(increaseQty(item._id))}
                className="px-2 border"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => dispatch(removeFromCart(item._id))}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="text-right mt-6">
        <h3 className="text-xl font-bold">Total: ₹{total}</h3>
      </div>
    </div>
  );
};

export default Cart;
