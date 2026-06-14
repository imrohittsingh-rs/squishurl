const express = require("express");
const app = express();
const PORT = 8001;

const cookieParser = require("cookie-parser");

const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const authMiddleware = require("./middlewares/auth");
const { handleGetWebsite } = require("./controllers/url");

const connectToMongoDb = require("./connection/connect");

const path = require("path");

// Connecting to MongoDb
connectToMongoDb("mongodb://localhost:27017/short-url")
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => console.log("Failed to connect", err));

// Setting up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Public routes
app.use("/", staticRouter);
app.use("/user", userRoute);
app.get("/:shortId", handleGetWebsite);

// protecting all routes after this middleware
app.use(authMiddleware);

// Protected routes
app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log(`Server is listning on PORT: ${PORT}`);
});
