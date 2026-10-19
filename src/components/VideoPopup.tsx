"use client";

import { useState, useEffect } from "react";

export default function VideoPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the popup after scrolling down 400 pixels, 
      // but ONLY if the user hasn't actively closed it yet.
      if (window.scrollY > 400 && !hasClosed) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasClosed]);

  // If it shouldn't be visible, render nothing
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 w-[85vw] max-w-sm bg-white rounded-xl shadow-2xl z-50 overflow-hidden border border-gray-200 animate-fade-in-up">
      {/* Popup Header */}
      <div className="p-3 bg-brand-blue text-white flex justify-between items-center">
        <span className="font-bold text-sm">Career Lighthouse Concept</span>
        <button
          onClick={() => {
            setIsVisible(false);
            setHasClosed(true);
          }}
          className="text-white hover:text-brand-pink transition-colors font-bold w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20"
          aria-label="Close video"
        >
          ✕
        </button>
      </div>
      
      {/* Video Player */}
      <div className="aspect-video w-full bg-black">
        <video 
          controls 
          autoPlay 
          muted 
          className="w-full h-full object-cover"
        >
          <source src="/career-lighthouse.mp4.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}