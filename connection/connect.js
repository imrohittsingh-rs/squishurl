const mongoose = require("mongoose");

async function connectToMongoDb(url) {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("MongoDB connection error", err);
    process.exit(1);
  }
}

module.exports = connectToMongoDb;
