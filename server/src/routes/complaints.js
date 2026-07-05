const express = require("express");
const Complaint = require("../models/Complaint");
const Notification = require("../models/Notification");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { category, description } = req.body;
    const complaint = await Complaint.create({ user: req.user._id, category, description });
    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const items = await Complaint.find({}).populate("user", "name email").sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Not found" });
    complaint.status = status;
    await complaint.save();

    const note = await Notification.create({
      user: complaint.user,
      title: `Complaint status updated`,
      body: `Your complaint is now ${status}`,
      meta: { type: "complaint", complaintId: complaint._id },
    });

    if (req.app.get("io")) {
      req.app.get("io").to(String(complaint.user)).emit("notification", note);
    }

    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
