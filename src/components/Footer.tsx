import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaLinkedinIn, FaFacebookF, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo-link">
            <img src="/logo.png" alt="Angel Metal India" className="footer-logo-img" />
          </Link>
          <p className="footer-desc">
            Delivering quality metal solutions with trust, transparency and timely service.
          </p>
          <div className="footer-social">
            <a href="#"><FaFacebookF size={16} /></a>
            <a href="#"><FaLinkedinIn size={16} /></a>
            <a href="#"><FaInstagram size={16} /></a>
          </div>
        </div>
        
        <div className="footer-col links-col">
          <h4>QUICK LINKS</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/industries">Industries</Link></li>
            <li><Link to="/quality">Quality</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        
        <div className="footer-col links-col">
          <h4>PRODUCTS</h4>
          <ul>
            <li><Link to="/products">Pipes & Tubes</Link></li>
            <li><Link to="/products">Fittings & Flanges</Link></li>
            <li><Link to="/products">Plates & Sheets</Link></li>
            <li><Link to="/products">Bars & Rods</Link></li>
            <li><Link to="/products">Structural</Link></li>
            <li><Link to="/products">Raw Materials</Link></li>
          </ul>
        </div>
        
        <div className="footer-col contact-col">
          <h4>CONTACT US</h4>
          <ul className="contact-list">
            <li>
              <MapPin size={16} className="contact-icon" />
              <span>
                Angel Metal India<br/>
                B-108, Lancelot Majestic,<br/>
                P. J. Lalan Marg,<br/>
                Chembur (W), Mumbai - 400043,<br/>
                Maharashtra, India.
              </span>
            </li>
            <li>
              <Phone size={16} className="contact-icon" />
              <span>+91 22 5554 6666</span>
            </li>
            <li>
              <Mail size={16} className="contact-icon" />
              <span>info@angelmetal.in<br/>www.angelmetal.in</span>
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
