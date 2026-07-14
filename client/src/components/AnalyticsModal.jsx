import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { getAnalytics } from "../services/urlService";
import toast from "react-hot-toast";

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
                          <th className="px-4 py-2.5">Referrer</th>
                          <th className="px-4 py-2.5">User Agent</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-gray-600">
                        {[...history].map((item, idx) => (
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
                            <td className="px-4 py-2.5 truncate max-w-[120px] font-medium" title={item.referer}>
                              {item.referer
                                ? new URL(item.referer).hostname
                                : "Direct"}
                            </td>
                            <td className="px-4 py-2.5 truncate max-w-[160px] font-medium" title={item.userAgent}>
                              {item.userAgent || "N/A"}
                            </td>
                          </tr>
                        ))}
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
