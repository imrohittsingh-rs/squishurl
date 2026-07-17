import React, { useState } from "react";
import {
    FaCheck,
    FaArrowUpRightFromSquare,
    FaTrash,
    FaPen,
    FaXmark,
    FaChartSimple
} from "react-icons/fa6";
import { FiCopy } from "react-icons/fi";
import { HiOutlineCursorClick } from "react-icons/hi";
import { BsArrowReturnRight } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import UrlStats from "./UrlStats";


import { toast } from "react-toastify";

const UrlCard = ({ url, backendUrl, onDelete, onUpdate, onViewAnalytics, onExpire }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(url.redirectUrl);
    const [copied, setCopied] = useState(false);
    const [imageError, setImageError] = useState(false);

    // get domain name from url for favicons
    const domain = (() => {
        try {
            const u = new URL(url.redirectUrl); // in-built URL constructor in js
            return u.hostname;
        } catch (error) {
            return null;
        }
    })();

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`${backendUrl}/${url.shortId}`);
            setCopied(true);
            toast.success("Short URL copied!");
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error(error);
            toast.error("Failed to copy URL");
        }
    };

    const handleSave = async () => {
        if (!editValue.trim()) {
            toast.error("Destination URL is required");
            return;
        }
        try {
            await onUpdate(url._id, editValue);
            setIsEditing(false);
        } catch (error) {
            // console.log(error);
            // error is handled by the parent (handleSaveEdit)
        }
    };



    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                <div className="flex items-start md:items-center gap-3.5 flex-grow min-w-0">

                    <div className="w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 flex-shrink-0">
                        {!domain || imageError ? (
                            <TbWorld className="text-gray-400 text-xl" />
                        ) : (
                            <img
                                src={`https://${domain}/favicon.ico`}
                                alt={domain}
                                width="20"
                                height="20"
                                className="rounded-full object-contain"
                                onError={() => setImageError(true)}
                            />
                        )}
                    </div>

                    <div className="min-w-0 flex-grow">
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 text-base md:text-lg truncate">
                                {backendUrl.replace(/^https?:\/\//, "")}/{url.shortId}
                            </span>
                            <button
                                onClick={handleCopy}
                                className="text-gray-400 hover:text-gray-700 cursor-pointer flex-shrink-0 p-1 hover:bg-gray-50 rounded"
                                title="Copy Short URL"
                            >
                                {copied ? (
                                    <FaCheck className="text-green-500 text-sm" />
                                ) : (
                                    <FiCopy className="text-sm" />
                                )}
                            </button>
                        </div>

                        {isEditing ? (
                            <div className="flex items-center gap-2 mt-2 w-full max-w-xl">
                                <input
                                    type="url"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="flex-grow min-w-0 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg px-3 py-1.5 text-base sm:text-sm focus:outline-none focus:border-[#111111]"
                                />
                                <button
                                    onClick={handleSave}
                                    className="text-green-600 hover:text-green-700 p-1.5 hover:bg-green-50 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                                    title="Save Changes"
                                >
                                    <FaCheck />
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setEditValue(url.redirectUrl);
                                    }}
                                    className="text-gray-500 hover:text-gray-700 p-1.5 hover:bg-gray-100/75 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                                    title="Cancel"
                                >
                                    <FaXmark />
                                </button>
                            </div>
                        ) : (
                            <div className="text-gray-400 text-xs md:text-sm flex items-center gap-1.5 mt-1 min-w-0">
                                <BsArrowReturnRight className="flex-shrink-0" />
                                <span className="truncate block flex-1 min-w-0" title={url.redirectUrl}>
                                    <a href={url.redirectUrl} className="text-gray-400 hover:underline transition-all">{url.redirectUrl}</a>
                                </span>
                            </div>
                        )}

                        {!url.expiresAt && (
                            <div className="text-[10px] text-gray-400 mt-1 select-none font-medium">
                                Created {new Date(url.createdAt).toLocaleDateString()}
                            </div>
                        )}

                    </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto mt-2 md:mt-0 pt-3 md:pt-0 border-t border-gray-100 md:border-t-0 flex-shrink-0">
                    {url.expiresAt ? (
                        <UrlStats
                            url={url}
                            onExpire={onExpire}
                        />
                    ) : (
                        <span className="inline-flex items-center gap-1.5 border border-gray-200 bg-white text-gray-600 py-1.5 px-2.5 md:px-3 rounded-lg text-xs font-semibold whitespace-nowrap flex-shrink-0 select-none">
                            <HiOutlineCursorClick className="text-blue-500 text-sm" />
                            {url.visitedHistory?.length || 0} clicks
                        </span>
                    )}

                    <div className="flex items-center gap-1.5">
                        <a
                            href={`${backendUrl}/${url.shortId}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-700 rounded-lg transition-colors cursor-pointer"
                            title="Visit Link"
                        >
                            <FaArrowUpRightFromSquare className="text-xs" />
                        </a>
                        {onViewAnalytics && !url.expiresAt && (
                            <button
                                onClick={() => onViewAnalytics(url)}
                                className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-blue-600 rounded-lg transition-colors cursor-pointer"
                                title="View Analytics"
                            >
                                <FaChartSimple className="text-xs" />
                            </button>
                        )}
                        {!url.expiresAt && (
                            <>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    disabled={isEditing}
                                    className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-[#111111] rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                                    title="Edit Link"
                                >
                                    <FaPen className="text-xs" />
                                </button>
                                <button
                                    onClick={() => onDelete(url._id)}
                                    className="p-2 border border-red-100 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-lg transition-colors cursor-pointer"
                                    title="Delete Link"
                                >
                                    <FaTrash className="text-xs" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UrlCard;
