require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const lostFoundRoutes = require("./routes/lostFound");
const complaintRoutes = require("./routes/complaints");
const volunteerRoutes = require("./routes/volunteers");
const notificationRoutes = require("./routes/notifications");

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/lostfound", lostFoundRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/notifications", notificationRoutes);

const io = new Server(server, {
  cors: { origin: true },
});

// Attach io to app so routes can emit
app.set("io", io);

io.on("connection", (socket) => {
  const { userId } = socket.handshake.query;
  if (userId) socket.join(userId);
  console.log("Socket connected", socket.id, "userId=", userId);
  socket.on("disconnect", () => {
    console.log("Socket disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Try to connect to database, but continue if it fails
    await connectDB();
    
    server.listen(PORT, () => {
      console.log(`\n✅ Server running on port ${PORT}`);
      console.log("📱 API Ready at http://localhost:${PORT}");
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
// Trigger restart after updating MongoDB URI
