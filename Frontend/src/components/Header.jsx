import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          E-Shop
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link to="/products" className="hover:text-gray-300">
            Products
          </Link>

          <Link to="/cart" className="relative hover:text-gray-300">
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-[1px] rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <span className="text-sm text-gray-300">
                Hi, {user.name}
              </span>

              <button
                onClick={logoutHandler}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
