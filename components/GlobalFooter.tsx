"use client"
import { useState, useEffect } from "react"
import { Footer } from "@/components/ui/footer-section"
import { FooterMobile } from "@/components/ui/footer-section-mobile"

export default function GlobalFooter() {
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

  if (!mounted) {
    return (
      <>
        <div className="hidden lg:block">
          <Footer style={{ paddingTop: '0px' }} middleSectionStyle={{ paddingTop: '50px', paddingBottom: '30px' }} />
        </div>
        <div className="block lg:hidden">
          <FooterMobile />
        </div>
      </>
    )
  }

  return (
    <>
      {!isMobile && <Footer style={{ paddingTop: '0px' }} middleSectionStyle={{ paddingTop: '50px', paddingBottom: '30px' }} />}
      {isMobile && <FooterMobile />}
    </>
  )
}
