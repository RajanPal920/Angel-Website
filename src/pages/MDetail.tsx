// src/pages/MDetail.tsx
import { useParams, useNavigate, Link } from "react-router-dom";
import materials, { categoryToMaterialMap } from "../data/materials";
import { productCategoryMap } from "../data/productIndex";
import { productSlugRedirectMap } from "../data/productSlugMap";
import { ChevronRight, ArrowRight } from "lucide-react";
import { useState, useMemo } from "react";

const heroImage = "/img/home/material.jpg";

// ===== MATERIAL TO FALLBACK IMAGE MAPPING =====
const materialFallbackImages: Record<string, string> = {
  "Stainless Steel": "/stock/stainless-steel-304-304l-pipes.jpg",
  "Carbon Steel": "/productImage/steel-pipes.jpg",
  "Alloy Steel": "/stock/alloy-20-seamless-pipes.jpg",
  "Nickel Alloy": "/stock/nickel-alloy-pipes.jpg",
  Titanium: "/stock/titanium-pipes.jpg",
  "Duplex Steel": "/stock/duplex-steel-seamless-pipes.jpg",
  "Super Duplex": "/stock/duplex-super-duplex-seamless-pipes.jpg",
  "Copper Nickel": "/stock/copper-nickel-seamless-pipes.jpg",
  Hastelloy: "/stock/hastelloy-pipes.jpg",
  Inconel: "/stock/inconel-pipes.jpg",
  Incoloy: "/stock/incoloy-pipes.jpg",
  Monel: "/stock/monel-pipes.jpg",
  Aluminum: "/stock/aluminum-perforated-sheets.jpg",
  Brass: "/stock/brass-bars.jpg",
  Bronze: "/stock/copper-nickel-seamless-pipes.jpg",
};

// ===== PRODUCT TYPE TO IMAGE MAPPING =====
const productTypeImages: Record<string, string> = {
  pipes: "/productImage/steel-pipes.jpg",
  pipe: "/productImage/steel-pipes.jpg",
  tubes: "/productImage/tubes.jpg",
  tube: "/productImage/tubes.jpg",
  tubing: "/productImage/tubes.jpg",
  "round-bars": "/productImage/rod.jpg",
  "round-bar": "/productImage/rod.jpg",
  bars: "/productImage/rod.jpg",
  bar: "/productImage/rod.jpg",
  rods: "/productImage/rod.jpg",
  rod: "/productImage/rod.jpg",
  sheets: "/productImage/sheets.jpg",
  sheet: "/productImage/sheets.jpg",
  plates: "/productImage/plates.jpg",
  plate: "/productImage/plates.jpg",
  wires: "/productImage/wires.jpg",
  wire: "/productImage/wires.jpg",
  flanges: "/productImage/Flanges.jpg",
  flange: "/productImage/Flanges.jpg",
  fasteners: "/productImage/fastener.jpg",
  fastener: "/productImage/fastener.jpg",
  bolts: "/productImage/fastener.jpg",
  nuts: "/productImage/fastener.jpg",
  "pipe-fittings": "/productImage/buttweld.jpg",
  buttweld: "/productImage/buttweld.jpg",
  "forged-fittings": "/productImage/forged-fittings.jpg",
  fittings: "/productImage/buttweld.jpg",
  coils: "/productImage/coil.jpg",
  coil: "/productImage/coil.jpg",
  circles: "/productImage/circles.jpg",
  rings: "/productImage/rings.jpg",
  valves: "/productImage/valves.jpg",
};

// ===== SMART IMAGE RESOLVER =====
const getProductImage = (
  productSlug: string,
  materialName?: string,
): string => {
  const slugLower = productSlug.toLowerCase();

  const materialKeywords = [
    { key: "stainless-steel", img: "/stock/stainless-steel-304-304l-pipes.jpg" },
    { key: "carbon-steel", img: "/productImage/steel-pipes.jpg" },
    { key: "alloy-steel", img: "/stock/alloy-20-seamless-pipes.jpg" },
    { key: "nickel-alloy", img: "/stock/nickel-alloy-pipes.jpg" },
    { key: "nickel", img: "/stock/nickel-alloy-pipes.jpg" },
    { key: "titanium", img: "/stock/titanium-pipes.jpg" },
    { key: "duplex", img: "/stock/duplex-steel-seamless-pipes.jpg" },
    { key: "super-duplex", img: "/stock/duplex-super-duplex-seamless-pipes.jpg" },
    { key: "copper-nickel", img: "/stock/copper-nickel-seamless-pipes.jpg" },
    { key: "cu-ni", img: "/stock/copper-nickel-seamless-pipes.jpg" },
    { key: "hastelloy", img: "/stock/hastelloy-pipes.jpg" },
    { key: "inconel", img: "/stock/inconel-pipes.jpg" },
    { key: "incoloy", img: "/stock/incoloy-pipes.jpg" },
    { key: "monel", img: "/stock/monel-pipes.jpg" },
    { key: "aluminum", img: "/stock/aluminum-perforated-sheets.jpg" },
    { key: "brass", img: "/stock/brass-bars.jpg" },
    { key: "bronze", img: "/stock/copper-nickel-seamless-pipes.jpg" },
  ];

  for (const material of materialKeywords) {
    if (slugLower.includes(material.key)) {
      if (slugLower.includes("pipe") || slugLower.includes("tube")) {
        return material.img;
      }
      const materialNameKey = material.key.replace(/-/g, " ");
      const fallback =
        materialFallbackImages[materialNameKey] || `/stock/${material.key}.jpg`;
      return fallback;
    }
  }

  const slugParts = slugLower.split("-");
  const productTypeKeys = Object.keys(productTypeImages);

  for (const key of productTypeKeys) {
    if (key.includes("-")) {
      if (slugLower.includes(key)) {
        return productTypeImages[key];
      }
    }
  }

  for (const part of slugParts) {
    if (productTypeImages[part]) return productTypeImages[part];
    const singular = part.replace(/s$/, "");
    if (productTypeImages[singular]) return productTypeImages[singular];
  }

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
      for (const material of materialKeywords) {
        if (slugLower.includes(material.key)) {
          return `/stock/${material.key}-${type}s.jpg`;
        }
      }
      return productTypeImages[`${type}s`] || `/stock/${type}s.jpg`;
    }
  }

  const firstPart = slugParts[0];
  const lastPart = slugParts[slugParts.length - 1];

  if (
    productTypeImages[lastPart] ||
    productTypeImages[lastPart.replace(/s$/, "")]
  ) {
    return (
      productTypeImages[lastPart] ||
      productTypeImages[lastPart.replace(/s$/, "")] ||
      "/productImage/steel-pipes.jpg"
    );
  }

  for (const material of materialKeywords) {
    if (firstPart.includes(material.key)) {
      return material.img || `/stock/${material.key}-pipes.jpg`;
    }
  }

  return "/productImage/steel-pipes.jpg";
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

  for (const [key, category] of Object.entries(productTypeMap)) {
    if (materialProductSlug.includes(key)) {
      return category;
    }
  }

  for (const [categoryKey, categoryProducts] of Object.entries(
    productCategoryMap,
  )) {
    const productExists = categoryProducts.some(
      (p: any) =>
        p.slug === materialProductSlug ||
        p.oldSlug === materialProductSlug ||
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

  const productImage =
    product.image || getProductImage(product.slug, materialName);

  const productType = getProductTypeName(product.slug);

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

  const shortName =
    product.title.split("–")[0]?.trim() ||
    product.title.split("-")[0]?.trim() ||
    product.title;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-0.5 hover:border-primary-red/30"
    >
      <div className="h-36 overflow-hidden bg-white relative">
        {!imgError ? (
          <img
            src={productImage}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white border-b border-gray-100">
            <div className="text-center p-4">
              <span className="text-gray-700 text-sm font-semibold block line-clamp-2 px-2">
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

  const material = materials.find((m) => m.slug === slug);

  // ===== MERGE MATERIALS ITEMS + PRODUCT CATEGORY MAP =====
  const products = useMemo(() => {
    if (!material) return [];

    const materialNameLower = material.name.toLowerCase();
    const materialSlugLower = material.slug.toLowerCase();

    // ===== DEFINE EXCLUSION KEYWORDS FOR EACH MATERIAL =====
    const allMaterialKeywords: Record<string, string[]> = {
      "stainless-steel": [
        "stainless",
        "ss-",
        "ss ",
        "304",
        "316",
        "310",
        "317",
        "321",
        "347",
        "904",
        "904l",
        "410",
        "420",
        "422",
        "15-5",
        "17-4",
        "13 cr",
        "l80",
      ],
      "carbon-steel": ["carbon", "cs-", "a105", "a350", "a694"],
      "alloy-steel": [
        "alloy",
        "f1",
        "f5",
        "f9",
        "f11",
        "f12",
        "f22",
        "f91",
        "f92",
      ],
      "nickel-alloy": [
        "nickel",
        "nickel-alloy",
        "nickel alloy",
        "200",
        "201",
        "ni-200",
        "ni-201",
      ],
      duplex: ["duplex", "s31803", "s32205"],
      "super-duplex": ["super-duplex", "s32750", "s32760", "s32950"],
      hastelloy: ["hastelloy", "c22", "c276", "c2000", "c59", "c4"],
      inconel: ["inconel", "600", "601", "625", "718", "x750"],
      incoloy: ["incoloy", "800", "800h", "800ht", "825", "925"],
      monel: ["monel", "400", "k500"],
      "copper-nickel": [
        "copper-nickel",
        "cu-ni",
        "cupro",
        "90/10",
        "70/30",
        "c70600",
        "c71500",
      ],
      titanium: ["titanium", "grade-2", "grade-5", "ti-"],
      nimonic: ["nimonic", "80a", "90", "105", "115"],
      brass: ["brass", "copper-zinc", "cuzn"],
      bronze: ["bronze", "copper-tin", "cusn"],
      aluminum: ["aluminum", "aluminium", "al-"],
    };

    // ===== ALL OTHER MATERIALS (TO EXCLUDE) =====
    const allOtherMaterialKeywords = [
      // other materials
      "stainless",
      "ss-",
      "ss ",
      "304",
      "316",
      "310",
      "317",
      "321",
      "347",
      "904",
      "904l",
      "410",
      "420",
      "422",
      "15-5",
      "17-4",
      "13 cr",
      "l80",
      "carbon",
      "cs-",
      "a105",
      "a350",
      "a694",
      "alloy",
      "f1",
      "f5",
      "f9",
      "f11",
      "f12",
      "f22",
      "f91",
      "f92",
      "nickel",
      "monel",
      "inconel",
      "incoloy",
      "hastelloy",
      "200",
      "201",
      "400",
      "k500",
      "600",
      "601",
      "625",
      "718",
      "800",
      "825",
      "925",
      "c22",
      "c276",
      "c2000",
      "duplex",
      "s31803",
      "s32205",
      "super-duplex",
      "s32750",
      "s32760",
      "s32950",
      "copper-nickel",
      "cu-ni",
      "cupro",
      "90/10",
      "70/30",
      "c70600",
      "c71500",
      "titanium",
      "grade-2",
      "grade-5",
      "ti-",
      "nimonic",
      "80a",
      "90",
      "105",
      "115",
      "brass",
      "copper-zinc",
      "cuzn",
      "bronze",
      "copper-tin",
      "cusn",
      "aluminum",
      "aluminium",
      "al-",
      "copper",
      "cu-",
      "cu ",
    ];

    // Get current material's own keywords
    const currentMaterialKey = Object.keys(allMaterialKeywords).find(
      (key) =>
        materialSlugLower.includes(key) || materialNameLower.includes(key),
    );

    const currentMaterialOwnKeywords = currentMaterialKey
      ? allMaterialKeywords[currentMaterialKey] || []
      : [];

    // Exclusion keywords = all other material keywords MINUS current material's own keywords
    const exclusionKeywords = allOtherMaterialKeywords.filter(
      (keyword) =>
        !currentMaterialOwnKeywords.includes(keyword) &&
        !materialSlugLower.includes(keyword) &&
        !materialNameLower.includes(keyword),
    );

    // 1) Start with material.items
    const baseItems: any[] = [...(material.items || [])];

    // 2) Add products from productCategoryMap that belong to this material
    const extraItems: any[] = [];

    for (const [categorySlug, categoryProducts] of Object.entries(
      productCategoryMap,
    )) {
      for (const product of categoryProducts as any[]) {
        const productSlugLower = product.slug?.toLowerCase?.() || "";
        const productTitleLower = product.title?.toLowerCase?.() || "";
        const combinedText = `${productSlugLower} ${productTitleLower}`;

        // ❌ Check if product belongs to ANOTHER material
        const belongsToOtherMaterial = exclusionKeywords.some((keyword) => {
          return (
            productSlugLower.includes(keyword) ||
            productTitleLower.includes(keyword)
          );
        });

        // Skip if belongs to other material
        if (belongsToOtherMaterial) {
          continue;
        }

        // ✅ Check if product belongs to THIS material (strict match)
        const belongsToThisMaterial =
          // Match material slug in product slug
          productSlugLower.includes(materialSlugLower) ||
          // Match material name in product title
          productTitleLower.includes(materialNameLower) ||
          // Match material name with hyphens in product slug
          productSlugLower.includes(materialNameLower.replace(/\s+/g, "-")) ||
          // Match material name with spaces in product title
          productTitleLower.includes(materialNameLower.replace(/-/g, " ")) ||
          // Special case for stainless steel
          (materialSlugLower.includes("stainless-steel") &&
            (productSlugLower.includes("stainless") ||
              productSlugLower.includes("ss-") ||
              productSlugLower.includes("ss ") ||
              productSlugLower.includes("304") ||
              productSlugLower.includes("316") ||
              productSlugLower.includes("310") ||
              productSlugLower.includes("317") ||
              productSlugLower.includes("321") ||
              productSlugLower.includes("347") ||
              productSlugLower.includes("904") ||
              productSlugLower.includes("410") ||
              productSlugLower.includes("420") ||
              productSlugLower.includes("422") ||
              productSlugLower.includes("15-5") ||
              productSlugLower.includes("17-4") ||
              productSlugLower.includes("13 cr") ||
              productSlugLower.includes("l80"))) ||
          // Special case for carbon steel
          (materialSlugLower.includes("carbon-steel") &&
            (productSlugLower.includes("carbon") ||
              productSlugLower.includes("cs-") ||
              productSlugLower.includes("a105") ||
              productSlugLower.includes("a350") ||
              productSlugLower.includes("a694"))) ||
          // Special case for alloy steel
          (materialSlugLower.includes("alloy-steel") &&
            (productSlugLower.includes("alloy") ||
              productSlugLower.includes("f1") ||
              productSlugLower.includes("f5") ||
              productSlugLower.includes("f9") ||
              productSlugLower.includes("f11") ||
              productSlugLower.includes("f12") ||
              productSlugLower.includes("f22") ||
              productSlugLower.includes("f91") ||
              productSlugLower.includes("f92"))) ||
          // Special case for nickel alloy
          (materialSlugLower.includes("nickel-alloy") &&
            (productSlugLower.includes("nickel") ||
              productSlugLower.includes("monel") ||
              productSlugLower.includes("inconel") ||
              productSlugLower.includes("incoloy") ||
              productSlugLower.includes("hastelloy") ||
              productSlugLower.includes("200") ||
              productSlugLower.includes("201") ||
              productSlugLower.includes("400") ||
              productSlugLower.includes("k500") ||
              productSlugLower.includes("600") ||
              productSlugLower.includes("601") ||
              productSlugLower.includes("625") ||
              productSlugLower.includes("718") ||
              productSlugLower.includes("800") ||
              productSlugLower.includes("825") ||
              productSlugLower.includes("925") ||
              productSlugLower.includes("c22") ||
              productSlugLower.includes("c276") ||
              productSlugLower.includes("c2000"))) ||
          // Special case for duplex
          (materialSlugLower.includes("duplex") &&
            !materialSlugLower.includes("super-duplex") &&
            (productSlugLower.includes("duplex") ||
              productSlugLower.includes("s31803") ||
              productSlugLower.includes("s32205"))) ||
          // Special case for super duplex
          (materialSlugLower.includes("super-duplex") &&
            (productSlugLower.includes("super-duplex") ||
              productSlugLower.includes("s32750") ||
              productSlugLower.includes("s32760") ||
              productSlugLower.includes("s32950"))) ||
          // Special case for hastelloy
          (materialSlugLower.includes("hastelloy") &&
            (productSlugLower.includes("hastelloy") ||
              productSlugLower.includes("c22") ||
              productSlugLower.includes("c276") ||
              productSlugLower.includes("c2000"))) ||
          // Special case for inconel
          (materialSlugLower.includes("inconel") &&
            (productSlugLower.includes("inconel") ||
              productSlugLower.includes("600") ||
              productSlugLower.includes("601") ||
              productSlugLower.includes("625") ||
              productSlugLower.includes("718"))) ||
          // Special case for incoloy
          (materialSlugLower.includes("incoloy") &&
            (productSlugLower.includes("incoloy") ||
              productSlugLower.includes("800") ||
              productSlugLower.includes("825") ||
              productSlugLower.includes("925"))) ||
          // Special case for monel
          (materialSlugLower.includes("monel") &&
            (productSlugLower.includes("monel") ||
              productSlugLower.includes("400") ||
              productSlugLower.includes("k500"))) ||
          // Special case for copper-nickel
          (materialSlugLower.includes("copper-nickel") &&
            (productSlugLower.includes("copper-nickel") ||
              productSlugLower.includes("cu-ni") ||
              productSlugLower.includes("cupro") ||
              productSlugLower.includes("90/10") ||
              productSlugLower.includes("70/30") ||
              productSlugLower.includes("c70600") ||
              productSlugLower.includes("c71500")));

        if (belongsToThisMaterial) {
          extraItems.push({
            ...product,
            __categorySlug: categorySlug,
          });
        }
      }
    }

    // 3) Merge and deduplicate by slug
    const merged = [...baseItems, ...extraItems];

    const seen = new Set<string>();
    const unique = merged.filter((item: any) => {
      const key = item.slug || item.title;
      if (!key) return false;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return unique;
  }, [material]);

  const handleProductClick = (product: any) => {
    const rawSlug = (product.slug || product.title || "").trim().toLowerCase();
    const mapped =
      productSlugRedirectMap[rawSlug] ||
      productSlugRedirectMap[product.slug?.toLowerCase?.()];
    const productSlug = mapped
      ? mapped.canonicalSlug
      : product.slug || product.title;
    const categorySlug =
      product.__categorySlug ||
      (mapped ? mapped.categorySlug : getCategoryForMaterialProduct(productSlug));
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
      <div className="relative min-h-[280px] sm:min-h-[340px] md:h-[380px] lg:h-[630px] flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={`${material.name} - Angel Metal India`}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 max-w-7xl py-10 sm:py-12 w-full">
          <div className="hero-text-box hero-animate-heading max-w-2xl">
            <div className="hero-breadcrumb mb-3 flex items-center gap-2 flex-wrap">
              <Link to="/" className="breadcrumb-link text-white/85 hover:text-primary-red text-xs sm:text-sm font-semibold">
                Home
              </Link>
              <ChevronRight size={14} className="breadcrumb-separator text-white/60" />
              <Link to="/materials" className="breadcrumb-link text-white/85 hover:text-primary-red text-xs sm:text-sm font-semibold">
                Materials
              </Link>
              <ChevronRight size={14} className="breadcrumb-separator text-white/60" />
              <span className="breadcrumb-current text-white font-bold text-xs sm:text-sm">{material.name}</span>
            </div>

            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <span className="w-10 h-[3px] bg-primary-red" />
              <span className="text-primary-red font-bold tracking-[0.3em] uppercase text-xs sm:text-sm">
                Material
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 sm:mb-3">
              {material.name}
            </h1>
            <p className="text-sm sm:text-base capitalize text-slate-100 font-medium max-w-xl mb-4 sm:mb-5 leading-relaxed">
              {material.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-7">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-red" />
                <span className="text-white font-bold text-xs sm:text-sm">
                  {products.length} Products Available
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-red" />
                <span className="text-white font-bold text-xs sm:text-sm">
                  Premium Quality
                </span>
              </div>
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
              {products.map((product: any, index: number) => (
                <ProductCard
                  key={product.slug || index}
                  product={product}
                  materialName={material.name}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="text-center">
          <Link
            to="/materials"
            className="inline-flex items-center mb-5 gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-[#D71920] hover:text-white hover:border-[#D71920] transition-all"
          >
            ← Back to All Materials
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MDetail;
