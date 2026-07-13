import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="max-w-md mx-auto px-4 my-24 text-center">
      <h1 className="text-8xl font-black text-[#111111] tracking-tight animate-bounce">
        404
      </h1>
      <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">Page Not Found</h2>
      <p className="text-gray-500 text-sm md:text-base mb-8">
        The link you followed may be broken, or the page may have been removed.
      </p>
      <Link
        to="/"
        className="inline-block bg-[#111111] hover:bg-black text-white font-semibold rounded-xl px-6 py-3 text-sm transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
