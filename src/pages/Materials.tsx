// Materials.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import materials, { materialToCategoryMap } from "../data/materials";
import {
  Search,
  ChevronRight,
  ShieldCheck,
  Layers,
  FlaskConical,
  Waves,
  CircleDot,
  Settings,
  Sparkles,
  Box,
  Zap,
  ArrowRight,
  FileText,
  Building2,
  Factory,
  Cog,
  Wrench,
  LayoutGrid,
  List,
} from "lucide-react";
import { productCategoryMap } from "../data/productIndex";

const iconMap: Record<string, any> = {
  ShieldCheck,
  Layers,
  FlaskConical,
  Waves,
  CircleDot,
  Settings,
  Sparkles,
  Box,
  Zap,
  Building2,
  Factory,
  Cog,
  Wrench,
};

const heroImage = "/img/home/banner-industrial.jpg";

const getProductCount = (materialSlug: string): number => {
  const categoryKeys = materialToCategoryMap[materialSlug] || [];
  let total = 0;
  categoryKeys.forEach((categoryKey) => {
    const products = productCategoryMap[categoryKey];
    if (products) total += products.length;
  });
  return total;
};

const getProductsForMaterial = (materialSlug: string): any[] => {
  const categoryKeys = materialToCategoryMap[materialSlug] || [];
  const allProducts: any[] = [];
  categoryKeys.forEach((categoryKey) => {
    const products = productCategoryMap[categoryKey];
    if (products) allProducts.push(...products);
  });
  return allProducts;
};

// ✅ SMART IMAGE RESOLVER - Maps material slug to actual image
const getMaterialImage = (materialSlug: string): string => {
  // Map material slugs to actual image files in public/productImage
  const materialImageMap: Record<string, string> = {
    "stainless-steel": "/productImage/steel-pipes.jpg",
    "duplex-steel": "/productImage/tubes.jpg",
    "nickel-alloy": "/productImage/coil.jpg",
    "copper-nickel": "/productImage/tubes.jpg",
    hastelloy: "/productImage/forged-fittings.jpg",
    incoloy: "/productImage/buttweld.jpg",
    inconel: "/productImage/rod.jpg",
    monel: "/productImage/rings.jpg",
    titanium: "/productImage/wires.jpg",
    nimonic: "/productImage/sheets.jpg",
    "special-materials": "/productImage/anchor-fastener.jpg",
    "other-materials": "/productImage/Flanges.jpg",
  };

  // Check if we have a direct match
  if (materialImageMap[materialSlug]) {
    return materialImageMap[materialSlug];
  }

  // Fallback: try to find a matching image based on material name
  const material = materials.find((m) => m.slug === materialSlug);
  if (material) {
    const nameParts = material.name.toLowerCase().split(" ");
    // Try to find a matching image
    for (const part of nameParts) {
      const possibleImage = `/productImage/${part}.jpg`;
      // We can't check if file exists, so we'll try it
      return possibleImage;
    }
  }

  // Default fallback
  return "/productImage/steel-pipes.jpg";
};

// Reusable Card Component (to avoid Hooks inside loop)
const MaterialCard = ({ material, onSelect, materialImage }: any) => {
  const Icon = material.icon
    ? iconMap[material.icon] || ShieldCheck
    : ShieldCheck;
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={() => onSelect(material.slug)}
      className="group cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 relative"
    >
      {/* Card Image Area */}
      <div className="h-32 overflow-hidden bg-gray-100 relative">
        {!imgError && materialImage ? (
          <img
            src={materialImage}
            alt={material.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <Icon size={40} className="text-gray-400" />
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-base font-bold text-gray-900 group-hover:text-primary-red transition-colors mb-1">
          {material.name}
        </h3>

        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
          {material.description}
        </p>

        {material.highlight && material.highlight.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {material.highlight.slice(0, 2).map((item: string, idx: number) => (
              <span
                key={idx}
                className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs font-semibold text-primary-red flex items-center gap-1 group-hover:gap-2 transition-all">
            View Details
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </div>
  );
};

// Reusable List Item Component (to avoid Hooks inside loop)
const MaterialListItem = ({ material, onSelect, materialImage }: any) => {
  const Icon = material.icon
    ? iconMap[material.icon] || ShieldCheck
    : ShieldCheck;
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={() => onSelect(material.slug)}
      className="group cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-4 flex items-center gap-4 hover:border-primary-red/30"
    >
      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
        {!imgError && materialImage ? (
          <img
            src={materialImage}
            alt={material.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-red/10 to-blue-600/10">
            <Icon size={28} className="text-primary-red" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-base font-bold text-gray-900 mb-0.5">
          {material.name}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-1">
          {material.description}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-primary-red">
          <ArrowRight size={18} />
        </span>
      </div>
    </div>
  );
};

const Materials: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = [
    { id: "all", name: "All" },
    { id: "all-products", name: "All Products" },
    ...materials.map((m) => ({ id: m.slug, name: m.name })),
  ];

  const filteredMaterials = materials.filter(
    (material) =>
      (selectedCategory === "all" ||
        selectedCategory === "all-products" ||
        material.slug === selectedCategory) &&
      (material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        material.overview?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.items?.some(
          (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.shortDescription
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()),
        )),
  );

  const handleMaterialClick = (slug: string) => navigate(`/materials/${slug}`);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
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
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-[3px] bg-primary-red" />
            <span className="text-primary-red font-semibold tracking-[0.3em] uppercase text-sm">
              Our Collection
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            All Materials
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            Explore our complete range of premium industrial products
          </p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary-red" />
              <span className="text-white font-medium text-lg">
                {filteredMaterials.length} Materials
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

      {/* Content Section */}
      <div className="container mx-auto px-4 max-w-7xl py-12">
        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10">
          <div className="relative w-full lg:w-96">
            <div className="relative flex items-center bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="pl-4 pr-3 border-r border-gray-100">
                <Search className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-3 px-4 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center mt-5">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-gray-900 text-white shadow-lg"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
                }`}
              >
                {cat.name}
              </button>
            ))}
            {categories.length > 5 && (
              <button className="px-5 py-2.5 rounded-full text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:border-gray-400">
                +{categories.length - 5} more
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-500 border border-gray-200"
              }`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-500 border border-gray-200"
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 text-sm">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredMaterials.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {materials.length}
            </span>{" "}
            materials
          </p>
        </div>

        {/* Grid View */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMaterials.map((material) => (
              <MaterialCard
                key={material.slug}
                material={material}
                onSelect={handleMaterialClick}
                materialImage={getMaterialImage(material.slug)}
              />
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredMaterials.map((material) => (
              <MaterialListItem
                key={material.slug}
                material={material}
                onSelect={handleMaterialClick}
                materialImage={getMaterialImage(material.slug)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredMaterials.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 p-10">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-red/10 to-blue-600/10 flex items-center justify-center mx-auto mb-6">
                <Search size={40} className="text-primary-red" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No materials found
              </h3>
              <p className="text-gray-500 mb-8">
                No materials match your search query. Try adjusting your search
                terms.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-12 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Need Help Choosing a Material?
            </h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto">
              Our material experts can help you select the right grade for your
              specific application.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 bg-primary-red text-white rounded-xl font-bold hover:bg-red-700 transition-all hover:-translate-y-0.5"
            >
              Talk to Our Experts
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Materials;
