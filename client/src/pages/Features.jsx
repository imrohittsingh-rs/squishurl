import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  FaArrowRight,
  FaCompass,
  FaPen,
  FaTrash,
  FaCopy,
  FaChartLine,
  FaCheck,
  FaRegClock,
  FaGlobe,
  FaGithub,
  FaLinkedin,
  FaChrome,
  FaEdge,
  FaSafari,
} from "react-icons/fa6";
import { FiCopy } from "react-icons/fi";
import { BsArrowReturnRight } from "react-icons/bs";
import { HiOutlineCursorClick } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";

import FeatureCard from "../components/FeatureCard";

const Digit = ({ char }) => {
  return (
    <div className="w-[16px] h-8 overflow-hidden relative flex items-center justify-center font-mono">
      <motion.span
        key={char}
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute text-3xl font-black text-gray-900"
      >
        {char}
      </motion.span>
    </div>
  );
};

const CoreFeatures = [
  {
    title: "Link Shortening",
    description: "Create short, memorable links for easy sharing.",
    icon: "FaLink",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Track clicks, traffic sources, browsers, IP addresses, and visit history.",
    icon: "FaMagnifyingGlass",
  },
  {
    title: "Temporary Guest Link",
    description:
      "Guests can create one temporary link that expires automatically.",
    icon: "FaUserClock",
  },
  {
    title: "Manage Links Easily",
    description:
      "Update destination URLs, delete links, and monitor analytics.",
    icon: "FaBoltLightning",
  },
];

const actions = [
  {
    label: "Edit Links",
    desc: "Update destination URL anytime",
    icon: <FaPen className="text-blue-500" size={10} />,
    bg: "bg-blue-50",
  },
  {
    label: "Delete Links",
    desc: "Permanently remove links",
    icon: <FaTrash className="text-red-500" size={10} />,
    bg: "bg-red-50",
  },
  {
    label: "Copy Link",
    desc: "One-click copy to clipboard",
    icon: <FaCopy className="text-zinc-600" size={10} />,
    bg: "bg-zinc-100",
  },
  {
    label: "View Analytics",
    desc: "Track total clicks and referrers",
    icon: <FaChartLine className="text-emerald-500" size={10} />,
    bg: "bg-emerald-50",
  },
];

const Features = () => {
  const { user } = useAuth();
  const [links, setLinks] = useState([
    {
      short: "squishurl.in/",
      long: "squishurl.in",
      clicks: 1269,
      logo: "https://squishurl.vercel.app/favicon.ico",
    },
    {
      short: "squishurl.in/git",
      long: "https://github.com/imrohittsingh-rs/squishurl",
      clicks: 869,
      logo: "https://github.com/favicon.ico",
    },
    {
      short: "squishurl.in/resume",
      long: "imrohittsingh.vercel.app",
      clicks: 613,
      logo: "https://imrohittsingh.vercel.app/favicon.ico",
    },
  ]);

  const simulateClick = (idx) => {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks[idx].clicks += 1;
      return newLinks;
    });
  };

  const [liveClicks, setLiveClicks] = useState(369);
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveClicks((prev) => prev + 3);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const makeTime = (h, m) => {
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d.getTime();
  };
  const [visits, setVisits] = useState([
    {
      time: makeTime(14, 2),
      source: "GitHub",
      sourceIcon: <FaGithub className="text-gray-700 shrink-0" size={13} />,
      browser: "Chrome",
      browserIcon: <FaChrome className="text-blue-500 shrink-0" size={13} />,
    },
    {
      time: makeTime(13, 55),
      source: "LinkedIn",
      sourceIcon: <FaLinkedin className="text-[#0a66c2] shrink-0" size={13} />,
      browser: "Edge",
      browserIcon: <FaEdge className="text-cyan-500 shrink-0" size={13} />,
    },
    {
      time: makeTime(13, 10),
      source: "Direct",
      sourceIcon: <FaGlobe className="text-gray-400 shrink-0" size={13} />,
      browser: "Safari",
      browserIcon: <FaSafari className="text-blue-600 shrink-0" size={13} />,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisits((prev) => {
        const rotated = [...prev];
        const last = rotated.pop();
        const previousLatest = rotated[0];
        const newTime = previousLatest.time + 25 * 60 * 1000;
        rotated.unshift({ ...last, time: newTime });
        return rotated;
      });
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const [timeLeft, setTimeLeft] = useState(899);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 899 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${String(s).padStart(2, "0")}s`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">
      <div className="text-center pt-8 pb-16 max-w-2xl mx-auto animate-fadeIn">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100/80 border border-gray-200 text-gray-800 text-xs font-semibold mb-6 shadow-sm select-none"
        >
          <FaCompass className="text-blue-600 animate-pulse" size={14} />
          Explore Features
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight leading-tight mb-4">
          More than just a URL shortener
        </h1>
        <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed">
          Create short links, edit destinations, monitor clicks, and manage
          everything from one dashboard.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {/* Card 1 */}
        <FeatureCard {...CoreFeatures[0]}>
          <div className="flex flex-col gap-2.5 w-full">
            {links.map((link, idx) => (
              <div
                key={idx}
                onClick={() => simulateClick(idx)}
                className="bg-white border border-gray-200/50 p-2.5 rounded-xl flex items-center justify-between gap-4 shadow-2xs transition-all select-none hover:border-gray-300/20 hover:shadow-md hover:translate-y-[-2px] cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-gray-100 text-black flex items-center justify-center font-bold text-xs shrink-0 select-none overflow-hidden">
                    <img
                      src={link.logo}
                      alt=""
                      className="w-full h-full object-contain rounded-lg"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-md text-gray-900 flex items-center gap-1 min-w-0">
                      <span className="truncate">{link.short}</span>
                      <FiCopy className="text-xs ml-2.5 shrink-0 text-gray-400 hover:text-gray-700 transition-colors" />
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <BsArrowReturnRight
                        className="text-black shrink-0"
                        size={10}
                      />
                      <span className="truncate max-w-[130px] sm:max-w-[180px] hover:underline">
                        {link.long}
                      </span>
                    </div>
                  </div>
                </div>

                <span className="text-xs font-semibold px-3 py-1 rounded-md bg-[#f4f6f8] text-gray-500 flex items-center gap-1 shrink-0 border border-gray-100">
                  <HiOutlineCursorClick
                    className="text-blue-500 text-sm"
                    size={18}
                  />
                  {link.clicks >= 1000
                    ? `${(link.clicks / 1000).toFixed(1)}k`
                    : link.clicks}
                </span>
              </div>
            ))}
          </div>
        </FeatureCard>

        {/* Card 2*/}
        <FeatureCard {...CoreFeatures[1]}>
          <div className="flex flex-col gap-2.5 w-full h-full justify-between">
            <div className="flex justify-between items-start w-full border-b border-gray-200/40 pb-2">
              <div className="min-w-0">
                <span className="text-md text-gray-900 block">
                  squishurl.in/resume
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-400 ">
                  <BsArrowReturnRight
                    className="text-black shrink-0"
                    size={10}
                  />
                  <span className="truncate max-w-[160px] hover:underline cursor-pointer">
                    imrohittsingh.vercel.app
                  </span>
                </span>
              </div>

              <span className="inline-flex items-center gap-1 text-[8px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 shrink-0 uppercase tracking-wider select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                Live
              </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-3 flex-1 items-stretch lg:items-center min-h-0 w-full">
              <div className="w-full lg:w-[95px] bg-gray-50 border border-gray-200/50 py-2 px-1 rounded-xl text-center select-none shrink-0 flex flex-col justify-center overflow-hidden h-[62px] shadow-2xs">
                <span className="text-[8px] text-gray-400 font-extrabold uppercase tracking-wider block">
                  Total Clicks
                </span>
                <div className="h-8 overflow-hidden flex items-center justify-center mt-0.5">
                  {String(liveClicks)
                    .split("")
                    .map((char, idx) => (
                      <Digit key={idx} char={char} />
                    ))}
                </div>
              </div>

              <div className="flex-1 border border-gray-200/40 rounded-xl overflow-hidden min-h-0 w-full">
                <div className="max-h-[125px] w-full">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="bg-gray-50 text-gray-400 font-bold sticky top-0 shadow-[0_1px_0_0_rgba(0,0,0,0.02)]">
                      <tr className="border-b border-gray-200/40">
                        <th className="px-3 py-1.5">Time</th>
                        <th className="px-3 py-1.5">Source</th>
                        <th className="px-3 py-1.5">Browser</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100/50 text-gray-600 font-medium">
                      {visits.map((visit, index) => (
                        <motion.tr
                          key={visit.source}
                          layout
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                          }}
                          className={`${index % 2 ? "" : "bg-gray-100/60"} transition-colors`}
                        >
                          <td className="px-3 py-2 whitespace-nowrap">
                            {new Date(visit.time).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <span className="flex items-center gap-1 text-gray-800 font-semibold">
                              {visit.sourceIcon}
                              {visit.source}
                            </span>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <span className="flex items-center gap-1 text-gray-700">
                              {visit.browserIcon}
                              {visit.browser}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </FeatureCard>

        {/* Card 3*/}
        <FeatureCard {...CoreFeatures[2]}>
          <div className="flex justify-between items-center w-full border-b border-gray-200/40 pb-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Guest Link
            </span>
            <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-100 shrink-0 uppercase tracking-wider">
              Expires Soon
            </span>
          </div>

          <div className="bg-white border border-gray-200/50 rounded-xl p-3 shadow-2xs flex-grow flex flex-col justify-between my-2">
            <div className="min-w-0">
              <span className="text-md text-gray-900 block">
                squishurl.in/guest-abc
              </span>
              <div className="flex items-center gap-1 text-sm text-gray-400 mt-0.5">
                <BsArrowReturnRight className="text-black shrink-0" size={10} />
                <span className="truncate max-w-[160px]">guest.vercel.app</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg border border-orange-100 bg-orange-50/50 text-[12px] font-semibold text-orange-500 my-1 select-none font-mono">
              <FaRegClock className="text-[12px] shrink-0 animate-pulse" />
              {timeLeft ? (
                <span>Expires in {formatTime(timeLeft)}</span>
              ) : (
                <span>Expired</span>
              )}
            </div>

            <div className="flex gap-2">
              <span className="flex-1 text-center py-1 rounded-lg border border-amber-200 bg-amber-50/50 text-amber-700 text-[12px] font-bold uppercase tracking-wider">
                Guest Only
              </span>
              <span className="flex-1 text-center py-1 rounded-lg border border-green-200 bg-green-50/50 text-green-700 text-[12px] font-bold uppercase tracking-wider">
                1 Active Link
              </span>
            </div>
          </div>
        </FeatureCard>

        {/* Card 4*/}
        <FeatureCard {...CoreFeatures[3]}>
          {/* Simple list of action items */}
          <div className="grow flex flex-col justify-center gap-2 w-full my-1.5">
            {actions.map((action, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-white border border-gray-200/50 p-2.5 rounded-xl shadow-2xs hover:bg-gray-50/50 transition-colors select-none group/row"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-6 h-6 rounded-lg ${action.bg} flex items-center justify-center shrink-0`}
                  >
                    {action.icon}
                  </div>
                  <div className="min-w-0 flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                    <span className="text-sm text-gray-900 font-bold sm:font-normal leading-normal sm:w-[115px] sm:shrink-0 text-left">
                      {action.label}
                    </span>
                    <span className="text-xs text-gray-400 truncate leading-normal">
                      {action.desc}
                    </span>
                  </div>
                </div>

                {/* Green check mark */}
                <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <FaCheck className="text-emerald-600" size={8} />
                </div>
              </div>
            ))}
          </div>
        </FeatureCard>
      </div>

      {/* Footer Section */}
      <div className="mt-20 text-center bg-white border border-gray-200/60 p-8 md:p-12 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-gray-50 to-transparent rounded-full -mr-10 -mt-10 pointer-events-none"></div>
        <div className="relative z-10 max-w-lg mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight mb-3">
            Ready to shorten your first URL?
          </h2>
          <p className="text-gray-500 text-sm md:text-base mb-8 font-medium">
            Create an account for unlimited links, <br />
            or try SquishURL instantly as a guest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {!user ? (
              <Link
                to="/signup"
                className="w-full sm:w-auto bg-black hover:bg-zinc-950 text-white font-semibold px-6 py-3.5 rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] cursor-pointer"
              >
                Get Started for Free
                <FaArrowRight size={14} />
              </Link>
            ) : (
              <Link
                to="/create-url"
                className="w-full sm:w-auto bg-black hover:bg-zinc-950 text-white font-semibold px-6 py-3.5 rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] cursor-pointer"
              >
                Create Your Own Link
                <FaArrowRight size={14} />
              </Link>
            )}
            {!user ? (
              <Link
                to="/login"
                className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 font-semibold border border-gray-200 px-6 py-3.5 rounded-xl text-sm transition-all flex items-center justify-center active:scale-[0.98] cursor-pointer"
              >
                Log In
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 font-semibold border border-gray-200 px-6 py-3.5 rounded-xl text-sm transition-all flex items-center justify-center active:scale-[0.98] cursor-pointer"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
