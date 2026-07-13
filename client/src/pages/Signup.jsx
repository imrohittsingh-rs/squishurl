import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import logo from "../assets/images/logo.png";
import { FaEye, FaEyeSlash, FaCircleCheck } from "react-icons/fa6";

const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
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

  const password = formData.password;

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const isPasswordValid = Object.values(checks).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isPasswordValid) {
      setError("Please satisfy all password requirements.");
      toast.error("Password requirements not met");
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      toast.success("Account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-[390px] space-y-6">

        <div className="flex flex-col items-center text-center">
          <img src={logo} alt="SquishUrl Logo" className="w-12 h-12 object-contain rounded-xl mb-4" />
          <h2 className="text-2xl font-medium text-gray-900 tracking-tight">
            Create your SquishUrl account
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 text-sm text-center py-2.5 px-4 rounded-xl font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-1.5">
              Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full bg-white text-gray-950 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-gray-950/5 focus:border-[#111111] placeholder-gray-400 transition-all shadow-sm"
            />
          </div>

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

            <div className="flex flex-wrap gap-x-3.5 gap-y-2 mt-3 text-[11px] font-medium text-gray-400">
              <div className="flex items-center gap-1.5">
                <FaCircleCheck className={`w-3.5 h-3.5 shrink-0 overflow-visible transition-colors ${checks.length ? "text-emerald-500" : "text-gray-300"}`} />
                <span>8 characters</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaCircleCheck className={`w-3.5 h-3.5 shrink-0 overflow-visible transition-colors ${checks.uppercase ? "text-emerald-500" : "text-gray-300"}`} />
                <span>Uppercase letter</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaCircleCheck className={`w-3.5 h-3.5 shrink-0 overflow-visible transition-colors ${checks.lowercase ? "text-emerald-500" : "text-gray-300"}`} />
                <span>Lowercase letter</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaCircleCheck className={`w-3.5 h-3.5 shrink-0 overflow-visible transition-colors ${checks.number ? "text-emerald-500" : "text-gray-300"}`} />
                <span>Number</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaCircleCheck className={`w-3.5 h-3.5 shrink-0 overflow-visible transition-colors ${checks.special ? "text-emerald-500" : "text-gray-300"}`} />
                <span>Special character</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#111111] hover:bg-black disabled:bg-gray-400 text-white font-semibold rounded-xl py-3.5 text-sm transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer mt-3"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-gray-950 hover:text-black font-semibold hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
