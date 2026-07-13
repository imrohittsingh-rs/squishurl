import { nanoid } from "nanoid";
import URL from "../models/url.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

const handleGenerateNewShortURL = asyncHandler(async (req, res) => {
  const body = req.body;
  if (!body.url) throw new ApiError(400, "Url is required");

  const shortId = nanoid(8);
  const url = await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitedHistory: [],
    createdBy: req.user.id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, url, "Short URL generated successfully"));
});

const handleGetWebsite = asyncHandler(async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
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
    { new: true },
  );

  if (!entry) {
    throw new ApiError(404, "Url not found");
  }

  return res
    .status(302)
    .json(new ApiResponse(302, entry, "Url redirected successfully"));
});

const handleGetAnalytics = asyncHandler(async (req, res) => {
  const shortId = req.params.shortId;
  
  const entry = await URL.findOne({
    shortId: shortId,
    createdBy: req.user.id,
  });

  if (!entry) {
    throw new ApiError(404, "Url not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {
      totalClicks: entry.visitedHistory.length,
      visitedHistory: entry.visitedHistory,
    }, "Analytics fetched successfully"));
});

export {
  handleGenerateNewShortURL,
  handleGetWebsite,
  handleGetAnalytics,
};
