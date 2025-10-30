import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ConnectWalletButton } from "./ConnectWalletButton";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  // Detect scroll to change header background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  // Close mobile menu on outside click or Escape
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !(e.target as HTMLElement).closest(".mobile-menu") &&
        !(e.target as HTMLElement).closest(".hamburger-btn")
      ) {
        setIsMenuOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#e2b8e6]/95 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-lg">
                <img
                  src="https://i.pinimg.com/736x/2a/b8/93/2ab89346194ee5eea1e1990da184629d.jpg"
                  alt="Face-Fit Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold text-[#b1006e]">
                face-fit
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-gray-800 hover:text-[#b1006e] font-medium transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#b1006e] transition-all duration-300 group-hover:w-full"></span>
                </motion.button>
              ))}

              {/* Wallet Button */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <ConnectWalletButton />
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="hamburger-btn md:hidden p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center w-12 h-12"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-[#b1006e]" />
              ) : (
                <Menu className="w-6 h-6 text-[#b1006e]" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - Left Drawer */}
      <div
        className={`mobile-menu fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setIsMenuOpen(false)}
        />
        {/* Drawer */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: isMenuOpen ? 0 : "-100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="absolute top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 flex flex-col p-8 gap-6"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="self-end p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-[#e2b8e6] shadow-lg">
              <img
                src="https://media.istockphoto.com/id/1411160815/photo/a-stylish-young-black-woman-with-an-afro-and-a-trendy-style-portrait-of-an-african-high.jpg?b=1&s=612x612&w=0&k=20&c=SwXiH8FYPUTPUk96qd0F8P3fnwPVuLv2XJivlmbVqs4="
                alt="Face-Fit Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-2xl font-bold text-[#b1006e]">
              face-fit
            </span>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col gap-4 flex-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="w-full text-left text-gray-800 hover:text-[#b1006e] font-medium px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors duration-200 text-lg"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-2">
              <ConnectWalletButton />
            </div>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              © 2025 Face-Fit. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Header;
