import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="landing">
      <img src="/logo.png" alt="Focus Studio" className="logo" />
      <h1>Focus Studio</h1>
      <button className="btn" onClick={() => navigate("/services")}>
        Get Started
      </button>
    </div>
  );
}
