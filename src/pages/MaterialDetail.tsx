// src/pages/MaterialDetail.tsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { productCategoryMap } from "../data/productIndex";
import { CheckCircle, Phone, MapPin, Globe, FileWarning } from "lucide-react";
import "./MaterialDetail.css";

const MaterialDetail: React.FC = () => {
  const { slug, materialSlug } = useParams<{
    slug: string;
    materialSlug: string;
  }>();

  const categoryData = productCategoryMap[slug];
  const material = categoryData?.find((item) => item.slug === materialSlug);

  const [showAllDetails, setShowAllDetails] = useState(false);

  const hasData = (field: any) => {
    if (field === undefined || field === null) return false;
    if (Array.isArray(field)) return field.length > 0;
    if (typeof field === "object") return Object.keys(field).length > 0;
    if (typeof field === "string") return field.trim().length > 0;
    return true;
  };

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

  const getCaptionDescription = (slug: string): string => {
    const descriptions: { [key: string]: string } = {
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
    { name: "Hose Pipes", slug: "hose-pipe" },
    { name: "Perforated Sheets", slug: "perforated-sheet" },
    { name: "Wire Mesh", slug: "wire-mesh" },
    { name: "Anchor Fasteners", slug: "anchor-fastener" },
    { name: "Dairy & Pharma Valves", slug: "dairy-pharma-valves" },
  ];

  return (
    <section className="md-page">
      {/* ===== HERO ===== */}
      <div className="md-hero">
        <div className="md-container md-hero-inner">
          <nav className="md-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to={`/products/${slug}`}>
              {slug
                ?.replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </Link>
            <span>/</span>
            <span className="md-breadcrumb-current">{material.title}</span>
          </nav>
          <h1 className="md-hero-title">{material.title}</h1>
          {material.shortDescription && (
            <p className="md-hero-subtitle">{material.shortDescription}</p>
          )}
          <div className="md-hero-tags">
            {material.materialGroup && (
              <span className="md-hero-tag">{material.materialGroup}</span>
            )}
            {material.standards && (
              <span className="md-hero-tag">
                {material.standards.split(",")[0]}
              </span>
            )}
            {material.forms && (
              <span className="md-hero-tag">
                {material.forms.split(",")[0]}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ===== BODY ===== */}
      <div className="md-container md-body">
        <div className="md-grid">
          {/* ===== LEFT SIDEBAR ===== */}
          <aside className="md-sidebar">
            <div className="md-image-card">
              <img src={material.image} alt={material.title} />
            </div>

            <div className="md-card md-caption-card">
              <h4>{material.title}</h4>
              <p>{getCaptionDescription(slug)}</p>
            </div>

            <div className="md-card md-sidebar-products">
              <h3 className="md-sidebar-title">Our Products</h3>
              <ul className="md-sidebar-list">
                {productCategories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      to={`/products/${category.slug}`}
                      className={`md-sidebar-link ${
                        slug === category.slug ? "active" : ""
                      }`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* ===== RIGHT CONTENT ===== */}
          <main className="md-main">
            <div className="md-tab-content">
              {/* ===== OVERVIEW ===== */}
              <div className="md-panel">
                <div className="md-section-head">
                  <h2>Product Overview</h2>
                </div>

                {material.shortDescription && (
                  <p>{material.shortDescription}</p>
                )}
                {material.technicalOverview && (
                  <p className="md-mt">{material.technicalOverview}</p>
                )}

                {(() => {
                  const infoFields = [
                    { key: "materialGroup", label: "Material Group" },
                    { key: "standards", label: "Standards" },
                    { key: "forms", label: "Available Forms" },
                  ];
                  return (
                    <div className="md-info-list">
                      {infoFields.map(({ key, label }) => {
                        const value = material[key];
                        if (!value) return null;
                        return (
                          <div key={key} className="md-info-row">
                            <span className="md-info-label">{label}</span>
                            <span className="md-info-value">{value}</span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}

                {(hasData(material.keyFeatures) ||
                  hasData(material.specializedIn)) && (
                  <div className="md-feature-block">
                    <h3>Key Features</h3>
                    <ul className="md-feature-list">
                      {(
                        material.keyFeatures ||
                        material.specializedIn ||
                        []
                      ).map((feature: string, index: number) => (
                        <li key={index}>
                          <CheckCircle size={16} /> <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

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
                    <div className="md-grade-overview">
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
                            <div key={sectionKey} className="md-grade-section">
                              <h4>{label}</h4>
                              {displayEntries.map(([grade, desc]) => (
                                <div key={grade} className="md-grade-item">
                                  <strong>{grade}</strong>
                                  <span>{desc as string}</span>
                                </div>
                              ))}
                              {hasMore && (
                                <div className="md-grade-more">
                                  + {entries.length - 2} more grades
                                </div>
                              )}
                            </div>
                          );
                        },
                      )}
                    </div>
                  );
                })()}

                {showAllDetails && (
                  <div className="md-all-details">
                    <h3>Complete Product Details</h3>
                  </div>
                )}
              </div>

              {/* ===== SPECIFICATIONS ===== */}
              <div className="md-panel">
                <div className="md-section-head">
                  <h2>Technical Specifications</h2>
                </div>

                {[
                  { key: "standards", label: "Standards & Grades" },
                  { key: "materialGroup", label: "Material Group" },
                  { key: "forms", label: "Forms Available" },
                  { key: "application", label: "Applications" },
                ].map(({ key, label }) => {
                  const value = material[key];
                  if (!value) return null;
                  return (
                    <div key={key} className="md-spec-row">
                      <span className="md-spec-label">{label}</span>
                      <span className="md-spec-value">{value}</span>
                    </div>
                  );
                })}

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
                      !["tolerances", "hotRolled", "coldRolled"].includes(key),
                  );

                  const renderTable = (data: any[], title: string) => {
                    if (!Array.isArray(data) || data.length === 0) return null;
                    const columns = Object.keys(data[0]);
                    return (
                      <div className="md-table-block" key={title}>
                        <h3>{title}</h3>
                        <div className="md-table-wrap">
                          <table className="md-table">
                            <thead>
                              <tr>
                                {columns.map((col) => (
                                  <th key={col}>
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
                                    <td key={col}>
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
                  };

                  return (
                    <>
                      {stringEntries.length > 0 && (
                        <div className="md-spec-block">
                          <h3>Detailed Specifications</h3>
                          {stringEntries.map((key) => {
                            const label =
                              labelMap[key] ||
                              key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase());
                            return (
                              <div key={key} className="md-spec-row">
                                <span className="md-spec-label">{label}</span>
                                <span className="md-spec-value">
                                  {specs[key]}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {surfaceFinish && typeof surfaceFinish === "string" && (
                        <div className="md-spec-row">
                          <span className="md-spec-label">Surface Finish</span>
                          <span className="md-spec-value">{surfaceFinish}</span>
                        </div>
                      )}

                      {hotRolled && typeof hotRolled === "object" && (
                        <div className="md-spec-block">
                          <h3>Hot Rolled Specifications</h3>
                          {Object.entries(hotRolled).map(([key, value]) => {
                            if (!value) return null;
                            const label = key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase());
                            return (
                              <div key={key} className="md-spec-row">
                                <span className="md-spec-label">{label}</span>
                                <span className="md-spec-value">
                                  {String(value)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {coldRolled && typeof coldRolled === "object" && (
                        <div className="md-spec-block">
                          <h3>Cold Rolled Specifications</h3>
                          {Object.entries(coldRolled).map(([key, value]) => {
                            if (!value) return null;
                            const label = key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase());
                            return (
                              <div key={key} className="md-spec-row">
                                <span className="md-spec-label">{label}</span>
                                <span className="md-spec-value">
                                  {String(value)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {gaugeChart &&
                        Array.isArray(gaugeChart) &&
                        gaugeChart.length > 0 &&
                        renderTable(gaugeChart, "Gauge Thickness Chart")}

                      {Array.isArray(roundBarSizes) &&
                        roundBarSizes.length > 0 &&
                        renderTable(roundBarSizes, "Round Bar Sizes")}

                      {tolerances &&
                        typeof tolerances === "object" &&
                        !Array.isArray(tolerances) && (
                          <div className="md-table-block">
                            <h3>Tolerances</h3>
                            {Object.entries(tolerances).map(([key, value]) => {
                              if (!Array.isArray(value) || value.length === 0)
                                return null;
                              const label =
                                labelMap[key] ||
                                key.replace(/([A-Z])/g, " $1").trim();
                              return renderTable(value, label);
                            })}
                          </div>
                        )}

                      {otherArrays.map((key) => {
                        const data = specs[key];
                        if (!Array.isArray(data) || data.length === 0)
                          return null;
                        const label =
                          labelMap[key] ||
                          key.replace(/([A-Z])/g, " $1").trim();
                        return renderTable(data, label);
                      })}

                      {otherObjects.map((key) => {
                        const data = specs[key];
                        if (typeof data !== "object" || data === null)
                          return null;
                        const label =
                          labelMap[key] ||
                          key.replace(/([A-Z])/g, " $1").trim();
                        return (
                          <div key={key} className="md-spec-block">
                            <h3>{label}</h3>
                            {Object.entries(data).map(([subKey, subValue]) => (
                              <div key={subKey} className="md-spec-row">
                                <span className="md-spec-label">
                                  {subKey
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, (str) => str.toUpperCase())}
                                </span>
                                <span className="md-spec-value">
                                  {typeof subValue === "object"
                                    ? JSON.stringify(subValue)
                                    : String(subValue)}
                                </span>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </>
                  );
                })()}

                {material.standardTables && (
                  <div className="md-table-block">
                    <h3>Standard Specifications</h3>
                    {material.standardTables.specificationsTable && (
                      <div className="md-table-wrap">
                        <table className="md-table">
                          <tbody>
                            {Object.entries(
                              material.standardTables.specificationsTable,
                            ).map(([key, value]: [string, any], idx) => (
                              <tr key={idx}>
                                <td className="md-td-key">{key}</td>
                                <td>{value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {material.testingAndCertification && (
                  <div className="md-spec-block">
                    <h3>Testing & Certification</h3>
                    {material.testingAndCertification.testingMethods &&
                      material.testingAndCertification.testingMethods.length >
                        0 && (
                        <div>
                          <h4>Testing Methods</h4>
                          <ul className="md-check-list">
                            {material.testingAndCertification.testingMethods.map(
                              (method: string, idx: number) => (
                                <li key={idx}>✓ {method}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                    {material.testingAndCertification.certificationTypes &&
                      material.testingAndCertification.certificationTypes
                        .length > 0 && (
                        <div>
                          <h4>Certification Types</h4>
                          <ul className="md-check-list">
                            {material.testingAndCertification.certificationTypes.map(
                              (cert: string, idx: number) => (
                                <li key={idx}>✓ {cert}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                    {material.testingAndCertification.traceability && (
                      <div>
                        <h4>Traceability</h4>
                        <p>{material.testingAndCertification.traceability}</p>
                      </div>
                    )}
                  </div>
                )}

                {material.shippingAndPackaging && (
                  <div className="md-spec-block">
                    <h3>Shipping & Packaging</h3>
                    <div className="md-shipping-grid">
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
                            <div key={key} className="md-spec-row">
                              <span className="md-spec-label">
                                {labelMap[key] ||
                                  key.replace(/([A-Z])/g, " $1").trim()}
                              </span>
                              <span className="md-spec-value">
                                {String(value)}
                              </span>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                )}

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
                    <div className="md-spec-block">
                      <h3>Grade Details</h3>
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
                            <div key={sectionKey}>
                              <h4>{label}</h4>
                              {Object.entries(sectionValue).map(
                                ([grade, desc]) => (
                                  <div key={grade} className="md-grade-item">
                                    <strong>{grade}</strong>
                                    <span>{desc as string}</span>
                                  </div>
                                ),
                              )}
                            </div>
                          );
                        },
                      )}
                    </div>
                  );
                })()}

                {material.equivalentGrades &&
                  material.equivalentGrades.length > 0 && (
                    <div className="md-table-block">
                      <h3>Equivalent Grades</h3>
                      <p className="md-muted">
                        Equivalent grades across international standards
                      </p>
                      <div className="md-table-wrap">
                        <table className="md-table">
                          <thead>
                            <tr>
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
                                    <th key={key}>
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
                                <tr key={idx}>
                                  {Object.keys(
                                    material.equivalentGrades[0],
                                  ).map((key) => (
                                    <td key={key}>
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
                    </div>
                  )}

                {material.chemicalComposition &&
                  material.chemicalComposition.length > 0 && (
                    <div className="md-table-block">
                      <h3>Chemical Composition</h3>
                      <div className="md-table-wrap">
                        <table className="md-table">
                          <thead>
                            <tr>
                              {Object.keys(material.chemicalComposition[0]).map(
                                (key) => (
                                  <th key={key}>{key.toUpperCase()}</th>
                                ),
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {material.chemicalComposition.map(
                              (item: any, idx: number) => (
                                <tr key={idx}>
                                  {Object.values(item).map(
                                    (value: any, colIdx: number) => (
                                      <td key={colIdx}>{value}</td>
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

                {material.mechanicalProperties &&
                  material.mechanicalProperties.length > 0 && (
                    <div className="md-table-block">
                      <h3>Mechanical & Physical Properties</h3>
                      <div className="md-table-wrap">
                        <table className="md-table">
                          <thead>
                            <tr>
                              {Object.keys(
                                material.mechanicalProperties[0],
                              ).map((key) => (
                                <th key={key}>
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
                                      <td key={colIdx}>{value}</td>
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

                {material.weightSizeChart &&
                  material.weightSizeChart.length > 0 && (
                    <div className="md-table-block">
                      <h3>Weight / Size Chart</h3>
                      <p className="md-muted">Weight and size specifications</p>
                      <div className="md-table-wrap">
                        <table className="md-table">
                          <thead>
                            <tr>
                              {Object.keys(material.weightSizeChart[0]).map(
                                (key) => (
                                  <th key={key}>
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
                                      <td key={colIdx}>{value || "—"}</td>
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
              </div>

              {/* ===== APPLICATIONS ===== */}
              {(hasData(material.application) ||
                hasData(material.applications)) && (
                <div className="md-panel">
                  <div className="md-section-head">
                    <h2>Applications</h2>
                  </div>

                  {material.application && <p>{material.application}</p>}

                  {hasData(material.applications) && (
                    <div className="md-feature-block">
                      <h3>Common Applications</h3>
                      <ul className="md-feature-list">
                        {material.applications.map(
                          (app: string, index: number) => (
                            <li key={index}>
                              <CheckCircle size={16} /> <span>{app}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}

                  {material.application && !hasData(material.applications) && (
                    <div className="md-feature-block">
                      <h3>Common Applications</h3>
                      <ul className="md-feature-list">
                        {material.application
                          .split(",")
                          .map((app: string, index: number) => (
                            <li key={index}>
                              <CheckCircle size={16} />{" "}
                              <span>{app.trim()}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}

                  {hasData(material.specializedIn) && (
                    <div className="md-specialized">
                      <h3>
                        <span className="md-specialized-icon">⚡</span>
                        Specialized In
                      </h3>
                      <div className="md-specialized-grid">
                        {material.specializedIn.map(
                          (item: string, index: number) => (
                            <div key={index} className="md-specialized-item">
                              <span className="md-specialized-bullet">✦</span>
                              <span>{item}</span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ===== AVAILABILITY ===== */}
              {hasData(material.stockAvailability) && (
                <div className="md-panel">
                  <div className="md-section-head">
                    <h2>Stock Availability</h2>
                  </div>

                  {/* ALL cards from ALL categories → one single grid */}
                  <div className="md-stock-grid">
                    {Object.entries(material.stockAvailability).map(
                      ([categoryKey, categoryData]: [string, any]) => {
                        if (
                          !Array.isArray(categoryData) ||
                          categoryData.length === 0
                        )
                          return null;

                        return categoryData.map(
                          (category: any, catIdx: number) => {
                            const isCategory =
                              typeof category === "object" && category.title;
                            const categoryTitle = isCategory
                              ? category.title
                              : `Category ${catIdx + 1}`;
                            const items = isCategory
                              ? category.items
                              : [category];
                            const image = isCategory ? category.image : null;

                            return (
                              <div
                                key={`${categoryKey}-${catIdx}`}
                                className="md-stock-category"
                              >
                                {image && (
                                  <div className="md-stock-cat-image">
                                    <img
                                      src={image}
                                      alt={categoryTitle}
                                      loading="lazy"
                                    />
                                  </div>
                                )}

                                <h4 className="md-stock-cat-title">
                                  {categoryTitle}
                                </h4>

                                <ul className="md-stock-cat-list">
                                  {items.map((item: any, idx: number) => {
                                    const name =
                                      typeof item === "string"
                                        ? item
                                        : item.name;
                                    const description =
                                      typeof item === "object"
                                        ? item.description
                                        : null;
                                    return (
                                      <li key={idx}>
                                        <span className="md-stock-bullet" />
                                        <div>
                                          <span className="md-stock-name">
                                            {name}
                                          </span>
                                          {description && (
                                            <span className="md-stock-desc">
                                              {description}
                                            </span>
                                          )}
                                        </div>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            );
                          },
                        );
                      },
                    )}
                  </div>

                  {hasData(material.thicknessAvailability) && (
                    <div className="md-table-block">
                      <h3>Thickness Availability</h3>
                      <div className="md-table-wrap">
                        <table className="md-table">
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
                    </div>
                  )}

                  {hasData(material.relatedSearches) && (
                    <div className="md-spec-block">
                      <h3>Related Searches</h3>
                      <div className="md-related-searches">
                        {material.relatedSearches.map(
                          (search: string, idx: number) => (
                            <span key={idx} className="md-related-tag">
                              {search}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* ===== SUPPLY NETWORK ===== */}
              <div className="md-panel">
                <div className="md-section-head">
                  <h2>Supply Network</h2>
                </div>

                {hasData(material.exportCountries) && (
                  <div className="md-supply-block">
                    <h3 className="md-supply-title">
                      <Globe size={18} />
                      Export Market
                    </h3>
                    <div className="md-country-grid">
                      {material.exportCountries.map(
                        (country: string, idx: number) => (
                          <div className="md-country-item" key={idx}>
                            <span
                              className={`fi fi-${getCountryFlag(
                                country,
                              )} md-country-flag`}
                            ></span>
                            <span className="md-country-name">{country}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {hasData(material.supplyCities) && (
                  <div className="md-supply-block">
                    <h3 className="md-supply-title">
                      <MapPin size={18} />
                      Cities We Supply In
                    </h3>
                    <div className="md-city-grid">
                      {material.supplyCities.map(
                        (city: string, idx: number) => (
                          <div key={idx} className="md-city-item">
                            <span className="md-city-dot"></span>
                            <span>{city}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact prompt */}
            <div className="md-contact-prompt">
              <div className="md-contact-left">
                <Phone size={20} />
                <div>
                  <strong>Need more information?</strong>
                  <p>Talk to our experts for custom requirements.</p>
                </div>
              </div>
              <Link to="/contact" className="md-contact-btn">
                Contact Our Experts
              </Link>
            </div>
          </main>
        </div>
      </div>

      {/* ===== RELATED PRODUCTS ===== */}
      {(() => {
        const allProducts = Object.values(productCategoryMap).flat();
        const sameCategory =
          categoryData?.filter((item) => item.slug !== materialSlug) || [];
        const sameMaterialGroup = allProducts.filter(
          (item) =>
            item.slug !== materialSlug &&
            item.materialGroup === material.materialGroup,
        );
        let relatedItems = [];
        if (sameCategory.length > 0) relatedItems = sameCategory;
        else if (sameMaterialGroup.length > 0) relatedItems = sameMaterialGroup;
        else
          relatedItems = allProducts.filter(
            (item) => item.slug !== materialSlug,
          );
        if (relatedItems.length === 0) relatedItems = allProducts.slice(0, 4);
        const displayProducts = relatedItems.slice(0, 4);
        return displayProducts.length > 0 ? (
          <div className="md-related-section">
            <div className="md-container">
              <h2>Related Products</h2>
              <div className="md-related-grid">
                {displayProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${slug}/${product.slug}`}
                    className="md-related-card"
                  >
                    <div className="md-related-img">
                      <img src={product.image} alt={product.title} />
                    </div>
                    <h4>{product.title}</h4>
                    <span className="md-related-link">View Details →</span>
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
