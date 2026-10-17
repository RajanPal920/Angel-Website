// src/pages/ProductsCategory.tsx
import React, { useEffect } from "react";
import { useParams, useLocation, Link, Navigate } from "react-router-dom";
import { productCategoryMap } from "../data/productIndex";
import { productSlugRedirectMap } from "../data/productSlugMap";
import { ChevronRight } from "lucide-react";
import "./ProductsCategory.css";

// ===== PRODUCT NAME MAPPING =====
// Complete mapping for all product categories with exact source of truth names
const specialNameMap: Record<string, string> = {
  // Canonical combined categories
  "circles/rings": "Circles & Rings",
  "sheets/plate/coil": "Sheets, Plates & Coils",
  "flanges/forged-fittings": "Flanges & Forged Fittings",
  "angle-channels/flat-plate": "Angles, Channels & Flat Plate",

  // Legacy mappings for backward compatibility
  circles: "Circles & Rings",
  rings: "Circles & Rings",
  "sheets-plates": "Sheets, Plates & Coils",
  sheets: "Sheets, Plates & Coils",
  plates: "Sheets, Plates & Coils",
  coils: "Sheets, Plates & Coils",
  "steel-plates-sheets": "Sheets, Plates & Coils",
  "steel-coils": "Sheets, Plates & Coils",
  flanges: "Flanges & Forged Fittings",
  "forged-fittings": "Flanges & Forged Fittings",
  "steel-flanges": "Flanges & Forged Fittings",
  "angle-channels": "Angles, Channels & Flat Plate",
  "steel-angles-channels": "Angles, Channels & Flat Plate",

  // Other product categories
  "pipes-tubes": "Pipes & Tubes",
  "steel-pipes": "Steel Pipes",
  "stainless-steel-pipes": "Stainless Steel Pipes",
  "buttweld-steel-tubes": "Buttweld Steel Tubes",
  "round-bars": "Round Bars",
  "steel-rods-bars": "Steel Rods & Bars",
  "buttweld-fittings": "Buttweld Fittings",
  "industrial-fasteners": "Industrial Fasteners",
  fasteners: "Fasteners",
  "perforated-sheet": "Perforated Sheet",
  "wire-mesh": "Wire Mesh",
  wires: "Wires",
};

// Category redirects mapping old category slugs to new combined canonical slugs
const categoryRedirects: Record<string, string> = {
  circles: "circles/rings",
  rings: "circles/rings",
  "sheets-plates": "sheets/plate/coil",
  sheets: "sheets/plate/coil",
  plates: "sheets/plate/coil",
  coils: "sheets/plate/coil",
  "steel-plates-sheets": "sheets/plate/coil",
  "steel-coils": "sheets/plate/coil",
  flanges: "flanges/forged-fittings",
  "forged-fittings": "flanges/forged-fittings",
  "steel-flanges": "flanges/forged-fittings",
  "angle-channels": "angle-channels/flat-plate",
  "steel-angles-channels": "angle-channels/flat-plate",
};

// Helper function to format product name
const getProductName = (slug: string): string => {
  if (specialNameMap[slug]) {
    return specialNameMap[slug];
  }
  // Auto-format: capitalize each word
  return (
    slug
      ?.split(/[\/-]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || ""
  );
};

// Get icon for each category
const getCategoryIcon = (slug: string): string => {
  const iconMap: Record<string, string> = {
    "circles/rings": "",
    "sheets/plate/coil": "",
    "flanges/forged-fittings": "",
    "angle-channels/flat-plate": "",
    "angle-channels": "",
    "buttweld-fittings": "",
    circles: "",
    coils: "",
    fasteners: "",
    flanges: "",
    "forged-fittings": "",
    "perforated-sheet": "",
    rings: "",
    "round-bars": "",
    "sheets-plates": "",
    "pipes-tubes": "",
    "wire-mesh": "",
    wires: "",
  };
  return iconMap[slug] || "";
};

// Get subtitle for each category
const getCategorySubtitle = (slug: string): string => {
  const subtitleMap: Record<string, string> = {
    "circles/rings":
      "High-precision stainless steel circles and precision forged rings",
    "sheets/plate/coil":
      "High-performance stainless steel sheets, plates, and industrial coils",
    "flanges/forged-fittings":
      "Premium industrial flanges and high-pressure forged fittings",
    "angle-channels/flat-plate":
      "Structural angles, channels, and flat plates for industrial applications",
    "pipes-tubes": "Premium pipes and tubes for demanding applications",
    "buttweld-fittings": "Precision buttweld fittings for pipeline systems",
    fasteners: "Industrial grade fasteners for heavy-duty applications",
    "perforated-sheet": "High precision perforated sheets in various hole patterns",
    "round-bars": "Precision engineered stainless steel and alloy round bars",
    "wire-mesh": "Industrial wire mesh for filtration and screening",
    wires: "Industrial wires suitable for fabrication and welding",
  };
  return (
    subtitleMap[slug] || "Premium quality products for your industrial needs"
  );
};

// Get crisp high-resolution matching hero image for each category
const getCategoryHeroImage = (slug: string): string => {
  const heroImageMap: Record<string, string> = {
    "pipes-tubes": "/img/home/hero.png",
    "sheets/plate/coil": "/img/home/hero-2.png",
    "flanges/forged-fittings": "/img/home/hero-3.png",
    "angle-channels/flat-plate": "/img/home/material.jpg",
    "circles/rings": "/img/home/material.jpg",
    "round-bars": "/img/home/hero-2.png",
    "buttweld-fittings": "/img/home/hero-3.png",
    coils: "/img/home/hero-2.png",
    flanges: "/img/home/hero-3.png",
    "forged-fittings": "/img/home/hero-3.png",
  };
  return heroImageMap[slug] || "/img/home/material.jpg";
};

const ProductsCategory: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const location = useLocation();

  // Extract category slug from URL if not captured by single-segment :slug param
  const pathCategory = location.pathname
    .replace(/^\/products\/?/, "")
    .replace(/\/$/, "");
  const categorySlug = (slug || pathCategory || "").trim().toLowerCase();

  // Check for backward-compatibility redirect from old category slug to combined slug
  if (categoryRedirects[categorySlug]) {
    return (
      <Navigate
        to={`/products/${categoryRedirects[categorySlug]}`}
        replace
      />
    );
  }

  const categoryData = productCategoryMap[categorySlug];
  const productName = getProductName(categorySlug);
  const categoryIcon = getCategoryIcon(categorySlug);
  const categorySubtitle = getCategorySubtitle(categorySlug);

  // Backward compatibility: If accessed via /products/:productSlug, redirect to canonical /products/:categorySlug/:canonicalSlug
  if (!categoryData && categorySlug) {
    const redirectInfo = productSlugRedirectMap[categorySlug];
    if (redirectInfo) {
      return (
        <Navigate
          to={`/products/${redirectInfo.categorySlug}/${redirectInfo.canonicalSlug}`}
          replace
        />
      );
    }
  }

  useEffect(() => {
    if (productName && categoryData) {
      document.title = `${productName} Manufacturer, Supplier & Stockist in Mumbai | Angel Metal India`;

      let metaDesc = document.querySelector(
        "meta[name='description']",
      ) as HTMLMetaElement;
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = `${productName} manufacturer, supplier and stockist in Mumbai, India. Wide range of industrial grades and specifications at Angel Metal India.`;

      let canonicalLink = document.querySelector(
        "link[rel='canonical']",
      ) as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.rel = "canonical";
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = `${window.location.origin}/products/${categorySlug}`;
    }
  }, [productName, categoryData, categorySlug]);

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
      <div
        className="category-hero"
        style={{
          backgroundImage: `url(${getCategoryHeroImage(categorySlug)})`,
        }}
      >
        <div className="container category-hero-content">
          <div className="hero-text-box hero-animate-heading max-w-2xl">
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
              to={`/products/${categorySlug}/${product.slug}`}
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
                  {product.slug || "Premium"}
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
