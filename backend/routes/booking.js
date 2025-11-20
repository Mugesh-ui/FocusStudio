import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

/* ==========================================================
   ✅ CREATE NEW BOOKING (includes services)
   ========================================================== */
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, date, timeSession, place, services } = req.body;

    if (!name || !email || !phone || !date || !place) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const booking = await Booking.create({
      name,
      email,
      phone,
      date,
      timeSession,
      place,
      services,
      status: "pending",
    });

    res.json(booking);
  } catch (err) {
    console.error("Booking creation error:", err);
    res.status(500).json({ error: "Failed to save booking" });
  }
});

/* ==========================================================
   ✅ GET ALL BOOKINGS (Admin View)
   ========================================================== */
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

/* ==========================================================
   ✅ GET BOOKING BY ID
   ========================================================== */
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (err) {
    console.error("Error fetching booking:", err);
    res.status(500).json({ error: "Failed to fetch booking" });
  }
});

/* ==========================================================
   ✅ GET BOOKINGS BY EMAIL (User view)
   ========================================================== */
router.get("/email/:email", async (req, res) => {
  try {
    const bookings = await Booking.find({ email: req.params.email }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings by email:", err);
    res.status(500).json({ error: "Failed to fetch bookings by email" });
  }
});

/* ==========================================================
   ✅ PATCH: UPDATE BOOKING (Confirm / Cancel / Edit)
   ========================================================== */
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(updatedBooking);
  } catch (err) {
    console.error("Error updating booking:", err);
    res.status(500).json({ message: "Server error while updating booking" });
  }
});

/* ==========================================================
   ✅ ADMIN SHORTCUTS — CONFIRM or CANCEL
   ========================================================== */

// Confirm a booking
router.patch("/:id/confirm", async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "confirmed" },
      { new: true }
    );
    if (!updatedBooking)
      return res.status(404).json({ message: "Booking not found" });

    res.json(updatedBooking);
  } catch (err) {
    console.error("Error confirming booking:", err);
    res.status(500).json({ message: "Failed to confirm booking" });
  }
});

// Cancel a booking
router.patch("/:id/cancel", async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );
    if (!updatedBooking)
      return res.status(404).json({ message: "Booking not found" });

    res.json(updatedBooking);
  } catch (err) {
    console.error("Error cancelling booking:", err);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
});

export default router;
