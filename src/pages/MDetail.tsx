// src/pages/MDetail.tsx
import { useParams, useNavigate, Link } from "react-router-dom";
import materials from "../data/materials";
import { productCategoryMap } from "../data/productIndex";
import { ChevronRight, ArrowRight } from "lucide-react";
import { useState } from "react";

const heroImage = "/img/home/banner-industrial.jpg";

// ✅ Updated Smart Image Resolver
const getProductImage = (productSlug: string): string => {
  const typeMap: Record<string, string> = {
    pipes: "/productImage/steel-pipes.jpg",
    pipe: "/productImage/steel-pipes.jpg",
    tubes: "/productImage/tubes.jpg",
    tube: "/productImage/tubes.jpg",
    "round-bars": "/productImage/rod.jpg",
    "round-bar": "/productImage/rod.jpg",
    bars: "/productImage/rod.jpg",
    bar: "/productImage/rod.jpg",
    sheets: "/productImage/sheets.jpg",
    sheet: "/productImage/sheets.jpg",
    plates: "/productImage/plates.jpg",
    plate: "/productImage/plates.jpg",
    wires: "/productImage/wires.jpg",
    wire: "/productImage/wires.jpg",
    coils: "/productImage/coil.jpg",
    coil: "/productImage/coil.jpg",
    flanges: "/productImage/Flanges.jpg",
    fastener: "/productImage/fastener.jpg",
    rings: "/productImage/rings.jpg",
    valves: "/productImage/valves.jpg",
    buttweld: "/productImage/buttweld.jpg",
    "forged-fittings": "/productImage/forged-fittings.jpg",
    "anchor-fastener": "/productImage/anchor-fastener.jpg",
    "angle-channels": "/productImage/angle-channels.jpg",
    circles: "/productImage/circles.jpg",
    strips: "/productImage/strips.jpg",
    "wire-mesh": "/productImage/wire-mesh.jpg",
  };

  if (typeMap[productSlug]) {
    return typeMap[productSlug];
  }

  const slugParts = productSlug.split("-");

  for (const part of slugParts) {
    if (typeMap[part]) {
      return typeMap[part];
    }
  }

  for (const part of slugParts) {
    const singular = part.replace(/s$/, "");
    if (typeMap[singular]) {
      return typeMap[singular];
    }
  }

  return `/productImage/${productSlug}.jpg`;
};

const ProductCard = ({ product, materialName, onClick }: any) => {
  const [imgError, setImgError] = useState(false);
  const productImage = getProductImage(product.slug);

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
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-gray-500 text-sm font-semibold text-center px-3">
              {product.title}
            </span>
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

const MDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const material = materials.find((m) => m.slug === slug);
  const products = material?.items || [];

  const handleProductClick = (productSlug: string) => {
    let foundCategory = null;

    for (const [categoryKey, products] of Object.entries(productCategoryMap)) {
      const product = products.find((p) => p.slug === productSlug);
      if (product) {
        foundCategory = categoryKey;
        break;
      }
    }

    if (foundCategory) {
      navigate(`/products/${foundCategory}/${productSlug}`);
    } else {
      navigate(`/products/${slug}/${productSlug}`);
    }
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
      {/* ===== Hero Banner with Breadcrumb INSIDE ===== */}
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
          {/* ✅ Breadcrumb inside hero */}
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

      {/* ===== Content Section ===== */}
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
