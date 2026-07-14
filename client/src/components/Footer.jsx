import React from "react";
import logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-500 py-6 mt-auto border-t border-gray-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="SquishUrl Logo" className="w-8 h-8 object-contain rounded-lg" />
          <span className="text-gray-400 text-sm tracking-tight">
            Simplify Links Like Magic!
          </span>
        </div>
        <div className="text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} SquishUrl. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
