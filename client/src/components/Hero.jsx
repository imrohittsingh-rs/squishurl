import React from "react";
import { HiOutlineLinkSlash } from "react-icons/hi2";

const Hero = () => {
  return (
    <div className="text-center py-12 md:py-16">
      <h1 className="text-4xl md:text-6xl font-extrabold text-[#111111] tracking-tight leading-none mb-4 animate-fadeIn">
        Shorten Your Links <HiOutlineLinkSlash className="inline-block ml-2" />
      </h1>
      <p className="text-gray-500 text-lg md:text-xl max-w-xl mx-auto font-medium">
        A simple, fast, and secure way to manage, edit, and track your URLs.
      </p>
    </div>
  );
};

export default Hero;
