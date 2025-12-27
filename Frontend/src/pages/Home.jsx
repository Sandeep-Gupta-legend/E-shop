import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../redux/slices/uiSlice";

const productsData = [
  {
    _id: "1",
    name: "iPhone 15 Pro",
    price: 129999,
    image: "https://picsum.photos/400/300?random=1",
  },
  {
    _id: "2",
    name: "MacBook Pro M3",
    price: 249999,
    image: "https://picsum.photos/400/300?random=2",
  },
  {
    _id: "3",
    name: "Wireless Headphones",
    price: 4999,
    image: "https://picsum.photos/400/300?random=3",
  },
  {
    _id: "4",
    name: "Smart Watch",
    price: 8999,
    image: "https://picsum.photos/400/300?random=4",
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.ui.search || "");

  const filteredProducts = productsData.filter((p) =>
    p.name.toLowerCase().includes((search || "").toLowerCase())
  );

  return (
    <div className="space-y-10">

      {/* HERO */}
      <section className="bg-gradient-to-r from-black to-gray-800 text-white rounded-xl p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Smart Shopping Starts Here 🛒
        </h1>

        <p className="text-gray-300 mb-6">
          Search by typing or using your voice
        </p>

        <div className="flex justify-center">
          <SearchBar value={search} onChange={(val) => dispatch(setSearch(val))} />
        </div>
      </section>

      {/* PRODUCTS */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Products</h2>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />

                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg">
                    {product.name}
                  </h3>

                  <p className="font-medium text-gray-700">
                    ₹{product.price.toLocaleString()}
                  </p>

                  <Link
                    to={`/product/${product._id}`}
                    className="block text-center bg-black text-white py-2 rounded hover:bg-gray-800"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
