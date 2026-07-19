import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { FaXmark, FaDownload, FaCheck, FaCopy } from "react-icons/fa6";
import { toast } from "react-toastify";

const QRCodeModal = ({ url, shortId, onClose }) => {
  const [copied, setCopied] = useState(false);

  const qrRef = useRef(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Short URL copied!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy URL");
    } finally {
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const svgElement = qrRef.current.querySelector("svg");
    if (!svgElement) return;

    // convert svg element to a string
    const svgString = new XMLSerializer().serializeToString(svgElement);

    // create a blob from the string
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });

    // create a temporary URL for the blob
    const blobURL = URL.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      // create a canvas element
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext("2d");

      // Draw background
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw SVG onto canvas
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Create download link
      const pngURL = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngURL;
      downloadLink.download = `${shortId}-qrcode.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(blobURL);
      toast.success("QR Code downloaded!");
    };
    image.src = blobURL;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden flex flex-col shadow-2xl border border-gray-100 p-6 animate-scaleIn transition-all select-none relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          <FaXmark className="text-lg" />
        </button>

        <div className="text-center mt-2 mb-6">
          <h3 className="text-xl font-black text-gray-900 tracking-tight">
            QR Code
          </h3>
          <p className="text-xs text-gray-400 mt-1 truncate max-w-xs mx-auto">
            Scan to visit the shortened link
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-100/80 p-6 rounded-2xl flex flex-col items-center justify-center shadow-inner mb-6">
          <div
            ref={qrRef}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
          >
            <QRCodeSVG
              value={url}
              size={180}
              level={"H"}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              marginSize={false}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-2 mb-6 text-sm">
          <span className="text-gray-600 font-medium truncate max-w-[220px]">
            {url.replace(/^https?:\/\//, "")}
          </span>
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-gray-700 cursor-pointer flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
            title="Copy URL"
          >
            {copied ? (
              <FaCheck className="text-green-500 text-sm" />
            ) : (
              <FaCopy className="text-sm" />
            )}
          </button>
        </div>

        <button
          onClick={handleDownload}
          className="w-full bg-[#111111] hover:bg-black text-white font-bold rounded-2xl py-3.5 text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
        >
          <FaDownload className="text-xs" />
          Download PNG
        </button>
      </div>
    </div>
  );
};

export default QRCodeModal;
