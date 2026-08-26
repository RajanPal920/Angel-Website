import React from "react";
import { Link } from "react-router-dom";
import {
  Target,
  Eye,
  ShieldCheck,
  Award,
  Users,
  Factory,
  Globe,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  User,
  Building2,
} from "lucide-react";

const About: React.FC = () => {
  const coreValues = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Integrity",
      desc: "We build long-term relationships based on honesty, transparency, and ethical business practices.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality First",
      desc: "We never compromise on product quality. Every product is rigorously tested to meet international standards.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer Focus",
      desc: "Your success is our success. We work closely with clients to provide tailored metal solutions.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      desc: "With a strong export network, we proudly serve clients across 35+ countries worldwide.",
    },
  ];

  const whyChooseUs = [
    "ISO 9001:2015 Certified Company",
    "Premium Grade Raw Materials",
    "In-House Quality Testing & Inspection",
    "Custom Sizes & Specifications Available",
    "Timely Delivery Across India & Globally",
    "Competitive Pricing & Flexible Payment Terms",
    "Dedicated Sales Support Team",
    "100% Material Test Certificate (MTC) Provided",
  ];

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* ============================================================ */}
      {/* HERO SECTION - DESKTOP */}
      {/* ============================================================ */}
      <div className="hidden md:flex relative w-full h-[85vh] items-center justify-center bg-gradient-to-br from-[#052A63] via-[#0A3D91] to-[#052A63] overflow-hidden">
        <img
          src="/img/home/hero-3.png"
          alt="About Us Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#052A63]/80 via-[#052A63]/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#052A63]/60 via-transparent to-transparent"></div>

        <div className="relative z-10 text-center px-4">
          <span className="inline-block bg-[#D71920] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            Who We Are
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 uppercase tracking-tight">
            About <span className="text-[#D71920]">Us</span>
          </h1>
          <div className="h-[3px] w-24 bg-[#D71920] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-white/90 text-sm md:text-lg">
            Leading Manufacturer, Supplier & Exporter of Premium Metal Products.
          </p>
        </div>

        <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/50 animate-bounce z-20">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>

      {/* ============================================================ */}
      {/* HERO SECTION - MOBILE (SINGLE IMAGE WITH OVERLAY) */}
      {/* ============================================================ */}
      <div className="md:hidden relative w-full h-[30vh] flex items-center justify-center bg-gradient-to-br from-[#052A63] via-[#0A3D91] to-[#052A63] overflow-hidden">
        <img
          src="/img/home/hero-3.png"
          alt="About Us Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#052A63]/80 via-[#052A63]/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#052A63]/60 via-transparent to-transparent"></div>

        <div className="relative z-10 text-center px-4">
          <span className="inline-block bg-[#D71920] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            Who We Are
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 uppercase tracking-tight">
            About <span className="text-[#D71920]">Us</span>
          </h1>
          <div className="h-[3px] w-24 bg-[#D71920] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-white/90 text-sm">
            Leading Manufacturer, Supplier & Exporter of Premium Metal Products.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {/* ============================================================ */}
        {/* COMPANY OVERVIEW */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="text-[#D71920] font-semibold tracking-wider text-sm uppercase">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#052A63] mt-2 mb-6">
              Delivering Quality Metal Solutions Since Day One
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              <strong>ANGEL METAL INDIA</strong> is a premier manufacturer,
              supplier, and exporter of high-quality stainless steel and metal
              products. Located in the heart of Mumbai's industrial district, we
              serve a diverse range of industries including oil & gas,
              petrochemical, construction, pharmaceutical, and more.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              With a strong focus on quality and customer satisfaction, our team
              is dedicated to providing premium products at competitive prices.
              We are proud to serve clients across India and export to over 35+
              countries globally.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 bg-[#D71920] hover:bg-[#052A63] text-white px-8 py-3.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all duration-300"
              >
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#052A63] text-[#052A63] hover:bg-[#052A63] hover:text-white px-8 py-3.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="relative">
            <img
              src="/img/home/about-2.png"
              alt="Manufacturing Excellence"
              className="
    w-full
    rounded-2xl
    shadow-2xl

    h-auto
    sm:h-[350px]
    md:h-[420px]
    lg:h-[400px]

    object-contain
    md:object-cover
    lg:object-cover

    bg-white
  "
            />
            <div className="absolute -bottom-6 -left-6 bg-[#052A63] text-white p-6 rounded-2xl shadow-xl hidden sm:block">
              <p className="text-4xl font-bold text-[#D71920]">25+</p>
              <p className="text-sm mt-1">
                Years of
                <br />
                Excellence
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* VISION & MISSION */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-[#F5F7FA] rounded-2xl p-8 border border-slate-100 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-[#D71920] text-white flex items-center justify-center mb-6">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-[#052A63] mb-4">
              Our Vision
            </h3>
            <p className="text-slate-600 leading-relaxed">
              To be the most trusted and preferred metal solutions provider
              globally, known for our uncompromising quality, innovative
              approach, and unwavering commitment to customer success.
            </p>
          </div>

          <div className="bg-[#F5F7FA] rounded-2xl p-8 border border-slate-100 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-[#D71920] text-white flex items-center justify-center mb-6">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-[#052A63] mb-4">
              Our Mission
            </h3>
            <p className="text-slate-600 leading-relaxed">
              To deliver premium metal products that meet international
              standards, provide exceptional customer service, and contribute to
              the growth of industries worldwide through sustainable
              manufacturing.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CORE VALUES */}
        {/* ============================================================ */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-[#D71920] font-semibold tracking-wider text-sm uppercase">
              Our Core Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#052A63] mt-2">
              What Drives Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-[#D71920]/30 hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-[#D71920]/10 text-[#D71920] flex items-center justify-center mx-auto mb-5 group-hover:bg-[#D71920] group-hover:text-white transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-[#052A63] mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* STATS SECTION */}
        {/* ============================================================ */}
        <div className="bg-gradient-to-br from-[#052A63] via-[#0A3D91] to-[#052A63] rounded-3xl p-10 md:p-14 mb-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#D71920]/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#D71920]/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              Trusted By Industries Worldwide
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="text-5xl font-bold text-[#D71920]">25+</p>
                <p className="text-white/80 mt-2 text-sm">Years Experience</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-[#D71920]">1000+</p>
                <p className="text-white/80 mt-2 text-sm">Happy Clients</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-[#D71920]">35+</p>
                <p className="text-white/80 mt-2 text-sm">Export Countries</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-[#D71920]">500+</p>
                <p className="text-white/80 mt-2 text-sm">Products Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* WHY CHOOSE US */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <span className="text-[#D71920] font-semibold tracking-wider text-sm uppercase">
              Our Promise
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#052A63] mt-2 mb-6">
              Why Choose Angel Metal India?
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              We understand that choosing the right metal supplier is critical
              to your business. That's why we go above and beyond to ensure
              every product we deliver meets your exact specifications and
              quality standards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyChooseUs.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D71920] mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 font-medium text-sm">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#F5F7FA] rounded-2xl p-6 text-center">
              <Factory className="w-10 h-10 text-[#D71920] mx-auto mb-3" />
              <h3 className="font-bold text-[#052A63]">Advanced Facilities</h3>
            </div>
            <div className="bg-[#F5F7FA] rounded-2xl p-6 text-center">
              <Award className="w-10 h-10 text-[#D71920] mx-auto mb-3" />
              <h3 className="font-bold text-[#052A63]">ISO Certified</h3>
            </div>
            <div className="bg-[#F5F7FA] rounded-2xl p-6 text-center">
              <ShieldCheck className="w-10 h-10 text-[#D71920] mx-auto mb-3" />
              <h3 className="font-bold text-[#052A63]">Premium Quality</h3>
            </div>
            <div className="bg-[#F5F7FA] rounded-2xl p-6 text-center">
              <Globe className="w-10 h-10 text-[#D71920] mx-auto mb-3" />
              <h3 className="font-bold text-[#052A63]">Global Exports</h3>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* COMPANY DETAILS SECTION (Your Information) */}
        {/* ============================================================ */}
        <div className="bg-[#F5F7FA] rounded-3xl p-8 md:p-12 border border-slate-100">
          <div className="text-center mb-10">
            <span className="text-[#D71920] font-semibold tracking-wider text-sm uppercase">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#052A63] mt-2">
              Company Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#D71920] text-white flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[#052A63] text-lg">
                    Company Name
                  </h3>
                  <p className="text-slate-600 mt-1">ANGEL METAL INDIA</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#D71920] text-white flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[#052A63] text-lg">
                    Registered Address
                  </h3>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    Shop No-7, Gr. Floor, 66-Cooper Building, T.P. Street,
                    Kumbharwada Lane, Mumbai - 400004.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#D71920] text-white flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[#052A63] text-lg">
                    Proprietor
                  </h3>
                  <p className="text-slate-600 mt-1">Mr. Ramesh Bishnoi</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#D71920] text-white flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[#052A63] text-lg">
                    Contact Person (Sales Dept)
                  </h3>
                  <p className="text-slate-600 mt-1">Mahesh Bishnoi</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#D71920] text-white flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[#052A63] text-lg">
                    Phone Numbers
                  </h3>
                  <p className="text-slate-600 mt-1">
                    <a
                      href="tel:+919029517398"
                      className="hover:text-[#D71920]"
                    >
                      +91 90295 17398
                    </a>
                    <br />
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
                <div className="w-12 h-12 rounded-lg bg-[#D71920] text-white flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[#052A63] text-lg">Email ID</h3>
                  <p className="text-slate-600 mt-1">
                    <a
                      href="mailto:angelmetalindia@gmail.com"
                      className="hover:text-[#D71920] break-all"
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
    </div>
  );
};

export default About;
