import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-3.5 mb-8 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900">
          <img src={logo} alt="SquishUrl Logo" className="w-8 h-8 object-contain rounded-lg" />
          <span>SquishUrl</span>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2.5">
                <div className="w-8.5 h-8.5 rounded-full bg-gray-950 text-white flex items-center justify-center font-bold text-sm shadow-sm select-none">
                  {user.fullName.trim().charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline-block text-gray-600 text-sm">
                  Welcome, <strong className="text-gray-950 font-semibold">{user.fullName}</strong>
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="border border-red-100 hover:border-red-200 text-red-600 hover:bg-red-50 text-xs md:text-sm font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-black text-sm md:text-base font-semibold transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-[#111111] text-white hover:bg-black text-xs md:text-sm font-semibold px-3.5 py-1.5 md:px-4 md:py-2 rounded-lg transition-all active:scale-[0.98]"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
