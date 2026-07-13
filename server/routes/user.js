import express from "express";

import { handleUserSignUp, handleUserLogin, handleUserSignOut, getCurrentUser } from "../controllers/user.js";
import { checkUserAuthentication } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", handleUserSignUp);
router.post("/login", handleUserLogin);
router.post("/logout", checkUserAuthentication, handleUserSignOut);

router.get("/me", checkUserAuthentication, getCurrentUser);

export default router;
