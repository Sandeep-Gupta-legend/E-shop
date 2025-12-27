import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../services/productService";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Failed to load product", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;

  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      <img
        src={product.image}
        alt={product.name}
        className="w-full rounded"
      />

      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>

        <p className="text-xl font-semibold mt-4">
          ₹{product.price}
        </p>

        <button
          onClick={() => {
            dispatch(addToCart(product));
            toast.success("Added to cart");
          }}
          className="mt-4 bg-black text-white px-6 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
