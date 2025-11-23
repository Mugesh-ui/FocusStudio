// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bookingsRouter from "./routes/booking.js";  

dotenv.config();
const app = express();

// ✅ ONLY CHANGE MADE: Updated CORS configuration
app.use(cors({
  origin: [
    'https://focusstudiovllr.onrender.com',
    'http://localhost:3000'
  ],
  credentials: true
}));

app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/focusstudio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("Mongo connection error:", err));

// ✅ Root route - Add this to fix "Cannot GET /"
app.get("/", (req, res) => {
  res.json({ 
    message: "🎯 Focus Studio Backend API is running!",
    timestamp: new Date().toISOString(),
    endpoints: {
      root: "GET /",
      bookings: {
        create: "POST /api/bookings",
        getAll: "GET /api/bookings", 
        getByEmail: "GET /api/bookings/email/:email",
        getById: "GET /api/bookings/:id",
        update: "PATCH /api/bookings/:id",
        confirm: "PATCH /api/bookings/:id/confirm",
        cancel: "PATCH /api/bookings/:id/cancel"
      },
      orders: "GET /api/orders",
      quickBooking: "POST /api/booking"
    }
  });
});

// ✅ Mount main bookings router
app.use("/api/bookings", bookingsRouter);

/* ── Extra endpoints if you need simple admin/order listing without a separate router ── */
import Booking from "./models/Booking.js";

// List all orders for admin dashboard
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Booking.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Quick create route if you ever want a bare POST /api/booking (singular)
app.post("/api/booking", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.json({ bookingId: booking._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save booking" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Backend running at http://localhost:${PORT}`)
);
