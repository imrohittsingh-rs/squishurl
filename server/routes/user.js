import express from "express";

import { handleUserSignUp, handleUserLogin, handleUserSignOut, getCurrentUser } from "../controllers/user.js";

const router = express.Router();

router.post("/", handleUserSignUp);
router.post("/login", handleUserLogin);
router.get("/logout", handleUserSignOut);
router.get("/signout", handleUserSignOut);
router.get("/getCurrentUser", getCurrentUser);

export default router;
