// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    'https://focusdigitalvallioor.onrender.com',
    'http://localhost:3000'
  ],
  credentials: true
}));

app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGO_URI || "mongodb+srv://focusdigital:focusdigital1234@cluster0.oqsldsg.mongodb.net/focusstudio?retryWrites=true&w=majority";

console.log("🔗 Connecting to MongoDB Atlas...");

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Atlas connected successfully!');
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
});

// ✅ FIXED: Root route with proper syntax
app.get("/", (req, res) => {
  res.json({ 
    message: "🎯 Focus Studio Backend API is running!",
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
    endpoints: {  // ✅ Added missing comma above and fixed object structure
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

// SIMPLE booking routes (temporary - without the problematic router)
import Booking from "./models/Booking.js";

// Get all bookings
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new booking
app.post("/api/bookings", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.json({ 
      success: true,
      _id: booking._id,
      message: "Booking created successfully"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get booking by ID
app.get("/api/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update booking status
app.patch("/api/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get orders (same as bookings)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Booking.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
