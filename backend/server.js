// backend/server.js - 
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bookingsRouter from "./routes/booking.js";
import Booking from "./models/Booking.js";

dotenv.config();
const app = express();

// ✅ CORS configuration
app.use(cors({
  origin: [
    'https://focusdigitalvallioor.onrender.com',
    'http://localhost:3000'
  ],
  credentials: true
}));

app.use(express.json());

// ✅ Optimized MongoDB Connection
const MONGODB_URI = process.env.MONGO_URI || "mongodb+srv://focusdigital:focusdigital1234@cluster0.oqsldsg.mongodb.net/focusstudio?retryWrites=true&w=majority";

console.log("🔗 Connecting to MongoDB Atlas...");

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  w: 'majority'
};

mongoose.connect(MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log('✅ MongoDB Atlas connected successfully!');
    console.log('📊 Database:', mongoose.connection.db?.databaseName);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check MongoDB Atlas → Network Access → Add IP 0.0.0.0/0');
    console.log('2. Verify credentials in environment variables');
    console.log('3. Restart Render service after changes');
    process.exit(1);
  });

// Connection events monitoring
mongoose.connection.on('connected', () => {
  console.log('🎉 Mongoose connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

// ✅ Health check route with DB status
app.get("/", (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = {
    0: 'disconnected',
    1: 'connected', 
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({ 
    message: "🎯 Focus Studio Backend API is running!",
    status: "operational",
    database: statusMap[dbStatus] || 'unknown',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      health: "GET /",
      bookings: "GET/POST /api/bookings",
      orders: "GET /api/orders",
      quickBooking: "POST /api/booking"
    }
  });
});

// ✅ Mount bookings router
app.use("/api/bookings", bookingsRouter);

// ✅ Admin orders endpoint
app.get("/api/orders", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: "Database not connected" });
    }
    
    const orders = await Booking.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Orders fetch error:", err);
    res.status(500).json({ 
      error: "Failed to fetch orders", 
      details: err.message 
    });
  }
});

// ✅ Quick booking endpoint
app.post("/api/booking", async (req, res) => {
  try {
    console.log("📥 Received booking request:", req.body);
    
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: "Database not connected" });
    }
    
    const booking = await Booking.create(req.body);
    console.log("✅ Booking saved successfully:", booking._id);
    
    res.json({ 
      success: true,
      bookingId: booking._id,
      message: "Booking created successfully"
    });
  } catch (err) {
    console.error("💥 Booking creation error:", err);
    res.status(500).json({ 
      error: "Failed to save booking",
      details: err.message
    });
  }
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('🚨 Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// ✅ 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    availableEndpoints: {
      root: 'GET /',
      bookings: 'GET/POST /api/bookings',
      orders: 'GET /api/orders',
      quickBooking: 'POST /api/booking'
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`🌐 Access URL: https://focusstudio-backend.onrender.com`);
  console.log(`📊 MongoDB Status: ${mongoose.connection.readyState === 1 ? 'Connected ✅' : 'Disconnected ❌'}`);
});
