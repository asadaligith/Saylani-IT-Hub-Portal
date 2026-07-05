const mongoose = require("mongoose");

const lostFoundSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["lost", "found"], required: true },
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    status: { type: String, enum: ["Pending", "Found"], default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LostFoundItem", lostFoundSchema);
