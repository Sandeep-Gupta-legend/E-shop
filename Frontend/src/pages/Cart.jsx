import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
} from "../redux/slices/cartSlice";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center text-lg">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item._id}
          className="flex gap-4 items-center border-b py-4"
        >
          <img
            src={item.image}
            className="w-20 h-20 object-cover"
            alt=""
          />

          <div className="flex-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p>₹{item.price}</p>
          </div>

          <input
            type="number"
            min="1"
            value={item.qty}
            onChange={(e) =>
              dispatch(
                updateQuantity({
                  id: item._id,
                  qty: Number(e.target.value),
                })
              )
            }
            className="w-16 border px-2 py-1"
          />

          <button
            onClick={() => dispatch(removeFromCart(item._id))}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="text-right mt-6 text-xl font-bold">
        Total: ₹{totalPrice}
      </div>
    </div>
  );
};

export default Cart;
