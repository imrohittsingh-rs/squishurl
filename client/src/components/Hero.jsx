import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FaStar, FaBolt, FaGlobe } from "react-icons/fa6";
import GlowBackground from "./GlowBackground";
import { useAuth } from "../context/AuthContext.jsx"

const Hero = () => {

  const { user } = useAuth();

  return (
    <GlowBackground>
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-50 border border-gray-200/60 text-gray-800 text-xs font-semibold mb-6 shadow-sm pointer-events-none select-none"
        >
          <FaStar className="text-gray-500" size={14} />
          Your Smart URL Manager
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.15] mb-6"
        >
          Long URLs? <br />
          <span className="bg-linear-to-r from-gray-950 via-gray-800 to-gray-950 bg-clip-text text-transparent">
            Not Anymore.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-8 font-medium leading-relaxed"
        >
          A simple, fast, and secure way to manage, edit, and track your URLs.
        </motion.p>

        {user ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Link
              to="/create-url"
              className="w-full sm:w-auto bg-[#111111] hover:bg-black text-white font-semibold rounded-xl px-6 py-3.5 text-sm md:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center cursor-pointer active:scale-[0.98]"
            >
              <FaBolt className="mr-2" size={16} />
              Create New Link
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 font-semibold border border-gray-200 rounded-xl px-6 py-3.5 text-sm md:text-base transition-all flex items-center justify-center cursor-pointer active:scale-[0.98]"
            >
              <FaGlobe className="mr-2" size={16} />
              Go to Dashboard
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Link
              to="/signup"
              className="w-full sm:w-auto bg-[#111111] hover:bg-black text-white font-semibold rounded-xl px-6 py-3.5 text-sm md:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center cursor-pointer active:scale-[0.98]"
            >
              <FaBolt className="mr-2" size={16} />
              Start Shortening — It's Free
            </Link>
            <Link
              to="/features"
              className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 font-semibold border border-gray-200 rounded-xl px-6 py-3.5 text-sm md:text-base transition-all flex items-center justify-center cursor-pointer active:scale-[0.98]"
            >
              <FaGlobe className="mr-2" size={16} />
              Explore Features
            </Link>
          </motion.div>
        )}
      </div>
    </GlowBackground>
  );
};

export default Hero;
