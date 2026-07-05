const express = require("express");
const multer = require("multer");
const LostFound = require("../models/LostFoundItem");
const Notification = require("../models/Notification");
const auth = require("../middleware/auth");
const { uploadToCloudinary } = require("../config/cloudinary");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { type, title, description } = req.body;
    let img;
    
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      img = result.secure_url;
    }
    
    const item = await LostFound.create({ user: req.user._id, type, title, description, image: img });
    res.json(item);
  } catch (err) {
    console.error("Error creating lost/found item:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const items = await LostFound.find({}).populate("user", "name email").sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const item = await LostFound.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    item.status = status;
    await item.save();

    const note = await Notification.create({
      user: item.user,
      title: `Lost/Found status updated: ${item.title}`,
      body: `Status changed to ${status}`,
      meta: { type: "lostfound", itemId: item._id },
    });

    // Emit via socket (if available)
    if (req.app.get("io")) {
      req.app.get("io").to(String(item.user)).emit("notification", note);
    }

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
