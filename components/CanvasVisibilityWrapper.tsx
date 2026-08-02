"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

type VisibilityContextType = {
  isVisible: boolean;
};

export const VisibilityContext = createContext<VisibilityContextType>({
  isVisible: true,
});

export const useVisibility = () => useContext(VisibilityContext);

export default function CanvasVisibilityWrapper({ children, rootMargin = "500px" }: { children: React.ReactNode, rootMargin?: string }) {
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin } 
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className="w-full h-full min-h-[10px]">
      <VisibilityContext.Provider value={{ isVisible }}>
        {children}
      </VisibilityContext.Provider>
    </div>
  );
}
