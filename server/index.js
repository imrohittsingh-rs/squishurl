import "dotenv/config"

import app from "./app.js";
import connectToMongoDb from "./connection/connect.js";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT || 8000;

// Connecting to MongoDb
connectToMongoDb(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("MongoDB connection error", err));
