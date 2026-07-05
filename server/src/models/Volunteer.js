const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    event: { type: String, required: true },
    availability: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Volunteer", volunteerSchema);
