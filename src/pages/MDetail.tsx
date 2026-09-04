// src/pages/MDetail.tsx
import { useParams, useNavigate, Link } from "react-router-dom";
import materials, { categoryToMaterialMap } from "../data/materials";
import { productCategoryMap } from "../data/productIndex";
import { ChevronRight, ArrowRight } from "lucide-react";
import { useState } from "react";

const heroImage = "/img/home/banner-industrial.jpg";

// ===== MATERIAL TO FALLBACK IMAGE MAPPING =====
const materialFallbackImages: Record<string, string> = {
  "Stainless Steel": "/stock/stainless-steel.jpg",
  "Carbon Steel": "/stock/carbon-steel.jpg",
  "Alloy Steel": "/stock/alloy-steel.jpg",
  "Nickel Alloy": "/stock/nickel-alloy.jpg",
  Titanium: "/stock/titanium.jpg",
  "Duplex Steel": "/stock/duplex-steel.jpg",
  "Super Duplex": "/stock/super-duplex.jpg",
  "Copper Nickel": "/stock/copper-nickel.jpg",
  Hastelloy: "/stock/hastelloy.jpg",
  Inconel: "/stock/inconel.jpg",
  Incoloy: "/stock/incoloy.jpg",
  Monel: "/stock/monel.jpg",
  Aluminum: "/stock/aluminum.jpg",
  Brass: "/stock/brass.jpg",
  Bronze: "/stock/bronze.jpg",
};

// ===== PRODUCT TYPE TO IMAGE MAPPING =====
const productTypeImages: Record<string, string> = {
  // Pipes & Tubes
  pipes: "/stock/steel-pipes.jpg",
  pipe: "/stock/steel-pipes.jpg",
  tubes: "/stock/tubes.jpg",
  tube: "/stock/tubes.jpg",
  tubing: "/stock/tubes.jpg",

  // Bars & Rods
  "round-bars": "/stock/rod.jpg",
  "round-bar": "/stock/rod.jpg",
  bars: "/stock/rod.jpg",
  bar: "/stock/rod.jpg",
  rods: "/stock/rod.jpg",
  rod: "/stock/rod.jpg",

  // Sheets & Plates
  sheets: "/stock/sheets.jpg",
  sheet: "/stock/sheets.jpg",
  plates: "/stock/plates.jpg",
  plate: "/stock/plates.jpg",

  // Wires
  wires: "/stock/wires.jpg",
  wire: "/stock/wires.jpg",

  // Flanges
  flanges: "/stock/flanges.jpg",
  flange: "/stock/flanges.jpg",

  // Fasteners
  fasteners: "/stock/fastener.jpg",
  fastener: "/stock/fastener.jpg",
  bolts: "/stock/fastener.jpg",
  nuts: "/stock/fastener.jpg",

  // Fittings
  "pipe-fittings": "/stock/buttweld.jpg",
  buttweld: "/stock/buttweld.jpg",
  "forged-fittings": "/stock/forged-fittings.jpg",
  fittings: "/stock/buttweld.jpg",

  // Other
  coils: "/stock/coils.jpg",
  coil: "/stock/coils.jpg",
  strips: "/stock/strips.jpg",
  strip: "/stock/strips.jpg",
};

// ===== SMART IMAGE RESOLVER =====
const getProductImage = (
  productSlug: string,
  materialName?: string,
): string => {
  const slugLower = productSlug.toLowerCase();

  // ===== STEP 1: Check for exact product match using product's own image =====
  // This is handled in the ProductCard component via product.image

  // ===== STEP 2: Try to find a material-specific image =====
  // Check if the slug contains material names
  const materialKeywords = [
    { key: "stainless-steel", img: "/stock/stainless-steel-pipes.jpg" },
    { key: "carbon-steel", img: "/stock/carbon-steel-pipes.jpg" },
    { key: "alloy-steel", img: "/stock/alloy-steel-pipes.jpg" },
    { key: "nickel-alloy", img: "/stock/nickel-alloy-pipes.jpg" },
    { key: "nickel", img: "/stock/nickel-alloy-pipes.jpg" },
    { key: "titanium", img: "/stock/titanium-pipes.jpg" },
    { key: "duplex", img: "/stock/duplex-steel-pipes.jpg" },
    { key: "super-duplex", img: "/stock/super-duplex-pipes.jpg" },
    { key: "copper-nickel", img: "/stock/copper-nickel-pipes.jpg" },
    { key: "cu-ni", img: "/stock/copper-nickel-pipes.jpg" },
    { key: "hastelloy", img: "/stock/hastelloy-pipes.jpg" },
    { key: "inconel", img: "/stock/inconel-pipes.jpg" },
    { key: "incoloy", img: "/stock/incoloy-pipes.jpg" },
    { key: "monel", img: "/stock/monel-pipes.jpg" },
    { key: "aluminum", img: "/stock/aluminum-pipes.jpg" },
    { key: "brass", img: "/stock/brass-pipes.jpg" },
    { key: "bronze", img: "/stock/bronze-pipes.jpg" },
  ];

  for (const material of materialKeywords) {
    if (slugLower.includes(material.key)) {
      // Check if it's a pipe/tube product
      if (slugLower.includes("pipe") || slugLower.includes("tube")) {
        return material.img;
      }
      // If not a pipe, try to use material-specific image for other product types
      const materialNameKey = material.key.replace(/-/g, " ");
      const fallback =
        materialFallbackImages[materialNameKey] || `/stock/${material.key}.jpg`;
      return fallback;
    }
  }

  // ===== STEP 3: Detect product type from slug =====
  const slugParts = slugLower.split("-");

  // Check for product type keywords in order of specificity
  const productTypeKeys = Object.keys(productTypeImages);

  // First check multi-word product types
  for (const key of productTypeKeys) {
    if (key.includes("-")) {
      if (slugLower.includes(key)) {
        return productTypeImages[key];
      }
    }
  }

  // Then check individual parts
  for (const part of slugParts) {
    // Check exact match
    if (productTypeImages[part]) {
      return productTypeImages[part];
    }
    // Check singular form (remove trailing 's')
    const singular = part.replace(/s$/, "");
    if (productTypeImages[singular]) {
      return productTypeImages[singular];
    }
  }

  // ===== STEP 4: Try to construct a generic image path =====
  // Try to find the first meaningful word that could be a product type
  const productTypes = [
    "pipe",
    "tube",
    "bar",
    "rod",
    "sheet",
    "plate",
    "wire",
    "flange",
    "fitting",
    "fastener",
    "coil",
  ];
  for (const type of productTypes) {
    if (slugLower.includes(type)) {
      // Try material-specific + type combination
      for (const material of materialKeywords) {
        if (slugLower.includes(material.key)) {
          return `/stock/${material.key}-${type}s.jpg`;
        }
      }
      // Fallback to generic type image
      return productTypeImages[`${type}s`] || `/stock/${type}s.jpg`;
    }
  }

  // ===== STEP 5: Final fallback =====
  // Try to construct from slug
  const firstPart = slugParts[0];
  const lastPart = slugParts[slugParts.length - 1];

  // If last part is a product type, use it
  if (
    productTypeImages[lastPart] ||
    productTypeImages[lastPart.replace(/s$/, "")]
  ) {
    return (
      productTypeImages[lastPart] ||
      productTypeImages[lastPart.replace(/s$/, "")] ||
      "/stock/default-product.jpg"
    );
  }

  // If first part is a material, use it
  for (const material of materialKeywords) {
    if (firstPart.includes(material.key)) {
      return `/stock/${material.key}.jpg`;
    }
  }

  // Ultimate fallback - return a default image
  return "/stock/default-product.jpg";
};

// ===== GET ICON FOR PRODUCT TYPE =====
const getProductTypeIcon = (productSlug: string): string => {
  const slugLower = productSlug.toLowerCase();

  if (slugLower.includes("pipe") || slugLower.includes("tube")) return "🔧";
  if (slugLower.includes("bar") || slugLower.includes("rod")) return "📏";
  if (slugLower.includes("sheet") || slugLower.includes("plate")) return "📋";
  if (slugLower.includes("wire")) return "⚡";
  if (slugLower.includes("flange")) return "⭕";
  if (
    slugLower.includes("fastener") ||
    slugLower.includes("bolt") ||
    slugLower.includes("nut")
  )
    return "🔩";
  if (slugLower.includes("fitting")) return "🔗";
  if (slugLower.includes("coil")) return "🌀";

  return "📦";
};

// ===== GET PRODUCT TYPE NAME =====
const getProductTypeName = (productSlug: string): string => {
  const slugLower = productSlug.toLowerCase();

  if (slugLower.includes("pipe")) return "Pipes";
  if (slugLower.includes("tube")) return "Tubes";
  if (slugLower.includes("round-bar") || slugLower.includes("rod"))
    return "Round Bars";
  if (slugLower.includes("sheet")) return "Sheets";
  if (slugLower.includes("plate")) return "Plates";
  if (slugLower.includes("wire")) return "Wires";
  if (slugLower.includes("flange")) return "Flanges";
  if (slugLower.includes("fastener") || slugLower.includes("bolt"))
    return "Fasteners";
  if (slugLower.includes("fitting")) return "Fittings";
  if (slugLower.includes("coil")) return "Coils";

  return "Products";
};

// ===== MAPPING: Material Product Slug to Category Slug =====
const getCategoryForMaterialProduct = (materialProductSlug: string): string => {
  const productTypeMap: Record<string, string> = {
    pipes: "pipes-tubes",
    tubes: "pipes-tubes",
    flanges: "flanges",
    fasteners: "fasteners",
    "pipe-fittings": "buttweld-fittings",
    "forged-fittings": "forged-fittings",
    "round-bars": "round-bars",
    "round-bar": "round-bars",
    bars: "round-bars",
    bar: "round-bars",
    rods: "round-bars",
    rod: "round-bars",
    sheets: "sheets-plates",
    sheet: "sheets-plates",
    plates: "sheets-plates",
    plate: "sheets-plates",
    wires: "wires",
    wire: "wires",
    coils: "coils",
    coil: "coils",
  };

  // Check if the slug contains any of the product types
  for (const [key, category] of Object.entries(productTypeMap)) {
    if (materialProductSlug.includes(key)) {
      return category;
    }
  }

  // Try to find in categoryToMaterialMap (reverse lookup) - fallback
  for (const [categoryKey, categoryProducts] of Object.entries(
    productCategoryMap,
  )) {
    const productExists = categoryProducts.some(
      (p) =>
        p.slug === materialProductSlug ||
        p.slug.includes(materialProductSlug) ||
        materialProductSlug.includes(p.slug),
    );
    if (productExists) {
      return categoryKey;
    }
  }

  console.warn(
    `No category mapping found for product slug: ${materialProductSlug}`,
  );
  return "pipes-tubes";
};

// ===== PRODUCT CARD COMPONENT =====
const ProductCard = ({ product, materialName, onClick }: any) => {
  const [imgError, setImgError] = useState(false);

  // Get product image - prioritize product.image, then use resolver
  const productImage =
    product.image || getProductImage(product.slug, materialName);

  // Get product info for fallback
  const icon = getProductTypeIcon(product.slug);
  const productType = getProductTypeName(product.slug);

  // Check if this is a material-specific product
  const isSpecialMaterial =
    product.slug.includes("nickel") ||
    product.slug.includes("alloy") ||
    product.slug.includes("monel") ||
    product.slug.includes("inconel") ||
    product.slug.includes("incoloy") ||
    product.slug.includes("hastelloy") ||
    product.slug.includes("titanium") ||
    product.slug.includes("duplex") ||
    product.slug.includes("copper") ||
    product.slug.includes("stainless") ||
    product.slug.includes("carbon");

  // Extract short name for fallback display
  const shortName =
    product.title.split("–")[0]?.trim() ||
    product.title.split("-")[0]?.trim() ||
    product.title;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-0.5 hover:border-primary-red/30"
    >
      <div className="h-36 overflow-hidden bg-gray-100 relative">
        {!imgError ? (
          <img
            src={productImage}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center ${
              isSpecialMaterial
                ? "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"
                : "bg-gradient-to-br from-gray-100 to-gray-200"
            }`}
          >
            <div className="text-center p-4">
              <span className="text-4xl block mb-1">{icon}</span>
              <span className="text-gray-700 text-xs font-semibold block line-clamp-2 px-2">
                {shortName}
              </span>
              <span className="text-gray-500 text-[10px] block mt-0.5">
                {productType} • {materialName}
              </span>
            </div>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className="text-[10px] font-medium text-white bg-primary-red/80 px-2 py-0.5 rounded-full backdrop-blur-sm">
            {materialName}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-red mb-1.5 line-clamp-1">
          {product.title}
        </h3>

        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
          {product.shortDescription ||
            product.description?.slice(0, 100) ||
            `${product.title} - Premium quality material`}
        </p>

        {product.properties && product.properties.length > 0 && (
          <div className="mb-2">
            <div className="flex flex-wrap gap-1">
              {product.properties
                .slice(0, 2)
                .map((prop: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full"
                  >
                    {prop}
                  </span>
                ))}
              {product.properties.length > 2 && (
                <span className="text-[10px] text-gray-400">
                  +{product.properties.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <button className="flex items-center gap-1 text-xs font-semibold text-primary-red group-hover:gap-2 transition-all">
            View Details
            <ArrowRight size={14} />
          </button>
          <span className="text-[10px] text-gray-400">Click for more</span>
        </div>
      </div>
    </div>
  );
};

// ===== MAIN COMPONENT =====
const MDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find the material from materials data
  const material = materials.find((m) => m.slug === slug);
  const products = material?.items || [];

  const handleProductClick = (productSlug: string) => {
    const categorySlug = getCategoryForMaterialProduct(productSlug);
    navigate(`/products/${categorySlug}/${productSlug}`);
  };

  if (!material) {
    return (
      <div
        className="container not-found"
        style={{ padding: "4rem 0", textAlign: "center" }}
      >
        <h1>Material Not Found</h1>
        <p>We couldn't find the material you're looking for.</p>
        <Link to="/materials" className="btn btn-primary">
          Back to Materials
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HERO BANNER */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Industrial materials"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/40" />
        </div>

        <div className="relative container mx-auto px-4 max-w-7xl py-24 md:py-32 lg:py-40">
          <div className="hero-breadcrumb">
            <Link to="/" className="breadcrumb-link">
              Home
            </Link>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <Link to="/materials" className="breadcrumb-link">
              Materials
            </Link>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">{material.name}</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-[3px] bg-primary-red" />
            <span className="text-primary-red font-semibold tracking-[0.3em] uppercase text-sm">
              Material
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            {material.name}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            {material.description}
          </p>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary-red" />
              <span className="text-white font-medium text-lg">
                {products.length} Products Available
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary-red" />
              <span className="text-white font-medium text-lg">
                Premium Quality
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="mb-8 mt-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Our <span className="text-primary-red">{material.name}</span>{" "}
              Range
            </h2>
            <span className="px-4 py-2 bg-gradient-to-r from-primary-red to-blue-600 text-white rounded-full text-sm font-semibold">
              {products.length} Products
            </span>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <p className="text-gray-500">
                No products found for {material.name}.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Please check back later or contact us for more information.
              </p>
              <Link
                to="/contact"
                className="inline-block mt-4 px-6 py-2 bg-primary-red text-white rounded-lg hover:bg-red-700 transition"
              >
                Contact Us
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  materialName={material.name}
                  onClick={() => handleProductClick(product.slug)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="text-center">
          <Link
            to="/materials"
            className="inline-flex items-center mb-5 gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            ← Back to All Materials
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MDetail;
