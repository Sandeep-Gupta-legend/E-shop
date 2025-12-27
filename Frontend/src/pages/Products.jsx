import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-hot-toast";
import { fetchProducts } from "../services/productService";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { setSearch } from "../redux/slices/uiSlice";

const Products = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const search = useSelector((state) => state.ui.search || "");

  useEffect(() => {
    let mounted = true;
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (mounted) setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadProducts();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <p className="p-6 text-center">Loading products...</p>;

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6 max-w-xl mx-auto">
        <SearchBar value={search} onChange={(val) => dispatch(setSearch(val))} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover rounded"
              />
            </Link>

            <h3 className="font-bold mt-2">{product.name}</h3>
            <p className="text-gray-600">₹{product.price}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => {
                  dispatch(addToCart(product));
                  toast.success("Added to cart");
                }}
                className="flex-1 bg-black text-white py-2 rounded"
              >
                Add to Cart
              </button>

              <Link
                to={`/product/${product._id}`}
                className="flex-1 text-center border py-2 rounded"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
