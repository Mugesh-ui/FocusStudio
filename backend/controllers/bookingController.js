import Booking from "../models/Booking.js";

// ✅ Create booking
export const createBooking = async (req, res) => {
  try {
    const { name, email, phone, date, timeSession, place, services } = req.body;
    const booking = await Booking.create({
      name,
      email,
      phone,
      date,
      timeSession,
      place,
      services, // ✅ include services
    });
    res.status(201).json(booking);
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ error: "Failed to create booking" });
  }
};

// ✅ Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

// ✅ Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Failed to update booking status" });
  }
};

// ✅ Get booking by email
export const getBookingByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const bookings = await Booking.find({ email });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch booking" });
  }
};
