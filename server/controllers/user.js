import User from "../models/user.js";
import { setUserSession } from "../service/auth.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import { generateTokenForUser } from "../utils/authentication.js";

const handleUserSignUp = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "Email already registered");
  }

  const user = await User.create({
    fullName,
    email,
    password,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User register sucessfully"))
});

const handleUserLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found")
  }

  const isPasswordMatch = await user.isPasswordCorrect(password)
  if (!isPasswordMatch) {
    throw new ApiError(400, "Incorrect password");
  }

  const token = generateTokenForUser(user);

  const cookieName = process.env.COOKIE_NAME || "uid";
  const isProduction = process.env.NODE_ENV === "production" || process.env.CORS_ORIGIN?.startsWith("https://");
  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { user, token }, "User logged in successfully"));
});

const handleUserSignOut = asyncHandler(async (req, res) => {
  const cookieName = process.env.COOKIE_NAME || "uid";
  const isProduction = process.env.NODE_ENV === "production" || process.env.CORS_ORIGIN?.startsWith("https://");

  res.clearCookie(cookieName, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
  });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if(!user) {
    throw new ApiError(401, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Current user fetched successfully"));
});

export {
  handleUserSignUp,
  handleUserLogin,
  handleUserSignOut,
  getCurrentUser
};
