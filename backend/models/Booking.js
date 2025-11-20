// backend/models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    timeSession: { type: String, required: true },
    place: { type: String, required: true },
    services: [{ type: String }],       // ✅ New field: list of selected services
    status: { type: String, default: "pending" },
    adminMessage: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
