const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "Url is required" });

  const shortId = nanoid(8);
  try {
    await URL.create({
      shortId: shortId,
      redirectUrl: body.url,
      visitedHistory: [],
      createdBy: req.user.id,
    });

    const allUrls = await URL.find({ createdBy: req.user.id });

    res.status(201).redirect(`/?id=${shortId}`); // Redirect to home page with the new short URL ID as a query parameter
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function handleGetWebsite(req, res) {
  const shortId = req.params.shortId;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId: shortId },
      { $push: { visitedHistory: {} } },
      { new: true },
    );
    if (!entry) {
      return res.status(404).json({ error: "Url not found" });
    }
    res.status(302).redirect(entry.redirectUrl);
  } catch (err) {
    res.status(404).json({ error: "Url not found" });
  }
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;

  try {
    const entry = await URL.findOne({
      shortId: shortId,
      createdBy: req.user.id,
    });

    if (!entry) {
      return res.status(404).json({
        error: "URL not found",
      });
    }

    return res.status(200).json({
      totalClicks: entry.visitedHistory.length,
      visitedHistory: entry.visitedHistory,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetWebsite,
  handleGetAnalytics,
};
