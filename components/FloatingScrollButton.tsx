'use client';
import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function FloatingScrollButton() {
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (isScrolledDown) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const mobileWrapper = document.querySelector('.block.lg\\:hidden');
      const footerEl = mobileWrapper ? (mobileWrapper.querySelector("footer") || mobileWrapper.querySelector("#footer")) : document.querySelector("footer");
      if (footerEl) {
        footerEl.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isScrolledDown ? "Scroll to top" : "Scroll to footer"}
      className="fixed bottom-6 right-5 z-40 w-11 h-11 rounded-full bg-gradient-to-tr from-violet-600 via-purple-600 to-fuchsia-600 p-[1.5px] shadow-[0_0_25px_rgba(147,51,234,0.65)] hover:shadow-[0_0_35px_rgba(168,85,247,0.85)] active:scale-90 transition-all duration-300 flex items-center justify-center cursor-pointer block lg:hidden"
    >
      <div className="w-full h-full rounded-full bg-[#080514] flex items-center justify-center transition-colors hover:bg-purple-950/60">
        {isScrolledDown ? (
          <ChevronUp className="w-5 h-5 text-white animate-bounce" />
        ) : (
          <ChevronDown className="w-5 h-5 text-white animate-bounce" />
        )}
      </div>
    </button>
  );
}
