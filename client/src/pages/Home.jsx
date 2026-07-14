import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Hero from "../components/Hero";
import UrlCard from "../components/UrlCard";
import AnalyticsModal from "../components/AnalyticsModal";
import Loader from "../components/Loader";

import {
  generateShortURL,
  getUserUrls,
  deleteUrl,
  updateUrl,
  getPublicStats
} from "../services/urlService.js";
import { FaWandMagicSparkles } from "react-icons/fa6";

const Home = () => {
  const { user } = useAuth();

  const [urls, setUrls] = useState([]);
  const [urlInput, setUrlInput] = useState("");
  const [generatedId, setGeneratedId] = useState("");

  const [activeAnalyticsUrl, setActiveAnalyticsUrl] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
  const isGuestLimitReached = !user && urls.length >= 1;

  const fetchGuestUrl = async () => {
    const guestLink = JSON.parse(localStorage.getItem("guest_url") || "null");

    if (guestLink) {
      setUrls([guestLink]);
      try {
        const statsRes = await getPublicStats(guestLink.shortId);
        const updatedLink = {
          ...guestLink,
          clicks: statsRes.data.clicks,
          expiresAt: statsRes.data.expiresAt,
        };
        setUrls([updatedLink]);
        localStorage.setItem("guest_url", JSON.stringify(updatedLink));
      } catch (err) {
        if (err.response?.status === 404) {
          localStorage.removeItem("guest_url");
          setUrls([]);
        } else {
          console.error("Failed to fetch guest link stats:", err);
        }
      }
    } else {
      setUrls([]);
    }
  };

  const fetchUserUrls = async () => {
    localStorage.removeItem("guest_url");
    try {
      const resData = await getUserUrls();
      setUrls(resData.data);
    } catch (err) {
      toast.error("Failed to fetch shortened links");
    }
  };

  const fetchUrls = async () => {
    if (user) {
      await fetchUserUrls();
    } else {
      await fetchGuestUrl();
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUrls();
  }, [user]);

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    setSubmitting(true);
    setGeneratedId("");

    try {
      const resData = await generateShortURL(urlInput);
      setGeneratedId(resData.data.shortId);
      toast.success("Short URL created!");
      setUrlInput("");

      if (!user) {
        // Store single guest link in localStorage
        const guestUrl = {
          ...resData.data,
          clicks: resData.data.visitedHistory?.length || 0,
        };

        localStorage.setItem("guest_url", JSON.stringify(guestUrl));
      }

      fetchUrls(); // Refresh the list
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to shorten URL");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this URL?")) {
        return;
      }
      await deleteUrl(id);
      toast.success("URL deleted successfully");
      setUrls((prev) => prev.filter((url) => url._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete URL");
    }
  };

  const handleSaveEdit = async (id, newUrl) => {
    try {
      const resData = await updateUrl(id, newUrl);
      toast.success("Destination URL updated!");
      setUrls(
        (prev) => prev.map((url) =>
          url._id === id ? { ...url, redirectUrl: resData.data.redirectUrl } : url
        )
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update URL");
      throw err;
    }
  };

  const handleExpiredCard = async (id) => {
    localStorage.removeItem("guest_url");
    setUrls([]);
    toast.error("Your temporary link has expired!");
    try {
      if (id) {
        await deleteUrl(id);
      }
    } catch {
      // Ignored: handled by mongodb TTL
    }
  };

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedId(""), 2000);
    } catch (err) {
      toast.error("Failed to copy to clipboard!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-16">
      <Hero />
      <div className="bg-white p-4 md:p-6 mb-8 rounded-2xl border border-gray-100 shadow-md">
        {generatedId && (
          <div className="bg-sky-50 border border-sky-100 text-sky-800 flex items-center justify-between gap-4 p-4 rounded-xl mb-5 text-sm md:text-base animate-fadeIn">
            <div className="truncate">
              <strong className="mr-2">Success!</strong> URL Generated:{" "}
              <a
                href={`${backendUrl}/${generatedId}`}
                target="_blank"
                rel="noreferrer"
                className="underline font-semibold text-[#111111] hover:text-black break-all"
              >
                {backendUrl.replace(/^https?:\/\//, "")}/{generatedId}
              </a>
            </div>
            <button
              onClick={() => copyToClipboard(`${backendUrl}/${generatedId}`, "success-alert")}
              className={`text-xs md:text-sm font-semibold py-2 px-4 rounded-lg shrink-0 transition-all active:scale-95 cursor-pointer ${copiedId === "success-alert"
                ? "bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200/80"
                : "bg-[#111111] hover:bg-black text-white"
                }`}
            >
              {copiedId === "success-alert" ? "Copied!" : "Copy"}
            </button>
          </div>
        )}

        <form onSubmit={handleShorten} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-grow">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder={isGuestLimitReached ? "Guest limit reached. Sign up to create more links!" : "Enter a destination URL"}
              required
              disabled={isGuestLimitReached}
              className="w-full bg-white text-gray-900 border border-gray-200 rounded-xl px-5 py-3.5 text-base shadow-sm focus:outline-none focus:ring-4 focus:ring-gray-950/10 focus:border-[#111111] placeholder-gray-400 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
          <button
            type="submit"
            disabled={submitting || isGuestLimitReached}
            className="bg-[#111111] hover:bg-black disabled:bg-gray-400 text-white font-bold rounded-xl px-6 py-3.5 text-sm md:text-base transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Shortening..." : "Shorten"}
            <FaWandMagicSparkles className="text-sm md:text-base" />
          </button>
        </form>
      </div>

      {!user && urls.length > 0 && (
        <div className="p-4 rounded-xl mb-6 text-xs md:text-sm font-medium flex items-center justify-between animate-fadeIn bg-orange-50 border border-orange-100 text-orange-800">
          <span>
            {isGuestLimitReached && (
              <>
                🚨 <strong>Guest limit reached!</strong> You can only create 1 temporary link. Please{" "}
                <Link to="/login" className="underline font-bold hover:text-orange-950">
                  Login
                </Link>{" "}
                or{" "}
                <Link to="/signup" className="underline font-bold hover:text-orange-950">
                  Sign Up
                </Link>{" "}
                to create unlimited permanent links, update redirect URLs, and track links over time.
              </>
            )}
          </span>
        </div>
      )}

      <div>
        <h4 className="text-xl font-bold mb-4 text-gray-800">Your Shortened Links</h4>

        {loading ? (
          <Loader />
        ) : urls.length > 0 ? (
          <div className="flex flex-col gap-4">
            {urls.map((url, idx) => (
              <UrlCard
                key={url._id || idx}
                url={url}
                backendUrl={backendUrl}
                onDelete={handleDelete}
                onUpdate={handleSaveEdit}
                onViewAnalytics={user ? setActiveAnalyticsUrl : undefined}
                onExpire={!user ? () => handleExpiredCard(url._id) : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white text-center py-12 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-400 text-lg">No shortened URLs yet. Shorten one above!</p>
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

export default Home;
