import Header from "../compotents/Header";
import { useDispatch } from "react-redux";
import { loginStart,loginSuccess } from "../redux/slices/authSlice";
import toast from "react-hot-toast";


const Login = () => {
  const dispatch=useDispatch();

  const handleLogin=()=>{
    dispatch(loginStart());

    setTimeout(()=>{
      const userData={
        id:1,
        name:"sandeep",
        token:"123456789",
        role:"user",
      };

      dispatch(loginSuccess(userData));
      toast.success("Login Successful");
    },1000);
  };
  return (
    
    <div className="bg-white p-6 rounded w-[350px] shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border mb-3"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border mb-3"
      />

      <button onClick={handleLogin} className="w-full bg-black text-white py-2">
        Login
      </button>
    </div>
  );
};

export default Login;
