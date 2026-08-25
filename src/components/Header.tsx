import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo-container">
          <Link to="/" className="logo-link" onClick={closeMenu}>
            <img
              src="/symbol.png"
              alt="Angel Metal India Symbol"
              className="header-logo-img"
            />
            <img
              src="/text.png"
              alt="Angel Metal India Text"
              className="header-text-img"
            />
          </Link>
        </div>
        <nav className={`main-nav${menuOpen ? " open" : ""}`}>
          <ul>
            <li>
              <NavLink to="/" onClick={closeMenu}>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={closeMenu}>
                ABOUT US
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" onClick={closeMenu}>
                PRODUCTS
              </NavLink>
            </li>
            <li>
              <NavLink to="/materials" onClick={closeMenu}>
                Materials
              </NavLink>
            </li>

            <li>
              <NavLink to="/dimensions" onClick={closeMenu}>
                Dimensions
              </NavLink>
            </li>
            <li>
              <NavLink to="/certificates" onClick={closeMenu}>
                CERTIFICATES
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={closeMenu}>
                CONTACT US
              </NavLink>
            </li>
            <li className="nav-cta-mobile">
              <Link
                to="/contact"
                className="btn btn-primary"
                onClick={closeMenu}
              >
                GET A QUOTE
              </Link>
            </li>
          </ul>
        </nav>
        <div className="header-action">
          <Link to="/contact" className="btn btn-primary">
            GET A QUOTE
          </Link>
        </div>
        <button
          className={`hamburger${menuOpen ? " is-open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
