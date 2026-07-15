import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/images/logo.png";
import toast from "react-hot-toast";
import { FaBars, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-3.5 mb-8 shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 text-lg sm:text-xl font-bold tracking-tight text-gray-900 shrink-0">
              <img src={logo} alt="SquishUrl Logo" className="w-7 h-7 sm:w-8 sm:h-8 object-contain rounded-lg" />
              <span>SquishUrl</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-4 border-l border-gray-200 pl-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-gray-900 font-bold border-b-2 border-gray-900 pb-0.5"
                      : "text-gray-500 hover:text-gray-900"
                  }`
                }
                end
              >
                Home
              </NavLink>
              {user && (
                <>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `text-sm font-semibold transition-all duration-200 ${
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
                      `text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? "text-gray-900 font-bold border-b-2 border-gray-900 pb-0.5"
                          : "text-gray-500 hover:text-gray-900"
                      }`
                    }
                  >
                    Create Link
                  </NavLink>
                </>
              )}
              <NavLink
                to="/features"
                className={({ isActive }) =>
                  `text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-gray-900 font-bold border-b-2 border-gray-900 pb-0.5"
                      : "text-gray-500 hover:text-gray-900"
                  }`
                }
              >
                Features
              </NavLink>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/profile" className="flex items-center gap-2.5 hover:opacity-85 transition-opacity duration-200" title="View Profile">
                  <div className="w-8.5 h-8.5 rounded-full bg-gray-950 text-white flex items-center justify-center font-bold text-sm shadow-sm select-none">
                    {user.fullName.trim().charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-600 text-sm">
                    Welcome, <strong className="text-gray-950 font-semibold hover:underline">{user.fullName}</strong>
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="border border-red-100 hover:border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border border-gray-300 text-black hover:bg-gray-50 text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#111111] text-white hover:bg-black text-sm font-semibold px-4 py-2 rounded-lg transition-all active:scale-[0.98]"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-950 focus:outline-none p-1.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <FaXmark size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-3.5 pt-3.5 border-t border-gray-100 flex flex-col gap-3.5 animate-fadeIn">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-sm font-semibold transition-all duration-200 ${
                  isActive ? "text-gray-950 font-bold" : "text-gray-500 hover:text-gray-950"
                }`
              }
              end
            >
              Home
            </NavLink>
            {user && (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-sm font-semibold transition-all duration-200 ${
                      isActive ? "text-gray-950 font-bold" : "text-gray-500 hover:text-gray-950"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/create-url"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-sm font-semibold transition-all duration-200 ${
                      isActive ? "text-gray-950 font-bold" : "text-gray-500 hover:text-gray-950"
                    }`
                  }
                >
                  Create Link
                </NavLink>
              </>
            )}
            <NavLink
              to="/features"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-sm font-semibold transition-all duration-200 ${
                  isActive ? "text-gray-950 font-bold" : "text-gray-500 hover:text-gray-950"
                }`
              }
            >
              Features
            </NavLink>

            <div className="border-t border-gray-100 pt-3.5 flex flex-col gap-3">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 py-1 hover:opacity-85 transition-opacity duration-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-950 text-white flex items-center justify-center font-bold text-xs shadow-sm select-none">
                      {user.fullName.trim().charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-600 text-sm font-medium">
                      Welcome, <strong className="text-gray-950 font-semibold">{user.fullName}</strong>
                    </span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-center border border-red-100 hover:border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-center border border-gray-300 text-black hover:bg-gray-50 text-sm font-semibold py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-center bg-[#111111] text-white hover:bg-black text-sm font-semibold py-2 rounded-lg transition-all active:scale-[0.98]"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
