const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: {
      type: String,
      enum: ["Internet", "Electricity", "Water", "Maintenance", "Others"],
      required: true,
    },
    description: { type: String, required: true },
    status: { type: String, enum: ["Submitted", "In Progress", "Resolved"], default: "Submitted" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
