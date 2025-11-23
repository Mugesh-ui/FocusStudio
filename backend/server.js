// backend/server.js - FIXED MONGODB CONNECTION
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bookingsRouter from "./routes/booking.js";  

dotenv.config();
const app = express();

// ✅ CORS configuration - CORRECT
app.use(cors({
  origin: [
    'https://focusdigitalvallioor.onrender.com',
    'http://localhost:3000'
  ],
  credentials: true
}));

app.use(express.json());

// ✅ FIXED MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb+srv://focusdigital:1234@cluster0.oqsldsg.mongodb.net/focusstudio?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("Mongo connection error:", err);
    process.exit(1);
  });

// ✅ Root route
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

/* ── Extra endpoints ── */
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

// Quick create route
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
  console.log(`🚀 Backend running on port ${PORT}`)
);
