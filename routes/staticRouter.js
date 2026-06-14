const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const authMiddleware = require("../middlewares/auth");

router.get("/", authMiddleware, async (req, res) => {
  const allUrls = await URL.find({
    createdBy: req.user.id,
  });
  return res.render("home", {
    urls: allUrls,
    id: req.query.id,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup", { error: null });
});

router.get("/login", (req, res) => {
  return res.render("login", { error: null });
});

module.exports = router;
