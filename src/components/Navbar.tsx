"use client"; // Required for interactivity (opening/closing the menu)

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-black tracking-tight active:scale-[0.98] transition-transform">
            Connecting the Dots
          </Link>

          {/* Desktop Menu (Hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-5 lg:space-x-8">
            <Link href="/about" className="text-gray-800 hover:text-brand-pink transition-colors text-sm font-medium">About</Link>
            <Link href="/thought-leadership" className="text-gray-800 hover:text-brand-pink transition-colors text-sm font-medium">Thought Leadership</Link>
            <Link href="/work-and-impact" className="text-gray-800 hover:text-brand-pink transition-colors text-sm font-medium">Work & Impact</Link>
            <Link href="/speaking" className="text-gray-800 hover:text-brand-pink transition-colors text-sm font-medium">Speaking</Link>
            <Link href="/blog" className="text-gray-800 hover:text-brand-pink transition-colors text-sm font-medium">Blog</Link>
            
            <Link href="/contact" className="bg-black text-white px-5 py-2.5 rounded-md hover:bg-gray-800 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 text-sm font-medium shadow-sm">
              Work With Me
            </Link>
          </div>

          {/* Mobile Hamburger Button (Hidden on desktop) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-black active:text-brand-pink active:scale-90 focus:outline-none transition-all duration-200"
              aria-label="Toggle menu"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  /* X Icon */
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  /* Hamburger Icon */
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-xl absolute w-full left-0 z-40">
          <div className="px-6 pt-4 pb-8 space-y-3 flex flex-col">
            <Link href="/about" onClick={() => setIsOpen(false)} className="text-gray-800 active:text-brand-pink active:translate-x-1 transition-all duration-200 text-base font-medium block py-2">
              About
            </Link>
            <Link href="/thought-leadership" onClick={() => setIsOpen(false)} className="text-gray-800 active:text-brand-pink active:translate-x-1 transition-all duration-200 text-base font-medium block py-2">
              Thought Leadership
            </Link>
            <Link href="/work-and-impact" onClick={() => setIsOpen(false)} className="text-gray-800 active:text-brand-pink active:translate-x-1 transition-all duration-200 text-base font-medium block py-2">
              Work & Impact
            </Link>
            <Link href="/speaking" onClick={() => setIsOpen(false)} className="text-gray-800 active:text-brand-pink active:translate-x-1 transition-all duration-200 text-base font-medium block py-2">
              Speaking
            </Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="text-gray-800 active:text-brand-pink active:translate-x-1 transition-all duration-200 text-base font-medium block py-2">
              Blog
            </Link>
            
            <Link href="/contact" onClick={() => setIsOpen(false)} className="bg-black text-white px-6 py-3.5 rounded-md active:bg-gray-800 active:scale-95 transition-all duration-200 font-bold text-center mt-4 shadow-md">
              Work With Me
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}