import React, { useState, useEffect } from "react";
import "./Booking.css";

export default function Booking() {
  const defaultServices = [
    "Wedding Photography",
    "Event Videography",
    "Photo Framing",
    "Photo Printing",
    "Portrait Session",
  ];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeSession, setTimeSession] = useState("AM");
  const [place, setPlace] = useState("");
  const [services, setServices] = useState([]);
  const [customService, setCustomService] = useState("");
  const [message, setMessage] = useState("");
  const [bookingId, setBookingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Use your actual backend URL
  const API_BASE = "https://focusstudio-backend.onrender.com";

  // ✅ Background styles
  useEffect(() => {
    document.body.style.backgroundImage = "url('/scrolling.jpg')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundRepeat = 'no-repeat';
    
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
    overlay.style.backdropFilter = 'blur(15px)';
    overlay.style.zIndex = '-1';
    overlay.id = 'booking-overlay';
    document.body.appendChild(overlay);

    return () => {
      document.body.style.backgroundImage = '';
      const existingOverlay = document.getElementById('booking-overlay');
      if (existingOverlay) document.body.removeChild(existingOverlay);
    };
  }, []);

  // Poll for booking confirmation
  useEffect(() => {
    if (!bookingId) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE}/api/bookings/${bookingId}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.status === "confirmed") {
          setMessage("🎉 Your booking is CONFIRMED by the admin!");
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [bookingId]);

  const handleServiceToggle = (service) => {
    setServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleAddCustomService = () => {
    if (customService.trim() && !services.includes(customService)) {
      setServices((prev) => [...prev, customService]);
      setCustomService("");
    }
  };

  // ✅ FIXED Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // Validate required fields
    if (!name || !email || !phone || !date || !place) {
      setMessage("❌ Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      console.log("Submitting booking to:", `${API_BASE}/api/bookings`);
      
      const bookingData = {
        name,
        email,
        phone,
        date,
        timeSession,
        place,
        services: services.length > 0 ? services : ["General Photography Service"],
      };

      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      
      console.log("Response status:", res.status);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error response:", errorText);
        throw new Error(`Server error: ${res.status} - ${errorText}`);
      }
      
      const data = await res.json();
      console.log("Booking response:", data);
      
      setBookingId(data._id || data.bookingId);
      setMessage("✅ Booking request sent! Status: PENDING. We'll notify you when confirmed.");
      
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      setPlace("");
      setTimeSession("AM");
      setServices([]);
      setCustomService("");
      
    } catch (err) {
      console.error("Booking error:", err);
      setMessage(`❌ Booking failed: ${err.message}. Please try again or contact us directly.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-container-blur">
      <div className="booking-header">
        <h1>📅 Book Your Session</h1>
        <p>Fill out the form below to book your photography or printing services</p>
      </div>
      
      <div className="booking-form-blur">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <label>Full Name *</label>
              <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter your full name"
                required 
              />
            </div>
            <div className="input-group">
              <label>Email Address *</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email"
                required 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Phone Number *</label>
              <input 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="Enter your phone number"
                required 
              />
            </div>
            <div className="input-group">
              <label>Preferred Date *</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="time-session-blur">
            <label>Time Session</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  value="AM"
                  checked={timeSession === "AM"}
                  onChange={() => setTimeSession("AM")}
                />
                <span>🌅 Morning (AM)</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  value="PM"
                  checked={timeSession === "PM"}
                  onChange={() => setTimeSession("PM")}
                />
                <span>🌇 Afternoon (PM)</span>
              </label>
            </div>
          </div>

          <div className="services-section-blur">
            <h3>🎯 Select Your Services</h3>
            <div className="service-boxes-blur">
              {defaultServices.map((service) => (
                <div
                  key={service}
                  className={`service-box-blur ${services.includes(service) ? "active" : ""}`}
                  onClick={() => handleServiceToggle(service)}
                >
                  <span className="service-icon">
                    {service === "Wedding Photography" && "💍"}
                    {service === "Event Videography" && "🎬"}
                    {service === "Photo Framing" && "🖼️"}
                    {service === "Photo Printing" && "🖨️"}
                    {service === "Portrait Session" && "📸"}
                  </span>
                  {service}
                </div>
              ))}
            </div>
            
            <div className="custom-service-blur">
              <label>Custom Service Request</label>
              <div className="custom-input-group">
                <input
                  type="text"
                  placeholder="Enter custom service"
                  value={customService}
                  onChange={(e) => setCustomService(e.target.value)}
                />
                <button type="button" onClick={handleAddCustomService} className="add-service-btn">
                  ➕ Add
                </button>
              </div>
            </div>
            
            {services.length > 0 && (
              <div className="selected-services-blur">
                <strong>Selected Services:</strong>
                <div className="selected-tags">
                  {services.map((service, index) => (
                    <span key={index} className="service-tag">
                      {service}
                      <button 
                        type="button" 
                        onClick={() => handleServiceToggle(service)}
                        className="remove-tag"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="input-group">
            <label>📍 Location *</label>
            <input
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Enter your location or venue address"
              required
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn-blur"
            disabled={loading}
          >
            {loading ? "🔄 Booking..." : "🚀 Book Now"}
          </button>
        </form>
      </div>

      {message && (
        <div className="booking-popup-overlay">
          <div className="booking-popup-content-blur">
            <div className="popup-header">
              {message.includes("CONFIRMED") ? "🎉 Congratulations!" : 
               message.includes("failed") ? "❌ Error" : "📋 Booking Status"}
            </div>
            <p>{message}</p>
            <button className="booking-close-btn-blur" onClick={() => setMessage("")}>
              {message.includes("CONFIRMED") ? "🎊 Awesome!" : "Close"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
