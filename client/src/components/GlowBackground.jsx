import React from "react";
import { motion } from "motion/react";
import { FaLink } from "react-icons/fa6";

const GlowBackground = ({ children }) => {
  return (
    <section
      className="relative w-full overflow-hidden py-16 md:py-24 text-center px-4"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 50%, rgba(17, 24, 39, 0.07) 0%, rgba(209, 213, 219, 0.18) 45%, rgba(255, 255, 255, 0) 70%)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-100 to-transparent" />

      <motion.div
        className="absolute left-2 md:left-14 top-[12%] w-6 h-6 md:w-8 md:h-8 text-gray-200/60 pointer-events-none select-none"
        animate={{
          y: [0, -12, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <FaLink className="w-full h-full" />
      </motion.div>
      <motion.div
        className="absolute left-4 md:left-24 bottom-[12%] w-5 h-5 md:w-6 md:h-6 text-gray-200/40 pointer-events-none select-none"
        animate={{
          y: [0, -10, 0],
          rotate: [-8, -15, -8],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <FaLink className="w-full h-full" />
      </motion.div>

      <motion.div
        className="absolute right-2 md:right-16 top-[15%] w-6 h-6 md:w-7 md:h-7 text-gray-200/50 pointer-events-none select-none"
        animate={{
          y: [0, -16, 0],
          rotate: [12, 4, 12],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <FaLink className="w-full h-full" />
      </motion.div>
      <motion.div
        className="absolute right-4 md:right-28 bottom-[15%] w-7 h-7 md:w-9 md:h-9 text-gray-200/60 pointer-events-none select-none"
        animate={{
          y: [0, -12, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      >
        <FaLink className="w-full h-full" />
      </motion.div>

      {children}
    </section>
  );
};

export default GlowBackground;
