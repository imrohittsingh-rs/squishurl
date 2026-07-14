import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { generateShortURL } from "../services/urlService";
import UrlCard from "../components/UrlCard";
import AnalyticsModal from "../components/AnalyticsModal";
import toast from "react-hot-toast";

import { FaWandMagicSparkles, FaArrowLeft, FaHouse, FaChartLine } from "react-icons/fa6";

const CreateUrlForm = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [urlInput, setUrlInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [createdUrl, setCreatedUrl] = useState(null);
  const [activeAnalyticsUrl, setActiveAnalyticsUrl] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    if(authLoading) return;
    if(!user) {
      navigate("/login");
      return;
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    setSubmitting(true);
    setCreatedUrl(null);

    try {
      const res = await generateShortURL(urlInput);
      toast.success("Short URL generated successfully!");
      setCreatedUrl(res.data);
      setUrlInput("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to generate short URL");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCreated = () => {
    setCreatedUrl(null);
    toast.success("Link deleted successfully");
  };

  const handleUpdateCreated = (id, updatedUrlStr) => {
    setCreatedUrl((prev) => ({
      ...prev,
      redirectUrl: updatedUrlStr
    }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 animate-fadeIn">
      
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

      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-md">
        
        <div className="mb-6">
          <h2 className="text-2xl font-black text-gray-950 tracking-tight">Create a Short Link</h2>
          <p className="text-gray-400 text-xs mt-1">
            Generate an instantly shareable and traceable short URL redirecting to your destination.
          </p>
        </div>

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
              placeholder="https://example.com/some/long/messy-url-path"
              required
              className="w-full bg-gray-50 text-gray-950 border border-gray-200 rounded-2xl px-5 py-4 text-base shadow-sm focus:outline-none focus:ring-4 focus:ring-gray-950/5 focus:border-[#111111] placeholder-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#111111] hover:bg-black disabled:bg-gray-400 text-white font-bold rounded-2xl py-4 text-sm transition-all shadow-md flex items-center justify-center gap-2.5 active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed"
          >
            {submitting ? "Squishing Link..." : "Shorten URL"}
            <FaWandMagicSparkles className="text-xs" />
          </button>
        </form>

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
              onViewAnalytics={setActiveAnalyticsUrl}
            />
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

export default CreateUrlForm;
