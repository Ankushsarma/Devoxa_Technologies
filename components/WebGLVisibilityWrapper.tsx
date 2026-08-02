'use client';

import React, { useRef, useState, useEffect } from 'react';

interface WebGLVisibilityWrapperProps {
  children: React.ReactNode;
  rootMargin?: string;
  isAbsolute?: boolean;
}

export default function WebGLVisibilityWrapper({
  children,
  rootMargin = '400px', // Pre-load 400px before scrolling into view
  isAbsolute = true,
}: WebGLVisibilityWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasMounted(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        rootMargin,
        threshold: 0,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return (
    <div
      ref={containerRef}
      style={{
        position: isAbsolute ? 'absolute' : 'relative',
        top: isAbsolute ? 0 : 'auto',
        left: isAbsolute ? 0 : 'auto',
        width: '100%',
        height: '100%',
        zIndex: isAbsolute ? 0 : 'auto',
        pointerEvents: isAbsolute ? 'none' : 'auto',
      }}
    >
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          pointerEvents: 'auto',
          width: '100%',
          height: '100%',
          display: isVisible ? 'block' : 'none',
          visibility: isVisible ? 'visible' : 'hidden',
        }}
      >
        {hasMounted ? children : null}
      </div>
    </div>
  );
}
