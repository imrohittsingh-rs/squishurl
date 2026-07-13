import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitedHistory: [
      {
        timestamp: {
          type: Date,
          default: Date.now
        },
        ip: String,
        userAgent: String,
        referer: String,
      }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const URL = mongoose.model("url", urlSchema);

export default URL;
