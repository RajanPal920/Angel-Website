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

  // ==============================================
  // ADD THESE DEBUG LINES HERE (RIGHT AFTER useParams)
  // ==============================================
  console.log("Route params:", { slug, materialSlug });
  console.log(
    "Is 'pipes' in productCategoryMap?",
    !!productCategoryMap["pipes"],
  );
  console.log("Category keys:", Object.keys(productCategoryMap));
  console.log("Category data for slug:", productCategoryMap[slug]);
  console.log(
    "Category data for slug length:",
    productCategoryMap[slug]?.length || 0,
  );

  // // Debug logging
  // console.log("Route params:", { slug, materialSlug });
  // console.log("Available categories:", Object.keys(productCategoryMap));
  // console.log(
  //   "Category data for slug:",
  //   productCategoryMap[slug]?.length || 0,
  //   "products",
  // );

  const categoryData = productCategoryMap[slug];
  const material = categoryData?.find((item) => item.slug === materialSlug);

  // Debug logging
  if (categoryData) {
    console.log(
      "Product slugs in category:",
      categoryData.map((p) => p.slug),
    );
  }
  if (material) {
    console.log("Material found:", material.title);
  } else {
    console.warn(`Material '${materialSlug}' not found in category '${slug}'`);
  }

  const [activeTab, setActiveTab] = useState("overview");

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
    { name: "Coils", slug: "coils" },
    { name: "Pipes", slug: "pipes" },
    { name: "Plates", slug: "plates" },
    { name: "Round Bars", slug: "round-bars" },
    { name: "Sheets", slug: "sheets" },
    { name: "Tubes", slug: "tubes" },
    { name: "Wires", slug: "wires" },
    { name: "Industrial Flanges", slug: "flanges" },
    { name: "Buttweld Fittings", slug: "buttweld-fittings" },
    { name: "Angle & Channels", slug: "angle-channels" },
    { name: "Forged Fittings", slug: "forged-fittings" },
    { name: "Industrial Fasteners", slug: "fasteners" },
    { name: "Industrial Valves", slug: "valves" },
    { name: "Patta & Patti", slug: "patta-patti" },
    { name: "Industrial Rings", slug: "rings" },
    { name: "Industrial Circles", slug: "circles" },
    { name: "Industrial Strips", slug: "strips" },
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
          {/* Left: Image */}
          <div className="material-image-column mt-28">
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
                hasData(material.thicknessTolerance)) && (
                <button
                  className={`tab-btn ${activeTab === "specifications" ? "active" : ""}`}
                  onClick={() => setActiveTab("specifications")}
                >
                  Specifications
                </button>
              )}

              {/* ✅ ADD THIS - Applications Tab Button */}
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

              <button
                className={`tab-btn ${activeTab === "ourproducts" ? "active" : ""}`}
                onClick={() => setActiveTab("ourproducts")}
              >
                Our Products
              </button>
            </div>

            <div className="material-tab-content">
              {/* ===== OVERVIEW TAB ===== */}
              {activeTab === "overview" && (
                <div className="tab-panel">
                  <h2>Product Overview</h2>

                  {material.shortDescription && (
                    <p>{material.shortDescription}</p>
                  )}

                  {material.technicalOverview && (
                    <p style={{ marginTop: "1rem" }}>
                      {material.technicalOverview}
                    </p>
                  )}

                  {material.materialGroup && (
                    <div className="info-row">
                      <span className="info-label">Material Group:</span>
                      <span className="info-value">
                        {material.materialGroup}
                      </span>
                    </div>
                  )}

                  {material.standards && (
                    <div className="info-row">
                      <span className="info-label">Standards:</span>
                      <span className="info-value">{material.standards}</span>
                    </div>
                  )}

                  {material.forms && (
                    <div className="info-row">
                      <span className="info-label">Available Forms:</span>
                      <span className="info-value">{material.forms}</span>
                    </div>
                  )}

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

                  {hasData(material.gradeDetails) && (
                    <div
                      className="grade-details-overview"
                      style={{ marginTop: "2rem" }}
                    >
                      <h3>Available Grades Overview</h3>
                      {material.gradeDetails.standardAustenitic && (
                        <div style={{ marginBottom: "1rem" }}>
                          <h4>Standard Austenitic Grades</h4>
                          {Object.entries(
                            material.gradeDetails.standardAustenitic,
                          )
                            .slice(0, 2)
                            .map(([grade, desc]) => (
                              <div key={grade} className="grade-item">
                                <strong>{grade}</strong>: {desc as string}
                              </div>
                            ))}
                        </div>
                      )}
                      {material.gradeDetails.standardGrades && (
                        <div style={{ marginBottom: "1rem" }}>
                          <h4>Standard Grades</h4>
                          {Object.entries(material.gradeDetails.standardGrades)
                            .slice(0, 2)
                            .map(([grade, desc]) => (
                              <div key={grade} className="grade-item">
                                <strong>{grade}</strong>: {desc as string}
                              </div>
                            ))}
                        </div>
                      )}
                      {Object.keys(material.gradeDetails).length > 1 && (
                        <Link
                          to="#"
                          onClick={() => setActiveTab("specifications")}
                          style={{ color: "#0066cc" }}
                        >
                          View all grades →
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ===== SPECIFICATIONS TAB ===== */}
              {activeTab === "specifications" && (
                <div className="tab-panel">
                  <h2>Technical Specifications</h2>

                  {material.standards && (
                    <div className="spec-table">
                      <div className="spec-row">
                        <span className="spec-label">Standards & Grades</span>
                        <span className="spec-value">{material.standards}</span>
                      </div>
                    </div>
                  )}

                  {material.materialGroup && (
                    <div className="spec-table">
                      <div className="spec-row">
                        <span className="spec-label">Material Group</span>
                        <span className="spec-value">
                          {material.materialGroup}
                        </span>
                      </div>
                    </div>
                  )}

                  {material.forms && (
                    <div className="spec-table">
                      <div className="spec-row">
                        <span className="spec-label">Forms Available</span>
                        <span className="spec-value">{material.forms}</span>
                      </div>
                    </div>
                  )}

                  {hasData(material.specifications) && (
                    <>
                      <h3 style={{ marginTop: "2rem" }}>
                        Detailed Specifications
                      </h3>
                      {material.specifications.standard && (
                        <div className="spec-table">
                          <div className="spec-row">
                            <span className="spec-label">Standard</span>
                            <span className="spec-value">
                              {material.specifications.standard}
                            </span>
                          </div>
                        </div>
                      )}
                      {material.specifications.thicknessRange && (
                        <div className="spec-table">
                          <div className="spec-row">
                            <span className="spec-label">Thickness Range</span>
                            <span className="spec-value">
                              {material.specifications.thicknessRange}
                            </span>
                          </div>
                        </div>
                      )}
                      {material.specifications.widthRange && (
                        <div className="spec-table">
                          <div className="spec-row">
                            <span className="spec-label">Width Range</span>
                            <span className="spec-value">
                              {material.specifications.widthRange}
                            </span>
                          </div>
                        </div>
                      )}
                      {material.specifications.widthLength && (
                        <div className="spec-table">
                          <div className="spec-row">
                            <span className="spec-label">Width / Length</span>
                            <span className="spec-value">
                              {material.specifications.widthLength}
                            </span>
                          </div>
                        </div>
                      )}
                      {material.specifications.surfaceFinish && (
                        <div className="spec-table">
                          <div className="spec-row">
                            <span className="spec-label">Surface Finish</span>
                            <span className="spec-value">
                              {material.specifications.surfaceFinish}
                            </span>
                          </div>
                        </div>
                      )}
                      {material.specifications.hardnessTemper && (
                        <div className="spec-table">
                          <div className="spec-row">
                            <span className="spec-label">Hardness Temper</span>
                            <span className="spec-value">
                              {material.specifications.hardnessTemper}
                            </span>
                          </div>
                        </div>
                      )}
                      {material.specifications.formLength && (
                        <div className="spec-table">
                          <div className="spec-row">
                            <span className="spec-label">Form & Length</span>
                            <span className="spec-value">
                              {material.specifications.formLength}
                            </span>
                          </div>
                        </div>
                      )}
                      {material.specifications.valueAddedServices && (
                        <div className="spec-table">
                          <div className="spec-row">
                            <span className="spec-label">
                              Value Added Services
                            </span>
                            <span className="spec-value">
                              {material.specifications.valueAddedServices}
                            </span>
                          </div>
                        </div>
                      )}
                      {material.specifications.formHardness && (
                        <div className="spec-table">
                          <div className="spec-row">
                            <span className="spec-label">Form & Hardness</span>
                            <span className="spec-value">
                              {material.specifications.formHardness}
                            </span>
                          </div>
                        </div>
                      )}
                      {material.specifications.testCertificate && (
                        <div className="spec-table">
                          <div className="spec-row">
                            <span className="spec-label">Test Certificate</span>
                            <span className="spec-value">
                              {material.specifications.testCertificate}
                            </span>
                          </div>
                        </div>
                      )}
                      {/* Pipe-specific specification fields */}
                      {material.specifications.seamlessPipeSize && (
                        <div className="spec-table">
                          <div className="spec-row">
                            <span className="spec-label">
                              Seamless Pipe Size
                            </span>
                            <span className="spec-value">
                              {material.specifications.seamlessPipeSize}
                            </span>
                          </div>
                        </div>
                      )}
                      {material.specifications.weldedPipeSize && (
                        <div className="spec-table">
                          <div className="spec-row">
                            <span className="spec-label">Welded Pipe Size</span>
                            <span className="spec-value">
                              {material.specifications.weldedPipeSize}
                            </span>
                          </div>
                        </div>
                      )}
                      {material.specifications.efwPipeSize && (
                        <div className="spec-table">
                          <div className="spec-row">
                            <span className="spec-label">EFW Pipe Size</span>
                            <span className="spec-value">
                              {material.specifications.efwPipeSize}
                            </span>
                          </div>
                        </div>
                      )}
                      {material.specifications.outsideDiameter && (
                        <div className="spec-table">
                          <div className="spec-row">
                            <span className="spec-label">Outside Diameter</span>
                            <span className="spec-value">
                              {material.specifications.outsideDiameter}
                            </span>
                          </div>
                        </div>
                      )}
                      {material.specifications.scheduleRange && (
                        <div className="spec-table">
                          <div className="spec-row">
                            <span className="spec-label">Schedule Range</span>
                            <span className="spec-value">
                              {material.specifications.scheduleRange}
                            </span>
                          </div>
                        </div>
                      )}
                      {material.specifications.outsideFinish && (
                        <div className="spec-table">
                          <div className="spec-row">
                            <span className="spec-label">Outside Finish</span>
                            <span className="spec-value">
                              {material.specifications.outsideFinish}
                            </span>
                          </div>
                        </div>
                      )}
                      {material.specifications.deliveryCondition && (
                        <div className="spec-table">
                          <div className="spec-row">
                            <span className="spec-label">
                              Delivery Condition
                            </span>
                            <span className="spec-value">
                              {material.specifications.deliveryCondition}
                            </span>
                          </div>
                        </div>
                      )}
                      {material.specifications.dimensionalSpecification && (
                        <div className="spec-table">
                          <div className="spec-row">
                            <span className="spec-label">
                              Dimensional Specification
                            </span>
                            <span className="spec-value">
                              {material.specifications.dimensionalSpecification}
                            </span>
                          </div>
                        </div>
                      )}
                      {material.specifications.manufacturingShapes && (
                        <div className="spec-table">
                          <div className="spec-row">
                            <span className="spec-label">
                              Manufacturing Shapes
                            </span>
                            <span className="spec-value">
                              {material.specifications.manufacturingShapes}
                            </span>
                          </div>
                        </div>
                      )}
                      {material.specifications.pipeEnds && (
                        <div className="spec-table">
                          <div className="spec-row">
                            <span className="spec-label">Pipe Ends</span>
                            <span className="spec-value">
                              {material.specifications.pipeEnds}
                            </span>
                          </div>
                        </div>
                      )}
                      {material.specifications.manufacturingTechniques && (
                        <div className="spec-table">
                          <div className="spec-row">
                            <span className="spec-label">
                              Manufacturing Techniques
                            </span>
                            <span className="spec-value">
                              {material.specifications.manufacturingTechniques}
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {hasData(material.gradeDetails) && (
                    <>
                      <h3 style={{ marginTop: "2rem" }}>Grade Details</h3>
                      {material.gradeDetails.standardGrades && (
                        <div style={{ marginBottom: "1.5rem" }}>
                          <h4>Standard Grades</h4>
                          {Object.entries(
                            material.gradeDetails.standardGrades,
                          ).map(([grade, desc]) => (
                            <div
                              key={grade}
                              className="grade-item"
                              style={{ marginBottom: "0.5rem" }}
                            >
                              <strong>{grade}</strong>: {desc as string}
                            </div>
                          ))}
                        </div>
                      )}
                      {material.gradeDetails.standardAustenitic && (
                        <div style={{ marginBottom: "1.5rem" }}>
                          <h4>Standard Austenitic Grades</h4>
                          {Object.entries(
                            material.gradeDetails.standardAustenitic,
                          ).map(([grade, desc]) => (
                            <div
                              key={grade}
                              className="grade-item"
                              style={{ marginBottom: "0.5rem" }}
                            >
                              <strong>{grade}</strong>: {desc as string}
                            </div>
                          ))}
                        </div>
                      )}
                      {material.gradeDetails.highTemperature && (
                        <div style={{ marginBottom: "1.5rem" }}>
                          <h4>High-Temperature & Heat-Resistant Grades</h4>
                          {Object.entries(
                            material.gradeDetails.highTemperature,
                          ).map(([grade, desc]) => (
                            <div
                              key={grade}
                              className="grade-item"
                              style={{ marginBottom: "0.5rem" }}
                            >
                              <strong>{grade}</strong>: {desc as string}
                            </div>
                          ))}
                        </div>
                      )}
                      {material.gradeDetails.specializedCorrosion && (
                        <div style={{ marginBottom: "1.5rem" }}>
                          <h4>Specialized Corrosion & High-Strength Grades</h4>
                          {Object.entries(
                            material.gradeDetails.specializedCorrosion,
                          ).map(([grade, desc]) => (
                            <div
                              key={grade}
                              className="grade-item"
                              style={{ marginBottom: "0.5rem" }}
                            >
                              <strong>{grade}</strong>: {desc as string}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {/* ===== EQUIVALENT GRADES ===== */}
                  {hasData(material.equivalentGrades) && (
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
                      <div
                        className="equivalent-grades-table"
                        style={{ overflowX: "auto" }}
                      >
                        <table
                          className="spec-table-grid"
                          style={{ width: "100%", borderCollapse: "collapse" }}
                        >
                          <thead>
                            <tr style={{ backgroundColor: "#f5f5f5" }}>
                              {(() => {
                                // Get all unique keys from all items
                                const allKeys = new Set<string>();
                                material.equivalentGrades.forEach(
                                  (item: any) => {
                                    Object.keys(item).forEach((key) =>
                                      allKeys.add(key),
                                    );
                                  },
                                );

                                // Define display order for common fields
                                const fieldOrder = [
                                  "grade",
                                  "uns",
                                  "wnr",
                                  "werkstoff",
                                  "jis",
                                  "bs",
                                  "gost",
                                  "afnor",
                                  "en",
                                  "enJisAfnor",
                                  "commonName",
                                  "common",
                                  "sis",
                                  "din",
                                  "iso",
                                  "ks",
                                  "or",
                                  "sa",
                                  "sae",
                                  "astm",
                                ];

                                // Sort keys: first by fieldOrder, then alphabetically
                                const sortedKeys = Array.from(allKeys).sort(
                                  (a, b) => {
                                    const indexA = fieldOrder.indexOf(a);
                                    const indexB = fieldOrder.indexOf(b);
                                    if (indexA === -1 && indexB === -1)
                                      return a.localeCompare(b);
                                    if (indexA === -1) return 1;
                                    if (indexB === -1) return -1;
                                    return indexA - indexB;
                                  },
                                );

                                // Format header labels
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
                                  enjisafnor: "EN / JIS / AFNOR",
                                  commonname: "Common Name",
                                  common: "Common Name",
                                  sis: "SIS",
                                  din: "DIN",
                                  iso: "ISO",
                                  ks: "KS",
                                  or: "OR",
                                  sa: "SA",
                                  sae: "SAE",
                                  astm: "ASTM",
                                  standard: "Standard",
                                  uns_no: "UNS No.",
                                  "uns number": "UNS No.",
                                };

                                return sortedKeys.map((key) => {
                                  let label = key;
                                  // Check exact match first (case insensitive)
                                  const lowerKey = key.toLowerCase();
                                  if (labelMap[lowerKey]) {
                                    label = labelMap[lowerKey];
                                  } else {
                                    // Format the key name
                                    label = key
                                      .replace(/_/g, " ")
                                      .replace(/([A-Z])/g, " $1")
                                      .trim()
                                      .split(" ")
                                      .map(
                                        (word) =>
                                          word.charAt(0).toUpperCase() +
                                          word.slice(1).toLowerCase(),
                                      )
                                      .join(" ");
                                  }

                                  return (
                                    <th
                                      key={key}
                                      style={{
                                        padding: "10px 12px",
                                        border: "1px solid #ddd",
                                        textAlign:
                                          key.toLowerCase() === "grade"
                                            ? "left"
                                            : "center",
                                        whiteSpace: "nowrap",
                                        fontWeight: "700",
                                        color: "#1a2b4c",
                                        fontSize: "0.85rem",
                                      }}
                                    >
                                      {label}
                                    </th>
                                  );
                                });
                              })()}
                            </tr>
                          </thead>
                          <tbody>
                            {material.equivalentGrades.map(
                              (item: any, idx: number) => {
                                // Get all keys from the first item to maintain consistency
                                const firstItem = material.equivalentGrades[0];
                                const allKeys = Object.keys(firstItem);

                                return (
                                  <tr
                                    key={idx}
                                    style={{
                                      backgroundColor:
                                        idx % 2 === 0 ? "white" : "#fafafa",
                                      transition: "background-color 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "#f0f4ff";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        idx % 2 === 0 ? "white" : "#fafafa";
                                    }}
                                  >
                                    {allKeys.map((key) => {
                                      const isGradeCol =
                                        key.toLowerCase() === "grade";
                                      const value = item[key];

                                      return (
                                        <td
                                          key={key}
                                          style={{
                                            padding: "10px 12px",
                                            border: "1px solid #ddd",
                                            color: isGradeCol
                                              ? "#1a2b4c"
                                              : "#555",
                                            fontWeight: isGradeCol
                                              ? "600"
                                              : "400",
                                            textAlign: isGradeCol
                                              ? "left"
                                              : "center",
                                            fontSize: "0.85rem",
                                          }}
                                        >
                                          {value !== undefined && value !== null
                                            ? value
                                            : "—"}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                );
                              },
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {/* ===== ASTM SPECIFICATIONS ===== */}
                  {hasData(material.astmSpecifications) && (
                    <>
                      <h3 style={{ marginTop: "2rem" }}>ASTM Specifications</h3>
                      <div style={{ overflowX: "auto" }}>
                        <table
                          className="spec-table-grid"
                          style={{ width: "100%", borderCollapse: "collapse" }}
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
                                Standard
                              </th>
                              <th
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "left",
                                }}
                              >
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {material.astmSpecifications.map(
                              (item: any, idx: number) => (
                                <tr key={idx}>
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      color: "#555",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {item.standard}
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      color: "#555",
                                    }}
                                  >
                                    {item.description}
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {hasData(material.chemicalComposition) && (
                    <>
                      <h3 style={{ marginTop: "2rem" }}>
                        Chemical Composition
                      </h3>
                      <div style={{ overflowX: "auto" }}>
                        <table
                          className="spec-table-grid"
                          style={{ width: "100%", borderCollapse: "collapse" }}
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
                                Grade
                              </th>
                              {material.chemicalComposition[0]?.ti !==
                                undefined && (
                                <th
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                    textAlign: "left",
                                  }}
                                >
                                  Ti
                                </th>
                              )}
                              {material.chemicalComposition[0]?.al !==
                                undefined && (
                                <th
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                    textAlign: "left",
                                  }}
                                >
                                  Al
                                </th>
                              )}
                              {material.chemicalComposition[0]?.v !==
                                undefined && (
                                <th
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                    textAlign: "left",
                                  }}
                                >
                                  V
                                </th>
                              )}
                              {material.chemicalComposition[0]?.fe !==
                                undefined && (
                                <th
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                    textAlign: "left",
                                  }}
                                >
                                  Fe
                                </th>
                              )}
                              {material.chemicalComposition[0]?.o !==
                                undefined && (
                                <th
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                    textAlign: "left",
                                  }}
                                >
                                  O
                                </th>
                              )}
                              {material.chemicalComposition[0]?.c !==
                                undefined && (
                                <th
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                    textAlign: "left",
                                  }}
                                >
                                  C
                                </th>
                              )}
                              {material.chemicalComposition[0]?.mn !==
                                undefined && (
                                <th
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                    textAlign: "left",
                                  }}
                                >
                                  Mn
                                </th>
                              )}
                              {material.chemicalComposition[0]?.si !==
                                undefined && (
                                <th
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                    textAlign: "left",
                                  }}
                                >
                                  Si
                                </th>
                              )}
                              {material.chemicalComposition[0]?.cr !==
                                undefined && (
                                <th
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                    textAlign: "left",
                                  }}
                                >
                                  Cr
                                </th>
                              )}
                              {material.chemicalComposition[0]?.ni !==
                                undefined && (
                                <th
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                    textAlign: "left",
                                  }}
                                >
                                  Ni
                                </th>
                              )}
                              {material.chemicalComposition[0]?.mo !==
                                undefined && (
                                <th
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                    textAlign: "left",
                                  }}
                                >
                                  Mo
                                </th>
                              )}
                              {material.chemicalComposition[0]?.other !==
                                undefined && (
                                <th
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                    textAlign: "left",
                                  }}
                                >
                                  Other
                                </th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {material.chemicalComposition.map(
                              (item: any, idx: number) => (
                                <tr key={idx}>
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                    }}
                                  >
                                    {item.grade}
                                  </td>
                                  {item.ti !== undefined && (
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                      }}
                                    >
                                      {item.ti}
                                    </td>
                                  )}
                                  {item.al !== undefined && (
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                      }}
                                    >
                                      {item.al}
                                    </td>
                                  )}
                                  {item.v !== undefined && (
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                      }}
                                    >
                                      {item.v}
                                    </td>
                                  )}
                                  {item.fe !== undefined && (
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                      }}
                                    >
                                      {item.fe}
                                    </td>
                                  )}
                                  {item.o !== undefined && (
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                      }}
                                    >
                                      {item.o}
                                    </td>
                                  )}
                                  {item.c !== undefined && (
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                      }}
                                    >
                                      {item.c}
                                    </td>
                                  )}
                                  {item.mn !== undefined && (
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                      }}
                                    >
                                      {item.mn}
                                    </td>
                                  )}
                                  {item.si !== undefined && (
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                      }}
                                    >
                                      {item.si}
                                    </td>
                                  )}
                                  {item.cr !== undefined && (
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                      }}
                                    >
                                      {item.cr}
                                    </td>
                                  )}
                                  {item.ni !== undefined && (
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                      }}
                                    >
                                      {item.ni}
                                    </td>
                                  )}
                                  {item.mo !== undefined && (
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                      }}
                                    >
                                      {item.mo}
                                    </td>
                                  )}
                                  {item.other !== undefined && (
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                      }}
                                    >
                                      {item.other}
                                    </td>
                                  )}
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {hasData(material.mechanicalProperties) && (
                    <>
                      <h3 style={{ marginTop: "2rem" }}>
                        Mechanical & Physical Properties
                      </h3>
                      <div style={{ overflowX: "auto" }}>
                        <table
                          className="spec-table-grid"
                          style={{ width: "100%", borderCollapse: "collapse" }}
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
                                Grade
                              </th>
                              {material.mechanicalProperties[0]?.density !==
                                undefined && (
                                <th
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                    textAlign: "left",
                                  }}
                                >
                                  Density
                                </th>
                              )}
                              {material.mechanicalProperties[0]?.tensile !==
                                undefined && (
                                <th
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                    textAlign: "left",
                                  }}
                                >
                                  Tensile Strength
                                </th>
                              )}
                              {material.mechanicalProperties[0]?.yield !==
                                undefined && (
                                <th
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                    textAlign: "left",
                                  }}
                                >
                                  Yield Strength
                                </th>
                              )}
                              {material.mechanicalProperties[0]?.elongation !==
                                undefined && (
                                <th
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                    textAlign: "left",
                                  }}
                                >
                                  Elongation
                                </th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {material.mechanicalProperties.map(
                              (item: any, idx: number) => (
                                <tr key={idx}>
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                    }}
                                  >
                                    {item.grade}
                                  </td>
                                  {item.density !== undefined && (
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                      }}
                                    >
                                      {item.density}
                                    </td>
                                  )}
                                  {item.tensile !== undefined && (
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                      }}
                                    >
                                      {item.tensile}
                                    </td>
                                  )}
                                  {item.yield !== undefined && (
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                      }}
                                    >
                                      {item.yield}
                                    </td>
                                  )}
                                  {item.elongation !== undefined && (
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                      }}
                                    >
                                      {item.elongation}
                                    </td>
                                  )}
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {/* ===== TITANIUM TUBES DIMENSIONS CHART ===== */}
                  {hasData(material.dimensionsChart) && (
                    <>
                      <h3 style={{ marginTop: "2rem" }}>
                        Titanium Tubes Dimensions Chart (I.D. in Inches)
                      </h3>
                      <p
                        style={{
                          marginBottom: "15px",
                          color: "#666",
                          fontSize: "0.9rem",
                        }}
                      >
                        Inside Diameter (I.D.) in inches for various tube O.D.
                        and gauge sizes
                      </p>
                      <div style={{ overflowX: "auto" }}>
                        <table
                          className="spec-table-grid"
                          style={{ width: "100%", borderCollapse: "collapse" }}
                        >
                          <thead>
                            <tr style={{ backgroundColor: "#1a2b4c" }}>
                              <th
                                style={{
                                  padding: "12px 15px",
                                  border: "1px solid #1a2b4c",
                                  textAlign: "center",
                                  fontWeight: "700",
                                  color: "#ffffff",
                                  whiteSpace: "nowrap",
                                  fontSize: "0.9rem",
                                  backgroundColor: "#1a2b4c",
                                }}
                                rowSpan={2}
                              >
                                Tube O.D.
                              </th>
                              <th
                                style={{
                                  padding: "12px 15px",
                                  border: "1px solid #1a2b4c",
                                  textAlign: "center",
                                  fontWeight: "700",
                                  color: "#ffffff",
                                  whiteSpace: "nowrap",
                                  fontSize: "0.9rem",
                                  backgroundColor: "#1a2b4c",
                                }}
                                colSpan={7}
                              >
                                Gauge (Wall Thickness in Inches)
                              </th>
                            </tr>
                            <tr style={{ backgroundColor: "#2d4a7a" }}>
                              <th
                                style={{
                                  padding: "8px 12px",
                                  border: "1px solid #2d4a7a",
                                  textAlign: "center",
                                  fontWeight: "600",
                                  color: "#ffffff",
                                  fontSize: "0.75rem",
                                  whiteSpace: "nowrap",
                                  backgroundColor: "#2d4a7a",
                                }}
                              >
                                10 (0.134)
                              </th>
                              <th
                                style={{
                                  padding: "8px 12px",
                                  border: "1px solid #2d4a7a",
                                  textAlign: "center",
                                  fontWeight: "600",
                                  color: "#ffffff",
                                  fontSize: "0.75rem",
                                  whiteSpace: "nowrap",
                                  backgroundColor: "#2d4a7a",
                                }}
                              >
                                12 (0.109)
                              </th>
                              <th
                                style={{
                                  padding: "8px 12px",
                                  border: "1px solid #2d4a7a",
                                  textAlign: "center",
                                  fontWeight: "600",
                                  color: "#ffffff",
                                  fontSize: "0.75rem",
                                  whiteSpace: "nowrap",
                                  backgroundColor: "#2d4a7a",
                                }}
                              >
                                14 (0.083)
                              </th>
                              <th
                                style={{
                                  padding: "8px 12px",
                                  border: "1px solid #2d4a7a",
                                  textAlign: "center",
                                  fontWeight: "600",
                                  color: "#ffffff",
                                  fontSize: "0.75rem",
                                  whiteSpace: "nowrap",
                                  backgroundColor: "#2d4a7a",
                                }}
                              >
                                16 (0.065)
                              </th>
                              <th
                                style={{
                                  padding: "8px 12px",
                                  border: "1px solid #2d4a7a",
                                  textAlign: "center",
                                  fontWeight: "600",
                                  color: "#ffffff",
                                  fontSize: "0.75rem",
                                  whiteSpace: "nowrap",
                                  backgroundColor: "#2d4a7a",
                                }}
                              >
                                18 (0.049)
                              </th>
                              <th
                                style={{
                                  padding: "8px 12px",
                                  border: "1px solid #2d4a7a",
                                  textAlign: "center",
                                  fontWeight: "600",
                                  color: "#ffffff",
                                  fontSize: "0.75rem",
                                  whiteSpace: "nowrap",
                                  backgroundColor: "#2d4a7a",
                                }}
                              >
                                20 (0.035)
                              </th>
                              <th
                                style={{
                                  padding: "8px 12px",
                                  border: "1px solid #2d4a7a",
                                  textAlign: "center",
                                  fontWeight: "600",
                                  color: "#ffffff",
                                  fontSize: "0.75rem",
                                  whiteSpace: "nowrap",
                                  backgroundColor: "#2d4a7a",
                                }}
                              >
                                22 (0.028)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {material.dimensionsChart.map(
                              (item: any, idx: number) => (
                                <tr
                                  key={idx}
                                  style={{
                                    backgroundColor:
                                      idx % 2 === 0 ? "#ffffff" : "#f8f9fa",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "#e8edf5";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      idx % 2 === 0 ? "#ffffff" : "#f8f9fa";
                                  }}
                                >
                                  <td
                                    style={{
                                      padding: "8px 12px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#1a2b4c",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {item.tube_od || "—"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px 12px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.gauge_10 !== undefined &&
                                    item.gauge_10 !== null
                                      ? item.gauge_10
                                      : "—"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px 12px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.gauge_12 !== undefined &&
                                    item.gauge_12 !== null
                                      ? item.gauge_12
                                      : "—"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px 12px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.gauge_14 !== undefined &&
                                    item.gauge_14 !== null
                                      ? item.gauge_14
                                      : "—"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px 12px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.gauge_16 !== undefined &&
                                    item.gauge_16 !== null
                                      ? item.gauge_16
                                      : "—"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px 12px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.gauge_18 !== undefined &&
                                    item.gauge_18 !== null
                                      ? item.gauge_18
                                      : "—"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px 12px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.gauge_20 !== undefined &&
                                    item.gauge_20 !== null
                                      ? item.gauge_20
                                      : "—"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px 12px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.gauge_22 !== undefined &&
                                    item.gauge_22 !== null
                                      ? item.gauge_22
                                      : "—"}
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {/* ===== WALL THICKNESS RANGE ===== */}
                  {hasData(material.wallThicknessRange) && (
                    <>
                      <h3 style={{ marginTop: "2rem" }}>
                        Titanium Tubing Size Wall Thickness Range
                      </h3>
                      <p
                        style={{
                          marginBottom: "15px",
                          color: "#666",
                          fontSize: "0.9rem",
                        }}
                      >
                        Available tube sizes (O.D. in inches) for each wall
                        thickness
                      </p>
                      <div style={{ overflowX: "auto" }}>
                        <table
                          className="spec-table-grid"
                          style={{ width: "100%", borderCollapse: "collapse" }}
                        >
                          <thead>
                            <tr style={{ backgroundColor: "#1a2b4c" }}>
                              <th
                                style={{
                                  padding: "12px 15px",
                                  border: "1px solid #1a2b4c",
                                  textAlign: "left",
                                  fontWeight: "700",
                                  color: "#ffffff",
                                  whiteSpace: "nowrap",
                                  fontSize: "0.9rem",
                                  backgroundColor: "#1a2b4c",
                                }}
                              >
                                Wall Thickness (Inch)
                              </th>
                              <th
                                style={{
                                  padding: "12px 15px",
                                  border: "1px solid #1a2b4c",
                                  textAlign: "left",
                                  fontWeight: "700",
                                  color: "#ffffff",
                                  whiteSpace: "nowrap",
                                  fontSize: "0.9rem",
                                  backgroundColor: "#1a2b4c",
                                }}
                              >
                                Tube Sizes (O.D. in Inches)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {material.wallThicknessRange.map(
                              (item: any, idx: number) => (
                                <tr
                                  key={idx}
                                  style={{
                                    backgroundColor:
                                      idx % 2 === 0 ? "#ffffff" : "#f8f9fa",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "#e8edf5";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      idx % 2 === 0 ? "#ffffff" : "#f8f9fa";
                                  }}
                                >
                                  <td
                                    style={{
                                      padding: "8px 12px",
                                      border: "1px solid #ddd",
                                      color: "#1a2b4c",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {item.wall_thickness || "—"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px 12px",
                                      border: "1px solid #ddd",
                                      color: "#555",
                                    }}
                                  >
                                    {item.tube_sizes || "—"}
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {/* ===== PRESSURE RATING ===== */}
                  {hasData(material.pressureRating) && (
                    <>
                      <h3 style={{ marginTop: "2rem" }}>
                        Titanium Tubes Pressure Rating (psig)
                      </h3>
                      <p
                        style={{
                          marginBottom: "15px",
                          color: "#666",
                          fontSize: "0.9rem",
                        }}
                      >
                        Maximum working pressure in psig for various tube O.D.
                        and wall thicknesses
                      </p>
                      <div style={{ overflowX: "auto" }}>
                        <table
                          className="spec-table-grid"
                          style={{ width: "100%", borderCollapse: "collapse" }}
                        >
                          <thead>
                            <tr style={{ backgroundColor: "#1a2b4c" }}>
                              <th
                                style={{
                                  padding: "12px 15px",
                                  border: "1px solid #1a2b4c",
                                  textAlign: "center",
                                  fontWeight: "700",
                                  color: "#ffffff",
                                  whiteSpace: "nowrap",
                                  fontSize: "0.9rem",
                                  backgroundColor: "#1a2b4c",
                                }}
                                rowSpan={2}
                              >
                                Tube O.D. (in)
                              </th>
                              <th
                                style={{
                                  padding: "12px 15px",
                                  border: "1px solid #1a2b4c",
                                  textAlign: "center",
                                  fontWeight: "700",
                                  color: "#ffffff",
                                  whiteSpace: "nowrap",
                                  fontSize: "0.9rem",
                                  backgroundColor: "#1a2b4c",
                                }}
                                colSpan={7}
                              >
                                Wall Thickness (Inches)
                              </th>
                            </tr>
                            <tr style={{ backgroundColor: "#2d4a7a" }}>
                              <th
                                style={{
                                  padding: "8px 12px",
                                  border: "1px solid #2d4a7a",
                                  textAlign: "center",
                                  fontWeight: "600",
                                  color: "#ffffff",
                                  fontSize: "0.75rem",
                                  whiteSpace: "nowrap",
                                  backgroundColor: "#2d4a7a",
                                }}
                              >
                                .028
                              </th>
                              <th
                                style={{
                                  padding: "8px 12px",
                                  border: "1px solid #2d4a7a",
                                  textAlign: "center",
                                  fontWeight: "600",
                                  color: "#ffffff",
                                  fontSize: "0.75rem",
                                  whiteSpace: "nowrap",
                                  backgroundColor: "#2d4a7a",
                                }}
                              >
                                .035
                              </th>
                              <th
                                style={{
                                  padding: "8px 12px",
                                  border: "1px solid #2d4a7a",
                                  textAlign: "center",
                                  fontWeight: "600",
                                  color: "#ffffff",
                                  fontSize: "0.75rem",
                                  whiteSpace: "nowrap",
                                  backgroundColor: "#2d4a7a",
                                }}
                              >
                                .049
                              </th>
                              <th
                                style={{
                                  padding: "8px 12px",
                                  border: "1px solid #2d4a7a",
                                  textAlign: "center",
                                  fontWeight: "600",
                                  color: "#ffffff",
                                  fontSize: "0.75rem",
                                  whiteSpace: "nowrap",
                                  backgroundColor: "#2d4a7a",
                                }}
                              >
                                .065
                              </th>
                              <th
                                style={{
                                  padding: "8px 12px",
                                  border: "1px solid #2d4a7a",
                                  textAlign: "center",
                                  fontWeight: "600",
                                  color: "#ffffff",
                                  fontSize: "0.75rem",
                                  whiteSpace: "nowrap",
                                  backgroundColor: "#2d4a7a",
                                }}
                              >
                                .083
                              </th>
                              <th
                                style={{
                                  padding: "8px 12px",
                                  border: "1px solid #2d4a7a",
                                  textAlign: "center",
                                  fontWeight: "600",
                                  color: "#ffffff",
                                  fontSize: "0.75rem",
                                  whiteSpace: "nowrap",
                                  backgroundColor: "#2d4a7a",
                                }}
                              >
                                .095
                              </th>
                              <th
                                style={{
                                  padding: "8px 12px",
                                  border: "1px solid #2d4a7a",
                                  textAlign: "center",
                                  fontWeight: "600",
                                  color: "#ffffff",
                                  fontSize: "0.75rem",
                                  whiteSpace: "nowrap",
                                  backgroundColor: "#2d4a7a",
                                }}
                              >
                                .109
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {material.pressureRating.map(
                              (item: any, idx: number) => (
                                <tr
                                  key={idx}
                                  style={{
                                    backgroundColor:
                                      idx % 2 === 0 ? "#ffffff" : "#f8f9fa",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "#e8edf5";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      idx % 2 === 0 ? "#ffffff" : "#f8f9fa";
                                  }}
                                >
                                  <td
                                    style={{
                                      padding: "8px 12px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#1a2b4c",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {item.tube_od || "—"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px 12px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.wall_028 !== undefined &&
                                    item.wall_028 !== null
                                      ? item.wall_028
                                      : "—"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px 12px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.wall_035 !== undefined &&
                                    item.wall_035 !== null
                                      ? item.wall_035
                                      : "—"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px 12px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.wall_049 !== undefined &&
                                    item.wall_049 !== null
                                      ? item.wall_049
                                      : "—"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px 12px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.wall_065 !== undefined &&
                                    item.wall_065 !== null
                                      ? item.wall_065
                                      : "—"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px 12px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.wall_083 !== undefined &&
                                    item.wall_083 !== null
                                      ? item.wall_083
                                      : "—"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px 12px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.wall_095 !== undefined &&
                                    item.wall_095 !== null
                                      ? item.wall_095
                                      : "—"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px 12px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.wall_109 !== undefined &&
                                    item.wall_109 !== null
                                      ? item.wall_109
                                      : "—"}
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {/* ===== GAUGE THICKNESS CHART ===== */}
                  {hasData(material.gaugeThicknessChart) && (
                    <>
                      <h3 style={{ marginTop: "2rem" }}>
                        Gauge Thickness Chart
                      </h3>
                      <p
                        style={{
                          marginBottom: "15px",
                          color: "#666",
                          fontSize: "0.9rem",
                        }}
                      >
                        Standard gauge thicknesses in inches
                      </p>
                      <div style={{ overflowX: "auto" }}>
                        <table
                          className="spec-table-grid"
                          style={{ width: "100%", borderCollapse: "collapse" }}
                        >
                          <thead>
                            <tr style={{ backgroundColor: "#f5f5f5" }}>
                              <th
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "left",
                                  fontWeight: "700",
                                  color: "#1a2b4c",
                                }}
                              >
                                Gauge
                              </th>
                              <th
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                  fontWeight: "700",
                                  color: "#1a2b4c",
                                }}
                              >
                                Min Thickness (in)
                              </th>
                              <th
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                  fontWeight: "700",
                                  color: "#1a2b4c",
                                }}
                              >
                                Max Thickness (in)
                              </th>
                              <th
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                  fontWeight: "700",
                                  color: "#1a2b4c",
                                }}
                              >
                                Typical (in)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {material.gaugeThicknessChart.map(
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
                                      color: "#1a2b4c",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {item.gauge}
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.thickness_min}
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.thickness_max}
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.typical}
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {/* ===== OUTSIDE DIAMETER CHART ===== */}
                  {hasData(material.outsideDiameterChart) && (
                    <>
                      <h3 style={{ marginTop: "2rem" }}>
                        Outside Diameter & Schedule Chart
                      </h3>
                      <p
                        style={{
                          marginBottom: "15px",
                          color: "#666",
                          fontSize: "0.9rem",
                        }}
                      >
                        Nominal pipe sizes with corresponding outside diameters
                        and schedule wall thicknesses
                      </p>
                      <div style={{ overflowX: "auto" }}>
                        <table
                          className="spec-table-grid"
                          style={{ width: "100%", borderCollapse: "collapse" }}
                        >
                          <thead>
                            <tr style={{ backgroundColor: "#f5f5f5" }}>
                              <th
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "left",
                                  fontWeight: "700",
                                  color: "#1a2b4c",
                                }}
                              >
                                Nominal Pipe Size
                              </th>
                              <th
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                  fontWeight: "700",
                                  color: "#1a2b4c",
                                }}
                              >
                                OD (in)
                              </th>
                              <th
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                  fontWeight: "700",
                                  color: "#1a2b4c",
                                }}
                              >
                                Sch 5
                              </th>
                              <th
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                  fontWeight: "700",
                                  color: "#1a2b4c",
                                }}
                              >
                                Sch 10
                              </th>
                              <th
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                  fontWeight: "700",
                                  color: "#1a2b4c",
                                }}
                              >
                                Sch 40
                              </th>
                              <th
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                  fontWeight: "700",
                                  color: "#1a2b4c",
                                }}
                              >
                                Sch 80
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {material.outsideDiameterChart.map(
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
                                      color: "#1a2b4c",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {item.nominal_pipe_size}
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.od_inch}
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.sch_5}
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.sch_10}
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.sch_40}
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.sch_80}
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {/* ===== WEIGHT / SIZE CHART ===== */}
                  {hasData(material.weightSizeChart) && (
                    <>
                      <h3 style={{ marginTop: "2rem" }}>
                        {material.slug?.includes("round-bars")
                          ? "Stainless Steel Round Bars Weight Chart"
                          : material.slug?.includes("plates")
                            ? "Weight Chart per Dimension"
                            : material.slug?.includes("pipes")
                              ? "Pipe Weight Chart"
                              : "Weight / Size Chart"}
                      </h3>
                      <p
                        style={{
                          marginBottom: "15px",
                          color: "#666",
                          fontSize: "0.9rem",
                        }}
                      >
                        {material.slug?.includes("round-bars")
                          ? "Weight per meter for Stainless Steel Round Bars"
                          : material.slug?.includes("plates")
                            ? "Weight per dimension for Plates"
                            : material.slug?.includes("pipes")
                              ? "Weight per meter for Pipes"
                              : "Weight and size specifications"}
                      </p>

                      {(() => {
                        const data = material.weightSizeChart;
                        if (!data || data.length === 0) return null;

                        const firstItem = data[0];
                        const keys = Object.keys(firstItem);

                        // Detect data type
                        const isRoundBarData =
                          keys.includes("size") && keys.includes("kgs_mtr");
                        const isPipeData = keys.some((k) =>
                          [
                            "nps",
                            "od_mm",
                            "od_in",
                            "sched",
                            "kg_mtr",
                            "lb_ft",
                            "weight_kg_m",
                            "weight_lb_ft",
                          ].includes(k),
                        );
                        const isPlateData = keys.some((k) =>
                          [
                            "thickness",
                            "weightPerM2",
                            "size2000",
                            "size2500",
                            "size3000",
                          ].includes(k),
                        );
                        const isWeightOnlyData = keys.some((k) =>
                          ["weight", "weight_kg", "weight_lb"].includes(k),
                        );

                        // For Round Bar data - 3 column format
                        if (isRoundBarData) {
                          return (
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
                                    {Array.from({ length: 3 }).map((_, idx) => (
                                      <React.Fragment key={idx}>
                                        <th
                                          style={{
                                            padding: "10px",
                                            border: "1px solid #ddd",
                                            textAlign: "center",
                                            fontWeight: "700",
                                            color: "#1a2b4c",
                                            width: "16.66%",
                                          }}
                                        >
                                          Size
                                        </th>
                                        <th
                                          style={{
                                            padding: "10px",
                                            border: "1px solid #ddd",
                                            textAlign: "center",
                                            fontWeight: "700",
                                            color: "#1a2b4c",
                                            width: "16.66%",
                                          }}
                                        >
                                          Kgs / Mtr
                                        </th>
                                      </React.Fragment>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {(() => {
                                    const itemsPerRow = 3;
                                    const rows = [];
                                    for (
                                      let i = 0;
                                      i < data.length;
                                      i += itemsPerRow
                                    ) {
                                      const rowItems = data.slice(
                                        i,
                                        i + itemsPerRow,
                                      );
                                      while (rowItems.length < itemsPerRow) {
                                        rowItems.push({
                                          size: "",
                                          kgs_mtr: "",
                                        });
                                      }
                                      rows.push(rowItems);
                                    }
                                    return rows.map((rowItems, rowIndex) => (
                                      <tr
                                        key={rowIndex}
                                        style={{
                                          backgroundColor:
                                            rowIndex % 2 === 0
                                              ? "white"
                                              : "#fafafa",
                                        }}
                                      >
                                        {rowItems.map((item, colIndex) => (
                                          <React.Fragment key={colIndex}>
                                            <td
                                              style={{
                                                padding: "8px 10px",
                                                border: "1px solid #ddd",
                                                textAlign: "center",
                                                color: "#1a2b4c",
                                                fontWeight: "500",
                                              }}
                                            >
                                              {item.size || "—"}
                                            </td>
                                            <td
                                              style={{
                                                padding: "8px 10px",
                                                border: "1px solid #ddd",
                                                textAlign: "center",
                                                color: "#555",
                                              }}
                                            >
                                              {item.kgs_mtr || "—"}
                                            </td>
                                          </React.Fragment>
                                        ))}
                                      </tr>
                                    ));
                                  })()}
                                </tbody>
                              </table>
                            </div>
                          );
                        }

                        // For Pipe data - show all columns with smart headers
                        if (isPipeData) {
                          const labelMap: Record<string, string> = {
                            nps: "NPS",
                            od_in: "OD (in)",
                            od_mm: "OD (mm)",
                            wall_in: "Wall (in)",
                            wall_mm: "Wall (mm)",
                            wt_in: "Wall (in)",
                            wt_mm: "Wall (mm)",
                            sched: "Schedule",
                            schedule: "Schedule",
                            kg_mtr: "Weight (kg/m)",
                            weight_kg_m: "Weight (kg/m)",
                            lb_ft: "Weight (lb/ft)",
                            weight_lb_ft: "Weight (lb/ft)",
                            sch: "Schedule",
                          };

                          return (
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
                                    {keys.map((key) => (
                                      <th
                                        key={key}
                                        style={{
                                          padding: "10px 15px",
                                          border: "1px solid #ddd",
                                          textAlign:
                                            key === "nps" ||
                                            key === "description"
                                              ? "left"
                                              : "center",
                                          whiteSpace: "nowrap",
                                          fontWeight: 700,
                                          color: "#1a2b4c",
                                        }}
                                      >
                                        {labelMap[key] ||
                                          key
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
                                      {keys.map((key) => (
                                        <td
                                          key={key}
                                          style={{
                                            padding: "10px 15px",
                                            border: "1px solid #ddd",
                                            color:
                                              key === "nps" ||
                                              key === "description"
                                                ? "#1a2b4c"
                                                : "#555",
                                            fontWeight:
                                              key === "nps" ||
                                              key === "description"
                                                ? "600"
                                                : "400",
                                            textAlign:
                                              key === "nps" ||
                                              key === "description"
                                                ? "left"
                                                : "center",
                                            verticalAlign: "middle",
                                          }}
                                        >
                                          {item[key] !== undefined &&
                                          item[key] !== null
                                            ? item[key]
                                            : "—"}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          );
                        }

                        // For Plate data - show all columns with smart headers
                        if (isPlateData) {
                          const labelMap: Record<string, string> = {
                            thickness: "Thickness (mm)",
                            weightPerM2: "Weight (kg/m²)",
                            size2000: "2000 x 1000",
                            size2500: "2500 x 1250",
                            size3000: "3000 x 1500",
                            weight_kg_m2: "Weight (kg/m²)",
                          };

                          return (
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
                                    {keys.map((key) => (
                                      <th
                                        key={key}
                                        style={{
                                          padding: "10px 15px",
                                          border: "1px solid #ddd",
                                          textAlign:
                                            key === "thickness"
                                              ? "left"
                                              : "center",
                                          whiteSpace: "nowrap",
                                          fontWeight: 700,
                                          color: "#1a2b4c",
                                        }}
                                      >
                                        {labelMap[key] ||
                                          key
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
                                      {keys.map((key) => (
                                        <td
                                          key={key}
                                          style={{
                                            padding: "10px 15px",
                                            border: "1px solid #ddd",
                                            color:
                                              key === "thickness"
                                                ? "#1a2b4c"
                                                : "#555",
                                            fontWeight:
                                              key === "thickness"
                                                ? "600"
                                                : "400",
                                            textAlign:
                                              key === "thickness"
                                                ? "left"
                                                : "center",
                                            verticalAlign: "middle",
                                          }}
                                        >
                                          {item[key] !== undefined &&
                                          item[key] !== null
                                            ? item[key]
                                            : "—"}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          );
                        }

                        // For any other data format - auto-detect and render all columns
                        return (
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
                                  {keys.map((key) => {
                                    const labelMap: Record<string, string> = {
                                      size: "Size",
                                      weight: "Weight",
                                      weight_kg: "Weight (kg)",
                                      weight_lb: "Weight (lb)",
                                      thickness: "Thickness (mm)",
                                      width: "Width (mm)",
                                      length: "Length (mm)",
                                      description: "Description",
                                      grade: "Grade",
                                    };
                                    const displayName =
                                      labelMap[key] ||
                                      key
                                        .replace(/_/g, " ")
                                        .replace(/([A-Z])/g, " $1")
                                        .trim()
                                        .toUpperCase();
                                    const isFirstCol = [
                                      "size",
                                      "thickness",
                                      "width",
                                      "length",
                                      "description",
                                      "grade",
                                    ].includes(key);

                                    return (
                                      <th
                                        key={key}
                                        style={{
                                          padding: "10px 15px",
                                          border: "1px solid #ddd",
                                          textAlign: isFirstCol
                                            ? "left"
                                            : "center",
                                          whiteSpace: "nowrap",
                                          fontWeight: 700,
                                          color: "#1a2b4c",
                                        }}
                                      >
                                        {displayName}
                                      </th>
                                    );
                                  })}
                                </tr>
                              </thead>
                              <tbody>
                                {data.map((item: any, idx: number) => {
                                  const isFirstCol = (key: string) =>
                                    [
                                      "size",
                                      "thickness",
                                      "width",
                                      "length",
                                      "description",
                                      "grade",
                                    ].includes(key);
                                  return (
                                    <tr
                                      key={idx}
                                      style={{
                                        backgroundColor:
                                          idx % 2 === 0 ? "white" : "#fafafa",
                                      }}
                                    >
                                      {keys.map((key) => (
                                        <td
                                          key={key}
                                          style={{
                                            padding: "10px 15px",
                                            border: "1px solid #ddd",
                                            color: isFirstCol(key)
                                              ? "#1a2b4c"
                                              : "#555",
                                            fontWeight: isFirstCol(key)
                                              ? "600"
                                              : "400",
                                            textAlign: isFirstCol(key)
                                              ? "left"
                                              : "center",
                                            verticalAlign: "middle",
                                          }}
                                        >
                                          {item[key] !== undefined &&
                                          item[key] !== null
                                            ? item[key]
                                            : "—"}
                                        </td>
                                      ))}
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        );
                      })()}
                    </>
                  )}

                  {/* ===== SIZE AND DIMENSIONS ===== */}
                  {hasData(material.sizeDimensions) && (
                    <>
                      <h3 style={{ marginTop: "2rem" }}>
                        Size and Dimensions of Titanium Round Bars
                      </h3>
                      <p
                        style={{
                          marginBottom: "15px",
                          color: "#666",
                          fontSize: "0.9rem",
                        }}
                      >
                        Available sizes across Metric, US (ASTM/Canadian), and
                        Japanese standards
                      </p>
                      <div style={{ overflowX: "auto" }}>
                        <table
                          className="spec-table-grid"
                          style={{ width: "100%", borderCollapse: "collapse" }}
                        >
                          <thead>
                            <tr style={{ backgroundColor: "#f5f5f5" }}>
                              <th
                                colSpan={2}
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                  fontWeight: "700",
                                  color: "#1a2b4c",
                                }}
                              >
                                Metric Size (mm)
                              </th>
                              <th
                                colSpan={2}
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                  fontWeight: "700",
                                  color: "#1a2b4c",
                                }}
                              >
                                US Rods (ASTM/Canadian)
                              </th>
                              <th
                                colSpan={2}
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                  fontWeight: "700",
                                  color: "#1a2b4c",
                                }}
                              >
                                Japanese Rods (mm²)
                              </th>
                            </tr>
                            <tr style={{ backgroundColor: "#e9ecef" }}>
                              <th
                                style={{
                                  padding: "8px 10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                  fontWeight: "600",
                                  color: "#1a2b4c",
                                  fontSize: "0.8rem",
                                }}
                              >
                                Rods Size
                              </th>
                              <th
                                style={{
                                  padding: "8px 10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                  fontWeight: "600",
                                  color: "#1a2b4c",
                                  fontSize: "0.8rem",
                                }}
                              >
                                Diam. (mm)
                              </th>
                              <th
                                style={{
                                  padding: "8px 10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                  fontWeight: "600",
                                  color: "#1a2b4c",
                                  fontSize: "0.8rem",
                                }}
                              >
                                Rods Size
                              </th>
                              <th
                                style={{
                                  padding: "8px 10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                  fontWeight: "600",
                                  color: "#1a2b4c",
                                  fontSize: "0.8rem",
                                }}
                              >
                                Diam. (Inch)
                              </th>
                              <th
                                style={{
                                  padding: "8px 10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                  fontWeight: "600",
                                  color: "#1a2b4c",
                                  fontSize: "0.8rem",
                                }}
                              >
                                Rods Size
                              </th>
                              <th
                                style={{
                                  padding: "8px 10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                  fontWeight: "600",
                                  color: "#1a2b4c",
                                  fontSize: "0.8rem",
                                }}
                              >
                                Diam. (mm)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {material.sizeDimensions.map(
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
                                      padding: "8px 10px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.metric_size || "—"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px 10px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.diameter_mm || "—"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px 10px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.us_rods || "—"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px 10px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.us_diameter_inch || "—"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px 10px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.japanese_rods || "—"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px 10px",
                                      border: "1px solid #ddd",
                                      textAlign: "center",
                                      color: "#555",
                                    }}
                                  >
                                    {item.japanese_diameter_mm || "—"}
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {/* ===== STOCKED SIZES ===== */}
                  {hasData(material.stockedSizes) && (
                    <>
                      <h3 style={{ marginTop: "2rem" }}>
                        Standard Stocked Sizes
                      </h3>
                      <p
                        style={{
                          marginBottom: "15px",
                          color: "#666",
                          fontSize: "0.9rem",
                        }}
                      >
                        Available stocked sizes for{" "}
                        {material.title?.split(" – ")[0] || "this material"}
                      </p>
                      <div style={{ overflowX: "auto" }}>
                        <table
                          className="spec-table-grid"
                          style={{ width: "100%", borderCollapse: "collapse" }}
                        >
                          <thead>
                            <tr style={{ backgroundColor: "#f5f5f5" }}>
                              <th
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "left",
                                  whiteSpace: "nowrap",
                                  fontWeight: "700",
                                  color: "#1a2b4c",
                                }}
                              >
                                Size (Inches)
                              </th>
                              <th
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "left",
                                  whiteSpace: "nowrap",
                                  fontWeight: "700",
                                  color: "#1a2b4c",
                                }}
                              >
                                Size (mm)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {material.stockedSizes.map(
                              (item: any, idx: number) => (
                                <tr key={idx}>
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      color: "#1a2b4c",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {item.size_inches || "—"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      color: "#555",
                                    }}
                                  >
                                    {item.size_mm || "—"}
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {/* ===== PRICE RANGE TAB ===== */}
                  {hasPriceData(material.priceRange) && (
                    <div className="tab-panel">
                      <h2>Price Range</h2>
                      <p
                        style={{
                          marginBottom: "15px",
                          color: "#666",
                          fontSize: "0.9rem",
                        }}
                      >
                        Approximate price range for different sizes. Prices are
                        indicative and subject to change.
                      </p>

                      {(() => {
                        // Normalize the data to handle both formats
                        const normalizedData = normalizePriceRange(
                          material.priceRange,
                        );

                        // Detect which format we have
                        const hasDesignationA = normalizedData.some(
                          (item) => item.designation_a,
                        );
                        const hasSch10S = normalizedData.some(
                          (item) => item.sch_10s,
                        );
                        const hasDiameterIn = normalizedData.some(
                          (item) => item.diameter_in,
                        );

                        return (
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
                                  {/* Primary Designation Column */}
                                  <th
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      textAlign: "left",
                                      whiteSpace: "nowrap",
                                      fontWeight: "700",
                                      color: "#1a2b4c",
                                    }}
                                  >
                                    {hasDiameterIn
                                      ? "Diameter (in)"
                                      : "Designation"}
                                  </th>

                                  {/* Secondary Designation Column (if exists) */}
                                  {hasDesignationA && (
                                    <th
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                        textAlign: "left",
                                        whiteSpace: "nowrap",
                                        fontWeight: "700",
                                        color: "#1a2b4c",
                                      }}
                                    >
                                      Designation (A)
                                    </th>
                                  )}

                                  <th
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      textAlign: "left",
                                      whiteSpace: "nowrap",
                                      fontWeight: "700",
                                      color: "#1a2b4c",
                                    }}
                                  >
                                    OD (mm)
                                  </th>

                                  {/* Schedule column (if exists) */}
                                  {hasSch10S && (
                                    <th
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                        textAlign: "left",
                                        whiteSpace: "nowrap",
                                        fontWeight: "700",
                                        color: "#1a2b4c",
                                      }}
                                    >
                                      SCH 10S
                                    </th>
                                  )}

                                  <th
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      textAlign: "left",
                                      whiteSpace: "nowrap",
                                      fontWeight: "700",
                                      color: "#1a2b4c",
                                    }}
                                  >
                                    Weight (Kg/Mtr)
                                  </th>
                                  <th
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      textAlign: "left",
                                      whiteSpace: "nowrap",
                                      fontWeight: "700",
                                      color: "#1a2b4c",
                                    }}
                                  >
                                    Wall Thk (mm)
                                  </th>
                                  <th
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      textAlign: "left",
                                      whiteSpace: "nowrap",
                                      fontWeight: "700",
                                      color: "#1a2b4c",
                                    }}
                                  >
                                    Price (INR/Mtr)
                                  </th>
                                  <th
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      textAlign: "left",
                                      whiteSpace: "nowrap",
                                      fontWeight: "700",
                                      color: "#1a2b4c",
                                    }}
                                  >
                                    Price (INR/Kg)
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {normalizedData.map(
                                  (item: any, idx: number) => (
                                    <tr key={idx}>
                                      {/* Primary Designation */}
                                      <td
                                        style={{
                                          padding: "10px",
                                          border: "1px solid #ddd",
                                          color: "#1a2b4c",
                                          fontWeight: "600",
                                        }}
                                      >
                                        {item.designation}
                                      </td>

                                      {/* Secondary Designation */}
                                      {hasDesignationA && (
                                        <td
                                          style={{
                                            padding: "10px",
                                            border: "1px solid #ddd",
                                            color: "#555",
                                          }}
                                        >
                                          {item.designation_a || "—"}
                                        </td>
                                      )}

                                      <td
                                        style={{
                                          padding: "10px",
                                          border: "1px solid #ddd",
                                          color: "#555",
                                        }}
                                      >
                                        {item.od_mm}
                                      </td>

                                      {/* Schedule */}
                                      {hasSch10S && (
                                        <td
                                          style={{
                                            padding: "10px",
                                            border: "1px solid #ddd",
                                            color: "#555",
                                          }}
                                        >
                                          {item.sch_10s || "—"}
                                        </td>
                                      )}

                                      <td
                                        style={{
                                          padding: "10px",
                                          border: "1px solid #ddd",
                                          color: "#555",
                                        }}
                                      >
                                        {item.weight_kg_mtr}
                                      </td>
                                      <td
                                        style={{
                                          padding: "10px",
                                          border: "1px solid #ddd",
                                          color: "#555",
                                        }}
                                      >
                                        {item.wall_thk_mm}
                                      </td>
                                      <td
                                        style={{
                                          padding: "10px",
                                          border: "1px solid #ddd",
                                          color: "#c92525",
                                          fontWeight: "600",
                                        }}
                                      >
                                        ₹{item.price_inr_mtr}
                                      </td>
                                      <td
                                        style={{
                                          padding: "10px",
                                          border: "1px solid #ddd",
                                          color: "#1a2b4c",
                                          fontWeight: "500",
                                        }}
                                      >
                                        ₹{item.price_inr_kg}
                                      </td>
                                    </tr>
                                  ),
                                )}
                              </tbody>
                            </table>
                          </div>
                        );
                      })()}

                      {/* Price Notes */}
                      <div
                        style={{
                          marginTop: "20px",
                          padding: "16px 20px",
                          background: "#f8f9fa",
                          borderRadius: "8px",
                          borderLeft: "4px solid #c92525",
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.9rem",
                            color: "#666",
                          }}
                        >
                          <strong>Note:</strong> Prices are indicative and may
                          vary based on:
                        </p>
                        <ul
                          style={{
                            marginTop: "8px",
                            fontSize: "0.9rem",
                            color: "#666",
                            paddingLeft: "20px",
                          }}
                        >
                          <li>Order quantity (bulk discounts available)</li>
                          <li>Payment terms and delivery schedule</li>
                          <li>Specific grade requirements</li>
                          <li>
                            Additional processing (cutting, polishing,
                            threading)
                          </li>
                          <li>GST and other applicable taxes</li>
                        </ul>
                        <p style={{ marginTop: "12px", marginBottom: 0 }}>
                          <a
                            href="/contact"
                            className="btn btn-primary"
                            style={{ fontSize: "0.85rem", padding: "8px 20px" }}
                          >
                            Get Custom Quote →
                          </a>
                        </p>
                      </div>

                      {/* DYNAMIC COMPANY PRICE LISTS - Auto-detects any company price list */}
                      {(() => {
                        // Get all company price list keys
                        const companyPriceKeys = Object.keys(material).filter(
                          (key) =>
                            key !== "priceRange" &&
                            key !== "jindalPriceList" &&
                            (key.includes("PriceList") ||
                              key.includes("priceList") ||
                              key.endsWith("PriceList")),
                        );

                        // Also check for jindalPriceList if not already included
                        if (
                          material.jindalPriceList &&
                          !companyPriceKeys.includes("jindalPriceList")
                        ) {
                          companyPriceKeys.push("jindalPriceList");
                        }

                        // Filter out keys that don't have data
                        const validKeys = companyPriceKeys.filter((key) =>
                          hasData(material[key]),
                        );

                        // If no company price lists found, return null
                        if (validKeys.length === 0) return null;

                        // Render all company price lists
                        return validKeys.map((key, index) => {
                          const priceList = material[key];
                          const companyName = key
                            .replace("PriceList", "")
                            .replace("priceList", "");

                          // Format company name
                          const formattedCompanyName = companyName
                            .replace(/([A-Z])/g, " $1")
                            .trim()
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() +
                                word.slice(1).toLowerCase(),
                            )
                            .join(" ");

                          // Detect price list format
                          const firstItem = priceList[0];
                          const isJindalFormat =
                            firstItem &&
                            ("nominalBore_inch" in firstItem ||
                              "nominalBore_mm" in firstItem ||
                              "sch5s_wt_mm" in firstItem);

                          // Render company price list
                          return (
                            <div
                              key={key}
                              style={{
                                marginTop: index > 0 ? "2.5rem" : "2.5rem",
                              }}
                            >
                              <h3
                                style={{
                                  marginTop: "0",
                                  borderTop: "2px solid #e9ecef",
                                  paddingTop: "2rem",
                                  fontSize: "1.5rem",
                                  fontWeight: "800",
                                  color: "#1a2b4c",
                                }}
                              >
                                {formattedCompanyName} Stainless Steel Pipe
                                Price List
                              </h3>
                              <p
                                style={{
                                  marginBottom: "15px",
                                  color: "#666",
                                  fontSize: "0.9rem",
                                }}
                              >
                                Indicative price list for {formattedCompanyName}{" "}
                                Stainless Steel pipes. Prices are subject to
                                change. For the latest prices, please contact
                                our sales team.
                              </p>

                              {isJindalFormat ? (
                                // Jindal-style price list with schedules
                                <div
                                  style={{
                                    overflowX: "auto",
                                    borderRadius: "8px",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                  }}
                                >
                                  <table
                                    style={{
                                      width: "100%",
                                      borderCollapse: "collapse",
                                      fontSize: "0.9rem",
                                      borderRadius: "8px",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <thead>
                                      <tr
                                        style={{
                                          background:
                                            "linear-gradient(135deg, #1a2b4c, #2d4a7a)",
                                        }}
                                      >
                                        <th
                                          style={{
                                            padding: "12px 15px",
                                            border: "1px solid #1a2b4c",
                                            textAlign: "left",
                                            whiteSpace: "nowrap",
                                            color: "white",
                                            fontWeight: "700",
                                            fontSize: "0.95rem",
                                          }}
                                          rowSpan={2}
                                        >
                                          Nominal Bore
                                        </th>
                                        <th
                                          style={{
                                            padding: "12px 15px",
                                            border: "1px solid #1a2b4c",
                                            textAlign: "left",
                                            whiteSpace: "nowrap",
                                            color: "white",
                                            fontWeight: "700",
                                            fontSize: "0.95rem",
                                          }}
                                          rowSpan={2}
                                        >
                                          OD (mm)
                                        </th>
                                        <th
                                          style={{
                                            padding: "12px 15px",
                                            border: "1px solid #1a2b4c",
                                            textAlign: "center",
                                            whiteSpace: "nowrap",
                                            color: "white",
                                            fontWeight: "700",
                                            fontSize: "0.95rem",
                                          }}
                                          colSpan={2}
                                        >
                                          Sch-5S
                                        </th>
                                        <th
                                          style={{
                                            padding: "12px 15px",
                                            border: "1px solid #1a2b4c",
                                            textAlign: "center",
                                            whiteSpace: "nowrap",
                                            color: "white",
                                            fontWeight: "700",
                                            fontSize: "0.95rem",
                                          }}
                                          colSpan={2}
                                        >
                                          Sch-10S
                                        </th>
                                        <th
                                          style={{
                                            padding: "12px 15px",
                                            border: "1px solid #1a2b4c",
                                            textAlign: "center",
                                            whiteSpace: "nowrap",
                                            color: "white",
                                            fontWeight: "700",
                                            fontSize: "0.95rem",
                                          }}
                                          colSpan={2}
                                        >
                                          Sch-40S
                                        </th>
                                      </tr>
                                      <tr
                                        style={{
                                          background:
                                            "linear-gradient(135deg, #2d4a7a, #3d6a9a)",
                                        }}
                                      >
                                        <th
                                          style={{
                                            padding: "8px 12px",
                                            border: "1px solid #2d4a7a",
                                            textAlign: "center",
                                            color: "white",
                                            fontWeight: "600",
                                            fontSize: "0.8rem",
                                          }}
                                        >
                                          Wt (mm)
                                        </th>
                                        <th
                                          style={{
                                            padding: "8px 12px",
                                            border: "1px solid #2d4a7a",
                                            textAlign: "center",
                                            color: "white",
                                            fontWeight: "600",
                                            fontSize: "0.8rem",
                                          }}
                                        >
                                          Rs/Kg
                                        </th>
                                        <th
                                          style={{
                                            padding: "8px 12px",
                                            border: "1px solid #2d4a7a",
                                            textAlign: "center",
                                            color: "white",
                                            fontWeight: "600",
                                            fontSize: "0.8rem",
                                          }}
                                        >
                                          Wt (mm)
                                        </th>
                                        <th
                                          style={{
                                            padding: "8px 12px",
                                            border: "1px solid #2d4a7a",
                                            textAlign: "center",
                                            color: "white",
                                            fontWeight: "600",
                                            fontSize: "0.8rem",
                                          }}
                                        >
                                          Rs/Kg
                                        </th>
                                        <th
                                          style={{
                                            padding: "8px 12px",
                                            border: "1px solid #2d4a7a",
                                            textAlign: "center",
                                            color: "white",
                                            fontWeight: "600",
                                            fontSize: "0.8rem",
                                          }}
                                        >
                                          Wt (mm)
                                        </th>
                                        <th
                                          style={{
                                            padding: "8px 12px",
                                            border: "1px solid #2d4a7a",
                                            textAlign: "center",
                                            color: "white",
                                            fontWeight: "600",
                                            fontSize: "0.8rem",
                                          }}
                                        >
                                          Rs/Kg
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {priceList.map(
                                        (item: any, idx: number) => (
                                          <tr
                                            key={idx}
                                            style={{
                                              backgroundColor:
                                                idx % 2 === 0
                                                  ? "white"
                                                  : "#f8f9fa",
                                              transition:
                                                "background-color 0.2s ease",
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.style.backgroundColor =
                                                "#f0f4ff";
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.backgroundColor =
                                                idx % 2 === 0
                                                  ? "white"
                                                  : "#f8f9fa";
                                            }}
                                          >
                                            <td
                                              style={{
                                                padding: "10px 15px",
                                                border: "1px solid #e9ecef",
                                                color: "#1a2b4c",
                                                fontWeight: "600",
                                              }}
                                            >
                                              {item.nominalBore_inch ||
                                                item.nominalBore ||
                                                "—"}
                                            </td>
                                            <td
                                              style={{
                                                padding: "10px 15px",
                                                border: "1px solid #e9ecef",
                                                color: "#555",
                                              }}
                                            >
                                              {item.od_mm || "—"}
                                            </td>
                                            <td
                                              style={{
                                                padding: "10px 15px",
                                                border: "1px solid #e9ecef",
                                                color: "#555",
                                                textAlign: "center",
                                              }}
                                            >
                                              {item.sch5s_wt_mm ||
                                                item.sch5s_wt ||
                                                "—"}
                                            </td>
                                            <td
                                              style={{
                                                padding: "10px 15px",
                                                border: "1px solid #e9ecef",
                                                color: "#c92525",
                                                fontWeight: "600",
                                                textAlign: "center",
                                              }}
                                            >
                                              ₹
                                              {item.sch5s_price_kg ||
                                                item.sch5s_price ||
                                                "—"}
                                            </td>
                                            <td
                                              style={{
                                                padding: "10px 15px",
                                                border: "1px solid #e9ecef",
                                                color: "#555",
                                                textAlign: "center",
                                              }}
                                            >
                                              {item.sch10s_wt_mm ||
                                                item.sch10s_wt ||
                                                "—"}
                                            </td>
                                            <td
                                              style={{
                                                padding: "10px 15px",
                                                border: "1px solid #e9ecef",
                                                color: "#c92525",
                                                fontWeight: "600",
                                                textAlign: "center",
                                              }}
                                            >
                                              ₹
                                              {item.sch10s_price_kg ||
                                                item.sch10s_price ||
                                                "—"}
                                            </td>
                                            <td
                                              style={{
                                                padding: "10px 15px",
                                                border: "1px solid #e9ecef",
                                                color: "#555",
                                                textAlign: "center",
                                              }}
                                            >
                                              {item.sch40s_wt_mm ||
                                                item.sch40s_wt ||
                                                "—"}
                                            </td>
                                            <td
                                              style={{
                                                padding: "10px 15px",
                                                border: "1px solid #e9ecef",
                                                color: "#c92525",
                                                fontWeight: "600",
                                                textAlign: "center",
                                              }}
                                            >
                                              ₹
                                              {item.sch40s_price_kg ||
                                                item.sch40s_price ||
                                                "—"}
                                            </td>
                                          </tr>
                                        ),
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                // Generic price list format - auto-detect columns
                                <div
                                  style={{
                                    overflowX: "auto",
                                    borderRadius: "8px",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                  }}
                                >
                                  <table
                                    style={{
                                      width: "100%",
                                      borderCollapse: "collapse",
                                      fontSize: "0.9rem",
                                      borderRadius: "8px",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <thead>
                                      <tr
                                        style={{
                                          background:
                                            "linear-gradient(135deg, #1a2b4c, #2d4a7a)",
                                        }}
                                      >
                                        {Object.keys(firstItem).map(
                                          (colKey) => (
                                            <th
                                              key={colKey}
                                              style={{
                                                padding: "12px 15px",
                                                border: "1px solid #1a2b4c",
                                                textAlign: "left",
                                                whiteSpace: "nowrap",
                                                color: "white",
                                                fontWeight: "700",
                                                fontSize: "0.85rem",
                                              }}
                                            >
                                              {colKey
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
                                      {priceList.map(
                                        (item: any, idx: number) => (
                                          <tr
                                            key={idx}
                                            style={{
                                              backgroundColor:
                                                idx % 2 === 0
                                                  ? "white"
                                                  : "#f8f9fa",
                                              transition:
                                                "background-color 0.2s ease",
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.style.backgroundColor =
                                                "#f0f4ff";
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.backgroundColor =
                                                idx % 2 === 0
                                                  ? "white"
                                                  : "#f8f9fa";
                                            }}
                                          >
                                            {Object.keys(firstItem).map(
                                              (colKey) => (
                                                <td
                                                  key={colKey}
                                                  style={{
                                                    padding: "10px 15px",
                                                    border: "1px solid #e9ecef",
                                                    color: colKey
                                                      .toLowerCase()
                                                      .includes("price")
                                                      ? "#c92525"
                                                      : "#555",
                                                    fontWeight: colKey
                                                      .toLowerCase()
                                                      .includes("price")
                                                      ? "600"
                                                      : "400",
                                                  }}
                                                >
                                                  {item[colKey] || "—"}
                                                </td>
                                              ),
                                            )}
                                          </tr>
                                        ),
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              )}

                              <div
                                style={{
                                  marginTop: "12px",
                                  padding: "12px 16px",
                                  background: "#fff3cd",
                                  borderRadius: "6px",
                                  border: "1px solid #ffc107",
                                }}
                              >
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: "0.85rem",
                                    color: "#856404",
                                  }}
                                >
                                  <strong>Note:</strong> Prices are indicative.
                                  For the latest {formattedCompanyName}{" "}
                                  Stainless Steel Pipe Price List, please{" "}
                                  <a
                                    href="/contact"
                                    style={{
                                      color: "#c92525",
                                      fontWeight: "600",
                                      textDecoration: "none",
                                    }}
                                  >
                                    contact our sales team
                                  </a>
                                  .
                                </p>
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  )}
                  {/* ===== SUPPLY RANGE ===== */}
                  {hasData(material.supplyRange) && (
                    <>
                      <h3 style={{ marginTop: "2rem" }}>Supply Range</h3>
                      <div style={{ overflowX: "auto" }}>
                        <table
                          className="spec-table-grid"
                          style={{ width: "100%", borderCollapse: "collapse" }}
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
                                Product Description
                              </th>
                              <th
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "left",
                                }}
                              >
                                Wall Thickness (mm)
                              </th>
                              <th
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "left",
                                }}
                              >
                                Outside Diameter (mm)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {material.supplyRange.map(
                              (item: any, idx: number) => (
                                <tr key={idx}>
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      color: "#555",
                                    }}
                                  >
                                    {item.description}
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      color: "#555",
                                    }}
                                  >
                                    {item.wallThickness}
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      color: "#555",
                                    }}
                                  >
                                    {item.outsideDiameter}
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {hasData(material.gaugeChart) && (
                    <>
                      <h3 style={{ marginTop: "2rem" }}>
                        Thickness Gauge Chart
                      </h3>
                      <div style={{ overflowX: "auto" }}>
                        <table
                          className="spec-table-grid"
                          style={{ width: "100%", borderCollapse: "collapse" }}
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
                                Gauge Number
                              </th>
                              <th
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "left",
                                }}
                              >
                                Inches
                              </th>
                              <th
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "left",
                                }}
                              >
                                MM
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {material.gaugeChart.map(
                              (item: any, idx: number) => (
                                <tr key={idx}>
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                    }}
                                  >
                                    {item.gauge}
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                    }}
                                  >
                                    {item.inches}
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                    }}
                                  >
                                    {item.mm}
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {/* ===== THICKNESS TOLERANCE ===== */}
                  {hasData(material.thicknessTolerance) && (
                    <>
                      <h3 style={{ marginTop: "2rem" }}>Thickness Tolerance</h3>
                      <p
                        style={{
                          marginBottom: "15px",
                          color: "#666",
                          fontSize: "0.9rem",
                        }}
                      >
                        {material.slug?.includes("titanium") ||
                        material.slug?.includes("plate")
                          ? "Tolerance over and under nominal thickness t (mm) per ASTM B265 / ASME SB265"
                          : "Thickness tolerance chart"}
                      </p>
                      <div style={{ overflowX: "auto" }}>
                        <table
                          className="spec-table-grid"
                          style={{ width: "100%", borderCollapse: "collapse" }}
                        >
                          <thead>
                            <tr style={{ backgroundColor: "#f5f5f5" }}>
                              {(() => {
                                const firstItem =
                                  material.thicknessTolerance[0];
                                if (!firstItem) return null;

                                return Object.keys(firstItem).map((key) => {
                                  // Format the header label
                                  let label = key
                                    .replace(/_/g, " ")
                                    .replace(/([A-Z])/g, " $1")
                                    .trim()
                                    .toUpperCase();

                                  // Common field name mappings
                                  const labelMap: Record<string, string> = {
                                    width_mm: "Width (mm)",
                                    width: "Width (mm)",
                                    thickness: "Thickness in. (mm)",
                                    thickness_mm: "Thickness (mm)",
                                    widthUpTo36: "Width Up to 36",
                                    widthUpTo48: "Width Up to 48",
                                    width_up_to_36: "Width Up to 36",
                                    width_up_to_48: "Width Up to 48",
                                    t_2_5_4_5: "2.5-4.5",
                                    t_6_0: "6.0",
                                    t_8_0: "8.0",
                                    t_10_0: "10.0",
                                    t_12_5: "12.5",
                                    t_16_0: "16.0",
                                    t_20_0: "20.0",
                                    t_25_0: "25.0",
                                    t_30_0: "30.0",
                                    t_gt_30: "> 30",
                                    tolerance_2_5_4_5: "2.5-4.5",
                                    tolerance_6: "6.0",
                                    tolerance_8: "8.0",
                                    tolerance_10: "10.0",
                                    tolerance_12_5: "12.5",
                                    tolerance_16: "16.0",
                                    tolerance_20: "20.0",
                                    tolerance_25: "25.0",
                                    tolerance_30: "30.0",
                                    tolerance_gt_30: "> 30",
                                  };

                                  label = labelMap[key] || label;

                                  const isFirstCol =
                                    key === "width_mm" ||
                                    key === "width" ||
                                    key === "thickness" ||
                                    key === "thickness_mm";

                                  return (
                                    <th
                                      key={key}
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                        textAlign: isFirstCol
                                          ? "left"
                                          : "center",
                                        whiteSpace: "nowrap",
                                        fontWeight: "700",
                                        color: "#1a2b4c",
                                      }}
                                    >
                                      {label}
                                    </th>
                                  );
                                });
                              })()}
                            </tr>
                          </thead>
                          <tbody>
                            {material.thicknessTolerance.map(
                              (item: any, idx: number) => {
                                const firstItem =
                                  material.thicknessTolerance[0];
                                if (!firstItem) return null;

                                const keys = Object.keys(firstItem);

                                return (
                                  <tr key={idx}>
                                    {keys.map((key) => {
                                      const isFirstCol =
                                        key === "width_mm" ||
                                        key === "width" ||
                                        key === "thickness" ||
                                        key === "thickness_mm";
                                      const isPrice = key
                                        .toLowerCase()
                                        .includes("price");

                                      return (
                                        <td
                                          key={key}
                                          style={{
                                            padding: "10px",
                                            border: "1px solid #ddd",
                                            color: isFirstCol
                                              ? "#1a2b4c"
                                              : isPrice
                                                ? "#c92525"
                                                : "#555",
                                            fontWeight: isFirstCol
                                              ? "600"
                                              : isPrice
                                                ? "600"
                                                : "400",
                                            textAlign: isFirstCol
                                              ? "left"
                                              : "center",
                                          }}
                                        >
                                          {item[key] !== undefined &&
                                          item[key] !== null
                                            ? item[key]
                                            : "—"}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                );
                              },
                            )}
                          </tbody>
                        </table>
                      </div>
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

                    {/* If only application string exists but no array, split it */}
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

                    {/* Related Searches */}
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

              {/* ===== AVAILABILITY TAB ===== */}
              {activeTab === "availability" &&
                hasData(material.stockAvailability) && (
                  <div className="tab-panel">
                    <h2>Stock Availability</h2>

                    {/* Dynamically render all stock categories */}
                    {Object.entries(material.stockAvailability).map(
                      ([categoryKey, categoryData]: [string, any]) => {
                        // Skip if categoryData is not an array or is empty
                        if (
                          !Array.isArray(categoryData) ||
                          categoryData.length === 0
                        )
                          return null;

                        // Generate a display title from the category key
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
                                  // Handle both object format { title, items, image } and direct array
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
                                              {/* LEFT: All Text */}
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

                                              {/* RIGHT: Image or Checkmark */}
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

                    {/* Thickness Availability */}
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

                    {/* Related Searches */}
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
                            <div className="country-item">
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

              {/* ===== OUR PRODUCTS TAB ===== */}
              {activeTab === "ourproducts" && (
                <div className="tab-panel">
                  <h2>Our Products</h2>
                  <div className="our-products-list">
                    {productCategories.map((category) => (
                      <Link
                        key={category.slug}
                        to={`/products/${category.slug}`}
                        className={`product-item ${slug === category.slug ? "active" : ""}`}
                      >
                        <span className="product-bullet">-</span>
                        {category.name}
                      </Link>
                    ))}
                  </div>
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
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <div className="container">
            <h2>Related Products</h2>
            <div className="related-products-grid">
              {relatedProducts.slice(0, 4).map((product) => (
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
      )}
    </section>
  );
};

export default MaterialDetail;
