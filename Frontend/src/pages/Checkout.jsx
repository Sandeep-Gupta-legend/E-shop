import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { saveShippingAddress, createOrder } from "../redux/slices/orderSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

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

    // create local order record in redux (frontend)
    dispatch(
      createOrder({
        items: cartItems,
        total: totalPrice,
        paymentMethod,
      })
    );

    const doRazorpay = async () => {
      try {
        const res = await api.post("/payments/razorpay", {
          amount: totalPrice,
          items: cartItems,
        });

        const { orderId, key } = res.data; // backend should return orderId and key (key_id)

        // load Razorpay script
        if (!window.Razorpay) {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          document.body.appendChild(script);
          await new Promise((resolve) => (script.onload = resolve));
        }

        const options = {
          key,
          amount: totalPrice * 100,
          currency: "INR",
          order_id: orderId,
          handler: function (response) {
            // response.razorpay_payment_id etc.
            toast.success("Payment successful");
            dispatch(clearCart());
            navigate("/order-success");
          },
          prefill: {
            contact: phone,
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error(err);
        toast.error("Razorpay payment failed or backend missing");
      }
    };

    const doStripe = async () => {
      try {
        const res = await api.post("/payments/stripe", {
          amount: totalPrice,
          items: cartItems,
        });

        const { sessionId, publishableKey } = res.data; // backend should return sessionId and publishable key

        const stripe = await loadStripe(publishableKey);
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error(error);
          toast.error("Stripe redirect failed");
        }
      } catch (err) {
        console.error(err);
        toast.error("Stripe payment failed or backend missing");
      }
    };

    // Trigger payment flow based on selected method
    if (paymentMethod === "razorpay") {
      doRazorpay();
    } else if (paymentMethod === "stripe") {
      doStripe();
    } else {
      // fallback: no online payment
      dispatch(clearCart());
      navigate("/order-success");
    }
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

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Payment Method</h3>
          <label className="mr-4">
            <input
              type="radio"
              name="payment"
              value="razorpay"
              checked={paymentMethod === "razorpay"}
              onChange={() => setPaymentMethod("razorpay")}
              className="mr-2"
            />
            Razorpay
          </label>

          <label className="mr-4">
            <input
              type="radio"
              name="payment"
              value="stripe"
              checked={paymentMethod === "stripe"}
              onChange={() => setPaymentMethod("stripe")}
              className="mr-2"
            />
            Stripe
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
              className="mr-2"
            />
            Cash on Delivery (COD)
          </label>
        </div>

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
