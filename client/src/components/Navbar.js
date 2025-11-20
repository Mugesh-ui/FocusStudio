import React from "react";
import { Link } from "react-router-dom";   // ✅ Only once

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Gallery</Link>
      <Link to="/services">Services</Link>
      <Link to="/booking">Booking</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
}
