import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import logo from "../assets/images/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData);
      toast.success("Welcome back 🎉");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-[390px] space-y-6">

        <div className="flex flex-col items-center text-center">
          <img src={logo} alt="SquishUrl Logo" className="w-12 h-12 object-contain rounded-xl mb-4" />
          <h2 className="text-2xl font-medium text-gray-900 tracking-tight">
            Login to you account
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 text-sm text-center py-2.5 px-4 rounded-xl font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-1.5">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full bg-white text-gray-950 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-gray-950/5 focus:border-[#111111] placeholder-gray-400 transition-all shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full bg-white text-gray-950 border border-gray-200 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-gray-950/5 focus:border-[#111111] placeholder-gray-400 transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
              >
                {showPassword ? <FaEyeSlash className="text-base" /> : <FaEye className="text-base" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#111111] hover:bg-black disabled:bg-gray-400 text-white font-semibold rounded-xl py-3.5 text-sm transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer mt-3"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-gray-950 hover:text-black font-semibold hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
