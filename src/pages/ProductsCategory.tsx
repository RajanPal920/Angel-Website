// src/pages/ProductsCategory.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { productCategoryMap } from "../data/productIndex";
import { ChevronRight } from "lucide-react";
import "./ProductsCategory.css";

// ===== PRODUCT NAME MAPPING =====
// Complete mapping for all product categories
const specialNameMap: Record<string, string> = {
  // Sheets & Plates
  "sheets-plates": "Sheets & Plates",
  "steel-plates-sheets": "Steel Plates & Sheets",

  // Pipes & Tubes
  "pipes-tubes": "Pipes & Tubes",
  "steel-pipes": "Steel Pipes",
  "stainless-steel-pipes": "Stainless Steel Pipes",
  "buttweld-steel-tubes": "Buttweld Steel Tubes",

  // Bars & Rods
  "bars-rods": "Bars & Rods",
  "round-bars": "Round Bars",
  "steel-rods-bars": "Steel Rods & Bars",

  // Fasteners & Fittings
  "anchor-fastener": "Anchor Fastener",
  "angle-channels": "Angle Channels",
  "steel-angles-channels": "Steel Angles & Channels",
  "buttweld-fittings": "Buttweld Fittings",
  "forged-fittings": "Forged Fittings",
  "industrial-fasteners": "Industrial Fasteners",
  fasteners: "Fasteners",
  flanges: "Flanges",
  "steel-flanges": "Steel Flanges",

  // Valves
  valves: "Valves",
  "dairy-pharma-valves": "Dairy & Pharma Valves",

  // Other Products
  circles: "Circles",
  coils: "Coils",
  "steel-coils": "Steel Coils",
  "hose-pipe": "Hose Pipe",
  "patta-patti": "Patta Patti",
  "perforated-sheet": "Perforated Sheet",
  rings: "Rings",
  strips: "Strips",
  "wire-mesh": "Wire Mesh",
  wires: "Wires",
};

// Helper function to format product name
const getProductName = (slug: string): string => {
  if (specialNameMap[slug]) {
    return specialNameMap[slug];
  }
  // Auto-format: capitalize each word
  return (
    slug
      ?.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || ""
  );
};

// Get icon for each category
const getCategoryIcon = (slug: string): string => {
  const iconMap: Record<string, string> = {
    "anchor-fastener": "🔩",
    "angle-channels": "📐",
    "buttweld-fittings": "🔧",
    circles: "⭕",
    coils: "🌀",
    "dairy-pharma-valves": "💊",
    fasteners: "🔩",
    flanges: "⚙️",
    "forged-fittings": "🔨",
    "hose-pipe": "🧵",
    "patta-patti": "📏",
    "perforated-sheet": "⬜",
    rings: "⭕",
    "round-bars": "📍",
    "sheets-plates": "📋",
    "pipes-tubes": "🔴",
    strips: "📏",
    valves: "🚰",
    "wire-mesh": "🕸️",
    wires: "〰️",
  };
  return iconMap[slug] || "📦";
};

// Get subtitle for each category
const getCategorySubtitle = (slug: string): string => {
  const subtitleMap: Record<string, string> = {
    "anchor-fastener":
      "Premium fastening solutions for industrial applications",
    "sheets-plates":
      "High-quality sheets and plates for various industrial needs",
    "pipes-tubes": "Premium pipes and tubes for demanding applications",
    "buttweld-fittings": "Precision buttweld fittings for pipeline systems",
    flanges: "High-quality flanges for secure pipe connections",
    valves: "Reliable valves for flow control systems",
    fasteners: "Industrial grade fasteners for heavy-duty applications",
  };
  return (
    subtitleMap[slug] || "Premium quality products for your industrial needs"
  );
};

const ProductsCategory: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const categoryData = productCategoryMap[slug];
  const productName = getProductName(slug || "");
  const categoryIcon = getCategoryIcon(slug || "");
  const categorySubtitle = getCategorySubtitle(slug || "");

  if (!categoryData) {
    return (
      <div
        className="container not-found"
        style={{ padding: "4rem 0", textAlign: "center" }}
      >
        <h1>Category Not Found</h1>
        <p>We couldn't find the products you are looking for.</p>
        <Link to="/products" className="btn btn-primary">
          Back to All Products
        </Link>
      </div>
    );
  }

  return (
    <section className="products-category-section">
      {/* Hero Banner with Breadcrumb */}
      <div className="category-hero">
        <div className="category-hero-overlay"></div>
        <div className="container category-hero-content">
          <div className="hero-breadcrumb">
            <Link to="/" className="breadcrumb-link">
              Home
            </Link>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <Link to="/products" className="breadcrumb-link">
              Products
            </Link>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">{productName}</span>
          </div>

          <p className="hero-label">PRODUCTS</p>
          <h1 className="hero-title">
            <span className="hero-icon">{categoryIcon}</span> {productName}
          </h1>
          <p className="hero-subtitle">{categorySubtitle}</p>
          <p className="hero-count">
            <span className="dot"></span> {categoryData.length} Products
            Available
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container category-content">
        <div className="category-section-header">
          <div className="section-left">
            <h2>
              Our <span className="highlight">{productName}</span> Range
            </h2>
            <p className="section-subtitle">
              HIGH-QUALITY PRODUCTS FOR YOUR INDUSTRIAL NEEDS
            </p>
          </div>
          <div className="section-right">
            <span className="count">{categoryData.length} Products</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="products-category-grid">
          {categoryData.map((product) => (
            <Link
              key={product.id}
              to={`/products/${slug}/${product.slug}`}
              className="category-product-card"
            >
              <div className="category-product-image-wrapper">
                <img
                  src={product.image}
                  alt={product.title}
                  className="category-product-image"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://via.placeholder.com/400x300/1a2b4c/ffffff?text=${encodeURIComponent(product.title)}`;
                  }}
                />
                {/* Product Badge */}
                <div className="product-badge">
                  {product.materialGroup || "Premium"}
                </div>
              </div>
              <div className="category-product-info">
                <span className="category-product-category">
                  {product.materialGroup || product.category || "Products"}
                </span>
                <h3 className="category-product-title">{product.title}</h3>
                <p className="category-product-description">
                  {product.shortDescription ||
                    `High quality ${product.title} for industrial applications`}
                </p>

                {product.standards && (
                  <div className="material-group">
                    <span className="std-label">Standards:</span>
                    <span className="std-value">{product.standards}</span>
                  </div>
                )}

                <button className="view-details-btn">
                  View Details <span className="arrow">→</span>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsCategory;
