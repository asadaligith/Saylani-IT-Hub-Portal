const express = require("express");
const Volunteer = require("../models/Volunteer");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { name, event, availability } = req.body;
    const v = await Volunteer.create({ user: req.user._id, name, event, availability });
    res.json(v);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: list all
router.get("/", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: "Forbidden" });
    const items = await Volunteer.find({}).populate("user", "name email").sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
