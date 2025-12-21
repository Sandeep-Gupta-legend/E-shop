const ProductCard = ({ product }) => {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover"
      />

      <h3 className="font-bold mt-2">{product.name}</h3>
      <p className="text-gray-600">₹{product.price}</p>

      <button className="mt-3 w-full bg-black text-white py-2">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
