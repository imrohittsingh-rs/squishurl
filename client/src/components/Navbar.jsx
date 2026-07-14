import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/images/logo.png";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    toast.success("Logged out successfully")
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-3.5 mb-8 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 text-lg sm:text-xl font-bold tracking-tight text-gray-900 shrink-0">
            <img src={logo} alt="SquishUrl Logo" className="w-7 h-7 sm:w-8 sm:h-8 object-contain rounded-lg" />
            <span className="hidden sm:inline">SquishUrl</span>
          </Link>
          {user && (
            <div className="flex items-center gap-2.5 sm:gap-4 border-l border-gray-200 pl-2.5 sm:pl-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-gray-900 font-bold border-b-2 border-gray-900 pb-0.5"
                      : "text-gray-500 hover:text-gray-900"
                  }`
                }
                end
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-gray-900 font-bold border-b-2 border-gray-900 pb-0.5"
                      : "text-gray-500 hover:text-gray-900"
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/create-url"
                className={({ isActive }) =>
                  `text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-gray-900 font-bold border-b-2 border-gray-900 pb-0.5"
                      : "text-gray-500 hover:text-gray-900"
                  }`
                }
              >
                Create Link
              </NavLink>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/profile" className="flex items-center gap-2.5 hover:opacity-85 transition-opacity duration-200" title="View Profile">
                <div className="w-8.5 h-8.5 rounded-full bg-gray-950 text-white flex items-center justify-center font-bold text-sm shadow-sm select-none">
                  {user.fullName.trim().charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline-block text-gray-600 text-sm">
                  Welcome, <strong className="text-gray-950 font-semibold hover:underline">{user.fullName}</strong>
                </span>
              </Link>
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
