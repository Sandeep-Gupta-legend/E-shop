import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const { id } = useParams();
  const { items } = useSelector((state) => state.products);

  const product = items.find((p) => p._id === id);

  if (!product) {
    return <p className="p-6">Product not found</p>;
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-80 object-cover"
      />

      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl text-gray-600 mt-2">₹{product.price}</p>

        <p className="mt-4 text-gray-700">
          Premium quality product with top performance and reliability.
        </p>

        <button className="mt-6 bg-black text-white px-6 py-3">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
