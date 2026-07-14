import express from "express";
const router = express.Router();

import {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteUrl,
  handleUpdateUrl,
  handleGetUserUrls
} from "../controllers/url.js";
import { checkForAuthentication, checkUserAuthentication } from "../middlewares/auth.js";

router.use(checkForAuthentication);

router.post("/", handleGenerateNewShortURL);
router.get("/analytics/:shortId", checkUserAuthentication, handleGetAnalytics);

router.get("/", checkUserAuthentication, handleGetUserUrls);
router.patch("/:id", checkUserAuthentication, handleUpdateUrl);
router.delete("/:id", checkUserAuthentication, handleDeleteUrl);

export default router;
