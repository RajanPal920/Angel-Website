// Header.tsx - Complete Single File with Direct PDF Links for Dimensions
import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import materials, { Material, MaterialItem } from "../data/materials";

// ============================================
// TYPES
// ============================================
interface DropdownItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  description?: string;
  isPdf?: boolean;
}

interface NavItem {
  label: string;
  href?: string;
  items?: DropdownItem[];
  icon?: React.ReactNode;
}

interface HeaderProps {
  activePath?: string;
}

// ============================================
// ICON COMPONENTS
// ============================================
const Icons = {
  Home: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
    </svg>
  ),
  About: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
  Contact: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Products: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  ),
  Materials: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  Dimensions: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M7 7l10 10" />
      <path d="M7 17l10-10" />
    </svg>
  ),
  Certificate: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  // Product Icons
  Anchor: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="5" r="3" />
      <line x1="12" y1="22" x2="12" y2="8" />
      <path d="M5 12H3a9 9 0 0018 0h-2" />
    </svg>
  ),
  Angle: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M7 7l10 10" />
    </svg>
  ),
  ButtWeld: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  ),
  Circles: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  Coil: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4v16" />
      <path d="M20 4v16" />
      <path d="M4 8h16" />
      <path d="M4 16h16" />
      <path d="M8 4v16" />
      <path d="M16 4v16" />
    </svg>
  ),
  Dairy: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 8l8 8" />
      <path d="M16 8l-8 8" />
    </svg>
  ),
  Fastener: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  Flange: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
    </svg>
  ),
  Forged: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2.5L9.5 7.5" />
      <path d="M9.5 2.5L14.5 7.5" />
      <path d="M12 5v4" />
      <path d="M12 11v2" />
      <path d="M12 15v2" />
    </svg>
  ),
  Hose: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12h16" />
      <path d="M8 8v8" />
      <path d="M16 8v8" />
    </svg>
  ),
  Patta: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="7" width="18" height="10" rx="1" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  ),
  Perforated: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8" cy="8" r="1.5" />
      <circle cx="16" cy="8" r="1.5" />
      <circle cx="8" cy="16" r="1.5" />
      <circle cx="16" cy="16" r="1.5" />
    </svg>
  ),
  Rings: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
    </svg>
  ),
  Rod: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="12" r="3" />
    </svg>
  ),
  Sheets: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="20" y2="15" />
    </svg>
  ),
  SteelPipes: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4v16" />
      <path d="M20 4v16" />
      <path d="M4 8h16" />
      <path d="M4 16h16" />
    </svg>
  ),
  Strips: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  ),
  Tubes: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  Valves: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  ),
  WireMesh: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="8" x2="21" y2="8" />
      <line x1="3" y1="16" x2="21" y2="16" />
      <line x1="8" y1="3" x2="8" y2="21" />
      <line x1="16" y1="3" x2="16" y2="21" />
    </svg>
  ),
  Wires: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  ),
  // Dimension Icons
  DimAngle: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M7 7l10 10" />
    </svg>
  ),
  DimButt: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  ),
  DimCoil: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4v16" />
      <path d="M20 4v16" />
      <path d="M4 8h16" />
      <path d="M4 16h16" />
    </svg>
  ),
  DimFastener: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v4" />
      <path d="M12 18v4" />
    </svg>
  ),
  DimFlange: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  DimForged: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2.5L9.5 7.5" />
      <path d="M9.5 2.5L14.5 7.5" />
    </svg>
  ),
  DimPatta: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="7" width="18" height="10" rx="1" />
    </svg>
  ),
  DimPipe: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4v16" />
      <path d="M20 4v16" />
      <path d="M4 8h16" />
    </svg>
  ),
  DimPlate: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
  ),
  DimRound: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8" />
    </svg>
  ),
  DimSheet: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <line x1="4" y1="9" x2="20" y2="9" />
    </svg>
  ),
  DimTube: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  DimWire: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
    </svg>
  ),
  ISO: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  UDYAM: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  // Material icons
  ShieldCheck: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Layers: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  FlaskConical: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 2v7.527a2 2 0 01-.211.896L4.72 20.55a1 1 0 00.9 1.45h12.76a1 1 0 00.9-1.45l-5.069-10.127A2 2 0 0114 9.527V2" />
      <path d="M8.5 2h7" />
      <path d="M7 16h10" />
    </svg>
  ),
  Waves: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12c.5 0 1-.5 1-1s.5-1 1-1 1 .5 1 1 .5 1 1 1 1-.5 1-1 .5-1 1-1 1 .5 1 1 .5 1 1 1 1-.5 1-1 .5-1 1-1 1 .5 1 1 .5 1 1 1" />
    </svg>
  ),
  Settings: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  CircleDot: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  ),
  Box: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  Sparkles: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3L14 8L19 8L15 12L17 17L12 14L7 17L9 12L5 8L10 8L12 3Z" />
      <path d="M19 19L21 21" />
      <path d="M3 3L5 5" />
    </svg>
  ),
};

// Map material icon names to our icon components
const materialIconMap: Record<string, any> = {
  ShieldCheck: Icons.ShieldCheck,
  Layers: Icons.Layers,
  FlaskConical: Icons.FlaskConical,
  Waves: Icons.Waves,
  Settings: Icons.Settings,
  CircleDot: Icons.CircleDot,
  Box: Icons.Box,
  Sparkles: Icons.Sparkles,
};

// ============================================
// DROPDOWN COMPONENT with Horizontal Cards
// ============================================
interface DropdownProps {
  label: string;
  items: DropdownItem[];
  isOpen: boolean;
  toggle: () => void;
  isActive?: boolean;
  isMobile?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  items,
  isOpen,
  toggle,
  isActive = false,
  isMobile = false,
}) => {
  // Handle PDF link click - opens in new tab
  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isPdf?: boolean,
  ) => {
    if (isPdf) {
      e.preventDefault();
      // Open PDF in new tab
      window.open(href, "_blank");
    }
    // For regular links, let default behavior happen
  };

  return (
    <div className={`dropdown ${isOpen ? "open" : ""}`}>
      <button
        className={`dropdown-trigger ${isActive ? "active" : ""}`}
        onClick={toggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {label}
        <span className="dropdown-arrow">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path
              d="M1 1L5 5L9 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <ul className="dropdown-menu">
        {items.map((item, index) => (
          <li key={index} role="none">
            <a
              href={item.href}
              role="menuitem"
              className="dropdown-card"
              onClick={(e) => handleItemClick(e, item.href, item.isPdf)}
              target={item.isPdf ? "_blank" : undefined}
              rel={item.isPdf ? "noopener noreferrer" : undefined}
            >
              <div className="dropdown-card-icon">
                {item.icon || <Icons.Products />}
              </div>
              <div className="dropdown-card-content">
                <div className="dropdown-card-title">{item.label}</div>
                {item.description && (
                  <div className="dropdown-card-description">
                    {item.description}
                  </div>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ============================================
// HAMBURGER COMPONENT
// ============================================
interface HamburgerProps {
  isOpen: boolean;
  toggle: () => void;
}

const Hamburger: React.FC<HamburgerProps> = ({ isOpen, toggle }) => {
  return (
    <button
      className={`hamburger ${isOpen ? "is-open" : ""}`}
      onClick={toggle}
      aria-label="Toggle navigation"
      aria-expanded={isOpen}
    >
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </button>
  );
};

// ============================================
// MOBILE MENU COMPONENT
// ============================================
interface MobileMenuProps {
  isOpen: boolean;
  items: NavItem[];
  activePath: string;
  openDropdown: string | null;
  toggleDropdown: (label: string) => void;
  onClose: () => void;
  ctaText: string;
  ctaHref: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  items,
  activePath,
  openDropdown,
  toggleDropdown,
  onClose,
  ctaText,
  ctaHref,
}) => {
  const isActive = (href?: string): boolean => {
    if (!href) return false;
    if (href === "/" && activePath === "/") return true;
    if (href === "/") return false;
    return activePath === href || activePath.startsWith(href);
  };

  const isCTA = (item: NavItem): boolean => {
    return item.label === ctaText;
  };

  return (
    <nav className={`main-nav mobile-nav ${isOpen ? "open" : ""}`}>
      <ul className="nav-list">
        {items.map((item) => (
          <li
            key={item.label}
            className={`nav-item ${isCTA(item) ? "nav-cta-mobile" : ""}`}
          >
            {item.items ? (
              <Dropdown
                label={item.label}
                items={item.items}
                isOpen={openDropdown === item.label}
                toggle={() => toggleDropdown(item.label)}
                isActive={isActive(item.href)}
                isMobile={true}
              />
            ) : (
              <a
                href={item.href || "#"}
                className={`nav-link ${isActive(item.href) ? "active" : ""} ${
                  isCTA(item) ? "btn-primary" : ""
                }`}
                onClick={(e) => {
                  if (isCTA(item)) {
                    e.preventDefault();
                  }
                  onClose();
                }}
              >
                {item.icon && <span className="nav-icon">{item.icon}</span>}
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

// ============================================
// MAIN HEADER COMPONENT
// ============================================
const Header: React.FC<HeaderProps> = ({ activePath = "/" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Build Materials dropdown items from the materials data
  const buildMaterialItems = (): DropdownItem[] => {
    return materials.map((material: Material) => {
      const IconComponent = material.icon
        ? materialIconMap[material.icon.name] || Icons.ShieldCheck
        : Icons.ShieldCheck;

      return {
        label: material.name,
        href: `/materials/${material.slug}`,
        icon: <IconComponent />,
        description: material.description.substring(0, 60) + "...",
      };
    });
  };

  // Build Products dropdown items
  const buildProductItems = (): DropdownItem[] => {
    const products = [
      { label: "Anchor Fastener", slug: "anchor-fastener", icon: Icons.Anchor },
      { label: "Angle Channels", slug: "angle-channels", icon: Icons.Angle },
      { label: "Buttweld Fittings", slug: "buttweld-fittings", icon: Icons.ButtWeld },
      { label: "Circles", slug: "circles", icon: Icons.Circles },
      { label: "Coils", slug: "coils", icon: Icons.Coil },
      {
        label: "Dairy Pharma Valves",
        slug: "dairy-pharma-valves",
        icon: Icons.Dairy,
      },
      { label: "Fasteners", slug: "fasteners", icon: Icons.Fastener },
      { label: "Flanges", slug: "flanges", icon: Icons.Flange },
      { label: "Forged Fittings", slug: "forged-fittings", icon: Icons.Forged },
      { label: "Hose Pipes", slug: "hose-pipe", icon: Icons.Hose },
      { label: "Patta Patti", slug: "patta-patti", icon: Icons.Patta },
      {
        label: "Perforated Sheets",
        slug: "perforated-sheet",
        icon: Icons.Perforated,
      },
      { label: "Rings", slug: "rings", icon: Icons.Rings },
      { label: "Rods", slug: "round-bars", icon: Icons.Rod },
      { label: "Sheets", slug: "sheets", icon: Icons.Sheets },
      { label: "Steel Pipes", slug: "steel-pipes", icon: Icons.SteelPipes },
      { label: "Strips", slug: "strips", icon: Icons.Strips },
      { label: "Tubes", slug: "tubes", icon: Icons.Tubes },
      { label: "Valves", slug: "valves", icon: Icons.Valves },
      { label: "Wire Mesh", slug: "wire-mesh", icon: Icons.WireMesh },
      { label: "Wires", slug: "wires", icon: Icons.Wires },
    ];

    return products.map((product) => ({
      label: product.label,
      href: `/products/${product.slug}`,
      icon: product.icon ? <product.icon /> : <Icons.Products />,
      description: `High-quality ${product.label.toLowerCase()}`,
    }));
  };

  // FIXED: Build Dimensions dropdown items - Direct PDF links
  const buildDimensionItems = (): DropdownItem[] => {
    const dimensions = [
      {
        label: "Angle Channels",
        file: "dimensions-angle-channels.pdf",
        icon: Icons.DimAngle,
      },
      {
        label: "Buttweld Fittings",
        file: "dimensions-buttweld-fittings.pdf",
        icon: Icons.DimButt,
      },
      { label: "Coils", file: "dimensions-coils.pdf", icon: Icons.DimCoil },
      {
        label: "Fasteners",
        file: "dimensions-fasteners.pdf",
        icon: Icons.DimFastener,
      },
      {
        label: "Flanges",
        file: "dimensions-flanges.pdf",
        icon: Icons.DimFlange,
      },
      {
        label: "Forged Fittings",
        file: "dimensions-forged-fittings.pdf",
        icon: Icons.DimForged,
      },
      {
        label: "Patta Patti",
        file: "dimensions-patta-patti.pdf",
        icon: Icons.DimPatta,
      },
      { label: "Pipes", file: "dimensions-pipes.pdf", icon: Icons.DimPipe },
      { label: "Plates", file: "dimensions-plates.pdf", icon: Icons.DimPlate },
      {
        label: "Round Bars",
        file: "dimensions-round-bars.pdf",
        icon: Icons.DimRound,
      },
      { label: "Sheets", file: "dimensions-sheet.pdf", icon: Icons.DimSheet },
      { label: "Tubes", file: "dimensions-tubes.pdf", icon: Icons.DimTube },
      { label: "Wires", file: "dimensions-wire.pdf", icon: Icons.DimWire },
    ];

    return dimensions.map((dim) => ({
      label: dim.label,
      // Direct link to PDF in the Dimensions folder
      href: `/Dimensions/${dim.file}`,
      icon: <dim.icon />,
      description: `${dim.label} dimensions & specifications`,
      isPdf: true, // Flag to indicate this is a PDF link
    }));
  };

  // Certificate items - Direct PDF links
  const buildCertificateItems = (): DropdownItem[] => {
    return [
      {
        label: "ISO 9001",
        href: "/certificates/iso.pdf",
        icon: <Icons.ISO />,
        description: "Quality management certified",
        isPdf: true,
      },
      {
        label: "UDYAM",
        href: "/certificates/udyam.pdf",
        icon: <Icons.UDYAM />,
        description: "MSME registration",
        isPdf: true,
      },
    ];
  };

  // Navigation items with all data
  const navItems: NavItem[] = [
    {
      label: "Home",
      href: "/",
      icon: <Icons.Home />,
    },
    {
      label: "About",
      href: "/about",
      icon: <Icons.About />,
    },
    {
      label: "Products",
      icon: <Icons.Products />,
      items: buildProductItems(),
    },
    {
      label: "Materials",
      icon: <Icons.Materials />,
      items: buildMaterialItems(),
    },
    {
      label: "Dimensions",
      icon: <Icons.Dimensions />,
      items: buildDimensionItems(),
    },
    {
      label: "Certificate",
      icon: <Icons.Certificate />,
      items: buildCertificateItems(),
    },
    {
      label: "Contact",
      href: "/contact",
      icon: <Icons.Contact />,
    },
  ];

  const ctaText = "Get a Quote";
  const ctaHref = "/quote";

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setOpenDropdown(null);
    }
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const isActive = (href?: string): boolean => {
    if (!href) return false;
    if (href === "/" && activePath === "/") return true;
    if (href === "/") return false;
    return activePath === href || activePath.startsWith(href);
  };

  const mobileItems: NavItem[] = [
    ...navItems,
    { label: ctaText, href: ctaHref },
  ];

  return (
    <header className="header" ref={headerRef}>
      <div className="container header-container">
        {/* Logo */}
        <div className="logo-container">
          <Link to="/" className="logo-link">
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

        {/* Hamburger */}
        <Hamburger isOpen={isMobileMenuOpen} toggle={toggleMobileMenu} />

        {/* Desktop Navigation */}
        <nav className="main-nav desktop-nav">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.label} className="nav-item">
                {item.items ? (
                  <Dropdown
                    label={item.label}
                    items={item.items}
                    isOpen={openDropdown === item.label}
                    toggle={() => toggleDropdown(item.label)}
                    isActive={isActive(item.href)}
                    isMobile={false}
                  />
                ) : (
                  <a
                    href={item.href || "#"}
                    className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                    onClick={closeMobileMenu}
                  >
                    {item.icon && <span className="nav-icon">{item.icon}</span>}
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="header-action">
          <a href={ctaHref} className="btn-primary">
            {ctaText}
          </a>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          items={mobileItems}
          activePath={activePath}
          openDropdown={openDropdown}
          toggleDropdown={toggleDropdown}
          onClose={closeMobileMenu}
          ctaText={ctaText}
          ctaHref={ctaHref}
        />
      </div>
    </header>
  );
};

export default Header;
