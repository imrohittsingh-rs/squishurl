import React, { useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaGoogle,
  FaFacebook,
  FaChrome,
  FaEdge,
  FaFirefoxBrowser,
  FaSafari,
  FaGlobe,
  FaWhatsapp
} from "react-icons/fa";
import { FaXTwitter, FaXmark } from "react-icons/fa6";
import { getAnalytics } from "../services/urlService";
import { toast } from "react-toastify";

const sourceMap = {
  "github.com": {
    label: "GitHub",
    icon: <FaGithub className="text-gray-900 shrink-0" size={13} />,
  },
  "linkedin.com": {
    label: "LinkedIn",
    icon: <FaLinkedin className="text-blue-600 shrink-0" size={13} />,
  },
  "x.com": {
    label: "X (Twitter)",
    icon: <FaXTwitter className="text-gray-900 shrink-0" size={13} />,
  },
  "google.com": {
    label: "Google",
    icon: <FaGoogle className="text-yellow-600 shrink-0" size={13} />,
  },
  "facebook.com": {
    label: "Facebook",
    icon: <FaFacebook className="text-blue-700 shrink-0" size={13} />,
  },
  "whatsapp.com": {
    label: "WhatsApp",
    icon: <FaWhatsapp className="text-green-600 shrink-0" size={13} />,
  },
  "web.whatsapp.com": {
    label: "WhatsApp",
    icon: <FaWhatsapp className="text-green-600 shrink-0" size={13} />,
  }
};

const handleReferer = (item) => {
  if (!item.referer) return {
    label: "Direct",
    icon: <FaGlobe className="text-gray-700 shrink-0" size={13} />,
  };

  try {
    const hostname = new URL(item.referer)
      .hostname
      .replace(/^www\./, "") // remove www. Prefix if present
      .toLowerCase();

    return sourceMap[hostname] || {
      label: hostname,
      icon: <FaGlobe className="text-gray-700 shrink-0" size={13} />,
    };
  } catch {
    return {
      label: "Unknown",
      icon: <FaGlobe className="text-gray-700 shrink-0" size={13} />,
    };
  }
};

const getBrowser = (userAgent = "") => {
  const lower = userAgent.toLowerCase();

  if (lower.includes("edg")) {
    return {
      label: "Edge",
      icon: <FaEdge className="text-cyan-500 shrink-0" size={13} />,
    };
  } else if (lower.includes("chrome")) {
    return {
      label: "Chrome",
      icon: <FaChrome className="text-blue-500 shrink-0" size={13} />,
    };
  } else if (lower.includes("firefox")) {
    return {
      label: "Firefox",
      icon: <FaFirefoxBrowser className="text-orange-500 shrink-0" size={13} />,
    };
  } else if (lower.includes("safari")) {
    return {
      label: "Safari",
      icon: <FaSafari className="text-blue-600 shrink-0" size={13} />,
    };
  } else {
    return {
      label: "Unknown",
      icon: <FaGlobe className="text-gray-700 shrink-0" size={13} />,
    };
  }
};

const AnalyticsModal = ({ url, onClose, backendUrl }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await getAnalytics(url.shortId);
        setData(res.data);
      } catch (err) {
        toast.error("Failed to load analytics");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics()
  }, [url]);

  const history = data?.visitedHistory || [];
  const totalClicks = history.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-xl border border-gray-100 animate-scaleIn transition-all">

        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Link Analytics</h3>
            <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[280px] sm:max-w-md">
              {backendUrl.replace(/^https?:\/\//, "")}/{url.shortId} &rarr; {url.redirectUrl}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <FaXmark className="text-lg" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-grow space-y-5">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
              <span className="text-xs text-gray-400 font-medium">Loading analytics...</span>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">No clicks recorded for this link yet.</p>
            </div>
          ) : (
            <>
              <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl text-center select-none">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Clicks</span>
                <span className="block text-3xl font-black text-gray-900 mt-1">{totalClicks}</span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Visits Log</h4>
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto max-h-[300px]">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead className="bg-gray-50 text-gray-500 font-semibold sticky top-0 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
                        <tr className="border-b border-gray-100">
                          <th className="px-4 py-2.5">Time</th>
                          <th className="px-4 py-2.5">IP Address</th>
                          <th className="px-4 py-2.5">Source</th>
                          <th className="px-4 py-2.5">Browser</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-gray-600">
                        {[...history].reverse().map((item, idx) => {
                          const source = handleReferer(item);
                          const browser = getBrowser(item.userAgent);
                          return (
                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-4 py-2.5 whitespace-nowrap font-medium">
                                {new Date(item.timestamp).toLocaleString("en-IN", {
                                  dateStyle: "medium",
                                  timeStyle: "short"
                                })}
                              </td>
                              <td className="px-4 py-2.5 font-mono text-[11px] whitespace-nowrap font-semibold">
                                {item.ip || "N/A"}
                              </td>
                              <td className="px-4 py-2.5 truncate max-w-[120px] font-medium font-semibold text-gray-900" title={item.referer}>
                                <div className="flex items-center gap-2">
                                  {source.icon}
                                  <span className="font-medium font-semibold text-gray-900">{source.label}</span>
                                </div>
                              </td>
                              <td className="px-4 py-2.5 truncate max-w-[160px] font-medium" title={item.userAgent}>
                                <div className="flex items-center gap-2">
                                  {browser.icon}
                                  <span className="font-medium font-semibold text-gray-900">{browser.label}</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default AnalyticsModal;
