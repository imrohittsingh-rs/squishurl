import React from 'react'
import {
  FaLink,
  FaMagnifyingGlass,
  FaBoltLightning,
  FaLock,
  FaChartLine,
  FaUserClock
} from "react-icons/fa6";

const FeatureCard = ({ title, description, icon, children }) => {

  const renderIcon = () => {
    switch (icon) {
      case "FaLink":
        return <FaLink className="text-gray-500" size={16} />;
      case "FaMagnifyingGlass":
        return <FaMagnifyingGlass className="text-gray-500" size={16} />;
      case "FaBoltLightning":
        return <FaBoltLightning className="text-gray-500" size={16} />;
      case "FaLock":
        return <FaLock className="text-gray-500" size={16} />;
      case "FaChartLine":
        return <FaChartLine className="text-gray-500" size={16} />;
      case "FaUserClock":
        return <FaUserClock className="text-gray-500" size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col group">

      <div className="bg-gray-50/70 border border-gray-200/60 rounded-2xl p-5 min-h-[256px] lg:h-64 flex flex-col justify-between shadow-xs relative overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:border-gray-300/80 select-none">
        {children}
      </div>
      
      <div className="mt-4 px-1">
        <h3 className="text-lg font-bold text-gray-950 flex items-center gap-2">
          {renderIcon()}
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;