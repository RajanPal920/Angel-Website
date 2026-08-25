import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Layers,
  Ruler,
  Award,
  ChevronRight,
  FileText,
  Download,
  ShieldCheck,
  Globe,
  Truck,
  X,
  Sparkles,
  Flame,
  Compass,
  FileDown,
  Circle,
  CircleDot,
  BetweenHorizonalEnd,
  ListMinus,
  Pin,
  Sheet,
  SquareStack,
  Wifi,
  RotateCw,
  LayoutGrid,
  Sparkle,
  Rows,
  Box,
  Hexagon,
  AlignJustify,
  Plus,
  Zap,
  HardDrive,
} from "lucide-react";

// Products Data - All products from the reference
const productItems = [
  { name: "Coils", icon: <RotateCw size={16} />, link: "/products/coils" },
  { name: "Pipes", icon: <Pin size={16} />, link: "/products/pipes" },
  { name: "Plates", icon: <Sheet size={16} />, link: "/products/plates" },
  {
    name: "Round Bars",
    icon: <Compass size={16} />,
    link: "/products/round-bars",
  },
  { name: "Sheets", icon: <Sheet size={16} />, link: "/products/sheets" },
  { name: "Tubes", icon: <Pin size={16} />, link: "/products/tubes" },
  { name: "Wires", icon: <Plus size={16} />, link: "/products/wires" },
  {
    name: "Buttweld Fittings",
    icon: <LayoutGrid size={16} />,
    link: "/products/buttweld-fittings",
  },
  {
    name: "Forged Fittings",
    icon: <Sparkle size={16} />,
    link: "/products/forged-fittings",
  },
  {
    name: "Flanges",
    icon: <BetweenHorizonalEnd size={16} />,
    link: "/products/flanges",
  },
  {
    name: "Fasteners",
    icon: <ListMinus size={16} />,
    link: "/products/fasteners",
  },
  {
    name: "Angle Channels",
    icon: <Rows size={16} />,
    link: "/products/angle-channels",
  },
  {
    name: "Patta Patti",
    icon: <Layers size={16} />,
    link: "/products/patta-patti",
  },
  { name: "Rings", icon: <Circle size={16} />, link: "/products/rings" },
  { name: "Circles", icon: <Circle size={16} />, link: "/products/circles" },
  {
    name: "Strips",
    icon: <AlignJustify size={16} />,
    link: "/products/strips",
  },
  { name: "Valves", icon: <CircleDot size={16} />, link: "/products/valves" },
  {
    name: "Dairy Fittings",
    icon: <Hexagon size={16} />,
    link: "/products/dairy-fittings",
  },
  {
    name: "Dairy & Pharma Valves",
    icon: <Hexagon size={16} />,
    link: "/products/dairy-pharma-valves",
  },
  {
    name: "Pharma Fittings",
    icon: <Hexagon size={16} />,
    link: "/products/pharma-fittings",
  },
  { name: "Wire Mesh", icon: <Wifi size={16} />, link: "/products/wire-mesh" },
  {
    name: "Perforated Sheet",
    icon: <SquareStack size={16} />,
    link: "/products/perforated-sheet",
  },
  { name: "Hose Pipe", icon: <Zap size={16} />, link: "/products/hose-pipe" },
  {
    name: "Anchor Fastener",
    icon: <Box size={16} />,
    link: "/products/anchor-fastener",
  },
  {
    name: "Hardox Plate",
    icon: <HardDrive size={16} />,
    link: "/products/hardox-plate",
  },
];

// Materials Data
const materialItems = [
  { name: "Copper Nickel", link: "/materials/copper-nickel" },
  { name: "Duplex Steel", link: "/materials/duplex-steel" },
  { name: "Hastelloy", link: "/materials/hastelloy" },
  { name: "Incoloy", link: "/materials/incoloy" },
  { name: "Inconel", link: "/materials/inconel" },
  { name: "Monel", link: "/materials/monel" },
  { name: "Nickel Alloy", link: "/materials/nickel-alloy" },
  { name: "Other Materials", link: "/materials/other" },
  { name: "Sanicro", link: "/materials/sanicro" },
  { name: "Special Materials", link: "/materials/special" },
  { name: "Stainless Steel", link: "/materials/stainless-steel" },
  { name: "Titanium", link: "/materials/titanium" },
];

// Dimensions Data
const dimensionItems = [
  { name: "Pipes", file: "/Dimensions/dimensions-pipes.pdf" },
  { name: "Tubes", file: "/Dimensions/dimensions-tubes.pdf" },
  { name: "Sheets", file: "/Dimensions/dimensions-sheet.pdf" },
  { name: "Plates", file: "/Dimensions/dimensions-plates.pdf" },
  { name: "Round Bars", file: "/Dimensions/dimensions-round-bars.pdf" },
  { name: "Flanges", file: "/Dimensions/dimensions-flanges.pdf" },
  { name: "Fasteners", file: "/Dimensions/dimensions-fasteners.pdf" },
  { name: "Coils", file: "/Dimensions/dimensions-coils.pdf" },
  { name: "Wire", file: "/Dimensions/dimensions-wire.pdf" },
  {
    name: "Buttweld Fittings",
    file: "/Dimensions/dimensions-buttweld-fittings.pdf",
  },
  {
    name: "Forged Fittings",
    file: "/Dimensions/dimensions-forged-fittings.pdf",
  },
  { name: "Angle Channels", file: "/Dimensions/dimensions-angle-channels.pdf" },
  { name: "Patta Patti", file: "/Dimensions/dimensions-patta-patti.pdf" },
];

// Certificates Data
const certificateItems = [
  { name: "ISO 9001:2015", file: "/certificates/iso.pdf" },
  { name: "GST Certificate", file: "/certificates/gst.pdf" },
];

interface MegaDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: "products" | "materials" | "dimensions" | "certificates";
  onTabChange: (
    tab: "products" | "materials" | "dimensions" | "certificates",
  ) => void;
}

const ProductMegaDropdown: React.FC<MegaDropdownProps> = ({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleFileOpen = (filePath: string) => {
    window.open(filePath, "_blank");
    onClose();
  };

  if (!isOpen) return null;

  const renderGridItems = (
    items: any[],
    type: "product" | "material" | "dimension" | "certificate",
  ) => {
    return items.map((item, index) => {
      const isLastInRow = (index + 1) % 3 === 0;
      const isLast = index === items.length - 1;

      if (type === "product") {
        return (
          <Link
            key={item.name}
            to={item.link}
            onClick={onClose}
            className={`group flex items-center gap-3 py-3 ${
              !isLast ? "border-b border-gray-100" : ""
            } hover:bg-gray-50/80 px-3 -mx-3 rounded-lg transition-all duration-200`}
          >
            <span className="text-primary-red flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
              {item.icon}
            </span>
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary-red transition-colors duration-200">
              {item.name}
            </span>
            <ChevronRight
              size={14}
              className="ml-auto text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
            />
          </Link>
        );
      }

      if (type === "material") {
        return (
          <Link
            key={item.name}
            to={item.link}
            onClick={onClose}
            className={`group flex items-center justify-between py-3 ${
              !isLast ? "border-b border-gray-100" : ""
            } hover:bg-gray-50/80 px-3 -mx-3 rounded-lg transition-all duration-200`}
          >
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary-red transition-colors duration-200">
              {item.name}
            </span>
            <ChevronRight
              size={14}
              className="text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
            />
          </Link>
        );
      }

      if (type === "dimension") {
        return (
          <button
            key={item.name}
            onClick={() => handleFileOpen(item.file)}
            className={`group flex items-center gap-3 py-3 w-full text-left ${
              !isLast ? "border-b border-gray-100" : ""
            } hover:bg-gray-50/80 px-3 -mx-3 rounded-lg transition-all duration-200`}
          >
            <FileText
              size={16}
              className="text-primary-red flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
            />
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary-red transition-colors duration-200 flex-1">
              {item.name}
            </span>
            <Download
              size={14}
              className="text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
            />
          </button>
        );
      }

      if (type === "certificate") {
        return (
          <button
            key={item.name}
            onClick={() => handleFileOpen(item.file)}
            className="group flex items-center gap-4 p-5 border border-gray-100 rounded-xl hover:shadow-lg hover:border-primary-red/20 transition-all duration-300 hover:-translate-y-0.5 w-full text-left bg-white"
          >
            <div className="w-12 h-12 rounded-full bg-primary-red/5 flex items-center justify-center text-primary-red group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 group-hover:text-primary-red transition-colors duration-200">
                {item.name}
              </h4>
              <div className="flex items-center gap-1 text-xs text-primary-red font-medium mt-0.5">
                <Download size={12} />
                Download PDF
              </div>
            </div>
            <ChevronRight
              size={18}
              className="text-gray-300 group-hover:text-primary-red group-hover:translate-x-1 transition-all duration-200"
            />
          </button>
        );
      }

      return null;
    });
  };

  return (
    <>
      {/* Desktop Dropdown */}
      <div className="hidden lg:block">
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px]"
          onClick={onClose}
        />
        <div
          ref={dropdownRef}
          className="fixed left-1/2 top-[72px] z-50 max-w-[90vw] -translate-x-1/2"
          style={{ width: activeTab === "certificates" ? "580px" : "1000px" }}
        >
          <div
            className="bg-white rounded-[18px] shadow-xl p-8 animate-in fade-in slide-in-from-top-4 duration-200"
            style={{
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.12)",
            }}
          >
            {/* Tab Navigation */}
            <div className="flex items-center gap-1 mb-6 pb-4 border-b border-gray-100">
              {[
                { id: "products", label: "Products" },
                { id: "materials", label: "Materials" },
                { id: "dimensions", label: "Dimensions" },
                { id: "certificates", label: "Certificates" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id as any)}
                  className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-primary-red text-white"
                      : "text-gray-600 hover:text-primary-red hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="relative">
              {activeTab === "products" && (
                <div className="grid grid-cols-3 gap-x-6 gap-y-0 max-h-[400px] overflow-y-auto pr-2">
                  {renderGridItems(productItems, "product")}
                </div>
              )}

              {activeTab === "materials" && (
                <div className="grid grid-cols-3 gap-x-6 gap-y-0 max-h-[400px] overflow-y-auto pr-2">
                  {renderGridItems(materialItems, "material")}
                </div>
              )}

              {activeTab === "dimensions" && (
                <div className="grid grid-cols-3 gap-x-6 gap-y-0 max-h-[400px] overflow-y-auto pr-2">
                  {renderGridItems(dimensionItems, "dimension")}
                </div>
              )}

              {activeTab === "certificates" && (
                <div className="grid grid-cols-1 gap-3 max-h-[200px]">
                  {renderGridItems(certificateItems, "certificate")}
                </div>
              )}
            </div>

            {/* Quick Links Footer */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <ShieldCheck size={14} className="text-primary-red" />
                  <span>ISO 9001:2015</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Globe size={14} className="text-primary-red" />
                  <span>Worldwide Export</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Truck size={14} className="text-primary-red" />
                  <span>Fast Delivery</span>
                </div>
              </div>
              <button
                onClick={() => handleFileOpen("/catalogue.pdf")}
                className="flex items-center gap-2 text-sm font-semibold text-primary-red hover:text-primary-red/80 transition-colors"
              >
                <FileDown size={16} />
                Download Catalogue
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Full Screen Drawer */}
      <div className="lg:hidden">
        <div
          className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={onClose}
        />
        <div
          className={`fixed inset-x-0 top-0 z-50 h-screen bg-white transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Menu</h2>
              <p className="text-xs text-gray-400">Premium Stainless Steel</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="h-[calc(100vh-64px)] overflow-y-auto p-4">
            {/* Tabs */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { id: "products", label: "Products" },
                { id: "materials", label: "Materials" },
                { id: "dimensions", label: "Dimensions" },
                { id: "certificates", label: "Certificates" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id as any)}
                  className={`py-3 text-sm font-semibold rounded-lg transition-all ${
                    activeTab === tab.id
                      ? "bg-primary-red text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="space-y-2">
              {activeTab === "products" &&
                productItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    onClick={onClose}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-primary-red">{item.icon}</span>
                    <span className="font-medium text-gray-700">
                      {item.name}
                    </span>
                    <ChevronRight size={18} className="ml-auto text-gray-400" />
                  </Link>
                ))}

              {activeTab === "materials" &&
                materialItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    onClick={onClose}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-medium text-gray-700">
                      {item.name}
                    </span>
                    <ChevronRight size={18} className="text-gray-400" />
                  </Link>
                ))}

              {activeTab === "dimensions" &&
                dimensionItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleFileOpen(item.file)}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors w-full text-left"
                  >
                    <span className="font-medium text-gray-700">
                      {item.name}
                    </span>
                    <FileText size={18} className="text-gray-400" />
                  </button>
                ))}

              {activeTab === "certificates" &&
                certificateItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleFileOpen(item.file)}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors w-full text-left"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary-red/10 flex items-center justify-center text-primary-red">
                      <ShieldCheck size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        {item.name}
                      </h4>
                      <p className="text-xs text-primary-red font-medium">
                        Download PDF
                      </p>
                    </div>
                    <Download size={18} className="text-primary-red" />
                  </button>
                ))}
            </div>

            {/* Quick Links */}
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <button
                onClick={() => handleFileOpen("/catalogue.pdf")}
                className="flex items-center justify-center gap-2 w-full p-4 bg-primary-red text-white font-semibold rounded-xl"
              >
                <FileDown size={18} />
                Download Catalogue
              </button>
              <Link
                to="/contact"
                onClick={onClose}
                className="block p-4 text-center border-2 border-primary-red text-primary-red font-semibold rounded-xl"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductMegaDropdown;
