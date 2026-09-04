import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

import {
  Cylinder,
  Circle,
  Columns3,
  Square,
  ScrollText,
  Network,
  GitBranch,
  Nut,
} from "lucide-react";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Award,
  Shield,
  Truck,
  Globe,
  Users,
  Headphones,
  CheckCircle2,
  Star,
  Sparkles,
  Building2,
  Factory,
  Settings,
  ClipboardCheck,
  Package,
  Send,
  Calendar,
  ShieldCheck,
  Gem,
  Target,
  Zap,
  Coffee,
  Compass,
  MapPin,
  Phone,
  Mail,
  User,
} from "lucide-react";

// ============================================================
// STAT ITEM COMPONENT
// ============================================================
interface StatItemProps {
  targetValue: number;
  suffix: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ targetValue, suffix, label }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    const increment = targetValue / steps;

    let currentStep = 0;
    let currentCount = 0;

    const timer = setInterval(() => {
      currentStep++;
      currentCount += increment;

      if (currentStep >= steps) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.min(Math.round(currentCount), targetValue));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, targetValue]);

  return (
    <div
      ref={elementRef}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
    >
      <div className="text-4xl font-bold text-white">
        {count}
        {suffix}
      </div>
      <div className="text-[#D9D9D9]/70 text-sm mt-1">{label}</div>
    </div>
  );
};

// ============================================================
// HOME COMPONENT
// ============================================================
const Home: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ===== HERO IMAGES =====
  const heroImages = [
    {
      src: "/img/home/hero.png",
      alt: "Stainless Steel Pipes Manufacturing",
      subtitle: "Manufacturing Excellence",
    },
    {
      src: "/img/home/hero-2.png",
      alt: "Metal Products Warehouse",
      subtitle: "Global Supply Chain",
    },
    {
      src: "/img/home/hero-3.png",
      alt: "Steel Manufacturing Plant",
      subtitle: "State-of-the-Art Facilities",
    },
  ];

  // ===== DATA =====
  const whyChooseData = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "ISO Certified",
      desc: "International quality standards certified for all our products.",
    },
    {
      icon: <Gem className="w-8 h-8" />,
      title: "Premium Quality",
      desc: "Highest grade materials with rigorous quality control.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Competitive Pricing",
      desc: "Best market rates without compromising on quality.",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast Delivery",
      desc: "Timely delivery across India and international markets.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Export",
      desc: "Exporting to 35+ countries with seamless logistics.",
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "24x7 Support",
      desc: "Round the clock customer support for all your needs.",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Stainless Steel Pipes",
      slug: "pipes-tubes",
      category: "Pipes & Tubes",
      grade: "SS 304, SS 316, SS 310",
      image: "/productImage/steel-pipes.jpg",
      icon: Cylinder,
      description:
        "Premium grade stainless steel pipes for industrial applications.",
      shortDescription:
        "Premium grade stainless steel pipes for industrial applications.",
    },
    {
      id: 2,
      name: "Steel Rods & Bars",
      slug: "round-bars",
      category: "Bars & Rods",
      grade: "EN8, EN19, EN24, 4140, 4340",
      image: "/productImage/rod.jpg",
      icon: Circle,
      description:
        "High-strength steel rods and bars for construction and manufacturing.",
      shortDescription:
        "High-strength steel rods and bars for construction and manufacturing.",
    },
    {
      id: 3,
      name: "Steel Angles & Channels",
      slug: "angle-channels",
      category: "Structural",
      grade: "IS 2062, IS 808, ASTM A36",
      image: "/productImage/angle-channels.jpg",
      icon: Columns3,
      description:
        "Structural steel angles and channels for building frameworks.",
      shortDescription:
        "Structural steel angles and channels for building frameworks.",
    },
    {
      id: 4,
      name: "Steel Plates & Sheets",
      slug: "sheets-plates",
      category: "Plates & Sheets",
      grade: "IS 2062, ASTM A36, EN 10025",
      image: "/productImage/sheets.jpg",
      icon: Square,
      description:
        "Durable steel plates and sheets for various industrial uses.",
      shortDescription:
        "Durable steel plates and sheets for various industrial uses.",
    },
    {
      id: 5,
      name: "Steel Coils",
      slug: "coils",
      category: "Coils",
      grade: "IS 513, IS 1079, ASTM A1011",
      image: "/productImage/coil.jpg",
      icon: ScrollText,
      description:
        "High-quality steel coils for manufacturing and fabrication.",
      shortDescription:
        "High-quality steel coils for manufacturing and fabrication.",
    },
    {
      id: 6,
      name: "Steel Flanges",
      slug: "flanges",
      category: "Fittings",
      grade: "ASTM A105, ASTM A182, IS 2062",
      image: "/productImage/Flanges.jpg",
      icon: Network,
      description: "Precision-engineered steel flanges for piping systems.",
      shortDescription:
        "Precision-engineered steel flanges for piping systems.",
    },
    {
      id: 7,
      name: "Buttweld Steel Tubes",
      slug: "buttweld-fittings",
      category: "Pipes & Tubes",
      grade: "EN 10255, IS 1239, ASTM A53",
      image: "/productImage/buttweld.jpg",
      icon: GitBranch,
      description: "Premium buttweld steel tubes for industrial applications.",
      shortDescription:
        "Premium buttweld steel tubes for industrial applications.",
    },
    {
      id: 8,
      name: "Industrial Fasteners",
      slug: "fasteners",
      category: "Fittings",
      grade: "Grade 8.8, Grade 10.9, Grade 12.9",
      image: "/productImage/fastener.jpg",
      icon: Nut,
      description:
        "High-strength industrial fasteners and hardware components.",
      shortDescription:
        "High-strength industrial fasteners and hardware components.",
    },
  ];

  const industries = [
    {
      name: "Oil & Gas",
      image: "/ind/Oil.jpg",
    },
    {
      name: "Petrochemical",
      image: "/ind/petrochemical.jpg",
    },
    {
      name: "Chemical Industry",
      image: "/ind/chemical.jpg",
    },
    {
      name: "Power Plants",
      image: "/ind/power.jpg",
    },
    {
      name: "Construction",
      image: "/ind/construction.jpg",
    },
    {
      name: "Pharmaceutical",
      image: "/ind/pharmaceutical.jpg",
    },
    {
      name: "Marine",
      image: "/ind/marine.jpg",
    },
    {
      name: "Automobile",
      image: "/ind/auto.jpg",
    },
  ];

  const processSteps = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Consultation",
      description:
        "We understand your requirements and provide expert guidance on the best metal solutions for your project.",
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Quotation",
      description:
        "We provide competitive pricing with complete transparency and detailed quotations.",
    },
    {
      icon: <Factory className="w-8 h-8" />,
      title: "Manufacturing",
      description:
        "Using state-of-the-art technology, we manufacture high-quality metal products.",
    },
    {
      icon: <ClipboardCheck className="w-8 h-8" />,
      title: "Quality Inspection",
      description:
        "Every product undergoes rigorous quality testing to meet international standards.",
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Packaging",
      description: "Secure packaging ensures product safety during transit.",
    },
    {
      icon: <Send className="w-8 h-8" />,
      title: "Dispatch",
      description: "Timely dispatch with proper documentation and tracking.",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Delivery",
      description:
        "Safe and timely delivery to your location with full support.",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Sharma",
      company: "Tata Projects",
      rating: 5,
      text: "Exceptional quality and timely delivery. Angel Metal has been our trusted partner for over 5 years.",
      image: "👤",
    },
    {
      name: "Priya Mehta",
      company: "Larsen & Toubro",
      rating: 5,
      text: "The best metal supplier we've worked with. Their quality control is unmatched in the industry.",
      image: "👤",
    },
    {
      name: "Vikram Singh",
      company: "Reliance Industries",
      rating: 5,
      text: "Professional team, premium products, and reliable service. Highly recommended for industrial needs.",
      image: "👤",
    },
  ];

  const faqs = [
    {
      q: "What types of steel products do you manufacture?",
      a: "We manufacture a wide range of stainless steel, carbon steel, alloy steel, and duplex steel products including pipes, tubes, rods, bars, angles, channels, plates, sheets, coils, flanges, and fittings.",
    },
    {
      q: "Do you export internationally?",
      a: "Yes, we export our products to over 50+ countries across the globe including USA, UK, UAE, Saudi Arabia, Singapore, and many more.",
    },
    {
      q: "What certifications do you have?",
      a: "We are ISO 9001:2015 certified, MSME registered, and comply with all international quality standards for metal products.",
    },
    {
      q: "What is your minimum order quantity?",
      a: "Our minimum order quantity varies by product type. Please contact our sales team for specific requirements.",
    },
    {
      q: "Do you provide custom sizes?",
      a: "Yes, we manufacture custom sizes and specifications as per client requirements.",
    },
    {
      q: "What is your delivery timeline?",
      a: "Domestic deliveries typically take 3-7 days, while international shipments take 7-15 days depending on the destination.",
    },
    {
      q: "Do you offer quality certificates?",
      a: "Yes, every product comes with a Material Test Certificate (MTC) and quality assurance documentation.",
    },
    {
      q: "Are you GST compliant?",
      a: "Yes, all our transactions are 100% GST compliant with proper documentation.",
    },
    {
      q: "What payment terms do you offer?",
      a: "We offer flexible payment terms including advance payment, LC, and credit facilities for long-term clients.",
    },
    {
      q: "How can I get a quote?",
      a: "You can request a quote through our website, call us directly, or email your requirements to our sales team.",
    },
  ];

  const blogs = [
    {
      id: 1,
      title: "The Future of Stainless Steel in Infrastructure",
      date: "Jan 15, 2025",
      category: "Industry Trends",
      description:
        "Explore how stainless steel is transforming modern infrastructure with exceptional durability, corrosion resistance, and long-term sustainability for bridges, buildings, and industrial projects.",
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Sustainable Manufacturing Practices in Metal Industry",
      date: "Jan 10, 2025",
      category: "Sustainability",
      description:
        "Discover eco-friendly manufacturing techniques that reduce waste, improve efficiency, and support environmentally responsible stainless steel production.",
      image:
        "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Quality Control in Steel Manufacturing: A Complete Guide",
      date: "Jan 5, 2025",
      category: "Quality",
      description:
        "Learn about advanced inspection methods, testing procedures, and international quality standards that ensure premium stainless steel products.",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    },
  ];

  // ===== COUNTRIES DATA WITH ISO CODES =====
  const countries = [
    { name: "UNITED STATES", code: "US" },
    { name: "CANADA", code: "CA" },
    { name: "MEXICO", code: "MX" },
    { name: "UNITED KINGDOM", code: "GB" },
    { name: "GERMANY", code: "DE" },
    { name: "FRANCE", code: "FR" },
    { name: "ITALY", code: "IT" },
    { name: "SPAIN", code: "ES" },
    { name: "PORTUGAL", code: "PT" },
    { name: "NETHERLANDS", code: "NL" },
    { name: "BELGIUM", code: "BE" },
    { name: "SWITZERLAND", code: "CH" },
    { name: "AUSTRIA", code: "AT" },
    { name: "SWEDEN", code: "SE" },
    { name: "NORWAY", code: "NO" },
    { name: "DENMARK", code: "DK" },
    { name: "FINLAND", code: "FI" },
    { name: "IRELAND", code: "IE" },
    { name: "POLAND", code: "PL" },
    { name: "CZECH REPUBLIC", code: "CZ" },
    { name: "HUNGARY", code: "HU" },
    { name: "ROMANIA", code: "RO" },
    { name: "GREECE", code: "GR" },
    { name: "TURKEY", code: "TR" },
    { name: "RUSSIA", code: "RU" },
    { name: "UKRAINE", code: "UA" },
    { name: "JAPAN", code: "JP" },
    { name: "CHINA", code: "CN" },
    { name: "SOUTH KOREA", code: "KR" },
    { name: "NORTH KOREA", code: "KP" },
    { name: "UAE", code: "AE" },
    { name: "SAUDI ARABIA", code: "SA" },
    { name: "QATAR", code: "QA" },
    { name: "KUWAIT", code: "KW" },
    { name: "OMAN", code: "OM" },
    { name: "BAHRAIN", code: "BH" },
    { name: "BRAZIL", code: "BR" },
    { name: "ARGENTINA", code: "AR" },
    { name: "CHILE", code: "CL" },
    { name: "SINGAPORE", code: "SG" },
    { name: "MALAYSIA", code: "MY" },
    { name: "INDONESIA", code: "ID" },
    { name: "THAILAND", code: "TH" },
    { name: "VIETNAM", code: "VN" },
    { name: "PHILIPPINES", code: "PH" },
    { name: "AUSTRALIA", code: "AU" },
    { name: "NEW ZEALAND", code: "NZ" },
    { name: "SOUTH AFRICA", code: "ZA" },
    { name: "NIGERIA", code: "NG" },
    { name: "EGYPT", code: "EG" },
  ];

  // ===== SLIDER FUNCTIONS =====
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // ===== AUTO SLIDE =====
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ===== AUTO SLIDE TESTIMONIALS =====
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ============================================================ */}
      {/* HERO SECTION - DESKTOP (UNCHANGED) */}
      {/* ============================================================ */}
      <section className="relative hidden md:flex h-[85vh] items-center bg-gradient-to-br from-[#052A63] via-[#0A3D91] to-[#052A63] overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#D71920]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#D71920]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0A3D91]/30 rounded-full blur-3xl"></div>
        </div>

        {/* Floating Shapes */}
        <div className="hidden md:block absolute top-20 right-20 animate-float">
          <div className="w-4 h-4 bg-[#D71920] rounded-full opacity-50"></div>
        </div>
        <div className="hidden md:block absolute bottom-20 left-20 animate-float delay-1000">
          <div className="w-6 h-6 border-2 border-[#D9D9D9]/30 rounded-full"></div>
        </div>
        <div className="hidden md:block absolute top-1/3 right-40 animate-float delay-2000">
          <div className="w-3 h-3 bg-[#D71920]/40 rounded-full"></div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/50 animate-bounce z-20">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </div>

        {/* Full-Width Slider Container */}
        <div className="absolute inset-0 z-0">
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {heroImages.map((image, index) => (
              <div key={index} className="w-full h-full flex-shrink-0 relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {/* Dark Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#052A63]/80 via-[#052A63]/10 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#052A63]/60 via-transparent to-transparent"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Overlay - Left Content */}
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen lg:min-h-[85vh] py-24 lg:py-0">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#D71920]/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-[#D71920]/20 mx-auto lg:mx-0">
                <Sparkles className="w-4 h-4 text-[#D71920]" />
                <span className="text-[#D71920] text-sm font-semibold tracking-wider">
                  Trusted Metal Manufacturer
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
                Premium
                <span className="block text-[#D71920]">Stainless Steel</span>
                <span className="block text-lg sm:text-xl md:text-3xl lg:text-4xl font-light text-[#D9D9D9]/80 mt-3">
                  Built on Strength, Quality & Trust.
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-[#D9D9D9]/100 max-w-lg leading-relaxed mx-auto lg:mx-0">
                Angel Metal India is a premier manufacturer, supplier, and
                exporter of high-quality stainless steel and metal products,
                serving industries across the globe with excellence and
                reliability.
              </p>

              {/* CTA Buttons */}
              <div className="mt-6 md:mt-8 flex flex-row justify-center lg:justify-start gap-3">
                <a
                  href="/products"
                  className="bg-[#D71920] hover:bg-[#D71920]/90 text-white px-4 md:px-6 lg:px-8 py-2.5 md:py-3.5 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 hover:shadow-xl hover:shadow-[#D71920]/30 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Explore Products
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="/contact"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 md:px-6 lg:px-8 py-2.5 md:py-3.5 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 border border-white/20 hover:border-white/40 whitespace-nowrap"
                >
                  Get Free Quote
                </a>
              </div>

              {/* Floating Stats - Hide on Mobile */}
              <div className="hidden md:grid md:grid-cols-3 gap-3 pt-4">
                <div className="flex items-center justify-center lg:justify-start gap-3 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-full border border-white/10">
                  <Award className="w-5 h-5 text-[#D71920]" />
                  <span className="text-white text-sm font-medium">
                    25+ Years
                  </span>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-3 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-full border border-white/10">
                  <Users className="w-5 h-5 text-[#D71920]" />
                  <span className="text-white text-sm font-medium">
                    1000+ Clients
                  </span>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-3 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-full border border-white/10">
                  <Shield className="w-5 h-5 text-[#D71920]" />
                  <span className="text-white text-sm font-medium">
                    ISO Certified
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - Empty for overlay layout */}
            <div className="hidden lg:block"></div>
          </div>
        </div>

        {/* Slider Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-[#D71920] text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-[#D71920] text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 md:bottom-20 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-[#D71920] w-10"
                  : "bg-white/50 hover:bg-white/80 w-6"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-black/50 backdrop-blur-sm text-white text-xs md:text-sm px-3 md:px-4 py-2 rounded-full z-20">
          {String(currentSlide + 1).padStart(2, "0")} /{" "}
          {String(heroImages.length).padStart(2, "0")}
        </div>
      </section>

      {/* ============================================================ */}
      {/* HERO SECTION - MOBILE (PREMIUM PROMOTIONAL BANNER) */}
      {/* ============================================================ */}
      <section className="block md:hidden relative w-full bg-white overflow-hidden">
        {/* ONLY Banner Image Slider */}
        <div className="w-full">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {heroImages.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0 relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Slider Navigation Arrows - Touch Friendly */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#D71920] hover:bg-[#B01515] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#D71920] hover:bg-[#B01515] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators - Modern Rounded */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-[#D71920] w-8"
                  : "bg-gray-300 hover:bg-gray-400 w-4"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full z-20">
          {String(currentSlide + 1).padStart(2, "0")} /{" "}
          {String(heroImages.length).padStart(2, "0")}
        </div>
      </section>

      {/* ============================================================ */}
      {/* WHY CHOOSE US */}
      {/* ============================================================ */}
      <section className="py-20 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#D71920] font-semibold tracking-wider text-sm uppercase">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#052A63] mt-2">
              Why Angel Metal India?
            </h2>
            <p className="text-gray-600 mt-4">
              We combine quality, expertise, and innovation to deliver
              exceptional metal solutions for your business.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyChooseData.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#D71920]/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#D71920] to-[#0A3D91] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10"></div>
                <div className="absolute inset-[2px] bg-white rounded-2xl -z-10"></div>

                <div className="bg-[#D71920]/10 text-[#D71920] w-16 h-16 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#D71920] group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#052A63] mb-2 group-hover:text-[#D71920] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* OUR PRODUCTS */}
      {/* ============================================================ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#D71920] font-semibold tracking-wider text-sm uppercase">
              Our Products
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#052A63] mt-2">
              Premium Metal Products
            </h2>
            <p className="text-gray-600 mt-4">
              Explore our extensive range of high-quality metal products.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Link
                key={index}
                to={`/products/${product.slug}`}
                className="group bg-gradient-to-br from-[#F5F7FA] to-white rounded-xl overflow-hidden border border-gray-100 hover:border-[#D71920]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 block"
              >
                <div className="h-48 bg-gradient-to-br from-[#052A63]/5 to-[#D71920]/5 flex items-center justify-center overflow-hidden">
                  {product.image &&
                  typeof product.image === "string" &&
                  product.image.startsWith("/") ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-5xl">{product.image || "🏗️"}</span>
                  )}
                </div>

                <div className="p-5">
                  <p className="text-[10px] text-[#D71920] font-semibold uppercase tracking-wider">
                    {product.category}
                  </p>
                  <h3 className="text-base font-bold text-[#052A63] mt-1 leading-tight group-hover:text-[#D71920] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 font-medium truncate">
                    Grades: {product.grade}
                  </p>
                  <p className="text-gray-600 text-xs mt-2 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-3 text-[#D71920] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                    View Products
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Products Button - Navigates to /products */}
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#D71920] hover:bg-[#D71920]/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-[#D71920]/30"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* INDUSTRIES WE SERVE */}
      {/* ============================================================ */}
      <section className="py-20 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#D71920] font-semibold tracking-wider text-sm uppercase">
              Industries We Serve
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#052A63] mt-2">
              Trusted Across Industries
            </h2>
            <p className="text-gray-600 mt-4">
              We provide premium metal solutions to diverse industries
              worldwide.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#D71920]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="aspect-[5/5] overflow-hidden">
                  <img
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#052A63]/70 via-[#052A63]/20 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#D71920] transition-colors duration-300">
                    {industry.name}
                  </h3>
                  <div className="w-12 h-0.5 bg-[#D71920] mt-2 group-hover:w-20 transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* STATS / COUNTER SECTION */}
      {/* ============================================================ */}
      <section className="py-20 bg-gradient-to-br from-[#052A63] via-[#0A3D91] to-[#052A63] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#D71920]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#D71920]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            <StatItem targetValue={25} suffix="+" label="Years Experience" />
            <StatItem targetValue={500} suffix="+" label="Products" />
            <StatItem targetValue={1000} suffix="+" label="Happy Clients" />
            <StatItem targetValue={35} suffix="+" label="Countries" />
            <StatItem targetValue={100} suffix="%" label="Quality" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BLOG SECTION */}
      {/* ============================================================ */}
      <section className="py-20 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#D71920] font-semibold tracking-wider text-sm uppercase">
              Blog
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#052A63] mt-2">
              Latest Insights
            </h2>
            <p className="text-gray-600 mt-4">
              Stay updated with the latest trends and insights in the metal
              industry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {blogs.map((blog) => (
              <a
                key={blog.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#D71920]/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 block"
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-[#052A63]/10 to-[#D71920]/10 overflow-hidden relative">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-[#D71920]/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {blog.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <span className="text-[#D71920]">📅</span>
                      {blog.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#052A63] mt-2 group-hover:text-[#D71920] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-3">
                    {blog.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* COUNTRIES WE EXPORT TO */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#F5F7FA] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D71920] to-transparent"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12">
            <span className="text-[#D71920] font-semibold tracking-wider text-xs sm:text-sm uppercase">
              Global Presence
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#052A63] mt-2">
              Countries We Export To
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-3 sm:mt-4">
              We proudly serve clients across 50+ countries worldwide with our
              premium metal products.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {Array.from({ length: Math.ceil(countries.length / 5) }).map(
              (_, rowIndex) => (
                <div key={rowIndex} className="mb-4 sm:mb-5 md:mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                    {countries
                      .slice(rowIndex * 5, rowIndex * 5 + 5)
                      .map((country, colIndex) => (
                        <div
                          key={colIndex}
                          className="group relative flex flex-col items-center justify-center p-3 sm:p-3.5 md:p-4 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-[#D71920] to-[#0A3D91] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute inset-[2px] bg-white rounded-xl sm:rounded-2xl group-hover:bg-transparent transition-colors duration-500"></div>

                          <div className="relative z-10 flex flex-col items-center w-full">
                            <ReactCountryFlag
                              countryCode={country.code}
                              svg
                              style={{
                                width: "2rem",
                                height: "2rem",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                              className="mb-1 sm:mb-1.5 md:mb-2 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                            />
                            <span className="text-[10px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-xs font-semibold text-gray-700 text-center uppercase group-hover:text-white transition-colors block leading-tight w-full break-words">
                              {country.name}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="hidden md:grid md:grid-cols-5 gap-3 md:gap-4 mt-3">
                    {Array.from({ length: 5 }).map((_, labelIndex) => (
                      <div
                        key={labelIndex}
                        className="text-center text-white font-bold text-[10px] lg:text-xs tracking-[0.2em] uppercase py-2 px-2 bg-gradient-to-r from-[#D71920] to-[#0A3D91] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        🚀 EXPORT MARKET
                      </div>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TESTIMONIALS */}
      {/* ============================================================ */}
      <section className="py-20 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#D71920] font-semibold tracking-wider text-sm uppercase">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#052A63] mt-2">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 mt-4">
              Hear from our valued clients about their experience with Angel
              Metal India.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl border border-gray-100 hover:shadow-[#D71920]/10 transition-shadow duration-300">
              <div className="text-[#D71920] text-4xl mb-4 opacity-30">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#D71920]/10 to-[#0A3D91]/10 rounded-full flex items-center justify-center text-4xl md:text-5xl border-2 border-[#D71920]/20">
                    {testimonials[activeTestimonial].image}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h4 className="text-xl font-bold text-[#052A63]">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <span className="text-gray-400">•</span>
                    <p className="text-sm text-gray-500 font-medium">
                      {testimonials[activeTestimonial].company}
                    </p>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-[#D71920] text-[#D71920]"
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 text-base md:text-lg leading-relaxed italic">
                    "{testimonials[activeTestimonial].text}"
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === activeTestimonial
                        ? "bg-[#D71920] w-8"
                        : "bg-gray-300 hover:bg-gray-400 w-4"
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() =>
                    setActiveTestimonial(
                      activeTestimonial === 0
                        ? testimonials.length - 1
                        : activeTestimonial - 1,
                    )
                  }
                  className="w-10 h-10 rounded-full border border-gray-200 hover:border-[#D71920] hover:bg-[#D71920] hover:text-white transition-all duration-300 flex items-center justify-center text-gray-600 hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    setActiveTestimonial(
                      (activeTestimonial + 1) % testimonials.length,
                    )
                  }
                  className="w-10 h-10 rounded-full border border-gray-200 hover:border-[#D71920] hover:bg-[#D71920] hover:text-white transition-all duration-300 flex items-center justify-center text-gray-600 hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="text-center mt-4 text-sm text-gray-400">
              {activeTestimonial + 1} / {testimonials.length}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FAQ SECTION */}
      {/* ============================================================ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#D71920] font-semibold tracking-wider text-sm uppercase">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#052A63] mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#F5F7FA] rounded-2xl overflow-hidden border border-gray-100 hover:border-[#D71920]/20 transition-all"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                >
                  <span className="font-semibold text-[#052A63]">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D71920] transition-transform ${
                      activeFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CTA SECTION WITH UPDATED COMPANY DETAILS */}
      {/* ============================================================ */}
      <section className="py-20 bg-gradient-to-br from-[#052A63] via-[#0A3D91] to-[#052A63] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#D71920]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#D71920]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Let's Build Something{" "}
              <span className="text-[#D71920]">Strong</span> Together.
            </h2>
            <p className="text-[#D9D9D9]/70 text-lg mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your metal requirements and discover
              how we can help your business grow.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="bg-[#D71920] hover:bg-[#D71920]/90 text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-[#D71920]/30 flex items-center gap-2"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/contact"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                Get Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* COMPANY DETAILS / CONTACT INFO SECTION */}
      {/* ============================================================ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-[#F5F7FA] rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
            <div className="text-center mb-10">
              <span className="text-[#D71920] font-semibold tracking-wider text-sm uppercase">
                Get In Touch
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#052A63] mt-2">
                Company Details
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D71920]/10 text-[#D71920] flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#052A63] text-lg">
                      Company Name
                    </h3>
                    <p className="text-gray-600 mt-1">ANGEL METAL INDIA</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D71920]/10 text-[#D71920] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#052A63] text-lg">
                      Address
                    </h3>
                    <p className="text-gray-600 mt-1 leading-relaxed">
                      Shop No-7, Gr. Floor, 66-Cooper Building, T.P. Street,
                      Kumbharwada Lane, Mumbai - 400004.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D71920]/10 text-[#D71920] flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#052A63] text-lg">
                      Proprietor
                    </h3>
                    <p className="text-gray-600 mt-1">Mr. Ramesh Bishnoi</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D71920]/10 text-[#D71920] flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#052A63] text-lg">
                      Contact Person (Sales Dept)
                    </h3>
                    <p className="text-gray-600 mt-1">Mahesh Bishnoi</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D71920]/10 text-[#D71920] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#052A63] text-lg">
                      Phone No
                    </h3>
                    <p className="text-gray-600 mt-1">
                      <a
                        href="tel:+919029517398"
                        className="hover:text-[#D71920]"
                      >
                        +91 90295 17398
                      </a>
                      <span className="mx-2">/</span>
                      <a
                        href="tel:+918169810880"
                        className="hover:text-[#D71920]"
                      >
                        +91 81698 10880
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D71920]/10 text-[#D71920] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#052A63] text-lg">
                      Email ID
                    </h3>
                    <p className="text-gray-600 mt-1">
                      <a
                        href="mailto:angelmetalindia@gmail.com"
                        className="hover:text-[#D71920]"
                      >
                        angelmetalindia@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slower {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float.delay-1000 {
          animation-delay: 1s;
        }
        .animate-float.delay-2000 {
          animation-delay: 2s;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 30s linear infinite;
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}
      </style>
    </div>
  );
};

export default Home;
