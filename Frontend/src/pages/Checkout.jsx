import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { saveShippingAddress, createOrder } from "../redux/slices/orderSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const placeOrderHandler = () => {
    if (!address || !city || !pincode || !phone) {
      alert("Please fill all fields");
      return;
    }

    dispatch(
      saveShippingAddress({
        address,
        city,
        pincode,
        phone,
      })
    );

    dispatch(
      createOrder({
        items: cartItems,
        total: totalPrice,
      })
    );

    dispatch(clearCart());

    navigate("/order-success");
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center text-lg">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      {/* Shipping Form */}
      <div>
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* Order Summary */}
      <div className="border rounded p-4">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between mb-2"
          >
            <span>
              {item.name} × {item.qty}
            </span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}

        <hr className="my-3" />

        <p className="text-lg font-bold">
          Total: ₹{totalPrice}
        </p>

        <button
          onClick={placeOrderHandler}
          className="mt-4 w-full bg-black text-white py-2"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
