import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-hot-toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="border rounded p-4 shadow">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover"
      />

      <h3 className="font-bold mt-2">{product.name}</h3>
      <p>₹{product.price}</p>

      <button
        onClick={() => {
          dispatch(addToCart(product));
          toast.success("Added to cart");
        }}
        className="mt-3 w-full bg-black text-white py-2"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
