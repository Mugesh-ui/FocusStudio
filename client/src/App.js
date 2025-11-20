import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

// ---------- Home Page ----------
function HomePage() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [showNavIndicator, setShowNavIndicator] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // Show the popup automatically after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle touch events for navbar
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (e.touches[0].clientX < 50) {
        setShowNavIndicator(true);
        setTimeout(() => setShowNavIndicator(false), 2000);
      }
    };

    const handleTouchEnd = (e) => {
      if (e.changedTouches[0].clientX < 100 && !navOpen) {
        setNavOpen(true);
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navOpen]);

  return (
    <>
      {/* Enhanced Navbar */}
      <nav className={`navbar ${navOpen ? 'open' : ''}`}>
        <div className="navbar-brand">
          <h2>Focus Studio</h2>
          <p>Capture Your Life's Best Moments</p>
        </div>
        <ul className="nav-links">
          <li><a href="/" onClick={() => setNavOpen(false)}>Home</a></li>
          <li>
            <a href="#services" onClick={(e) => {
              e.preventDefault();
              setServicesOpen(!servicesOpen);
              setNavOpen(false);
            }}>
              🎯 Services
            </a>
          </li>
          <li><a href="/booking" onClick={() => setNavOpen(false)}>Booking</a></li>
          <li><a href="/profile" onClick={() => setNavOpen(false)}>Profile</a></li>
          <li><a href="/admin" onClick={() => setNavOpen(false)}>Admin</a></li>
        </ul>
      </nav>

      {/* Nav Toggle Button */}
      <button 
        className="nav-toggle"
        onClick={() => setNavOpen(!navOpen)}
      >
        <span className="hamburger"></span>
        <span className="hamburger"></span>
        <span className="hamburger"></span>
      </button>

      {/* Services Toggle Button */}
      <button 
        className="services-toggle"
        onClick={() => setServicesOpen(!servicesOpen)}
      >
        🎯 Services
      </button>

      {/* Nav Indicator */}
      <div className={`nav-indicator ${showNavIndicator ? 'visible' : ''}`}>
        ← Swipe for Menu
      </div>

      {/* Main Hero Section with Full Background Image */}
      <section className="hero-main-section">
        <img 
          src="/scrolling.jpg" 
          alt="Focus Studio Services" 
          className="hero-background-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/1920x1080/2d2d2d/ffffff?text=Focus+Studio+Premium+Services';
          }}
        />
        
        <div className="hero-container">
          {/* Image Side with Overlay Content */}
          <div className="hero-image-side">
            <div className="hero-content-overlay">
              <h1 className="hero-main-title">FOCUS DIGITAL</h1>
              <p className="hero-subtitle">Professional Photography Services</p>
            </div>
          </div>

          {/* Services Sidebar - Hidden by default */}
          <div className={`services-sidebar ${servicesOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              <h3>Our Premium Services</h3>
              <p>Everything you need in one place</p>
              <button 
                className="close-services-btn"
                onClick={() => setServicesOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="services-list">
              <div className="service-category">
                <h4>🎬 Media Services</h4>
                <ul>
                  <li>TV Advertising</li>
                  <li>Video Editing</li>
                  <li>Wedding Photos</li>
                  <li>Portrait Sessions</li>
                </ul>
              </div>

              <div className="service-category">
                <h4>🖨️ Printing Services</h4>
                <ul>
                  <li>Visiting Card</li>
                  <li>Wedding Cards</li>
                  <li>Letter Pad</li>
                  <li>Bill Book</li>
                  <li>Notice</li>
                  <li>Litho Poster</li>
                </ul>
              </div>

              <div className="service-category">
                <h4>🎨 Creative Printing</h4>
                <ul>
                  <li>Flex Printing</li>
                  <li>Digital Poster</li>
                  <li>Vinyl Printing</li>
                  <li>ECO Solvent Printing</li>
                </ul>
              </div>

              <div className="service-category">
                <h4>💡 Display Solutions</h4>
                <ul>
                  <li>Back Light/LED Light Board</li>
                  <li>One way Vision Printing</li>
                  <li>All Size Photo Framing</li>
                  <li>Banners & Posters</li>
                </ul>
              </div>

              <div className="service-category">
                <h4>🎁 Custom Products</h4>
                <ul>
                  <li>Mobile Back Case Printing</li>
                  <li>Custom T-Shirt Printing</li>
                  <li>Mug & Magic Mug Printing</li>
                  <li>Digital Albums</li>
                </ul>
              </div>
            </div>

            <div className="sidebar-contact">
              <div className="contact-card">
                <h4>📞 Contact Info</h4>
                <div className="contact-details">
                  <p><strong>Phone:</strong> 9944 52 7442</p>
                  <p><strong>Address:</strong> $-65, Near CT Scan, Valloor - 627117</p>
                  <p><strong>Email:</strong> focusstudiovlr@gmail.com</p>
                </div>
              </div>
            </div>

            <button 
              className="sidebar-cta-button"
              onClick={() => {
                navigate("/services");
                setServicesOpen(false);
              }}
            >
              🚀 View All Services
            </button>
          </div>
        </div>
      </section>

      {/* Premium Services Section */}
      <section className="premium-services">
        <div className="premium-header">
          <h2>Why Choose Focus Studio?</h2>
          <p>Experience the best in professional photography and printing services</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card" onClick={() => navigate("/services")}>
            <div className="feature-icon">⭐</div>
            <h3>Premium Quality</h3>
            <p>High-quality results with professional equipment and expertise</p>
          </div>

          <div className="feature-card" onClick={() => navigate("/services")}>
            <div className="feature-icon">💰</div>
            <h3>Affordable Prices</h3>
            <p>Competitive pricing without compromising on quality</p>
          </div>

          <div className="feature-card" onClick={() => navigate("/services")}>
            <div className="feature-icon">⚡</div>
            <h3>Quick Service</h3>
            <p>Fast turnaround times for all your urgent requirements</p>
          </div>

          <div className="feature-card" onClick={() => navigate("/services")}>
            <div className="feature-icon">🛠️</div>
            <h3>Modern Equipment</h3>
            <p>State-of-the-art technology for the best results</p>
          </div>

          <div className="feature-card" onClick={() => navigate("/services")}>
            <div className="feature-icon">👨‍💼</div>
            <h3>Expert Team</h3>
            <p>Experienced professionals with years of expertise</p>
          </div>

          <div className="feature-card" onClick={() => navigate("/services")}>
            <div className="feature-icon">🎯</div>
            <h3>Custom Solutions</h3>
            <p>Tailored services to meet your specific needs</p>
          </div>
        </div>

        <div className="premium-cta">
          <button 
            className="premium-cta-button"
            onClick={() => navigate("/booking")}
          >
            📅 Book Service Now
          </button>
          <button 
            className="premium-cta-button secondary"
            onClick={() => navigate("/services")}
          >
            📋 View All Services
          </button>
        </div>
      </section>
    </>
  );
}

function Footer() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Focus Studio</h3>
            <p>Your trusted partner for professional photography, videography, and printing services in Vallioor since 2010.</p>
            
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <a href="tel:+9944527442">+91 9944527442</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <a href="mailto:focusstudiovlr@gmail.com">focusstudiovl@gmail.com</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Main Road, Vallioor - 627117</span>
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">🏠 Home</a></li>
              <li><a href="/services">🎯 Services</a></li>
              <li><a href="/booking">📅 Booking</a></li>
              <li><a href="/profile">👤 Profile</a></li>
              <li><a href="/admin">⚙️ Admin</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Business Hours</h3>
            <div className="business-hours">
              <p>🕘 <strong>Monday - Saturday</strong></p>
              <p>9:00 AM - 8:00 PM</p>
              <p>🕙 <strong>Sunday</strong></p>
              <p>10:00 AM - 6:00 PM</p>
            </div>
          </div>

          <div className="footer-section">
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a href="tel:+919944527442" className="social-link" title="Call Us">
                <span className="social-icon">📱</span>
                <span className="social-text"></span>
              </a>
              <a href="https://instagram.com/focusstudio" className="social-link" title="Instagram">
                <span className="social-icon">📷</span>
                <span className="social-text"></span>
              </a>
              <a href="https://wa.me/919944527442?text=Hi%20Focus%20Studio,%20I%20would%20like%20to%20know%20more%20about%20your%20services" 
                 className="social-link">
                <span className="social-icon">💬</span>
                <span className="social-text"></span>
              </a>
              <a href="mailto:focusstudiovlr@gmail.com?subject=Enquiry%20for%20Focus%20Studio%20Services" 
                 className="social-link" title="Email Us">
                <span className="social-icon">📧</span>
                <span className="social-text"></span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2010-2024 Focus Studio. All rights reserved.</p>
          <p>Designed with ❤️ for capturing memories that last forever</p>
        </div>
      </footer>

      {/* Enhanced Location Popup with Map */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div
            className="popup-content map-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup-header">
              <img
                src="/logo192.png"
                alt="Focus Studio Logo"
                className="popup-logo"
              />
              <h3>Welcome to Focus Studio! 🎉</h3>
            </div>
            
            <div className="popup-body">
              <div className="location-info">
                <h4>📍 Our Location</h4>
                <p>
                  <strong>Focus Studio</strong><br />
                  S-65, Opp. Salvation Army School,<br />
                  behind Indian Oil Petrol pump,<br />
                  Valliyur, Vadakkuvalliyur,<br />
                  Tamil Nadu 627117
                </p>
              </div>

              <div className="map-preview">
                <div className="map-placeholder">
                  🗺️
                  <p>Google Maps Preview</p>
                </div>
              </div>

              <div className="popup-features">
                <div className="feature">
                  <span>🕒</span>
                  <span>Open Today: 9:00 AM - 8:00 PM</span>
                </div>
                <div className="feature">
                  <span>📞</span>
                  <span>Call: 9944 52 7442</span>
                </div>
                <div className="feature">
                  <span>🎯</span>
                  <span>Professional Services</span>
                </div>
              </div>
            </div>

            <div className="popup-actions">
              <a
                href="https://www.google.com/maps/search/?api=1&query=S-65,+Opp.+Salvation+Army+School,+behind+Indian+Oil+Petrol+pump,+Valliyur,+Vadakkuvalliyur,+Tamil+Nadu+627117"
                target="_blank"
                rel="noopener noreferrer"
                className="map-link-button"
              >
                🗺️ Open in Google Maps
              </a>
              <button
                className="close-popup-button"
                onClick={() => setShowPopup(false)}
              >
                🎉 Start Exploring
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Popup Management System (React Version) - Focus Digital Vallioor


function PopupManager() {
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60000); // 1 minute

  useEffect(() => {
    // Show first popup after 2 seconds
    const initialTimer = setTimeout(() => {
      setIsPopupActive(true);
    }, 2000);

    // Set up the recurring timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          setIsPopupActive(true);
          return 60000;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(timer);
    };
  }, []);

  const hidePopup = () => {
    setIsPopupActive(false);
    setTimeLeft(60000); // Reset timer when manually closed
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {isPopupActive && (
        <div className="popup-overlay" onClick={hidePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup" onClick={hidePopup}>&times;</button>
            <div className="popup-header">
              <h3>📍 Visit Focus Digital Vallioor</h3>
              <p>Your Local Digital Solution Provider</p>
            </div>
            <div className="popup-body">
              <div className="map-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.116668152897!2d77.61372277470005!3d8.558678491456886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04ef7c69bfbc3d%3A0xbe8c534aa804d1b9!2sVallioor%2C%20Tamil%20Nadu%20627117!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="200" 
                  style={{border: 0, borderRadius: '8px'}} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Focus Digital Vallioor Location"
                >
                </iframe>
              </div>
              <div className="location-info">
                <p><strong>🏢 Focus Digital</strong></p>
                <p>📌 Main Road, Vallioor</p>
                <p>🏙️ Tamil Nadu - 627117</p>
                <p>📞 +91 9944527244</p>
                <p>📧 focusdigitalvlr@gmail.com.com</p>
                <p>🕒 Mon-Sun: 9:00 AM - 8:00 PM</p>
              </div>
            </div>
            <div className="popup-actions">
              <button 
                className="popup-button primary" 
                onClick={() => {
                  window.open('https://maps.google.com/?q=Vallioor,+Tamil+Nadu+627117', '_blank');
                  hidePopup();
                }}
              >
                📍 Get Directions
              </button>
              <button className="popup-button secondary" onClick={hidePopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className={`popup-timer ${isPopupActive ? 'visible' : ''}`}>
        Next location reminder in: {formatTime(timeLeft)}
      </div>
    </>
  );
}



// Placeholder components for routes

// ---------- Main App ----------
function App() {
  return (
    <Router>
      {/* Add your main content here */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
      <PopupManager />
    </Router>
  );
}

export default App;