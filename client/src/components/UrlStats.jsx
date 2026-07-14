import React from "react";
import { HiOutlineCursorClick } from "react-icons/hi";
import { FaRegClock } from "react-icons/fa6";

const UrlStats = ({ url }) => {
    const difference = new Date(url.expiresAt) - new Date();
    let timeLeft = "Expired";
    if (difference > 0) {
        const hrs = Math.floor(difference / (1000 * 60 * 60));
        const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        timeLeft = hrs > 0 ? `${hrs}h ${mins}m left` : `${mins}m left`;
    }

    return (
        <div className="flex flex-row md:flex-col border border-gray-200 rounded-xl bg-gray-50/50 text-center overflow-hidden min-w-[90px] shadow-sm select-none">
            <div className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-700">
                <HiOutlineCursorClick className="text-blue-500 text-sm" />
                <span>{url.visitedHistory?.length || 0} clicks</span>
            </div>
            <div className="hidden md:block border-t border-gray-200"></div>
            <div className="border-l md:border-l-0 md:border-t border-gray-200"></div>
            <div className="flex items-center justify-center gap-1 px-2.5 py-1.5 md:py-1 text-[10px] font-semibold text-orange-500 bg-white">
                <FaRegClock className="text-[10px]" />
                <span>{timeLeft}</span>
            </div>
        </div>
    );
};

export default UrlStats;
