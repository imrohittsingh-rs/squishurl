import { nanoid } from "nanoid";
import URL from "../models/url.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

const handleGenerateNewShortURL = asyncHandler(async (req, res) => {
  const body = req.body;

  if (!body.url) throw new ApiError(400, "Url is required");

  const shortId = nanoid(8);
  const urlData = {
    shortId,
    redirectUrl: body.url,
    visitedHistory: [],
  };

  if (req.user) {
    urlData.createdBy = req.user.id;
  } else {
    // Guest check: only 1 active link allowed per IP
    const existingGuestLink = await URL.findOne({
      createdByIp: req.ip,
      expiresAt: { $gt: new Date() }
    });
    if (existingGuestLink) {
      throw new ApiError(
        400,
        "Guest users can only create one active URL."
      );
    }
    urlData.createdByIp = req.ip;
    // Guest link: valid for 15 minutes
    const GUEST_LINK_EXPIRY_TIME = 60 * 1000;
    urlData.expiresAt = new Date(Date.now() + GUEST_LINK_EXPIRY_TIME);
  }

  const url = await URL.create(urlData);

  return res
    .status(201)
    .json(new ApiResponse(201, url, "Short URL generated successfully"));
});

const handleGetWebsite = asyncHandler(async (req, res) => {
  const entry = await URL.findOneAndUpdate(
    {
      shortId: req.params.shortId,
      $or: [
        { expiresAt: { $exists: false } },
        { expiresAt: { $gt: new Date() } }
      ]
    },
    {
      $push: {
        visitedHistory: {
          timestamp: Date.now(),
          ip: req.ip,
          userAgent: req.headers["user-agent"],
          referer: req.headers["referer"],
        }
      }
    },
    { new: true }
  );

  if (!entry) {
    throw new ApiError(404, "Url not found");
  }

  return res
    .status(302)
    .redirect(entry.redirectUrl);
});

const handleGetUserUrls = asyncHandler(async (req, res) => {
  const urls = await URL.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
  return res
    .status(200)
    .json(new ApiResponse(200, urls, "User URLs fetched successfully"));
});

const handleGetAnalytics = asyncHandler(async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({ shortId });

  if (!entry) {
    throw new ApiError(404, "Url not found");
  }

  if (!entry.createdBy || entry.createdBy.toString() !== req.user.id.toString()) {
    throw new ApiError(403, "You are not authorized to view analytics for this url");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {
      totalClicks: entry.visitedHistory.length,
      visitedHistory: entry.visitedHistory,
    }, "Analytics fetched successfully"));
});

const handleDeleteUrl = asyncHandler(async (req, res) => {
  const deleted = await URL.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user.id
  });
  if (!deleted) {
    throw new ApiError(404, "Url not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, deleted, "Url deleted successfully"));
});

const handleUpdateUrl = asyncHandler(async (req, res) => {
  const updatedUrl = await URL.findOneAndUpdate({
    _id: req.params.id,
    createdBy: req.user.id
  }, {
    redirectUrl: req.body.url
  }, { new: true });

  if (!updatedUrl) {
    throw new ApiError(404, "Url not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUrl, "Url updated successfully"));
});

const handleGetPublicStats = asyncHandler(async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({
    shortId,
    $or: [
      { expiresAt: { $exists: false } },
      { expiresAt: { $gt: new Date() } }
    ]
  });

  if (!entry) {
    throw new ApiError(404, "Url not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {
      shortId: entry.shortId,
      redirectUrl: entry.redirectUrl,
      clicks: entry.visitedHistory.length,
      expiresAt: entry.expiresAt,
      createdAt: entry.createdAt
    }, "Public stats fetched successfully"));
});

export {
  handleGenerateNewShortURL,
  handleGetWebsite,
  handleGetAnalytics,
  handleDeleteUrl,
  handleUpdateUrl,
  handleGetUserUrls,
  handleGetPublicStats
};
