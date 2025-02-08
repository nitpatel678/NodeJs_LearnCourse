// First acquire mongoose
const mongoose = require("mongoose");

// Now create a schema
const urlSchema = mongoose.Schema(
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
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true } // Fixes incorrect "timestamp" option
);

// Now Creating a model for that schema
const URL = mongoose.model("URL", urlSchema); // Capitalize collection name for consistency

// Export only the model, not an object
module.exports = URL;
