import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserUrls } from "../services/urlService";
import toast from "react-hot-toast";

// Icons
import {
    FaUser,
    FaEnvelope,
    FaCalendarDays,
    FaKey,
    FaHouse,
    FaChartPie,
    FaPen
} from "react-icons/fa6";

const Profile = () => {
    const { user, loading: authLoading, logout } = useAuth();
    const navigate = useNavigate();

    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            navigate("/login");
            return;
        }

        const fetchAllUrls = async () => {
            try {
                setLoading(true);
                const res = await getUserUrls();
                setUrls(res.data || []);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load links data");
                toast.error("Failed to load user analytics");
            } finally {
                setLoading(false);
            }
        };

        fetchAllUrls();
    }, [user, authLoading]);

    const joinedOn = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : "Recently Joined";

    // Statistics
    const totalUrls = urls.length;
    const totalClicks = urls.reduce((sum, item) => sum + (item.visitedHistory?.length || 0), 0);
    const averageClicks = totalUrls > 0 ? (totalClicks / totalUrls).toFixed(1) : "0.0";

    if (authLoading || loading) {
        return (
            <div className="flex justify-center items-center py-24">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#111111]"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 pb-20 animate-fadeIn">

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-black text-gray-950 tracking-tight">Account Profile</h1>
                <div className="flex gap-2">
                    <Link
                        to="/"
                        className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm"
                    >
                        <FaHouse /> Home
                    </Link>
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm"
                    >
                        <FaChartPie /> Dashboard
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="md:col-span-1 flex flex-col gap-6">
                    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm text-center relative overflow-hidden flex flex-col items-center">

                        <div className="absolute top-0 inset-x-0 h-2 bg-linear-to-r from-slate-800 via-gray-500 to-stone-200"></div>

                        <div className="w-24 h-24 rounded-full bg-linear-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center font-black text-3xl shadow-md border-4 border-white mt-4 select-none">
                            {user?.fullName?.trim().charAt(0).toUpperCase()}
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 mt-4 truncate max-w-full">
                            {user?.fullName}
                        </h2>
                        <span className="text-xs text-gray-400 font-medium truncate max-w-full">
                            {user?.email}
                        </span>

                        <div className="w-full border-t border-gray-100 my-5"></div>

                        <div className="w-full flex items-center gap-3 text-left text-xs text-gray-500 font-semibold px-2">
                            <FaCalendarDays className="text-gray-400 text-sm flex-shrink-0" />
                            <div>
                                <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-bold">Joined On</span>
                                {joinedOn}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 flex flex-col gap-6">

                    <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
                        <div className="bg-white p-3 sm:p-4.5 rounded-2xl border border-gray-100 shadow-sm text-center">
                            <span className="block text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Links</span>
                            <span className="text-lg sm:text-xl font-black text-gray-900 mt-0.5 block">{totalUrls}</span>
                        </div>
                        <div className="bg-white p-3 sm:p-4.5 rounded-2xl border border-gray-100 shadow-sm text-center">
                            <span className="block text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Clicks</span>
                            <span className="text-lg sm:text-xl font-black text-gray-900 mt-0.5 block">{totalClicks}</span>
                        </div>
                        <div className="bg-white p-3 sm:p-4.5 rounded-2xl border border-gray-100 shadow-sm text-center">
                            <span className="block text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-wider">Avg Clicks</span>
                            <span className="text-lg sm:text-xl font-black text-gray-900 mt-0.5 block">{averageClicks}</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <FaUser className="text-blue-500 text-base" />
                            Personal Credentials
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1.5">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                        <FaUser className="text-xs" />
                                    </span>
                                    <input
                                        type="text"
                                        value={user?.fullName}
                                        disabled
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-xs font-semibold text-gray-600 focus:outline-none"
                                    />
                                    <span className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer" >
                                        <FaPen className="text-gray-400 hover:text-gray-600" />
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1.5">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                        <FaEnvelope className="text-xs" />
                                    </span>
                                    <input
                                        type="email"
                                        value={user?.email}
                                        disabled
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-xs font-semibold text-gray-600 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1.5">
                                    Password Status
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                        <FaKey className="text-xs" />
                                    </span>
                                    <input
                                        type="text"
                                        value="••••••••••••••••"
                                        disabled
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-xs font-semibold text-gray-400 focus:outline-none select-none"
                                    />
                                    <span className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer" >
                                        <FaPen className="text-gray-400 hover:text-gray-600" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;