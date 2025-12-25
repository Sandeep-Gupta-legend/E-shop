import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStart, authSuccess, authFail } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    dispatch(authStart());

    // 🔹 simulate backend signup
    setTimeout(() => {
      const newUser = {
        id: Date.now(),
        name,
        email,
        token: "fake-jwt-token",
        role: "user",
      };

      dispatch(authSuccess(newUser));
      toast.success("Account created successfully!");
      navigate("/");
    }, 800);
  };

  return (
    <div className="bg-white p-6 rounded w-[350px] shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Create Account
      </h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
