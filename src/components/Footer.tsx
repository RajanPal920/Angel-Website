import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo-link">
            <img
              src="/logo.png"
              alt="Angel Metal India"
              className="footer-logo-img"
            />
          </Link>
          <p className="footer-desc">
            Delivering quality metal solutions with trust, transparency and
            timely service.
          </p>
          <div className="footer-social">
            {/* Facebook - Solid Blue */}
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <span className="social-circle facebook">
                <FaFacebookF size={16} />
              </span>
            </a>

            {/* LinkedIn - Professional Blue */}
            <a href="#" aria-label="LinkedIn">
              <span className="social-circle linkedin">
                <FaLinkedinIn size={16} />
              </span>
            </a>

            {/* Instagram - Gradient */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <span className="social-circle instagram">
                <FaInstagram size={16} />
              </span>
            </a>
          </div>
        </div>

        <div className="footer-col links-col">
          <h4>QUICK LINKS</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/dimensions">Dimensions</Link>
            </li>
            <li>
              <Link to="/certificates">Certificates</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col links-col">
          <h4>PRODUCTS</h4>
          <ul>
            <li>
              <Link to="/products/pipes">Pipes & Tubes</Link>
            </li>
            <li>
              <Link to="/products/flanges">Fittings & Flanges</Link>
            </li>
            <li>
              <Link to="/products/plates">Plates & Sheets</Link>
            </li>
            <li>
              <Link to="/products/round-bars">Bars & Rods</Link>
            </li>
            <li>
              <Link to="/products/angle-channels">Structural</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col contact-col">
          <h4>CONTACT US</h4>
          <ul className="contact-list">
            <li>
              <MapPin size={16} className="contact-icon" />
              <span>
                Angel Metal India
                <br />
                Shop No-7, Gr. Floor,
                <br />
                66-Cooper Building, T.P. Street,
                <br />
                Kumbharwada Lane,
                <br />
                Mumbai - 400004.
              </span>
            </li>
            <li>
              <Phone size={16} className="contact-icon" />
              <span>
                Mahesh Bishnoi (Sales Dept):
                <br />
                <a href="tel:+919029517398">+91 90295 17398</a>
                <br />
                <a href="tel:+918169810880">+91 81698 10880</a>
              </span>
            </li>
            <li>
              <Mail size={16} className="contact-icon" />
              <span>
                <a href="mailto:angelmetalindia@gmail.com">
                  angelmetalindia@gmail.com
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-container">
          <p>&copy; 2026 Angel Metal India. All Rights Reserved.</p>
          <div className="bottom-links">
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
