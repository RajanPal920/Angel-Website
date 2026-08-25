import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  User,
  Building2,
  Send,
  ChevronDown,
  Clock,
} from "lucide-react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📧 THIS MAKES THE FORM WORK - OPENS EMAIL CLIENT DIRECTLY
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const recipient = "angelmetalindia@gmail.com";
    const subject = encodeURIComponent(
      formData.subject || "New Enquiry from Website",
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`,
    );

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* ============================================================ */}
      {/* HERO SECTION - DESKTOP */}
      {/* ============================================================ */}
      <div className="hidden md:flex relative w-full h-[85vh] items-center justify-center bg-gradient-to-br from-[#052A63] via-[#0A3D91] to-[#052A63] overflow-hidden">
        <img
          src="/img/home/contact.png"
          alt="Contact Us Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#052A63]/80 via-[#052A63]/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#052A63]/60 via-transparent to-transparent"></div>

        <div className="relative z-10 text-center px-4">
          <span className="inline-block bg-[#D71920] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 uppercase tracking-tight">
            Contact <span className="text-[#D71920]">Us</span>
          </h1>
          <div className="h-[3px] w-24 bg-[#D71920] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-white/90 text-sm md:text-lg">
            We are here to help with all your metal requirements. Reach out to
            our expert team today for quotes, specifications, and support.
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
          src="/img/home/contact.png"
          alt="Contact Us Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#052A63]/80 via-[#052A63]/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#052A63]/60 via-transparent to-transparent"></div>

        <div className="relative z-10 text-center px-4">
          <span className="inline-block bg-[#D71920] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            Get In Touch
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 uppercase tracking-tight">
            Contact <span className="text-[#D71920]">Us</span>
          </h1>
          <div className="h-[3px] w-24 bg-[#D71920] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-white/90 text-sm">
            We are here to help with all your metal requirements. Reach out to
            our expert team today for quotes, specifications, and support.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* ============================================================ */}
        {/* WHY CONTACT US (Related Text) */}
        {/* ============================================================ */}
        <div className="text-center mb-12">
          <span className="text-[#D71920] font-semibold tracking-wider text-sm uppercase">
            Why Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#052A63] mt-2 mb-4">
            We're Here To Help You
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Whether you need a quote, technical specifications, or have a custom
            project in mind, our sales team is ready to assist you with fast,
            reliable service.
          </p>
        </div>

        {/* ============================================================ */}
        {/* CONTACT INFO CARDS */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-[#F5F7FA] rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-[#D71920] text-white flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#052A63] mb-2">Phone</h3>
            <p className="text-slate-600 text-sm">
              <a
                href="tel:+919029517398"
                className="block hover:text-[#D71920]"
              >
                +91 90295 17398
              </a>
              <a
                href="tel:+918169810880"
                className="block hover:text-[#D71920]"
              >
                +91 81698 10880
              </a>
            </p>
          </div>

          <div className="bg-[#F5F7FA] rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-[#D71920] text-white flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#052A63] mb-2">Email</h3>
            <p className="text-slate-600 text-sm">
              <a
                href="mailto:angelmetalindia@gmail.com"
                className="hover:text-[#D71920] break-all"
              >
                angelmetalindia@gmail.com
              </a>
            </p>
          </div>

          <div className="bg-[#F5F7FA] rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-[#D71920] text-white flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#052A63] mb-2">Address</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Shop No-7, Gr. Floor, 66-Cooper Building, T.P. Street, Kumbharwada
              Lane, Mumbai - 400004.
            </p>
          </div>

          <div className="bg-[#F5F7FA] rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-[#D71920] text-white flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#052A63] mb-2">
              Working Hours
            </h3>
            <p className="text-slate-600 text-sm">
              Mon - Sat: 9:00 AM - 7:00 PM
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CONTACT FORM + COMPANY DETAILS (Equal Height) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* LEFT: Contact Form (Full Height) */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-100 h-full flex flex-col">
            <h2 className="text-2xl font-bold text-[#052A63] mb-2">
              Send Us An Enquiry
            </h2>
            <p className="text-slate-600 mb-6">
              Fill out the form below and we will get back to you shortly.
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 flex-grow flex flex-col"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#052A63] mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#D71920] focus:ring-2 focus:ring-[#D71920]/20 outline-none transition-all bg-slate-50"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#052A63] mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#D71920] focus:ring-2 focus:ring-[#D71920]/20 outline-none transition-all bg-slate-50"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#052A63] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#D71920] focus:ring-2 focus:ring-[#D71920]/20 outline-none transition-all bg-slate-50"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#052A63] mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#D71920] focus:ring-2 focus:ring-[#D71920]/20 outline-none transition-all bg-slate-50"
                    placeholder="How can we help?"
                  />
                </div>
              </div>

              <div className="flex-grow">
                <label className="block text-sm font-semibold text-[#052A63] mb-2">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full h-full min-h-[150px] px-4 py-3 rounded-lg border border-slate-200 focus:border-[#D71920] focus:ring-2 focus:ring-[#D71920]/20 outline-none transition-all resize-none bg-slate-50"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#D71920] hover:bg-[#052A63] text-white py-3.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 mt-auto"
              >
                Send Enquiry <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* RIGHT: Company Details (Full Height) */}
          <div className="bg-[#F5F7FA] rounded-xl p-8 h-full">
            <h2 className="text-2xl font-bold text-[#052A63] mb-6">
              Company Details
            </h2>

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

        {/* ============================================================ */}
        {/* FULL WIDTH MAP (Height 50vh) */}
        {/* ============================================================ */}
        <div className="w-full rounded-xl overflow-hidden shadow-lg border border-slate-100">
          <iframe
            title="Angel Metal India Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.706906594375!2d72.8214223!3d18.9579217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce3e6fffffff%3A0xd8802a296520147e!2sAngel%20Steel%20Industries!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="500"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[50vh] w-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
