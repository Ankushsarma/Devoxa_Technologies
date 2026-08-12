"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

type VisibilityContextType = {
  isVisible: boolean;
};

export const VisibilityContext = createContext<VisibilityContextType>({
  isVisible: false,
});

export const useVisibility = () => useContext(VisibilityContext);

// rootMargin defaults to "0px" so canvases only run when actually in viewport.
// Inner components that use useVisibility() will receive isVisible=false and
// should pause their RAF loops, reducing GPU/CPU load for off-screen sections.
export default function CanvasVisibilityWrapper({
  children,
  rootMargin = "0px",
}: {
  children: React.ReactNode;
  rootMargin?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin,
        threshold: [0, 0.05, 0.1, 0.5],
      }
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
