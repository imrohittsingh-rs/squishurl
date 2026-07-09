const express = require("express");
const app = express();


const cookieParser = require("cookie-parser");
const dotenv = require("dotenv")
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config()
const PORT = process.env.PORT || 8000;

const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const authMiddleware = require("./middlewares/auth");
const { handleGetWebsite } = require("./controllers/url");

const connectToMongoDb = require("./connection/connect");

const path = require("path");

// Connecting to MongoDb
connectToMongoDb(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => console.log("Failed to connect", err));

// Setting up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.locals.PORT = PORT;

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
  console.log(`Server is listening on PORT: ${PORT}`);
});
