"use client";

import React, { useEffect, useState, useRef } from 'react';

export default function CanvasVisibilityWrapper({ children, rootMargin = "1000px" }: { children: React.ReactNode, rootMargin?: string }) {
  const [isVisible, setIsVisible] = useState(false);
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
      {isVisible ? children : null}
    </div>
  );
}
