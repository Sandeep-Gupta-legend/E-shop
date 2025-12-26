import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../services/productService";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    loadProduct();
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

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
          onClick={() => dispatch(addToCart(product))}
          className="mt-4 bg-black text-white px-6 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
