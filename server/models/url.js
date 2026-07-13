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
      required: false,
    },
    expiresAt: {
      type: Date,
      index: { expires: 0 }, // TTL index: MongoDB automatically deletes the document when expiresAt is reached
    },
    createdByIp: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const URL = mongoose.model("url", urlSchema);

export default URL;
