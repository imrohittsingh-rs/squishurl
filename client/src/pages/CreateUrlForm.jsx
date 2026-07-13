import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { generateShortURL } from "../services/urlService";
import UrlCard from "../components/UrlCard";
import toast from "react-hot-toast";

// Icons
import { FaWandMagicSparkles, FaArrowLeft, FaHouse, FaChartLine } from "react-icons/fa6";

const CreateUrlForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // State
  const [urlInput, setUrlInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [createdUrl, setCreatedUrl] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  // Check guest limits from localStorage (mirroring Home.jsx logic)
  const guestList = JSON.parse(localStorage.getItem("guest_urls") || "[]");
  const isGuestLimitReached = !user && guestList.length >= 1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setSubmitting(true);
    setCreatedUrl(null);

    try {
      const res = await generateShortURL(urlInput);
      toast.success("Short URL generated successfully!");
      setCreatedUrl(res.data);
      setUrlInput("");

      if (!user) {
        // Guest user - sync with localStorage list
        const guestUrls = JSON.parse(localStorage.getItem("guest_urls") || "[]");
        guestUrls.unshift(res.data);
        localStorage.setItem("guest_urls", JSON.stringify(guestUrls));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to generate short URL");
    } finally {
      setSubmitting(false);
    }
  };

  // Callback handlers for the UrlCard
  const handleDeleteCreated = () => {
    // If deleted, reset created link view
    setCreatedUrl(null);
    toast.success("Link dismissed");
  };

  const handleUpdateCreated = (id, updatedUrlStr) => {
    setCreatedUrl((prev) => ({
      ...prev,
      redirectUrl: updatedUrlStr
    }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 animate-fadeIn">
      
      {/* Back Nav Link */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm cursor-pointer"
        >
          <FaArrowLeft /> Back
        </button>
        <div className="flex gap-2">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm"
          >
            <FaHouse /> Home
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm"
            >
              <FaChartLine /> Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* Main card */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-md">
        
        {/* Title details */}
        <div className="mb-6">
          <h2 className="text-2xl font-black text-gray-950 tracking-tight">Create a Short Link</h2>
          <p className="text-gray-400 text-xs mt-1">
            Generate an instantly shareable and traceable short URL redirecting to your destination.
          </p>
        </div>

        {/* Warning for guests */}
        {isGuestLimitReached && (
          <div className="bg-sky-50 border border-sky-100 text-sky-800 text-xs p-4 rounded-2xl mb-6 font-medium animate-fadeIn">
            🚨 <strong>Guest limit reached!</strong> Guest users can only generate 1 temporary link. Please{" "}
            <Link to="/login" className="underline font-bold hover:text-sky-950">
              Login
            </Link>{" "}
            or{" "}
            <Link to="/signup" className="underline font-bold hover:text-sky-950">
              Sign Up
            </Link>{" "}
            to gain unlimited permanent links and track click-by-click analytics!
          </div>
        )}

        {/* Shorten Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="url-input" className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
              Destination URL
            </label>
            <input
              id="url-input"
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder={
                isGuestLimitReached 
                  ? "Sign up to start shortening more URLs!" 
                  : "https://example.com/some/long/messy-url-path"
              }
              required
              disabled={isGuestLimitReached}
              className="w-full bg-gray-50 text-gray-950 border border-gray-200 rounded-2xl px-5 py-4 text-base shadow-sm focus:outline-none focus:ring-4 focus:ring-gray-950/5 focus:border-[#111111] placeholder-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || isGuestLimitReached}
            className="w-full bg-[#111111] hover:bg-black disabled:bg-gray-400 text-white font-bold rounded-2xl py-4 text-sm transition-all shadow-md flex items-center justify-center gap-2.5 active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed"
          >
            {submitting ? "Squishing Link..." : "Shorten URL"}
            <FaWandMagicSparkles className="text-xs" />
          </button>
        </form>

        {/* Successful generation block (renders UrlCard) */}
        {createdUrl && (
          <div className="mt-8 pt-6 border-t border-gray-100 animate-fadeIn">
            <div className="flex items-center justify-between mb-4.5">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Successfully Generated!
              </h4>
              <button
                onClick={() => setCreatedUrl(null)}
                className="text-xs text-gray-400 hover:text-gray-900 font-semibold"
              >
                Shorten Another
              </button>
            </div>
            
            <UrlCard
              url={createdUrl}
              backendUrl={backendUrl}
              onDelete={handleDeleteCreated}
              onUpdate={handleUpdateCreated}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default CreateUrlForm;
