import React from "react";
import { Link } from "react-router-dom";
import { FiDownload, FiFileText, FiArrowRight, FiAward } from "react-icons/fi";

interface CertificateItem {
  name: string;
  description: string;
  file: string;
}

const heroImage = "/img/home/certificate.jpg"; // ✅ Add your hero image path here

const Certificates: React.FC = () => {
  // Data extracted from your public/certificates folder
  const certificatesData: CertificateItem[] = [
    {
      name: "ISO 9001:2015",
      description: "Quality Management System Certification",
      file: "iso.pdf",
    },
    {
      name: "Udyam Registration",
      description: "Government of India MSME Registration",
      file: "udyam.pdf",
    },
  ];

  const getPdfPath = (fileName: string) => {
    return `${window.location.origin}/certificates/${fileName}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* ===== HERO BANNER SECTION ===== */}
      <div className="relative h-[50vh] md:h-[80vh] lg:h-[85vh]">
        {" "}
        {/* ✅ Increased height for desktop */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Industrial materials"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/40" />
        </div>
        <div className="relative container mx-auto px-4 max-w-7xl py-24 md:py-32 lg:py-40 h-full flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-[3px] bg-[#E52713]" />
            <span className="text-[#E52713] font-semibold tracking-[0.3em] uppercase text-sm">
              Certifications
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Our Certificates
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            We are committed to delivering the highest quality products. View
            and download our official certificates below.
          </p>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#E52713]" />
              <span className="text-white font-medium text-lg">
                {certificatesData.length} Certificates
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#E52713]" />
              <span className="text-white font-medium text-lg">
                Quality Assured
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CONTENT SECTION ===== */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificatesData.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-xl border border-slate-200 p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-20 h-20 rounded-full bg-[#E52713]/10 flex items-center justify-center mb-6 group-hover:bg-[#E52713] transition-colors duration-300">
                <FiFileText className="w-10 h-10 text-[#E52713] group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl font-bold text-[#1A3A5C] mb-2">
                {item.name}
              </h2>
              <p className="text-slate-600 mb-8">{item.description}</p>

              {/* Download Button */}
              <a
                href={getPdfPath(item.file)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  const pdfUrl = getPdfPath(item.file);

                  const newWindow = window.open(pdfUrl, "_blank");

                  if (!newWindow) {
                    window.location.href = pdfUrl;
                  }
                }}
                className="inline-flex items-center justify-center gap-2 w-full bg-[#1A3A5C] text-white px-6 py-3.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all duration-300 hover:bg-[#E52713] shadow-md"
              >
                <FiDownload className="w-4 h-4" />
                View Certificate
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-[#1A3A5C] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E52713] via-white to-[#E52713]"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need Specific Documentation?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Contact our team if you require material test certificates (MTCs),
            mill test reports, or any other specific compliance documents for
            your order.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#1A3A5C] px-8 py-3.5 rounded-lg font-bold hover:bg-[#E52713] hover:text-white transition-all duration-300 shadow-lg"
          >
            Request Documents <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
