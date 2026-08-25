// src/pages/Products.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { Search, LayoutGrid, List } from "lucide-react";
import "./Products.css";

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get unique categories
  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="products-section mb-10">
      {/* ===== Hero Banner ===== */}
      <div className="products-hero">
        <div className="products-hero-overlay"></div>
        <div className="container products-hero-content">
          <p className="hero-label">OUR COLLECTION</p>
          <h1 className="hero-title">All Products</h1>
          <p className="hero-subtitle">
            Explore our complete range of premium industrial products
          </p>
          <div className="hero-stats">
            <p className="hero-count">
              <span className="dot"></span> {filteredProducts.length} Products
            </p>
            <p className="hero-quality">
              <span className="dot"></span> Premium Quality
            </p>
          </div>
        </div>
      </div>

      {/* ===== Main Content ===== */}
      <div className="container products-content ">
        {/* ===== Filter Bar ===== */}
        <div className="products-filter-bar mt-10">
          <div className="filter-left">
            <div className="search-box">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-right">
            <div className="category-pills">
              {categories.slice(0, 4).map((cat) => (
                <button
                  key={cat}
                  className={`category-pill ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
              {categories.length > 4 && (
                <button className="category-pill more-pill">
                  +{categories.length - 4} more
                </button>
              )}
            </div>

            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ===== Results Header ===== */}
        <div className="results-header">
          <p>
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* ===== Product Grid ===== */}
        {viewMode === "grid" ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.slug}`}
                className="product-card"
              >
                <div className="product-image-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-grade">Grades: {product.grade}</p>
                  <p className="product-description">
                    {product.shortDescription}
                  </p>
                  <span className="view-products-btn">
                    View Products <span className="arrow">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="products-list">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.slug}`}
                className="product-list-item"
              >
                <div className="list-image-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="list-image"
                  />
                </div>
                <div className="list-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">
                    {product.shortDescription}
                  </p>
                </div>
                <span className="view-products-btn">View →</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
