"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type PerformanceContextType = {
  lowQualityMode: boolean;
};

export const PerformanceContext = createContext<PerformanceContextType>({
  lowQualityMode: false,
});

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  // Default to false so SSR perfectly matches initial client render
  const [lowQualityMode, setLowQualityMode] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let rafId: number;
    let isChecking = true;
    let checkTimeout: NodeJS.Timeout;

    const measureFPS = (currentTime: number) => {
      if (!isChecking) return;
      frameCount++;
      rafId = requestAnimationFrame(measureFPS);
    };

    // Start checking
    rafId = requestAnimationFrame(measureFPS);

    // Stop checking after 3 seconds and calculate average
    checkTimeout = setTimeout(() => {
      isChecking = false;
      cancelAnimationFrame(rafId);
      
      const currentTime = performance.now();
      const elapsed = currentTime - lastTime;
      const fps = (frameCount * 1000) / elapsed;

      // If FPS is extremely poor, trigger low quality mode
      if (fps < 40) {
        console.warn(`[Performance Monitor] Low FPS detected (${Math.round(fps)} FPS). Engaging adaptive resolution for canvas components.`);
        setLowQualityMode(true);
      }
    }, 3000);

    return () => {
      isChecking = false;
      cancelAnimationFrame(rafId);
      clearTimeout(checkTimeout);
    };
  }, []);

  return (
    <PerformanceContext.Provider value={{ lowQualityMode }}>
      {children}
    </PerformanceContext.Provider>
  );
}

export const usePerformance = () => useContext(PerformanceContext);
