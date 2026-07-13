import React, { useState } from "react";
import {
    FaCheck,
    FaArrowPointer,
    FaArrowUpRightFromSquare,
    FaTrash,
    FaPen,
    FaXmark,
    FaRegClock
} from "react-icons/fa6";
import { FiCopy } from "react-icons/fi";
import { HiOutlineCursorClick } from "react-icons/hi";
import { BsArrowReturnRight } from "react-icons/bs";

import toast from "react-hot-toast";

const UrlCard = ({ url, backendUrl, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(url.redirectUrl);
    const [copied, setCopied] = useState(false);

    const domain = (() => {
        try {
            const u = new URL(url.redirectUrl);
            return u.hostname;
        } catch (e) {
            return "link";
        }
    })();

    const handleCopy = () => {
        navigator.clipboard.writeText(`${backendUrl}/${url.shortId}`);
        setCopied(true);
        toast.success("Short URL copied!");
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSave = async () => {
        if (!editValue.trim()) {
            toast.error("Destination URL is required");
            return;
        }
        try {
            await onUpdate(url._id, editValue);
            setIsEditing(false);
        } catch (e) {
            // Errors handled by parent
        }
    };

    const expirationTime = url.expiresAt
        ? new Date(url.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : "";

    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left details */}
                <div className="flex items-start md:items-center gap-4 flex-grow min-w-0">
                    {/* Favicon */}
                    <div className="w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 flex-shrink-0">
                        <img
                            src={`https://www.google.com/s2/favicons?sz=64&domain=${domain}`}
                            alt={domain}
                            width="20"
                            height="20"
                            className="rounded-full object-contain"
                            onError={(e) => {
                                e.target.src = "https://www.google.com/s2/favicons?sz=64&domain=google.com";
                            }}
                        />
                    </div>

                    <div className="min-w-0 flex-grow">
                        <div className="flex items-center gap-2.5">
                            <span className="font-medium text-gray-900 text-lg">
                                {backendUrl.replace(/^https?:\/\//, "")}/{url.shortId}
                            </span>
                            <button
                                onClick={handleCopy}
                                className="text-gray-400 hover:text-gray-700 cursor-pointer"
                                title="Copy Short URL"
                            >
                                {copied ? (
                                    <FaCheck className="text-green-500" />
                                ) : (
                                    <FiCopy />
                                )}
                            </button>
                        </div>

                        {isEditing ? (
                            <div className="flex items-center gap-2 mt-2 max-w-xl">
                                <input
                                    type="url"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="flex-grow bg-gray-50 text-gray-900 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#111111]"
                                />
                                <button
                                    onClick={handleSave}
                                    className="text-green-600 hover:text-green-700 p-1.5 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                                    title="Save Changes"
                                >
                                    <FaCheck />
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setEditValue(url.redirectUrl);
                                    }}
                                    className="text-gray-500 hover:text-gray-700 p-1.5 hover:bg-gray-100/75 rounded-lg transition-colors cursor-pointer"
                                    title="Cancel"
                                >
                                    <FaXmark />
                                </button>
                            </div>
                        ) : (
                            <div className="text-gray-400 text-sm flex items-center gap-1.5 mt-1">
                                <BsArrowReturnRight />
                                <span className="truncate inline-block max-w-[280px] sm:max-w-[450px]" title={url.redirectUrl}>
                                    <a href={url.redirectUrl} className="text-gray-400 hover:underline transition-all">{url.redirectUrl}</a>
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0 ml-15 md:ml-0">
                    {url.expiresAt ? (
                        (() => {
                            const difference = new Date(url.expiresAt) - new Date();
                            let timeLeft = "Expired";
                            if (difference > 0) {
                                const hrs = Math.floor(difference / (1000 * 60 * 60));
                                const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                                timeLeft = hrs > 0 ? `${hrs}h ${mins}m left` : `${mins}m left`;
                            }
                            return (
                                <div className="flex flex-col border border-gray-200 rounded-xl bg-gray-50/50 text-center overflow-hidden min-w-[90px] shadow-sm select-none">
                                    <div className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-700">
                                        <HiOutlineCursorClick className="text-blue-500 text-sm" />
                                        <span>{url.visitedHistory?.length || 0} clicks</span>
                                    </div>
                                    <div className="border-t border-gray-200"></div>
                                    <div className="flex items-center justify-center gap-1 px-2.5 py-1 text-[10px] font-semibold text-orange-500 bg-white">
                                        <FaRegClock className="text-[10px]" />
                                        <span>{timeLeft}</span>
                                    </div>
                                </div>
                            );
                        })()
                    ) : (
                        <div className="text-right flex flex-col items-end gap-1">
                            <span className="inline-flex items-center gap-1.5 border border-gray-200 bg-white text-gray-600 py-1.5 px-3 rounded-lg text-xs font-semibold">
                                <HiOutlineCursorClick className="text-blue-500 text-sm" />
                                {url.visitedHistory?.length || 0} clicks
                            </span>
                            <div className="text-[10px] text-gray-400">
                                Created {new Date(url.createdAt).toLocaleDateString()}
                            </div>
                        </div>
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
