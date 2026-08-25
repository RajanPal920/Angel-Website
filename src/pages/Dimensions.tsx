import React from "react";
import { Link } from "react-router-dom";
import { FiDownload, FiFileText, FiArrowRight } from "react-icons/fi";

interface DimensionItem {
  name: string;
  file: string;
}

const heroImage = "/img/home/banner-industrial.jpg"; // ✅ Add your hero image path here

const Dimensions: React.FC = () => {
  // Data extracted EXACTLY from your public/Dimensions folder
  const dimensionsData: DimensionItem[] = [
    { name: "Angle Channels", file: "dimensions-angle-channels.pdf" },
    { name: "Buttweld Fittings", file: "dimensions-buttweld-fittings.pdf" },
    { name: "Coils", file: "dimensions-coils.pdf" },
    { name: "Fasteners", file: "dimensions-fasteners.pdf" },
    { name: "Flanges", file: "dimensions-flanges.pdf" },
    { name: "Forged Fittings", file: "dimensions-forged-fittings.pdf" },
    { name: "Patta Patti", file: "dimensions-patta-patti.pdf" },
    { name: "Pipes", file: "dimensions-pipes.pdf" },
    { name: "Plates", file: "dimensions-plates.pdf" },
    { name: "Round Bars", file: "dimensions-round-bars.pdf" },
    { name: "Sheet", file: "dimensions-sheet.pdf" },
    { name: "Tubes", file: "dimensions-tubes.pdf" },
    { name: "Wire", file: "dimensions-wire.pdf" },
  ];

  const getPdfPath = (fileName: string) => {
    // IMPORTANT: Make sure the folder name matches exactly (case-sensitive)
    return `${window.location.origin}/Dimensions/${fileName}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* ===== HERO BANNER SECTION ===== */}
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
            <span className="w-10 h-[3px] bg-[#E52713]" />
            <span className="text-[#E52713] font-semibold tracking-[0.3em] uppercase text-sm">
              Technical Specifications
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Product Dimensions
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            Download detailed dimension charts and technical specifications for
            all our stainless steel products.
          </p>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#E52713]" />
              <span className="text-white font-medium text-lg">
                {dimensionsData.length} Documents
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#E52713]" />
              <span className="text-white font-medium text-lg">
                PDF Downloads
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CONTENT SECTION ===== */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Dimensions Table/List */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Table Header (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 bg-[#1A3A5C] text-white px-6 py-4 text-sm font-bold uppercase tracking-wider">
            <div className="col-span-7">Product Name</div>
            <div className="col-span-3">File Type</div>
            <div className="col-span-2 text-right">Download</div>
          </div>

          {/* Table Rows */}
          {dimensionsData.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 py-5 transition-colors duration-200 hover:bg-slate-50 ${
                index !== dimensionsData.length - 1
                  ? "border-b border-slate-100"
                  : ""
              }`}
            >
              {/* Name */}
              <div className="col-span-7 flex items-center gap-4">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-[#E52713]/10 flex items-center justify-center">
                  <FiFileText className="w-5 h-5 text-[#E52713]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1A3A5C]">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 md:hidden">
                    PDF Document
                  </p>
                </div>
              </div>

              {/* File Type (Desktop) */}
              <div className="hidden md:block col-span-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  PDF
                </span>
              </div>

              {/* Download Button - Bulletproof logic */}
              <div className="col-span-2 md:text-right mt-3 md:mt-0">
                <a
                  href={getPdfPath(item.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    const pdfUrl = getPdfPath(item.file);

                    // Try to open in a new tab
                    const newWindow = window.open(pdfUrl, "_blank");

                    // If pop-up blocker blocks it, force navigation in the same window
                    if (!newWindow) {
                      window.location.href = pdfUrl;
                    }
                  }}
                  className="inline-flex items-center gap-2 bg-[#1A3A5C] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-300 hover:bg-[#E52713] shadow-sm"
                >
                  <FiDownload className="w-4 h-4" />
                  View PDF
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-[#1A3A5C] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E52713] via-white to-[#E52713]"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need Custom Dimensions or More Information?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Contact our team for specific cut-to-size requirements or if you
            cannot find the dimension chart you are looking for.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#1A3A5C] px-8 py-3.5 rounded-lg font-bold hover:bg-[#E52713] hover:text-white transition-all duration-300 shadow-lg"
          >
            Contact Our Team <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dimensions;
