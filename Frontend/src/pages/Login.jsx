import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authStart, authSuccess } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import { useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Enter email and password");
      return;
    }

    dispatch(authStart());

    setTimeout(() => {
      dispatch(
        authSuccess({
          id: "1",
          name: "User",
          email,
          token: "fake-token",
        })
      );

      toast.success("Login successful");
      navigate("/");
    }, 700);
  };

  return (
    <div className="bg-white p-6 rounded w-[350px] shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2"
        >
          Login
        </button>
      </form>

      {/* ✅ Register Link */}
      <p className="text-center mt-3 text-sm">
        New user?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Create an account
        </span>
      </p>
    </div>
  );
};

export default Login;
