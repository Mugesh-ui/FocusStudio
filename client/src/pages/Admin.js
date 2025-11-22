import React, { useState, useEffect } from "react";
import Swal from './sweetalert2';
import "./Admin.css";

export default function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(null);

  // ✅ Add background styles directly in component
  useEffect(() => {
    // Set background styles dynamically with blur
    document.body.style.backgroundImage = "url('/scrolling.jpg')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.position = 'relative';
    
    // Add overlay with blur effect
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
    overlay.style.backdropFilter = 'blur(15px)';
    overlay.style.zIndex = '-1';
    overlay.id = 'admin-overlay';
    document.body.appendChild(overlay);

    // Cleanup function
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.position = '';
      
      const existingOverlay = document.getElementById('admin-overlay');
      if (existingOverlay) {
        document.body.removeChild(existingOverlay);
      }
    };
  }, []);

  // ✅ Check admin login token
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token === "focusstudioadmin") setIsAuthenticated(true);
  }, []);

  // ✅ Login function
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "focusstudioadmin") {
      localStorage.setItem("adminToken", password);
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("❌ Incorrect credentials! Access denied.");
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  // ✅ Fetch bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://focusstudio-backend.onrender.com/api/bookings");
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchBookings();
  }, [isAuthenticated]);

  // ✅ Confirm booking with popup
  const handleConfirm = async (id) => {
    const result = await Swal.fire({
      title: "Confirm Booking?",
      text: "Are you sure you want to mark this booking as confirmed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {
      setUpdating(id);

      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "confirmed" }),
      });

      if (!res.ok) throw new Error("Failed to update booking status");
      const updated = await res.json();

      // Update UI immediately
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: updated.status } : b))
      );

      Swal.fire("✅ Confirmed!", "Booking has been confirmed successfully.", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setUpdating(null);
    }
  };

  // ✅ Login Page
  if (!isAuthenticated) {
    return (
      <div className="admin-container">
        <div className="login-box-clear">
          <div className="login-header">
            <h2>Focus Studio Admin</h2>
            <p>Enter your credentials to access the dashboard</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn">Login to Dashboard</button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    );
  }

  // ✅ Dashboard Page
  return (
    <div className="admin-container">
      <div className="dashboard-clear">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>📊 Admin Dashboard</h1>
            <p>Manage all bookings and customer requests</p>
          </div>
          <button onClick={handleLogout} className="logout-btn-clear">🚪 Logout</button>
        </header>

        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-info">
              <h3>{bookings.length}</h3>
              <p>Total Bookings</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{bookings.filter(b => b.status === 'confirmed').length}</h3>
              <p>Confirmed</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>{bookings.filter(b => !b.status || b.status === 'pending').length}</h3>
              <p>Pending</p>
            </div>
          </div>
        </div>

        <div className="bookings-section">
          <h2 className="section-title">All Bookings</h2>
          
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading bookings...</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Contact</th>
                    <th>Date & Time</th>
                    <th>Location</th>
                    <th>Services</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="no-data">
                        <div className="empty-state">
                          <span className="empty-icon">📭</span>
                          <p>No bookings found</p>
                          <small>All new bookings will appear here</small>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    bookings.map((booking) => (
                      <tr key={booking._id} className="booking-row">
                        <td data-label="Customer">
                          <div className="customer-info">
                            <strong>{booking.name}</strong>
                          </div>
                        </td>
                        <td data-label="Contact">
                          <div className="contact-info">
                            <div>{booking.email}</div>
                            <div className="phone">{booking.phone}</div>
                          </div>
                        </td>
                        <td data-label="Date & Time">
                          <div className="datetime-info">
                            <div className="date">{booking.date}</div>
                            <div className="time">{booking.timeSession}</div>
                          </div>
                        </td>
                        <td data-label="Location">
                          <span className="location">{booking.place}</span>
                        </td>
                        <td data-label="Services">
                          <div className="services-list">
                            {Array.isArray(booking.services)
                              ? booking.services.join(", ")
                              : booking.services || "—"}
                          </div>
                        </td>
                        <td data-label="Status">
                          <span className={`status-badge ${booking.status === "confirmed" ? "confirmed" : "pending"}`}>
                            {booking.status === "confirmed" ? "✅ Confirmed" : "⏳ Pending"}
                          </span>
                        </td>
                        <td data-label="Action">
                          {booking.status !== "confirmed" ? (
                            <button
                              onClick={() => handleConfirm(booking._id)}
                              disabled={updating === booking._id}
                              className={`action-btn confirm-action ${updating === booking._id ? "updating" : ""}`}
                            >
                              {updating === booking._id ? "🔄 Updating..." : "✅ Confirm"}
                            </button>
                          ) : (
                            <span className="confirmed-label">Confirmed</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
