"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type PerformanceContextType = {
  lowQualityMode: boolean;
};

export const PerformanceContext = createContext<PerformanceContextType>({
  lowQualityMode: false,
});

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  // Detect low-end device immediately (no wait needed)
  const [lowQualityMode, setLowQualityMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const cores = navigator.hardwareConcurrency ?? 8;
    const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    // Trigger low quality immediately for low-end devices
    return isMobile || cores <= 4;
  });

  useEffect(() => {
    // Already in low quality mode — skip FPS check
    if (lowQualityMode) return;

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

    rafId = requestAnimationFrame(measureFPS);

    // Check after 2 seconds (shorter than before)
    checkTimeout = setTimeout(() => {
      isChecking = false;
      cancelAnimationFrame(rafId);

      const currentTime = performance.now();
      const elapsed = currentTime - lastTime;
      const fps = (frameCount * 1000) / elapsed;

      // Lower threshold: trigger at < 50fps instead of 40fps
      if (fps < 50) {
        console.warn(`[Performance Monitor] Low FPS (${Math.round(fps)}fps). Enabling adaptive quality.`);
        setLowQualityMode(true);
      }
    }, 2000);

    return () => {
      isChecking = false;
      cancelAnimationFrame(rafId);
      clearTimeout(checkTimeout);
    };
  }, [lowQualityMode]);

  return (
    <PerformanceContext.Provider value={{ lowQualityMode }}>
      {children}
    </PerformanceContext.Provider>
  );
}

export const usePerformance = () => useContext(PerformanceContext);
