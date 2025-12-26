import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>✅ Order Placed Successfully</h1>
      <p>Thank you for your purchase!</p>

      <Link to="/products">
        <button style={{ marginTop: "20px", padding: "10px 20px" }}>
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default OrderSuccess;
