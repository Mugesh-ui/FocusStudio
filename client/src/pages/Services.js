import React, { useEffect } from "react";
import "./Services.css";
import { useNavigate } from "react-router-dom";

// Import images from src/assets
import weddingImg from "../assets/wedding.jpg";
import mugImg from "../assets/mugs.jpg";
import portraitImg from "../assets/portrait.jpeg";
import printingImg from "../assets/printing.jpeg";
import advertisingImg from "../assets/advertising.jpeg";
import bannerImg from "../assets/banner.jpeg";
import BillbookImg from "../assets/Billbook.png";
import DigitalalbumsImg from "../assets/Digitalalbums.jpeg";
import ecosolventprintingImg from "../assets/ecosolventprinting.png";
import FlayerDesignImg from "../assets/FlayerDesign.jpg";
import flexPrintingImg from "../assets/flexPrinting.jpg";
import LightingcardImg from "../assets/Lightingcard.jpg";
import LithoposterImg from "../assets/Lithoposter.jpg";
import MenucardImg from "../assets/Menucard.jpg";
import MobilebackcaseImg from "../assets/Mobilebackcase.jpg";
import noticeImg from "../assets/notice.jpg";
import OnewayvisionImg from "../assets/Onewayvision.jpeg";
import photoframeImg from "../assets/photoframe.jpeg";
import TshirtprintingImg from "../assets/Tshirtprinting.jpg";
import VinylImg from "../assets/Vinyl.jpg";
import visitingcardImg from "../assets/visitingcard.jpg";
import WeddingcardImg from "../assets/Weddingcard.jpg";

export default function Services() {
  const navigate = useNavigate();

  // ✅ Add background styles directly in component (same as Admin page)
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
    overlay.id = 'services-overlay';
    document.body.appendChild(overlay);

    // Cleanup function
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.position = '';
      
      const existingOverlay = document.getElementById('services-overlay');
      if (existingOverlay) {
        document.body.removeChild(existingOverlay);
      }
    };
  }, []);

  const serviceCategories = [
    {
      category: "🎬 Media Services",
      services: [
        { name: "TV Advertising", img: advertisingImg, description: "Professional TV commercial production and advertising services" },
        { name: "Video Editing", img: printingImg, description: "Professional video editing for events, commercials, and personal projects" },
        { name: "Wedding Photos", img: weddingImg, description: "Beautiful wedding photography to capture your special moments" },
        { name: "Portrait Sessions", img: portraitImg, description: "Professional portrait photography sessions" }
      ]
    },
    {
      category: "🖨️ Printing Services",
      services: [
        { name: "Visiting Card", img: visitingcardImg, description: "High-quality visiting card design and printing" },
        { name: "Wedding Cards", img: WeddingcardImg, description: "Elegant wedding invitation card design and printing" },
        { name: "Menu Card", img: MenucardImg, description: "Professional letterhead and stationery printing" },
        { name: "Bill Book", img: BillbookImg, description: "Custom bill book and invoice printing" },
        { name: "Notice", img: noticeImg, description: "Notice and announcement printing services" },
        { name: "Litho Poster", img: LithoposterImg, description: "Litho poster printing for events and promotions" }
      ]
    },
    {
      category: "🎨 Creative Printing",
      services: [
        { name: "Flex Printing", img: flexPrintingImg, description: "Flex banner printing for indoor and outdoor use" },
        { name: "Digital Poster", img: FlayerDesignImg, description: "High-resolution digital poster printing" },
        { name: "Vinyl Printing", img: VinylImg, description: "Durable vinyl printing for vehicles and signage" },
        { name: "ECO Solvent Printing", img: ecosolventprintingImg, description: "Eco-friendly solvent printing solutions" }
      ]
    },
    {
      category: "💡 Display Solutions",
      services: [
        { name: "Back Light/LED Light Board", img: LightingcardImg, description: "LED light boards and backlit displays" },
        { name: "One way Vision Printing", img: OnewayvisionImg, description: "One-way vision printing for glass and windows" },
        { name: "All Size Photo Framing", img: photoframeImg, description: "Custom photo framing in all sizes" },
        { name: "Banners & Posters", img: bannerImg, description: "Large format banner and poster printing" }
      ]
    },
    {
      category: "🎁 Custom Products",
      services: [
        { name: "Mobile Back Case Printing", img:MobilebackcaseImg, description: "Custom printing on mobile back cases" },
        { name: "Custom T-Shirt Printing", img: TshirtprintingImg, description: "Personalized t-shirt printing services" },
        { name: "Mug & Magic Mug Printing", img: mugImg, description: "Custom mug printing with magic effect" },
        { name: "Digital Albums", img: DigitalalbumsImg, description: "Digital photo album creation and printing" }
      ]
    }
  ];

  // Navigate to booking and pass the service name in state
  const handleBook = (serviceName) => {
    navigate("/booking", { state: { service: serviceName } });
  };

  return (
    <div className="services-page-blur">
      <div className="services-header">
        <h1>🎯 Our Premium Services</h1>
        <p>Professional photography, videography, printing, and custom solutions for all your needs</p>
      </div>

      <div className="services-categories">
        {serviceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="category-section">
            <h2 className="category-title">{category.category}</h2>
            <div className="services-grid-blur">
              {category.services.map((service, serviceIndex) => (
                <div
                  className="service-card-blur"
                  key={serviceIndex}
                  onClick={() => handleBook(service.name)}
                >
                  <div className="service-image-container">
                    <img src={service.img} alt={service.name} className="service-image" />
                    <div className="service-overlay">
                      <span className="book-now-text">Click to Book</span>
                    </div>
                  </div>
                  <div className="service-content">
                    <h3>{service.name}</h3>
                    <p className="service-description">{service.description}</p>
                    <button className="book-btn-blur" onClick={(e) => {
                      e.stopPropagation();
                      handleBook(service.name);
                    }}>
                      📅 Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="services-cta">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Book your service today and let us help you capture and create amazing moments</p>
          <button 
            className="cta-button-blur" 
            onClick={() => navigate("/booking")}
          >
            🚀 Book Your Service Now
          </button>
        </div>
      </div>
    </div>
  );
}