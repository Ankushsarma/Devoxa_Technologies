"use client"

import { useState, useEffect } from "react"
import HomePageDesktop from "@/components/HomePageDesktop"
import HomePageMobile from "@/components/HomePageMobile"

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // PROPERLY UNBEATABLE LOGIC:
  // During SSR and initial Client Hydration, we render BOTH components wrapped
  // in CSS classes to match the server HTML exactly. This completely eliminates
  // "CSS loading issues" (FOUC) and React Hydration Mismatches on the live server.
  if (!mounted) {
    return (
      <>
        <div className="hidden lg:block">
          <HomePageDesktop />
        </div>
        <div className="block lg:hidden">
          <HomePageMobile />
        </div>
      </>
    )
  }

  // Once safely hydrated on the client, we AGGRESSIVELY UNMOUNT the unused
  // layout. This kills all hidden WebGL scenes, setIntervals, and heavy GPU 
  // processes from the background, making the active layout SUPER FAST and smooth.
  return (
    <>
      {!isMobile && <HomePageDesktop />}
      {isMobile && <HomePageMobile />}
    </>
  )
}

