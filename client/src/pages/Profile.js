import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

// --- Editable Info ---
const OWNER_NAME = "Mr. Benit";
const STUDIO_NAME = "Focus Studio";
const ADDRESS = "S-65, Near CT Scan, Opp Salvation Army School, Vallioor – 627117";
const PHONE = "9944527442";
const DISPLAY_PHONE = "9944 52 7442";
const INSTAGRAM_URL = "https://www.instagram.com/focus_digital_vlr?igsh=d254am1qcjQ0cjVh";
const YOUTUBE_URL = "https://www.youtube.com/@focusdigital2848";
const WHATSAPP_LINK = `https://wa.me/91${PHONE}`;
const LOGO_PUBLIC_PATH = "/logo.png";

// Customer Testimonials
const CUSTOMER_TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Kumar",
    rating: 5,
    comment: "Excellent wedding photography! Captured all our special moments beautifully. Highly recommended!",
    service: "Wedding Photography",
    date: "2024-12-15"
  },
  {
    id: 2,
    name: "Rahul S.",
    rating: 5,
    comment: "Amazing video editing work for our corporate event. Professional and delivered on time.",
    service: "Video Editing",
    date: "2024-12-10"
  },
  {
    id: 3,
    name: "Anitha Ravi",
    rating: 4,
    comment: "Loved the custom mug printing! Quality is superb and the design came out perfect.",
    service: "Mug Printing",
    date: "2024-12-05"
  },
  {
    id: 4,
    name: "Suresh Kumar",
    rating: 5,
    comment: "Best printing service in Vallioor. Visiting cards and wedding invitations were outstanding!",
    service: "Printing Services",
    date: "2024-11-28"
  }
];

// Studio Statistics
const STUDIO_STATS = [
  { number: "500+", label: "Happy Customers" },
  { number: "8+", label: "Years Experience" },
  { number: "50+", label: "Weddings Captured" },
  { number: "1000+", label: "Projects Completed" }
];

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about");

  // ✅ Add background styles directly in component (same as Services page)
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
    overlay.id = 'profile-overlay';
    document.body.appendChild(overlay);

    // Cleanup function
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.position = '';
      
      const existingOverlay = document.getElementById('profile-overlay');
      if (existingOverlay) {
        document.body.removeChild(existingOverlay);
      }
    };
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? "star filled" : "star"}>
        {index < rating ? "★" : "☆"}
      </span>
    ));
  };

  const navigateToServices = () => {
    navigate("/services");
  };

  return (
    <div className="profile-page-blur">
      {/* Hero Section */}
      <header className="profile-hero">
        <div className="hero-container">
          <div className="logo-section">
            <img
              src={LOGO_PUBLIC_PATH}
              alt={`${STUDIO_NAME} logo`}
              className="studio-logo-profile"
            />
            <div className="studio-badge">
              <span className="badge-text">Since 2016</span>
            </div>
          </div>

          <div className="hero-content">
            <h1 className="studio-title-profile">{STUDIO_NAME}</h1>
            <p className="studio-tagline">Capturing Life's Precious Moments</p>
            <p className="studio-location">📍 Vallioor & Nearby Areas</p>

            {/* Owner Card */}
            <div className="owner-card-profile">
              <div className="owner-avatar-profile">
                <span className="avatar-icon">👤</span>
              </div>
              <div className="owner-info-profile">
                <h2>Owner: {OWNER_NAME}</h2>
                <p className="owner-address">{ADDRESS}</p>
                <p className="owner-contact">
                  <strong>📞 Phone:</strong>{" "}
                  <a href={`tel:+91${PHONE}`}>{DISPLAY_PHONE}</a>
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="stats-grid">
              {STUDIO_STATS.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="btn-primary" onClick={navigateToServices}>
                🎯 View All Services
              </button>
              <a className="btn-whatsapp" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="profile-tabs">
        <button 
          className={`tab-button ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          About Us
        </button>
        <button 
          className={`tab-button ${activeTab === "testimonials" ? "active" : ""}`}
          onClick={() => setActiveTab("testimonials")}
        >
          Customer Reviews
        </button>
        <button 
          className={`tab-button ${activeTab === "contact" ? "active" : ""}`}
          onClick={() => setActiveTab("contact")}
        >
          Contact & Social
        </button>
      </nav>

      {/* Tab Content */}
      <div className="tab-content">
        {/* About Tab */}
        {activeTab === "about" && (
          <section className="about-section-profile">
            <div className="about-content">
              <h2>About {STUDIO_NAME}</h2>
              <p>
                Welcome to {STUDIO_NAME}, your trusted partner in capturing life's most precious moments. 
                With over 8 years of experience in Vallioor and surrounding areas, we specialize in 
                professional photography, videography, and custom printing services.
              </p>
              
              <div className="services-highlight">
                <h3>Our Core Services:</h3>
                <div className="services-list">
                  <div className="service-category">
                    <h4>📸 Photography</h4>
                    <ul>
                      <li>Wedding Photography</li>
                      <li>Portrait Sessions</li>
                      <li>Event Coverage</li>
                    </ul>
                  </div>
                  <div className="service-category">
                    <h4>🎬 Media Services</h4>
                    <ul>
                      <li>Video Editing</li>
                      <li>TV Advertising</li>
                      <li>Digital Albums</li>
                    </ul>
                  </div>
                  <div className="service-category">
                    <h4>🖨️ Printing</h4>
                    <ul>
                      <li>Custom Mug Printing</li>
                      <li>T-Shirt Printing</li>
                      <li>Visiting Cards</li>
                      <li>Banner & Poster Printing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Tab */}
        {activeTab === "testimonials" && (
          <section className="testimonials-section">
            <h2>What Our Customers Say</h2>
            <div className="testimonials-grid">
              {CUSTOMER_TESTIMONIALS.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="customer-info">
                      <h4>{testimonial.name}</h4>
                      <span className="service-badge">{testimonial.service}</span>
                    </div>
                    <div className="rating">{renderStars(testimonial.rating)}</div>
                  </div>
                  <p className="testimonial-comment">"{testimonial.comment}"</p>
                  <div className="testimonial-date">{testimonial.date}</div>
                </div>
              ))}
            </div>
            
            {/* Add Review CTA */}
            <div className="add-review-cta">
              <h3>Share Your Experience</h3>
              <p>We'd love to hear about your experience with {STUDIO_NAME}</p>
              <a href={WHATSAPP_LINK} className="btn-review" target="_blank" rel="noreferrer">
                💬 Share Your Feedback
              </a>
            </div>
          </section>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <section className="contact-section">
            <div className="contact-grid">
              {/* Contact Information */}
              <div className="contact-info">
                <h3>Get In Touch</h3>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <div>
                    <strong>Address</strong>
                    <p>{ADDRESS}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <div>
                    <strong>Phone</strong>
                    <p><a href={`tel:+91${PHONE}`}>{DISPLAY_PHONE}</a></p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">🕒</span>
                  <div>
                    <strong>Business Hours</strong>
                    <p>Monday - Sunday: 9:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="social-links">
                <h3>Follow Us</h3>
                <div className="social-buttons">
                  <a href={WHATSAPP_LINK} className="social-btn whatsapp-btn" target="_blank" rel="noreferrer">
                    <span className="social-icon">💬</span>
                    <span>WhatsApp</span>
                  </a>
                  <a href={INSTAGRAM_URL} className="social-btn instagram-btn" target="_blank" rel="noreferrer">
                    <span className="social-icon">📷</span>
                    <span>Instagram</span>
                  </a>
                  <a href={YOUTUBE_URL} className="social-btn youtube-btn" target="_blank" rel="noreferrer">
                    <span className="social-icon">🎥</span>
                    <span>YouTube</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="quick-actions">
              <button className="quick-btn" onClick={navigateToServices}>
                🎯 Browse Services
              </button>
              <a href={WHATSAPP_LINK} className="quick-btn primary" target="_blank" rel="noreferrer">
                💬 Instant Quote
              </a>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}