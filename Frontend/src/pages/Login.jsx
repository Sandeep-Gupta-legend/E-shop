import Header from "../compotents/Header";

const Login = () => {
  <Header />
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

      <button className="w-full bg-black text-white py-2">
        Login
      </button>
    </div>
  );
};

export default Login;
