import React from "react";
import { Phone, Mail } from "lucide-react";
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import "./TopBar.css";

const TopBar: React.FC = () => {
  return (
    <div className="top-bar">
      <div className="container top-bar-container">
        <div className="top-bar-left">
          <span>Quality Metal, Stronger Tomorrow</span>
        </div>
        <div className="top-bar-right">
          <div className="contact-info">
            {/* Sales Dept Numbers */}
            <a href="tel:+919029517398" className="contact-item">
              <Phone size={14} />
              <span>+91 90295 17398</span>
            </a>
            <a href="tel:+918169810880" className="contact-item">
              <Phone size={14} />
              <span>+91 81698 10880</span>
            </a>
            {/* Email */}
            <a href="mailto:angelmetalindia@gmail.com" className="contact-item">
              <Mail size={14} />
              <span>angelmetalindia@gmail.com</span>
            </a>
          </div>

          {/* Social Links with specific class names */}
          <div className="social-links">
            <a href="#" className="social-icon linkedin">
              <FaLinkedinIn size={14} />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon facebook"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon instagram"
            >
              <FaInstagram size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
