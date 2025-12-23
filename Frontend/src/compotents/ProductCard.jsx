import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-40 w-full object-cover"
          onError={(e) => {
            e.target.src = "https://picsum.photos/400/300";
          }}
        />
      </Link>

      <h3 className="font-bold mt-2">{product.name}</h3>
      <p className="text-gray-600">₹{product.price}</p>

      <Link
        to={`/product/${product._id}`}
        className="block mt-3 text-center bg-black text-white py-2"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
