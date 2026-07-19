import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getUserUrls,
  deleteUrl,
  updateUrl
} from "../services/urlService";
import UrlCard from "../components/UrlCard";
import AnalyticsModal from "../components/AnalyticsModal";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

import { FaPlus, FaLink, FaChartSimple, FaArrowPointer } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { HiOutlineCursorClick } from "react-icons/hi";

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [activeAnalyticsUrl, setActiveAnalyticsUrl] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate("/login");
      return;
    }
    
    const fetchUrls = async () => {
      try {
        setLoading(true);
        const res = await getUserUrls();
        setUrls(res.data || []);
      } catch (err) {
        toast.error("Failed to retrieve shortened links");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, [user, authLoading, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this short URL?")) return;
    try {
      await deleteUrl(id);
      toast.success("URL deleted successfully");
      setUrls(urls.filter((url) => url._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete URL");
    }
  };

  const handleUpdate = async (id, newUrl) => {
    try {
      const res = await updateUrl(id, newUrl);
      toast.success("Destination URL updated!");
      setUrls(
        urls.map((url) =>
          url._id === id ? { ...url, redirectUrl: res.data.redirectUrl } : url
        )
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update URL");
      throw err;
    }
  };

  // Metrics Calculations
  const totalLinks = urls.length;
  const totalClicks = urls.reduce((sum, item) => sum + (item.visitedHistory?.length || 0), 0);
  const averageClicks = totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : "0.0";
  const mostPopular = [...urls].sort(
    (a, b) => (b.visitedHistory?.length || 0) - (a.visitedHistory?.length || 0)
  )[0];

  // Filtering & Sorting
  const query = searchTerm.toLowerCase();

  const filteredUrls = urls
    .filter((url) => {
      return (
        url.shortId.toLowerCase().includes(query) ||
        url.redirectUrl.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);

        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);

        case "clicks_desc":
          return (b.visitedHistory?.length || 0) -
            (a.visitedHistory?.length || 0);

        case "clicks_asc":
          return (a.visitedHistory?.length || 0) -
            (b.visitedHistory?.length || 0);

        default:
          return 0;
      }
    });

  if (authLoading || (!user && authLoading)) {
    return <Loader />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20 animate-fadeIn">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-950 tracking-tight">Your Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Monitor link click history, user demographics, and manage short codes.
          </p>
        </div>
        <Link
          to="/create-url"
          className="bg-[#111111] hover:bg-black text-white font-bold rounded-2xl px-6 py-3.5 text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98] w-max"
        >
          <FaPlus className="text-xs" />
          Create New Link
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Links</span>
            <span className="block text-2xl font-black text-gray-950 mt-1">{totalLinks}</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-blue-500 bg-blue-50 py-1 px-2.5 rounded-full w-max">
            <FaLink /> Tracked
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Clicks</span>
            <span className="block text-2xl font-black text-gray-950 mt-1">{totalClicks}</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-green-500 bg-green-50 py-1 px-2.5 rounded-full w-max">
            <HiOutlineCursorClick /> Visits
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Avg Clicks / Link</span>
            <span className="block text-2xl font-black text-gray-950 mt-1">{averageClicks}</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-purple-500 bg-purple-50 py-1 px-2.5 rounded-full w-max">
            <FaChartSimple /> Engagement Ratio
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Most Popular</span>
            <span className="block text-sm font-bold text-gray-950 mt-2 truncate">
              <Link to={`${backendUrl}/${mostPopular?.shortId}`} target="_blank" className="hover:underline">
                {mostPopular ? `${backendUrl.replace(/^https?:\/\//, "")}/${mostPopular.shortId}` : "None"}
              </Link>
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-amber-500 bg-amber-50 py-1 px-2.5 rounded-full w-max">
            <FaArrowPointer /> {mostPopular?.visitedHistory?.length || 0} Clicks
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 p-5 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-950">Links Management</h2>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">

            <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <FiSearch className="text-sm" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search link or short code..."
                className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-xl pl-9.5 pr-4 py-2 text-base sm:text-xs focus:outline-none focus:border-[#111111] placeholder-gray-400 transition-colors"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-50 text-gray-700 text-base sm:text-xs border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#111111] cursor-pointer"
            >
              <option value="newest">Sort by Date: Newest</option>
              <option value="oldest">Sort by Date: Oldest</option>
              <option value="clicks_desc">Sort by Clicks: High to Low</option>
              <option value="clicks_asc">Sort by Clicks: Low to High</option>
            </select>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : filteredUrls.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredUrls.map((url) => (
              <UrlCard
                key={url._id}
                user={user}
                url={url}
                backendUrl={backendUrl}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                onViewAnalytics={setActiveAnalyticsUrl}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">
              {searchTerm ? "No matches found for your search query." : "You haven't shortened any links yet."}
            </p>
            {!searchTerm && (
              <Link
                to="/create-url"
                className="inline-block mt-4 bg-[#111111] hover:bg-black text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-all active:scale-[0.98]"
              >
                Create your first link
              </Link>
            )}
          </div>
        )}
      </div>

      {activeAnalyticsUrl && (
        <AnalyticsModal
          url={activeAnalyticsUrl}
          onClose={() => setActiveAnalyticsUrl(null)}
          backendUrl={backendUrl}
        />
      )}
    </div>
  );
};

export default Dashboard;
