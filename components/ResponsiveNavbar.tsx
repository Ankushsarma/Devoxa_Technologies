"use client"

import React, { useState, useEffect } from 'react';

export default function ResponsiveNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hook to detect scroll for styling changes
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hook to close mobile menu if window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#110D1F]/90 backdrop-blur-md shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      {/* 
        Container dynamically adapts: 
        px-4 for mobile (320px+)
        md:px-8 for tablets
        2xl:px-16 for ultra-wide desktops
      */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 2xl:px-16 flex justify-between items-center">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-2 z-50 relative">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold font-serif italic text-xl">D</span>
          </div>
          <span className="text-white font-semibold text-lg tracking-wide hidden sm:block">
            Devoxa
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Features', 'Pricing', 'About'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Desktop Call to Action */}
        <div className="hidden md:block">
          <button className="px-5 py-2.5 bg-white text-[#110D1F] text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 z-50 relative focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden fixed inset-0 bg-[#110D1F] z-40 transition-transform duration-300 ease-in-out flex flex-col items-center justify-center space-y-8 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {['Home', 'Features', 'Pricing', 'About'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-bold text-white hover:text-purple-400 transition-colors"
          >
            {item}
          </a>
        ))}
        <button className="mt-4 px-8 py-3 bg-white text-[#110D1F] font-bold rounded-lg hover:bg-gray-200 transition-colors">
          Get Started
        </button>
      </div>
    </nav>
  );
}
