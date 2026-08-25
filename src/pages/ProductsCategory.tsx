// src/pages/ProductsCategory.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { productCategoryMap } from "../data/productIndex";
import { ChevronRight } from "lucide-react";
import "./ProductsCategory.css";

const ProductsCategory: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const categoryData = productCategoryMap[slug];

  // Format product name from slug
  const productName =
    slug
      ?.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || "";

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
    <section className="products-category-section mb-5">
      {/* Hero Banner with Breadcrumb */}
      <div className="category-hero">
        <div className="category-hero-overlay"></div>
        <div className="container category-hero-content">
          {/* ✅ Breadcrumb inside hero */}
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
          <h1 className="hero-title">{productName}</h1>
          <p className="hero-subtitle">
            Premium quality materials for demanding industrial applications
          </p>
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
              High-quality products for your industrial needs
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
                      `https://via.placeholder.com/300x200/0066cc/ffffff?text=${encodeURIComponent(product.title)}`;
                  }}
                />
              </div>
              <div className="category-product-info">
                <span className="category-product-category">
                  {product.materialGroup || "Products"}
                </span>
                <h3 className="category-product-title">{product.title}</h3>
                <p className="category-product-description">
                  {product.shortDescription}
                </p>

                {product.standards && (
                  <div className="material-group">
                    <strong>Std: {product.standards}</strong>
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
