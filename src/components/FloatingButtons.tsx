import React, { useState, useEffect } from "react";
import { IoIosCall } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io";

const FloatingButtons: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ✅ UPDATED WITH YOUR DETAILS
  const whatsappNumber = "919029517398"; // Must be in international format (no +)
  const phoneNumber = "+919029517398"; // Can include + for tel: links

  // Customized WhatsApp message template with your details
  const whatsappMessage = encodeURIComponent(
    `Hello ANGEL METAL INDIA! 👋\n\n` +
      `I'm interested in your metal products. I would like to know more about:\n` +
      `• Product Type: \n` +
      `• Quantity Required: \n` +
      `• Grade/Specification: \n\n` +
      `Please share pricing and availability.\n\n` +
      `Thank you!`,
  );

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-20 pointer-events-none"
      }`}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div className="bg-[#052A63] text-white text-sm px-4 py-2 rounded-lg shadow-lg relative mb-2 animate-fade-in">
          <span>Need help? Contact us!</span>
          <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-[#052A63]"></div>
        </div>
      )}

      {/* Call Button - FIXED */}
      <a
        href={`tel:${phoneNumber}`}
        className="group relative flex items-center justify-center bg-[#0A3D91] hover:bg-[#052A63] text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Call us"
      >
        <IoIosCall className="w-6 h-6 animate-pulse-soft" />
      </a>

      {/* WhatsApp Button - FIXED */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center bg-[#25D366] hover:bg-[#1DA851] text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Chat on WhatsApp"
      >
        <IoLogoWhatsapp className="w-6 h-6 animate-pulse-soft" />
      </a>
    </div>
  );
};

export default FloatingButtons;
