// src/pages/MaterialDetail.tsx
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { productCategoryMap } from "../data/productIndex";
import {
  Download,
  Mail,
  CheckCircle,
  Phone,
  FileText,
  Shield,
  Award,
  MapPin,
  Globe,
  ChevronRight,
  FileWarning,
} from "lucide-react";
import "./MaterialDetail.css";

import { normalizePriceRange, hasPriceData } from "../utils/priceRangeUtils";

const MaterialDetail: React.FC = () => {
  const { slug, materialSlug } = useParams<{
    slug: string;
    materialSlug: string;
  }>();
  const navigate = useNavigate();

  const categoryData = productCategoryMap[slug];
  const material = categoryData?.find((item) => item.slug === materialSlug);

  const [activeTab, setActiveTab] = useState("overview");
  const [showAllDetails, setShowAllDetails] = useState(false);

  // Helper function to check if data exists
  const hasData = (field: any) => {
    if (field === undefined || field === null) return false;
    if (Array.isArray(field)) return field.length > 0;
    if (typeof field === "object") return Object.keys(field).length > 0;
    if (typeof field === "string") return field.trim().length > 0;
    return true;
  };

  // Helper function to get country flag class
  const getCountryFlag = (countryName: string): string => {
    const flagMap: Record<string, string> = {
      "United States": "us",
      USA: "us",
      US: "us",

      Canada: "ca",
      CA: "ca",

      "United Kingdom": "gb",
      UK: "gb",
      GB: "gb",

      Australia: "au",
      AU: "au",

      Germany: "de",
      DE: "de",

      France: "fr",
      FR: "fr",

      Italy: "it",
      IT: "it",

      Spain: "es",
      ES: "es",

      Portugal: "pt",
      PT: "pt",

      Netherlands: "nl",
      NL: "nl",

      Belgium: "be",
      BE: "be",

      Switzerland: "ch",
      CH: "ch",

      Sweden: "se",
      SE: "se",

      Norway: "no",
      NO: "no",

      Denmark: "dk",
      DK: "dk",

      Finland: "fi",
      FI: "fi",

      Ireland: "ie",
      IE: "ie",

      Poland: "pl",
      PL: "pl",

      "Czech Republic": "cz",
      Czechia: "cz",
      CZ: "cz",

      Hungary: "hu",
      HU: "hu",

      Romania: "ro",
      RO: "ro",

      Greece: "gr",
      GR: "gr",

      Turkey: "tr",
      TR: "tr",

      Russia: "ru",
      RU: "ru",

      Ukraine: "ua",
      UA: "ua",

      Austria: "at",
      AT: "at",

      Cyprus: "cy",
      CY: "cy",

      India: "in",
      IN: "in",

      China: "cn",
      CN: "cn",

      Japan: "jp",
      JP: "jp",

      "South Korea": "kr",
      KR: "kr",

      Taiwan: "tw",
      TW: "tw",

      "Hong Kong": "hk",
      HK: "hk",

      Singapore: "sg",
      SG: "sg",

      Malaysia: "my",
      MY: "my",

      Indonesia: "id",
      ID: "id",

      Philippines: "ph",
      PH: "ph",

      Vietnam: "vn",
      VN: "vn",

      Thailand: "th",
      TH: "th",

      Bangladesh: "bd",
      BD: "bd",

      "Sri Lanka": "lk",
      LK: "lk",

      Pakistan: "pk",
      PK: "pk",

      Iran: "ir",
      IR: "ir",

      Iraq: "iq",
      IQ: "iq",

      Oman: "om",
      OM: "om",

      Kuwait: "kw",
      KW: "kw",

      Qatar: "qa",
      QA: "qa",

      UAE: "ae",
      AE: "ae",

      "Saudi Arabia": "sa",
      SA: "sa",

      Jordan: "jo",
      JO: "jo",

      Egypt: "eg",
      EG: "eg",

      Morocco: "ma",
      MA: "ma",

      Nigeria: "ng",
      NG: "ng",

      Angola: "ao",
      AO: "ao",

      "South Africa": "za",
      ZA: "za",

      Brazil: "br",
      BR: "br",

      Mexico: "mx",
      MX: "mx",

      Colombia: "co",
      CO: "co",

      Chile: "cl",
      CL: "cl",

      Venezuela: "ve",
      VE: "ve",

      "Costa Rica": "cr",
      CR: "cr",

      Kazakhstan: "kz",
      KZ: "kz",

      Tobago: "tt",
      TT: "tt",

      Myanmar: "mm",
      MM: "mm",
    };

    return flagMap[countryName] || "un";
  };

  // Helper function to get caption description based on slug
  const getCaptionDescription = (slug: string): string => {
    const descriptions: { [key: string]: string } = {
      // Coils
      "stainless-steel-coils":
        "Premium stainless steel coils for industrial applications with superior corrosion resistance.",
      "titanium-coils":
        "High-strength titanium coils offering exceptional corrosion resistance and lightweight performance.",
      "high-performance-alloy-coils":
        "Premium alloy coils designed for high-temperature and aerospace applications.",
      "alloy-28-coils":
        "High-alloy stainless steel coils for aggressive chemical environments.",
      "special-alloy-coils":
        "Special alloy coils providing superior corrosion resistance in marine and chemical industries.",
      "nickel-alloy-200-201-coils":
        "Commercially pure nickel coils with excellent thermal and electrical conductivity.",
      "monel-400-coils":
        "Nickel-copper alloy coils with outstanding corrosion resistance in marine environments.",
      "inconel-coils":
        "Heat-resistant Inconel coils engineered for extreme temperatures and corrosive environments.",
      "incoloy-coils":
        "High-performance Incoloy coils for petrochemical and power generation industries.",
      "hastelloy-coils":
        "Premium Hastelloy coils providing exceptional resistance to oxidizing and reducing environments.",
      "duplex-super-duplex-steel-coils":
        "High-strength duplex steel coils for offshore, marine, and chemical applications.",
      "copper-nickel-coils":
        "Copper nickel coils with excellent seawater corrosion resistance.",

      // Pipes
      "stainless-steel-304-304l-pipes":
        "Stainless Steel 304/304L pipes with excellent corrosion resistance and formability.",
      "stainless-steel-316-316l-pipes":
        "Stainless Steel 316/316L pipes with enhanced resistance to pitting and crevice corrosion.",
      "stainless-steel-310s-pipes":
        "Heat-resistant 310S pipes for high-temperature applications.",
      "stainless-steel-321-pipes":
        "Titanium-stabilized 321 pipes for high-temperature intergranular corrosion resistance.",
      "stainless-steel-317l-pipes":
        "Molybdenum-bearing 317L pipes for enhanced chemical resistance.",
      "stainless-steel-904l-pipes":
        "High-alloy 904L pipes for strong reducing acid environments.",
      "titanium-pipes":
        "Titanium pipes with exceptional strength-to-weight ratio.",
      "high-performance-alloy-pipes":
        "Premium alloy pipes for extreme temperature applications.",
      "alloy-28-pipes":
        "High-alloy pipes for aggressive chemical environments.",
      "alloy-20-pipes": "Carpenter 20 pipes for maximum acid resistance.",
      "smo-254-pipes": "6% Moly pipes for maximum pitting resistance.",
      "nickel-alloy-200-201-pipes":
        "Pure nickel pipes for caustic and chemical service.",
      "monel-400-pipes":
        "Monel 400 pipes for marine and acid-resistant applications.",
      "inconel-pipes": "Inconel pipes for extreme temperature environments.",
      "incoloy-pipes": "Incoloy pipes for high-temperature industrial systems.",
      "hastelloy-pipes": "Hastelloy pipes for highly corrosive environments.",
      "duplex-super-duplex-steel-pipes":
        "Duplex pipes for offshore and marine applications.",
      "copper-nickel-pipes": "Copper nickel pipes for marine engineering.",

      // Plates
      "titanium-plates-grade-2-grade-5":
        "Titanium plates for aerospace, marine, and chemical industries.",
      "stainless-steel-plates":
        "Premium stainless steel plates for fabrication and construction.",
      "high-performance-alloy-plates":
        "Advanced alloy plates for extreme industrial applications.",
      "alloy-28-plates":
        "High-alloy plates for aggressive chemical environments.",
      "special-alloy-plates-smo-254-alloy-20":
        "Special alloy plates for marine and offshore applications.",
      "nickel-alloy-200-201-plates":
        "Commercially pure nickel plates for chemical processing.",
      "monel-400-plates": "Nickel-copper alloy plates for marine environments.",
      "inconel-plates":
        "Heat-resistant Inconel plates for extreme temperatures.",
      "incoloy-plates":
        "High-performance Incoloy plates for petrochemical industries.",
      "hastelloy-plates":
        "Premium Hastelloy plates for corrosive environments.",
      "duplex-super-duplex-steel-plates":
        "High-strength duplex plates for offshore applications.",
      "copper-nickel-plates": "Copper nickel plates for marine engineering.",

      // Round Bars
      "titanium-round-bars":
        "Titanium round bars with exceptional strength-to-weight ratio.",
      "stainless-steel-round-bars":
        "Premium stainless steel round bars for machining and fabrication.",
      "high-performance-alloy-round-bars":
        "Advanced alloy round bars for critical engineering applications.",
      "alloy-28-round-bars": "High-alloy round bars for chemical processing.",
      "special-alloy-round-bars-smo-254-alloy-20":
        "Special alloy round bars for marine and offshore industries.",
      "nickel-alloy-200-201-round-bars":
        "Nickel alloy round bars for chemical applications.",
      "monel-round-bars":
        "Monel round bars for marine and acid-resistant applications.",
      "inconel-round-bars":
        "Inconel round bars for extreme temperature applications.",
      "incoloy-round-bars":
        "Incoloy round bars for high-temperature industrial applications.",
      "hastelloy-round-bars":
        "Hastelloy round bars for highly corrosive environments.",
      "duplex-super-duplex-steel-round-bars":
        "Duplex round bars for offshore and marine applications.",
      "copper-nickel-round-bars":
        "Copper nickel round bars for marine engineering.",

      // Sheets
      "titanium-sheets":
        "Titanium sheets for aerospace, marine, and chemical industries.",
      "stainless-steel-sheets":
        "Premium stainless steel sheets for various industrial applications.",
      "high-performance-alloy-sheets":
        "Advanced alloy sheets for extreme industrial applications.",
      "alloy-28-sheets":
        "High-alloy sheets for aggressive chemical environments.",
      "special-alloy-sheets-smo-254-alloy-20":
        "Special alloy sheets for marine and offshore applications.",
      "nickel-alloy-200-201-sheets":
        "Nickel alloy sheets for chemical processing.",
      "monel-400-sheets":
        "Monel sheets for marine and acid-resistant applications.",
      "inconel-sheets": "Inconel sheets for extreme temperature applications.",
      "incoloy-sheets":
        "Incoloy sheets for high-temperature industrial applications.",
      "hastelloy-sheets": "Hastelloy sheets for highly corrosive environments.",
      "duplex-super-duplex-steel-sheets":
        "Duplex sheets for offshore and marine applications.",
      "copper-nickel-sheets": "Copper nickel sheets for marine engineering.",

      // Wires
      "titanium-wires":
        "Titanium wires for aerospace, marine, and medical applications.",
      "stainless-steel-wires":
        "Premium stainless steel wires for various industrial applications.",
      "high-performance-alloy-wires":
        "Advanced alloy wires for critical engineering applications.",
      "alloy-28-wires": "High-alloy wires for chemical processing.",
      "special-alloy-wires":
        "Special alloy wires for marine and offshore applications.",
      "nickel-alloy-200-201-wires":
        "Nickel alloy wires for chemical applications.",
      "monel-wires": "Monel wires for marine and acid-resistant applications.",
      "inconel-wires": "Inconel wires for extreme temperature applications.",
      "incoloy-wires":
        "Incoloy wires for high-temperature industrial applications.",
      "hastelloy-wires": "Hastelloy wires for highly corrosive environments.",
      "duplex-super-duplex-steel-wires":
        "Duplex wires for offshore and marine applications.",
      "copper-nickel-wires": "Copper nickel wires for marine engineering.",

      // Tubes
      "stainless-steel-tubes":
        "Premium stainless steel tubes for industrial piping systems.",
      "titanium-tubes-grade-2-grade-5":
        "Titanium tubes for aerospace, marine, and chemical industries.",
      "high-performance-alloy-tubes":
        "Advanced alloy tubes for extreme industrial applications.",
      "alloy-28-tubes": "High-alloy tubes for chemical processing.",
      "special-alloy-tubes-smo-254-alloy-20":
        "Special alloy tubes for marine and offshore applications.",
      "nickel-alloy-200-201-tubes":
        "Nickel alloy tubes for chemical processing.",
      "monel-400-tubes":
        "Monel tubes for marine and acid-resistant applications.",
      "inconel-tubes": "Inconel tubes for extreme temperature applications.",
      "incoloy-tubes":
        "Incoloy tubes for high-temperature industrial applications.",
      "hastelloy-tubes": "Hastelloy tubes for highly corrosive environments.",
      "duplex-super-duplex-steel-tubes":
        "Duplex tubes for offshore and marine applications.",
      "copper-nickel-tubes": "Copper nickel tubes for marine engineering.",

      // Default
      default:
        "Premium quality industrial material for demanding applications.",
    };

    return descriptions[slug] || descriptions["default"];
  };

  if (!material) {
    return (
      <div className="container not-found">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <FileWarning size={32} className="text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Material Not Found
          </h1>
          <p className="text-gray-500 mb-6">
            We couldn't find the product you're looking for. It may have been
            moved or doesn't exist in this category.
          </p>
          <div className="space-y-2">
            <Link
              to={`/products/${slug}`}
              className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Back to{" "}
              {slug
                ?.replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </Link>
            <Link
              to="/products"
              className="block w-full px-6 py-3 border border-gray-200 text-gray-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              All Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedProducts =
    categoryData?.filter((item) => item.slug !== materialSlug) || [];

  // Product categories list
  const productCategories = [
    { name: "Pipes & Tubes", slug: "pipes-tubes" },
    { name: "Round Bars", slug: "round-bars" },
    { name: "Sheets & Plates", slug: "sheets-plates" },
    { name: "Wires", slug: "wires" },
    { name: "Industrial Flanges", slug: "flanges" },
    { name: "Buttweld Fittings", slug: "buttweld-fittings" },
    { name: "Angle & Channels", slug: "angle-channels" },
    { name: "Forged Fittings", slug: "forged-fittings" },
    { name: "Industrial Fasteners", slug: "fasteners" },
    { name: "Industrial Valves", slug: "valves" },
    { name: "Patta & Patti", slug: "patta-patti" },
    { name: "Industrial Rings", slug: "rings" },
    { name: "Coils", slug: "coils" },
    { name: "Industrial Circles", slug: "circles" },
    { name: "Industrial Strips", slug: "strips" },
    {name: "Hose Pipes", slug: "hose-pipe" },
    {name: "Perforated Sheets", slug: "perforated-sheet" },
    {name: "Wire Mesh", slug: "wire-mesh" },
    {name: "Anchor Fasteners", slug: "anchor-fastener" },
    {name: "Dairy & Pharma Valves", slug: "dairy-pharma-valves" },
  ];

  return (
    <section className="material-detail-section">
      {/* ===== Hero Section ===== */}
      <div className="material-hero">
        <div className="container material-hero-content">
          <h1>{material.title}</h1>
          {material.shortDescription && <p>{material.shortDescription}</p>}
        </div>
      </div>

      {/* ===== Main Content ===== */}
      <div className="container material-main-content">
        <div className="material-layout">
          {/* Left: Image + Our Products */}
          <div className="material-image-column mt-28">
            {/* Image Card */}
            <div className="material-image-card">
              <img src={material.image} alt={material.title} />
            </div>
            <div className="image-caption">
              <h4 className="caption-title">{material.title}</h4>
              <p className="caption-description">
                {getCaptionDescription(slug)}
              </p>
              <div className="caption-tags">
                {material.materialGroup && (
                  <span className="tag">{material.materialGroup}</span>
                )}
                {material.standards && (
                  <span className="tag">
                    {material.standards.split(",")[0]}
                  </span>
                )}
                {material.forms && (
                  <span className="tag">{material.forms.split(",")[0]}</span>
                )}
              </div>
            </div>

            {/* ===== OUR PRODUCTS SECTION (BELOW IMAGE) ===== */}
            <div className="our-products-sidebar mt-8">
              <h3 className="our-products-sidebar-title">Our Products</h3>
              <div className="our-products-sidebar-list">
                {productCategories.map((category) => (
                  <Link
                    key={category.slug}
                    to={`/products/${category.slug}`}
                    className={`product-sidebar-item ${slug === category.slug ? "active" : ""}`}
                  >
                    <span className="product-bullet">-</span>
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="material-info-column mt-5">
            {/* Tabs - Only show tabs with content */}
            <div className="material-tabs">
              <button
                className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>

              {(hasData(material.standards) ||
                hasData(material.specifications) ||
                hasData(material.equivalentGrades) ||
                hasData(material.chemicalComposition) ||
                hasData(material.mechanicalProperties) ||
                hasData(material.weightSizeChart) ||
                hasData(material.gaugeChart) ||
                hasData(material.thicknessTolerance) ||
                hasData(material.priceList)) && (
                <button
                  className={`tab-btn ${activeTab === "specifications" ? "active" : ""}`}
                  onClick={() => setActiveTab("specifications")}
                >
                  Specifications
                </button>
              )}

              {(hasData(material.application) ||
                hasData(material.applications)) && (
                <button
                  className={`tab-btn ${activeTab === "applications" ? "active" : ""}`}
                  onClick={() => setActiveTab("applications")}
                >
                  Applications
                </button>
              )}

              {hasData(material.stockAvailability) && (
                <button
                  className={`tab-btn ${activeTab === "availability" ? "active" : ""}`}
                  onClick={() => setActiveTab("availability")}
                >
                  Availability
                </button>
              )}

              {(hasData(material.exportCountries) ||
                hasData(material.supplyCities)) && (
                <button
                  className={`tab-btn ${activeTab === "supply" ? "active" : ""}`}
                  onClick={() => setActiveTab("supply")}
                >
                  Supply Network
                </button>
              )}
            </div>

            <div className="material-tab-content">
              {/* ===== OVERVIEW TAB ===== */}
              {activeTab === "overview" && (
                <div className="tab-panel">
                  <div className="overview-header">
                    <h2>Product Overview</h2>
                  </div>

                  {material.shortDescription && (
                    <p>{material.shortDescription}</p>
                  )}

                  {material.technicalOverview && (
                    <p style={{ marginTop: "1rem" }}>
                      {material.technicalOverview}
                    </p>
                  )}

                  {/* ===== GENERIC INFO ROWS ===== */}
                  {(() => {
                    const infoFields = [
                      { key: "materialGroup", label: "Material Group" },
                      { key: "standards", label: "Standards" },
                      { key: "forms", label: "Available Forms" },
                    ];
                    return infoFields.map(({ key, label }) => {
                      const value = material[key];
                      if (!value) return null;
                      return (
                        <div key={key} className="info-row">
                          <span className="info-label">{label}:</span>
                          <span className="info-value">{value}</span>
                        </div>
                      );
                    });
                  })()}

                  {/* ===== KEY FEATURES ===== */}
                  {(hasData(material.keyFeatures) ||
                    hasData(material.specializedIn)) && (
                    <div className="key-features">
                      <h3>Key Features</h3>
                      <ul>
                        {(
                          material.keyFeatures ||
                          material.specializedIn ||
                          []
                        ).map((feature: string, index: number) => (
                          <li key={index}>
                            <CheckCircle size={16} /> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* ===== GRADE DETAILS OVERVIEW ===== */}
                  {(() => {
                    const gradeDetails = material.gradeDetails;
                    if (!gradeDetails) return null;
                    if (typeof gradeDetails !== "object") return null;
                    if (Object.keys(gradeDetails).length === 0) return null;

                    const hasValidData = Object.values(gradeDetails).some(
                      (value) => {
                        if (typeof value === "object" && value !== null) {
                          return Object.keys(value).length > 0;
                        }
                        return false;
                      },
                    );
                    if (!hasValidData) return null;

                    return (
                      <div
                        className="grade-details-overview"
                        style={{ marginTop: "2rem" }}
                      >
                        <h3>Available Grades Overview</h3>
                        {Object.entries(gradeDetails).map(
                          ([sectionKey, sectionValue]) => {
                            if (
                              typeof sectionValue !== "object" ||
                              sectionValue === null
                            )
                              return null;
                            if (Object.keys(sectionValue).length === 0)
                              return null;

                            const label = sectionKey
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase());

                            const entries = Object.entries(sectionValue);
                            const displayEntries = entries.slice(0, 2);
                            const hasMore = entries.length > 2;

                            return (
                              <div
                                key={sectionKey}
                                style={{ marginBottom: "1rem" }}
                              >
                                <h4>{label}</h4>
                                {displayEntries.map(([grade, desc]) => (
                                  <div key={grade} className="grade-item">
                                    <strong>{grade}</strong>: {desc as string}
                                  </div>
                                ))}
                                {hasMore && (
                                  <div
                                    style={{
                                      color: "#666",
                                      fontSize: "0.85rem",
                                      marginTop: "4px",
                                    }}
                                  >
                                    + {entries.length - 2} more grades
                                  </div>
                                )}
                              </div>
                            );
                          },
                        )}
                        <Link
                          to="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("specifications");
                          }}
                          style={{
                            color: "#c92525",
                            fontWeight: "600",
                            textDecoration: "none",
                            display: "inline-block",
                            marginTop: "8px",
                          }}
                        >
                          View all grades →
                        </Link>
                      </div>
                    );
                  })()}

                  {/* ===== ALL DETAILS SECTION ===== */}
                  {showAllDetails && (
                    <div className="all-details-container">
                      <h3 className="details-title">
                        Complete Product Details
                      </h3>

                      {/* ===== GENERIC: ALL SPECIFICATIONS STRINGS ===== */}
                      {hasData(material.specifications) && (
                        <div style={{ marginTop: "1.5rem" }}>
                          <h4>Technical Specifications</h4>
                          {Object.entries(material.specifications)
                            .filter(([key, value]) => {
                              if (typeof value === "object") return false;
                              if (
                                typeof value === "string" &&
                                value.trim() === ""
                              )
                                return false;
                              return true;
                            })
                            .map(([key, value]) => (
                              <div key={key} className="spec-table">
                                <div className="spec-row">
                                  <span className="spec-label">
                                    {key
                                      .replace(/([A-Z])/g, " $1")
                                      .replace(/^./, (str) =>
                                        str.toUpperCase(),
                                      )}
                                  </span>
                                  <span className="spec-value">
                                    {value as string}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}

                      {/* ===== GENERIC: RENDER ANY ARRAY DATA ===== */}
                      {(() => {
                        const arrayFields = [
                          {
                            key: "chemicalComposition",
                            title: "Chemical Composition",
                          },
                          {
                            key: "mechanicalProperties",
                            title: "Mechanical Properties",
                          },
                          {
                            key: "equivalentGrades",
                            title: "Equivalent Grades",
                          },
                          {
                            key: "astmSpecifications",
                            title: "ASTM Specifications",
                          },
                          {
                            key: "weightSizeChart",
                            title: "Weight / Size Chart",
                          },
                          { key: "priceList", title: "Price List" },
                          { key: "gaugeChart", title: "Gauge Chart" },
                          {
                            key: "thicknessTolerance",
                            title: "Thickness Tolerance",
                          },
                          { key: "sizeDimensions", title: "Size Dimensions" },
                        ];

                        return arrayFields.map(({ key, title }) => {
                          const data = material[key];
                          if (
                            !data ||
                            !Array.isArray(data) ||
                            data.length === 0
                          )
                            return null;

                          const columns = Object.keys(data[0]);

                          return (
                            <div key={key} style={{ marginTop: "1.5rem" }}>
                              <h4>{title}</h4>
                              <div style={{ overflowX: "auto" }}>
                                <table
                                  className="spec-table-grid"
                                  style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                  }}
                                >
                                  <thead>
                                    <tr style={{ backgroundColor: "#f5f5f5" }}>
                                      {columns.map((col) => (
                                        <th
                                          key={col}
                                          style={{
                                            padding: "10px",
                                            border: "1px solid #ddd",
                                            textAlign: "left",
                                          }}
                                        >
                                          {col
                                            .replace(/_/g, " ")
                                            .replace(/([A-Z])/g, " $1")
                                            .trim()
                                            .toUpperCase()}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {data.map((item: any, idx: number) => (
                                      <tr key={idx}>
                                        {columns.map((col) => (
                                          <td
                                            key={col}
                                            style={{
                                              padding: "10px",
                                              border: "1px solid #ddd",
                                            }}
                                          >
                                            {item[col] !== undefined &&
                                            item[col] !== null
                                              ? item[col]
                                              : "—"}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          );
                        });
                      })()}

                      {/* ===== APPLICATIONS ===== */}
                      {(hasData(material.application) ||
                        hasData(material.applications)) && (
                        <div style={{ marginTop: "1.5rem" }}>
                          <h4>Applications</h4>
                          {material.application && (
                            <p>{material.application}</p>
                          )}
                          {hasData(material.applications) && (
                            <ul>
                              {material.applications.map(
                                (app: string, index: number) => (
                                  <li key={index}>
                                    <CheckCircle size={16} /> {app}
                                  </li>
                                ),
                              )}
                            </ul>
                          )}
                        </div>
                      )}

                      {/* ===== STOCK AVAILABILITY ===== */}
                      {hasData(material.stockAvailability) && (
                        <div style={{ marginTop: "1.5rem" }}>
                          <h4>Stock Availability</h4>
                          {Object.entries(material.stockAvailability).map(
                            ([categoryKey, categoryData]: [string, any]) => {
                              if (
                                !Array.isArray(categoryData) ||
                                categoryData.length === 0
                              )
                                return null;
                              return (
                                <div
                                  key={categoryKey}
                                  style={{ marginBottom: "1rem" }}
                                >
                                  <h5>
                                    {categoryKey
                                      .replace(/([A-Z])/g, " $1")
                                      .trim()}
                                  </h5>
                                  <ul>
                                    {categoryData.map(
                                      (item: any, idx: number) => (
                                        <li key={idx}>
                                          {typeof item === "string"
                                            ? item
                                            : item.title ||
                                              item.name ||
                                              JSON.stringify(item)}
                                        </li>
                                      ),
                                    )}
                                  </ul>
                                </div>
                              );
                            },
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ===== SPECIFICATIONS TAB ===== */}
              {activeTab === "specifications" && (
                <div className="tab-panel">
                  <h2>Technical Specifications</h2>

                  {/* ===== BASIC FIELDS ===== */}
                  {[
                    { key: "standards", label: "Standards & Grades" },
                    { key: "materialGroup", label: "Material Group" },
                    { key: "forms", label: "Forms Available" },
                    { key: "application", label: "Applications" },
                  ].map(({ key, label }) => {
                    const value = material[key];
                    if (!value) return null;
                    return (
                      <div key={key} className="spec-table">
                        <div className="spec-row">
                          <span className="spec-label">{label}</span>
                          <span className="spec-value">{value}</span>
                        </div>
                      </div>
                    );
                  })}

                  {/* ===== GENERIC SPECIFICATIONS RENDERER ===== */}
                  {(() => {
                    const specs = material.specifications;
                    if (!specs) return null;

                    const allKeys = Object.keys(specs);

                    const labelMap: Record<string, string> = {
                      standard: "Standard",
                      sizeRange: "Size Range",
                      finishLength: "Finish / Length",
                      availableForms: "Available Forms",
                      surfaceFinish: "Surface Finish",
                      thicknessRange: "Thickness Range",
                      widthRange: "Width Range",
                      widthLength: "Width / Length",
                      thickness: "Thickness",
                      width: "Width",
                      length: "Length",
                      form: "Form",
                      hardness: "Hardness",
                      seamlessPipeSize: "Seamless Pipe Size",
                      weldedPipeSize: "Welded Pipe Size",
                      efwPipeSize: "EFW Pipe Size",
                      outsideDiameter: "Outside Diameter",
                      scheduleRange: "Schedule Range",
                      outsideFinish: "Outside Finish",
                      deliveryCondition: "Delivery Condition",
                      dimensionalSpecification: "Dimensional Specification",
                      manufacturingShapes: "Manufacturing Shapes",
                      pipeEnds: "Pipe Ends",
                      manufacturingTechniques: "Manufacturing Techniques",
                      hardnessTemper: "Hardness Temper",
                      formHardness: "Form & Hardness",
                      formLength: "Form & Length",
                      valueAddedServices: "Value Added Services",
                      testCertificate: "Test Certificate",
                      roundBarSizes: "Round Bar Sizes",
                      tolerances: "Tolerances",
                      standardButtweld: "Standard (Buttweld)",
                      standardForged: "Standard (Forged)",
                      dimensionalStandards: "Dimensional Standards",
                      grades: "Grades",
                      b366GradeMarkings: "B366 Grade Markings",
                      schedule: "Schedule",
                      endPreparation: "End Preparation",
                      construction: "Construction",
                      stockQuantity: "Stock Quantity",
                      certifications: "Certifications",
                      hotRolled: "Hot Rolled",
                      coldRolled: "Cold Rolled",
                    };

                    const stringEntries = allKeys.filter(
                      (key) =>
                        typeof specs[key] === "string" &&
                        specs[key].toString().trim() !== "" &&
                        ![
                          "surfaceFinish",
                          "tolerances",
                          "roundBarSizes",
                          "gaugeChart",
                          "hotRolled",
                          "coldRolled",
                        ].includes(key),
                    );

                    const surfaceFinish = specs.surfaceFinish;
                    const roundBarSizes = specs.roundBarSizes;
                    const tolerances = specs.tolerances;
                    const gaugeChart = specs.gaugeChart;
                    const hotRolled = specs.hotRolled;
                    const coldRolled = specs.coldRolled;

                    const otherArrays = allKeys.filter(
                      (key) =>
                        Array.isArray(specs[key]) &&
                        specs[key].length > 0 &&
                        !["roundBarSizes", "tolerances", "gaugeChart"].includes(
                          key,
                        ),
                    );

                    const otherObjects = allKeys.filter(
                      (key) =>
                        typeof specs[key] === "object" &&
                        !Array.isArray(specs[key]) &&
                        specs[key] !== null &&
                        !["tolerances", "hotRolled", "coldRolled"].includes(
                          key,
                        ),
                    );

                    return (
                      <>
                        {stringEntries.length > 0 && (
                          <>
                            <h3 style={{ marginTop: "2rem" }}>
                              Detailed Specifications
                            </h3>
                            {stringEntries.map((key) => {
                              const label =
                                labelMap[key] ||
                                key
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) => str.toUpperCase());
                              return (
                                <div key={key} className="spec-table">
                                  <div className="spec-row">
                                    <span className="spec-label">{label}</span>
                                    <span className="spec-value">
                                      {specs[key]}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        )}

                        {surfaceFinish && typeof surfaceFinish === "string" && (
                          <div className="spec-table">
                            <div className="spec-row">
                              <span className="spec-label">Surface Finish</span>
                              <span className="spec-value">
                                {surfaceFinish}
                              </span>
                            </div>
                          </div>
                        )}

                        {hotRolled && typeof hotRolled === "object" && (
                          <>
                            <h3 style={{ marginTop: "2rem" }}>
                              Hot Rolled Specifications
                            </h3>
                            {Object.entries(hotRolled).map(([key, value]) => {
                              if (!value) return null;
                              const label = key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase());
                              return (
                                <div key={key} className="spec-table">
                                  <div className="spec-row">
                                    <span className="spec-label">{label}</span>
                                    <span className="spec-value">
                                      {String(value)}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        )}

                        {coldRolled && typeof coldRolled === "object" && (
                          <>
                            <h3 style={{ marginTop: "2rem" }}>
                              Cold Rolled Specifications
                            </h3>
                            {Object.entries(coldRolled).map(([key, value]) => {
                              if (!value) return null;
                              const label = key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase());
                              return (
                                <div key={key} className="spec-table">
                                  <div className="spec-row">
                                    <span className="spec-label">{label}</span>
                                    <span className="spec-value">
                                      {String(value)}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        )}

                        {gaugeChart &&
                          Array.isArray(gaugeChart) &&
                          gaugeChart.length > 0 && (
                            <div style={{ marginTop: "2rem" }}>
                              <h3>Gauge Thickness Chart</h3>
                              <p
                                style={{
                                  marginBottom: "15px",
                                  color: "#666",
                                  fontSize: "0.9rem",
                                }}
                              >
                                Standard gauge thicknesses with nominal decimal
                                values
                              </p>
                              <div
                                style={{
                                  overflowX: "auto",
                                  borderRadius: "8px",
                                  border: "1px solid #e9ecef",
                                }}
                              >
                                <table
                                  style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  <thead>
                                    <tr style={{ backgroundColor: "#f5f5f5" }}>
                                      {Object.keys(gaugeChart[0]).map((col) => (
                                        <th
                                          key={col}
                                          style={{
                                            padding: "12px 15px",
                                            border: "1px solid #ddd",
                                            textAlign: "left",
                                            fontWeight: "700",
                                            color: "#1a2b4c",
                                            whiteSpace: "nowrap",
                                          }}
                                        >
                                          {col
                                            .replace(/_/g, " ")
                                            .replace(/([A-Z])/g, " $1")
                                            .trim()
                                            .toUpperCase()}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {gaugeChart.map(
                                      (item: any, idx: number) => (
                                        <tr
                                          key={idx}
                                          style={{
                                            backgroundColor:
                                              idx % 2 === 0
                                                ? "white"
                                                : "#fafafa",
                                          }}
                                        >
                                          {Object.keys(gaugeChart[0]).map(
                                            (col) => (
                                              <td
                                                key={col}
                                                style={{
                                                  padding: "10px 15px",
                                                  border: "1px solid #ddd",
                                                  color: "#555",
                                                }}
                                              >
                                                {item[col] || "—"}
                                              </td>
                                            ),
                                          )}
                                        </tr>
                                      ),
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                        {Array.isArray(roundBarSizes) &&
                          roundBarSizes.length > 0 && (
                            <div style={{ marginTop: "2rem" }}>
                              <h3>Round Bar Sizes</h3>
                              <p
                                style={{
                                  marginBottom: "15px",
                                  color: "#666",
                                  fontSize: "0.9rem",
                                }}
                              >
                                Available sizes with specifications
                              </p>
                              <div
                                style={{
                                  overflowX: "auto",
                                  borderRadius: "8px",
                                  border: "1px solid #e9ecef",
                                }}
                              >
                                <table
                                  style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  <thead>
                                    <tr style={{ backgroundColor: "#f5f5f5" }}>
                                      {Object.keys(roundBarSizes[0]).map(
                                        (col) => (
                                          <th
                                            key={col}
                                            style={{
                                              padding: "12px 15px",
                                              border: "1px solid #ddd",
                                              textAlign: "left",
                                              fontWeight: "700",
                                              color: "#1a2b4c",
                                              whiteSpace: "nowrap",
                                            }}
                                          >
                                            {col
                                              .replace(/_/g, " ")
                                              .replace(/([A-Z])/g, " $1")
                                              .trim()
                                              .toUpperCase()}
                                          </th>
                                        ),
                                      )}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {roundBarSizes.map(
                                      (item: any, idx: number) => (
                                        <tr
                                          key={idx}
                                          style={{
                                            backgroundColor:
                                              idx % 2 === 0
                                                ? "white"
                                                : "#fafafa",
                                          }}
                                        >
                                          {Object.keys(roundBarSizes[0]).map(
                                            (col) => (
                                              <td
                                                key={col}
                                                style={{
                                                  padding: "10px 15px",
                                                  border: "1px solid #ddd",
                                                  color: "#555",
                                                }}
                                              >
                                                {item[col] || "—"}
                                              </td>
                                            ),
                                          )}
                                        </tr>
                                      ),
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                        {tolerances &&
                          typeof tolerances === "object" &&
                          !Array.isArray(tolerances) && (
                            <div style={{ marginTop: "2rem" }}>
                              <h3>Tolerances</h3>
                              {Object.entries(tolerances).map(
                                ([key, value]) => {
                                  if (
                                    !Array.isArray(value) ||
                                    value.length === 0
                                  )
                                    return null;
                                  const label =
                                    labelMap[key] ||
                                    key.replace(/([A-Z])/g, " $1").trim();
                                  return (
                                    <div
                                      key={key}
                                      style={{ marginBottom: "2rem" }}
                                    >
                                      <h4
                                        style={{
                                          marginBottom: "10px",
                                          color: "#1a2b4c",
                                        }}
                                      >
                                        {label}
                                      </h4>
                                      <div
                                        style={{
                                          overflowX: "auto",
                                          borderRadius: "8px",
                                          border: "1px solid #e9ecef",
                                        }}
                                      >
                                        <table
                                          style={{
                                            width: "100%",
                                            borderCollapse: "collapse",
                                            fontSize: "0.9rem",
                                          }}
                                        >
                                          <thead>
                                            <tr
                                              style={{
                                                backgroundColor: "#f5f5f5",
                                              }}
                                            >
                                              {Object.keys(value[0]).map(
                                                (col) => (
                                                  <th
                                                    key={col}
                                                    style={{
                                                      padding: "10px 15px",
                                                      border: "1px solid #ddd",
                                                      textAlign: "left",
                                                      fontWeight: "700",
                                                      color: "#1a2b4c",
                                                    }}
                                                  >
                                                    {col
                                                      .replace(/_/g, " ")
                                                      .replace(
                                                        /([A-Z])/g,
                                                        " $1",
                                                      )
                                                      .trim()
                                                      .toUpperCase()}
                                                  </th>
                                                ),
                                              )}
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {value.map(
                                              (item: any, idx: number) => (
                                                <tr
                                                  key={idx}
                                                  style={{
                                                    backgroundColor:
                                                      idx % 2 === 0
                                                        ? "white"
                                                        : "#fafafa",
                                                  }}
                                                >
                                                  {Object.keys(value[0]).map(
                                                    (col) => (
                                                      <td
                                                        key={col}
                                                        style={{
                                                          padding: "8px 15px",
                                                          border:
                                                            "1px solid #ddd",
                                                          color: "#555",
                                                        }}
                                                      >
                                                        {item[col] || "—"}
                                                      </td>
                                                    ),
                                                  )}
                                                </tr>
                                              ),
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          )}

                        {otherArrays.map((key) => {
                          const data = specs[key];
                          if (!Array.isArray(data) || data.length === 0)
                            return null;
                          const label =
                            labelMap[key] ||
                            key.replace(/([A-Z])/g, " $1").trim();
                          const columns = Object.keys(data[0]);
                          return (
                            <div key={key} style={{ marginTop: "2rem" }}>
                              <h3>{label}</h3>
                              <div
                                style={{
                                  overflowX: "auto",
                                  borderRadius: "8px",
                                  border: "1px solid #e9ecef",
                                }}
                              >
                                <table
                                  style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  <thead>
                                    <tr style={{ backgroundColor: "#f5f5f5" }}>
                                      {columns.map((col) => (
                                        <th
                                          key={col}
                                          style={{
                                            padding: "12px 15px",
                                            border: "1px solid #ddd",
                                            textAlign: "left",
                                            fontWeight: "700",
                                            color: "#1a2b4c",
                                            whiteSpace: "nowrap",
                                          }}
                                        >
                                          {col
                                            .replace(/_/g, " ")
                                            .replace(/([A-Z])/g, " $1")
                                            .trim()
                                            .toUpperCase()}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {data.map((item: any, idx: number) => (
                                      <tr
                                        key={idx}
                                        style={{
                                          backgroundColor:
                                            idx % 2 === 0 ? "white" : "#fafafa",
                                        }}
                                      >
                                        {columns.map((col) => (
                                          <td
                                            key={col}
                                            style={{
                                              padding: "10px 15px",
                                              border: "1px solid #ddd",
                                              color: "#555",
                                            }}
                                          >
                                            {item[col] || "—"}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          );
                        })}

                        {otherObjects.map((key) => {
                          const data = specs[key];
                          if (typeof data !== "object" || data === null)
                            return null;
                          const label =
                            labelMap[key] ||
                            key.replace(/([A-Z])/g, " $1").trim();
                          return (
                            <div key={key} style={{ marginTop: "2rem" }}>
                              <h3>{label}</h3>
                              {Object.entries(data).map(
                                ([subKey, subValue]) => (
                                  <div key={subKey} className="spec-table">
                                    <div className="spec-row">
                                      <span className="spec-label">
                                        {subKey
                                          .replace(/([A-Z])/g, " $1")
                                          .replace(/^./, (str) =>
                                            str.toUpperCase(),
                                          )}
                                      </span>
                                      <span className="spec-value">
                                        {typeof subValue === "object"
                                          ? JSON.stringify(subValue)
                                          : String(subValue)}
                                      </span>
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          );
                        })}
                      </>
                    );
                  })()}

                  {/* ===== GENERIC TABLE RENDERER ===== */}
                  {(() => {
                    // Check if we have table data
                    const tableData =
                      material.sizeRange ||
                      material.fittingSizeTable ||
                      material.specificationsTable;
                    if (!tableData) return null;

                    // Convert to array if it's an object
                    const dataArray = Array.isArray(tableData)
                      ? tableData
                      : Object.values(tableData);
                    if (!dataArray || dataArray.length === 0) return null;

                    // Get all possible column keys from the first row
                    const allKeys = Object.keys(dataArray[0]);

                    // Filter out keys that have NO data in any row
                    const visibleColumns = allKeys.filter((key) => {
                      return dataArray.some((row) => {
                        const value = row[key];
                        return (
                          value !== undefined &&
                          value !== null &&
                          value !== "" &&
                          value !== "—"
                        );
                      });
                    });

                    // If no visible columns, don't render anything
                    if (visibleColumns.length === 0) return null;

                    // Get the title from the data structure
                    let title = "Specifications";
                    if (material.sizeRange) title = "Size Range";
                    else if (material.fittingSizeTable)
                      title = "Fitting Size Table";
                    else if (material.specificationsTable)
                      title = "Specifications";

                    // Clean up key names for display
                    const formatKey = (key: string) => {
                      return key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())
                        .replace(/_/g, " ");
                    };

                    return (
                      <>
                        <h3 style={{ marginTop: "2rem" }}>{title}</h3>
                        <div style={{ overflowX: "auto" }}>
                          <table
                            className="spec-table-grid"
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                            }}
                          >
                            <thead>
                              <tr style={{ backgroundColor: "#f5f5f5" }}>
                                {visibleColumns.map((key) => (
                                  <th
                                    key={key}
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      textAlign: "left",
                                    }}
                                  >
                                    {formatKey(key)}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {dataArray.map((row: any, idx: number) => (
                                <tr
                                  key={idx}
                                  style={{
                                    backgroundColor:
                                      idx % 2 === 0 ? "white" : "#fafafa",
                                  }}
                                >
                                  {visibleColumns.map((key) => (
                                    <td
                                      key={key}
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                      }}
                                    >
                                      {row[key] !== undefined &&
                                      row[key] !== null &&
                                      row[key] !== ""
                                        ? row[key]
                                        : "—"}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    );
                  })()}

                  {/* ===== STANDARD TABLES ===== */}
                  {material.standardTables && (
                    <>
                      <h3 style={{ marginTop: "2rem" }}>
                        Standard Specifications
                      </h3>

                      {material.standardTables.specificationsTable && (
                        <div style={{ overflowX: "auto" }}>
                          <table
                            className="spec-table-grid"
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                            }}
                          >
                            <tbody>
                              {Object.entries(
                                material.standardTables.specificationsTable,
                              ).map(([key, value]: [string, any], idx) => (
                                <tr
                                  key={idx}
                                  style={{
                                    backgroundColor:
                                      idx % 2 === 0 ? "white" : "#fafafa",
                                  }}
                                >
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      fontWeight: "600",
                                      width: "30%",
                                    }}
                                  >
                                    {key}
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                    }}
                                  >
                                    {value}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {material.standardTables.fittingSizeTable &&
                        material.standardTables.fittingSizeTable.length > 0 && (
                          <>
                            <h4 style={{ marginTop: "1.5rem" }}>
                              Fitting Size Table
                            </h4>
                            <div style={{ overflowX: "auto" }}>
                              <table
                                className="spec-table-grid"
                                style={{
                                  width: "100%",
                                  borderCollapse: "collapse",
                                }}
                              >
                                <thead>
                                  <tr style={{ backgroundColor: "#f5f5f5" }}>
                                    <th
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                        textAlign: "left",
                                      }}
                                    >
                                      Fitting Group
                                    </th>
                                    <th
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                        textAlign: "left",
                                      }}
                                    >
                                      Governing Standard
                                    </th>
                                    <th
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                        textAlign: "left",
                                      }}
                                    >
                                      Size Range
                                    </th>
                                    <th
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                        textAlign: "left",
                                      }}
                                    >
                                      Wall Class
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {material.standardTables.fittingSizeTable.map(
                                    (item: any, idx: number) => (
                                      <tr
                                        key={idx}
                                        style={{
                                          backgroundColor:
                                            idx % 2 === 0 ? "white" : "#fafafa",
                                        }}
                                      >
                                        <td
                                          style={{
                                            padding: "10px",
                                            border: "1px solid #ddd",
                                            fontWeight: "600",
                                          }}
                                        >
                                          {item.fittingGroup}
                                        </td>
                                        <td
                                          style={{
                                            padding: "10px",
                                            border: "1px solid #ddd",
                                          }}
                                        >
                                          {item.governingStandard}
                                        </td>
                                        <td
                                          style={{
                                            padding: "10px",
                                            border: "1px solid #ddd",
                                          }}
                                        >
                                          {item.sizeRange}
                                        </td>
                                        <td
                                          style={{
                                            padding: "10px",
                                            border: "1px solid #ddd",
                                          }}
                                        >
                                          {item.wallClass}
                                        </td>
                                      </tr>
                                    ),
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </>
                        )}
                    </>
                  )}

                  {/* ===== TESTING AND CERTIFICATION ===== */}
                  {material.testingAndCertification && (
                    <>
                      <h3 style={{ marginTop: "2rem" }}>
                        Testing & Certification
                      </h3>

                      {material.testingAndCertification.testingMethods &&
                        material.testingAndCertification.testingMethods.length >
                          0 && (
                          <div style={{ marginBottom: "1.5rem" }}>
                            <h4>Testing Methods</h4>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                              {material.testingAndCertification.testingMethods.map(
                                (method: string, idx: number) => (
                                  <li
                                    key={idx}
                                    style={{
                                      padding: "6px 0",
                                      borderBottom: "1px solid #f0f0f0",
                                    }}
                                  >
                                    ✓ {method}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}

                      {material.testingAndCertification.certificationTypes &&
                        material.testingAndCertification.certificationTypes
                          .length > 0 && (
                          <div style={{ marginBottom: "1.5rem" }}>
                            <h4>Certification Types</h4>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                              {material.testingAndCertification.certificationTypes.map(
                                (cert: string, idx: number) => (
                                  <li
                                    key={idx}
                                    style={{
                                      padding: "6px 0",
                                      borderBottom: "1px solid #f0f0f0",
                                    }}
                                  >
                                    ✓ {cert}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}

                      {material.testingAndCertification.traceability && (
                        <div>
                          <h4>Traceability</h4>
                          <p style={{ color: "#555", lineHeight: "1.6" }}>
                            {material.testingAndCertification.traceability}
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {/* ===== SHIPPING AND PACKAGING ===== */}
                  {material.shippingAndPackaging && (
                    <>
                      <h3 style={{ marginTop: "2rem" }}>
                        Shipping & Packaging
                      </h3>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "15px",
                        }}
                      >
                        {Object.entries(material.shippingAndPackaging).map(
                          ([key, value]) => {
                            const labelMap: Record<string, string> = {
                              packingMethod: "Packing Method",
                              marking: "Marking",
                              deliveryTime: "Delivery Time",
                              exportDestinations: "Export Destinations",
                              domesticCoverage: "Domestic Coverage",
                            };
                            return (
                              <div
                                key={key}
                                className="spec-table"
                                style={{
                                  gridColumn:
                                    key === "packingMethod" || key === "marking"
                                      ? "1 / -1"
                                      : "auto",
                                }}
                              >
                                <div className="spec-row">
                                  <span className="spec-label">
                                    {labelMap[key] ||
                                      key.replace(/([A-Z])/g, " $1").trim()}
                                  </span>
                                  <span className="spec-value">
                                    {String(value)}
                                  </span>
                                </div>
                              </div>
                            );
                          },
                        )}
                      </div>
                    </>
                  )}

                  {/* ===== GRADE DETAILS ===== */}
                  {(() => {
                    const gradeDetails = material.gradeDetails;
                    if (!gradeDetails) return null;
                    if (typeof gradeDetails !== "object") return null;
                    if (Object.keys(gradeDetails).length === 0) return null;

                    const hasValidData = Object.values(gradeDetails).some(
                      (value) => {
                        if (typeof value === "object" && value !== null) {
                          return Object.keys(value).length > 0;
                        }
                        return false;
                      },
                    );
                    if (!hasValidData) return null;

                    return (
                      <>
                        <h3 style={{ marginTop: "2rem" }}>Grade Details</h3>
                        {Object.entries(gradeDetails).map(
                          ([sectionKey, sectionValue]) => {
                            if (
                              typeof sectionValue !== "object" ||
                              sectionValue === null
                            )
                              return null;
                            if (Object.keys(sectionValue).length === 0)
                              return null;

                            const label = sectionKey
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase());

                            return (
                              <div
                                key={sectionKey}
                                style={{ marginBottom: "1.5rem" }}
                              >
                                <h4>{label}</h4>
                                {Object.entries(sectionValue).map(
                                  ([grade, desc]) => (
                                    <div
                                      key={grade}
                                      className="grade-item"
                                      style={{
                                        marginBottom: "0.5rem",
                                        padding: "12px 16px",
                                        background: "#f8f9fa",
                                        borderRadius: "6px",
                                        borderLeft: "3px solid #c92525",
                                      }}
                                    >
                                      <strong style={{ color: "#1a2b4c" }}>
                                        {grade}
                                      </strong>
                                      :{" "}
                                      <span style={{ color: "#555" }}>
                                        {desc as string}
                                      </span>
                                    </div>
                                  ),
                                )}
                              </div>
                            );
                          },
                        )}
                      </>
                    );
                  })()}

                  {/* ===== EQUIVALENT GRADES ===== */}
                  {material.equivalentGrades &&
                    material.equivalentGrades.length > 0 && (
                      <>
                        <h3 style={{ marginTop: "2rem" }}>Equivalent Grades</h3>
                        <p
                          style={{
                            marginBottom: "15px",
                            color: "#666",
                            fontSize: "0.9rem",
                          }}
                        >
                          Equivalent grades across international standards
                        </p>
                        <div style={{ overflowX: "auto" }}>
                          <table
                            className="spec-table-grid"
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                            }}
                          >
                            <thead>
                              <tr style={{ backgroundColor: "#f5f5f5" }}>
                                {Object.keys(material.equivalentGrades[0]).map(
                                  (key) => {
                                    const labelMap: Record<string, string> = {
                                      grade: "Grade",
                                      uns: "UNS",
                                      wnr: "Werkstoff Nr.",
                                      werkstoff: "Werkstoff Nr.",
                                      jis: "JIS",
                                      bs: "BS",
                                      gost: "GOST",
                                      afnor: "AFNOR",
                                      en: "EN",
                                      common: "Common Name",
                                      standard: "Standard",
                                    };
                                    return (
                                      <th
                                        key={key}
                                        style={{
                                          padding: "10px 12px",
                                          border: "1px solid #ddd",
                                          textAlign: "left",
                                          fontWeight: "700",
                                          color: "#1a2b4c",
                                        }}
                                      >
                                        {labelMap[key] ||
                                          key
                                            .replace(/([A-Z])/g, " $1")
                                            .trim()
                                            .toUpperCase()}
                                      </th>
                                    );
                                  },
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {material.equivalentGrades.map(
                                (item: any, idx: number) => (
                                  <tr
                                    key={idx}
                                    style={{
                                      backgroundColor:
                                        idx % 2 === 0 ? "white" : "#fafafa",
                                    }}
                                  >
                                    {Object.keys(
                                      material.equivalentGrades[0],
                                    ).map((key) => (
                                      <td
                                        key={key}
                                        style={{
                                          padding: "10px 12px",
                                          border: "1px solid #ddd",
                                          color:
                                            key.toLowerCase() === "grade"
                                              ? "#1a2b4c"
                                              : "#555",
                                          fontWeight:
                                            key.toLowerCase() === "grade"
                                              ? "600"
                                              : "400",
                                        }}
                                      >
                                        {item[key] !== undefined &&
                                        item[key] !== null
                                          ? item[key]
                                          : "—"}
                                      </td>
                                    ))}
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}

                  {/* ===== CHEMICAL COMPOSITION ===== */}
                  {material.chemicalComposition &&
                    material.chemicalComposition.length > 0 && (
                      <>
                        <h3 style={{ marginTop: "2rem" }}>
                          Chemical Composition
                        </h3>
                        <div style={{ overflowX: "auto" }}>
                          <table
                            className="spec-table-grid"
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                            }}
                          >
                            <thead>
                              <tr style={{ backgroundColor: "#f5f5f5" }}>
                                {Object.keys(
                                  material.chemicalComposition[0],
                                ).map((key) => (
                                  <th
                                    key={key}
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      textAlign: "left",
                                    }}
                                  >
                                    {key.toUpperCase()}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {material.chemicalComposition.map(
                                (item: any, idx: number) => (
                                  <tr key={idx}>
                                    {Object.values(item).map(
                                      (value: any, colIdx: number) => (
                                        <td
                                          key={colIdx}
                                          style={{
                                            padding: "10px",
                                            border: "1px solid #ddd",
                                          }}
                                        >
                                          {value}
                                        </td>
                                      ),
                                    )}
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}

                  {/* ===== MECHANICAL PROPERTIES ===== */}
                  {material.mechanicalProperties &&
                    material.mechanicalProperties.length > 0 && (
                      <>
                        <h3 style={{ marginTop: "2rem" }}>
                          Mechanical & Physical Properties
                        </h3>
                        <div style={{ overflowX: "auto" }}>
                          <table
                            className="spec-table-grid"
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                            }}
                          >
                            <thead>
                              <tr style={{ backgroundColor: "#f5f5f5" }}>
                                {Object.keys(
                                  material.mechanicalProperties[0],
                                ).map((key) => (
                                  <th
                                    key={key}
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      textAlign: "left",
                                    }}
                                  >
                                    {key.replace(/_/g, " ").toUpperCase()}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {material.mechanicalProperties.map(
                                (item: any, idx: number) => (
                                  <tr key={idx}>
                                    {Object.values(item).map(
                                      (value: any, colIdx: number) => (
                                        <td
                                          key={colIdx}
                                          style={{
                                            padding: "10px",
                                            border: "1px solid #ddd",
                                          }}
                                        >
                                          {value}
                                        </td>
                                      ),
                                    )}
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}

                  {/* ===== WEIGHT / SIZE CHART ===== */}
                  {material.weightSizeChart &&
                    material.weightSizeChart.length > 0 && (
                      <>
                        <h3 style={{ marginTop: "2rem" }}>
                          Weight / Size Chart
                        </h3>
                        <p
                          style={{
                            marginBottom: "15px",
                            color: "#666",
                            fontSize: "0.9rem",
                          }}
                        >
                          Weight and size specifications
                        </p>
                        <div style={{ overflowX: "auto" }}>
                          <table
                            className="spec-table-grid"
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                            }}
                          >
                            <thead>
                              <tr style={{ backgroundColor: "#f5f5f5" }}>
                                {Object.keys(material.weightSizeChart[0]).map(
                                  (key) => (
                                    <th
                                      key={key}
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                        textAlign: "left",
                                      }}
                                    >
                                      {key.replace(/_/g, " ").toUpperCase()}
                                    </th>
                                  ),
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {material.weightSizeChart.map(
                                (item: any, idx: number) => (
                                  <tr key={idx}>
                                    {Object.values(item).map(
                                      (value: any, colIdx: number) => (
                                        <td
                                          key={colIdx}
                                          style={{
                                            padding: "10px",
                                            border: "1px solid #ddd",
                                          }}
                                        >
                                          {value || "—"}
                                        </td>
                                      ),
                                    )}
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}

                  {/* ===== STOCK AVAILABILITY ===== */}
                  {material.stockAvailability && (
                    <>
                      <h3 style={{ marginTop: "2rem" }}>Stock Availability</h3>
                      {Object.entries(material.stockAvailability).map(
                        ([category, items]: [string, any]) => {
                          if (!Array.isArray(items)) return null;
                          return items.map((group: any, idx: number) => (
                            <div
                              key={`${category}-${idx}`}
                              style={{ marginBottom: "1.5rem" }}
                            >
                              <h4>{group.title}</h4>
                              <ul style={{ listStyle: "none", padding: 0 }}>
                                {group.items?.map((item: string, i: number) => (
                                  <li
                                    key={i}
                                    style={{
                                      padding: "4px 0",
                                      borderBottom: "1px solid #f0f0f0",
                                      color: "#555",
                                    }}
                                  >
                                    ✓ {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ));
                        },
                      )}
                    </>
                  )}
                </div>
              )}

              {/* ===== APPLICATIONS TAB ===== */}
              {(hasData(material.application) ||
                hasData(material.applications)) &&
                activeTab === "applications" && (
                  <div className="tab-panel">
                    <h2>Applications</h2>

                    {material.application && <p>{material.application}</p>}

                    {hasData(material.applications) && (
                      <div className="application-list">
                        <h3>Common Applications</h3>
                        <ul>
                          {material.applications.map(
                            (app: string, index: number) => (
                              <li key={index}>
                                <CheckCircle size={16} /> {app}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}

                    {material.application &&
                      !hasData(material.applications) && (
                        <div className="application-list">
                          <h3>Common Applications</h3>
                          <ul>
                            {material.application
                              .split(",")
                              .map((app: string, index: number) => (
                                <li key={index}>
                                  <CheckCircle size={16} /> {app.trim()}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}

                    {/* ===== SPECIALIZED IN ===== */}
                    {hasData(material.specializedIn) && (
                      <div className="specialized-section">
                        <h3 className="specialized-title">
                          <span className="title-icon">⚡</span>
                          Specialized In
                        </h3>
                        <div className="specialized-grid">
                          {material.specializedIn.map(
                            (item: string, index: number) => (
                              <div key={index} className="specialized-item">
                                <span className="specialized-icon">✦</span>
                                <span className="specialized-text">{item}</span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

              {/* ===== AVAILABILITY TAB ===== */}
              {activeTab === "availability" &&
                hasData(material.stockAvailability) && (
                  <div className="tab-panel">
                    <h2>Stock Availability</h2>

                    {Object.entries(material.stockAvailability).map(
                      ([categoryKey, categoryData]: [string, any]) => {
                        if (
                          !Array.isArray(categoryData) ||
                          categoryData.length === 0
                        )
                          return null;

                        const getCategoryTitle = (key: string): string => {
                          const titles: Record<string, string> = {
                            hotRolled: "Hot Rolled (HR) Coils",
                            coldRolled: "Cold Rolled (CR) Coils",
                            slitStrip: "Slit & Strip Coils",
                            nimonicPipes: "Nimonic 75 / 80A Pipes",
                            nichromePipes: "Nichrome 80 / 20 Pipes",
                            nitronicPipes: "Nitronic 50 (XM-19) Pipes",
                            niloPipes: "Nilo 42 / 48 Pipes",
                            alloy286Pipes: "Alloy 286 (660) Pipes",
                            alloy926Pipes: "Alloy 926 Pipes",
                          };
                          return (
                            titles[key] || key.replace(/([A-Z])/g, " $1").trim()
                          );
                        };

                        return (
                          <div key={categoryKey} className="stock-section">
                            <h3>{getCategoryTitle(categoryKey)}</h3>
                            <div className="stock-grid">
                              {categoryData.map(
                                (category: any, catIdx: number) => {
                                  const isCategory =
                                    typeof category === "object" &&
                                    category.title;
                                  const categoryTitle = isCategory
                                    ? category.title
                                    : `Category ${catIdx + 1}`;
                                  const items = isCategory
                                    ? category.items
                                    : [category];
                                  const image = isCategory
                                    ? category.image
                                    : null;

                                  return (
                                    <div
                                      key={catIdx}
                                      className="stock-category"
                                    >
                                      <h4 className="stock-category-title">
                                        {categoryTitle}
                                      </h4>
                                      <div className="stock-items">
                                        {items.map((item: any, idx: number) => {
                                          const name =
                                            typeof item === "string"
                                              ? item
                                              : item.name;
                                          const itemImage =
                                            typeof item === "object"
                                              ? item.image
                                              : null;
                                          const description =
                                            typeof item === "object"
                                              ? item.description
                                              : null;

                                          return (
                                            <div
                                              key={idx}
                                              className="stock-item"
                                            >
                                              <div className="stock-info">
                                                <span className="stock-name">
                                                  {name}
                                                </span>
                                                {description && (
                                                  <span className="stock-description">
                                                    {description}
                                                  </span>
                                                )}
                                              </div>

                                              {itemImage ||
                                              (idx === 0 && image) ? (
                                                <div className="stock-image-wrapper">
                                                  <img
                                                    src={itemImage || image}
                                                    alt={name}
                                                    className="stock-image"
                                                    loading="lazy"
                                                  />
                                                </div>
                                              ) : (
                                                <div className="stock-check">
                                                  ✓
                                                </div>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          </div>
                        );
                      },
                    )}

                    {/* ===== THICKNESS AVAILABILITY ===== */}
                    {hasData(material.thicknessAvailability) && (
                      <>
                        <h3 style={{ marginTop: "2rem" }}>
                          Thickness Availability
                        </h3>
                        <div style={{ overflowX: "auto" }}>
                          <table className="spec-table-grid">
                            <thead>
                              <tr>
                                <th>Thickness (mm)</th>
                                <th>Availability</th>
                              </tr>
                            </thead>
                            <tbody>
                              {material.thicknessAvailability.map(
                                (item: any, idx: number) => (
                                  <tr key={idx}>
                                    <td>{item.thickness}</td>
                                    <td>{item.availability || "✓"}</td>
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}

                    {/* ===== RELATED SEARCHES ===== */}
                    {hasData(material.relatedSearches) && (
                      <div style={{ marginTop: "2rem" }}>
                        <h3>Related Searches</h3>
                        <div className="related-searches-container">
                          {material.relatedSearches.map(
                            (search: string, idx: number) => (
                              <span key={idx} className="related-search-tag">
                                {search}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

              {/* ===== SUPPLY NETWORK TAB ===== */}
              {activeTab === "supply" && (
                <div className="tab-panel">
                  <h2>Supply Network</h2>

                  {hasData(material.exportCountries) && (
                    <div style={{ marginBottom: "2.5rem" }}>
                      <h3 className="supply-title">
                        <Globe
                          size={20}
                          style={{ display: "inline", marginRight: "10px" }}
                        />
                        Export Market
                      </h3>
                      <div className="country-grid">
                        {material.exportCountries.map(
                          (country: string, idx: number) => (
                            <div className="country-item" key={idx}>
                              <span
                                className={`fi fi-${getCountryFlag(country)} country-flag`}
                              ></span>
                              <span className="country-name">{country}</span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  {hasData(material.supplyCities) && (
                    <div style={{ marginTop: "2rem" }}>
                      <h3 className="supply-title">
                        <MapPin
                          size={20}
                          style={{ display: "inline", marginRight: "10px" }}
                        />
                        Cities We Supply In
                      </h3>
                      <div className="city-grid">
                        {material.supplyCities.map(
                          (city: string, idx: number) => (
                            <div key={idx} className="city-item">
                              <span className="city-dot"></span>
                              <span className="city-name">{city}</span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Contact Prompt */}
            <div className="contact-prompt">
              <p>Need more information or custom requirements?</p>
              <a href="/contact" className="btn btn-primary">
                Contact Our Experts
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Related Products ===== */}
      {(() => {
        // Get all products from all categories
        const allProducts = Object.values(productCategoryMap).flat();

        // Find products from the same category (excluding current)
        const sameCategory =
          categoryData?.filter((item) => item.slug !== materialSlug) || [];

        // Find products with same material group from all categories (excluding current)
        const sameMaterialGroup = allProducts.filter(
          (item) =>
            item.slug !== materialSlug &&
            item.materialGroup === material.materialGroup,
        );

        // Determine which products to show
        let relatedItems = [];

        if (sameCategory.length > 0) {
          // Priority 1: Products from same category
          relatedItems = sameCategory;
        } else if (sameMaterialGroup.length > 0) {
          // Priority 2: Products with same material group
          relatedItems = sameMaterialGroup;
        } else {
          // Priority 3: Any other products (exclude current)
          relatedItems = allProducts.filter(
            (item) => item.slug !== materialSlug,
          );
        }

        // If still empty, use fallback - show first 4 products from any category
        if (relatedItems.length === 0) {
          relatedItems = allProducts.slice(0, 4);
        }

        // Limit to 4 products
        const displayProducts = relatedItems.slice(0, 4);

        return displayProducts.length > 0 ? (
          <div className="related-products-section">
            <div className="container">
              <h2>Related Products</h2>
              <div className="related-products-grid">
                {displayProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${slug}/${product.slug}`}
                    className="related-product-card"
                  >
                    <img src={product.image} alt={product.title} />
                    <h4>{product.title}</h4>
                    <span className="view-btn">View Details →</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null;
      })()}
    </section>
  );
};

export default MaterialDetail;
