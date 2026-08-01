"use client";

import { usePathname } from "next/navigation";
import { Footer as DesktopFooter } from "./ui/footer-section";
import { FooterMobile as MobileFooter } from "./ui/footer-section-mobile";

export default function GlobalFooter() {
  const pathname = usePathname();

  // Do not render the global footer on the home page (it handles its own footer)
  // Also exclude authentication and dashboard routes which typically don't need a marketing footer
  if (
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password")
  ) {
    return null;
  }

  return (
    <>
      <div className="hidden lg:block w-full">
        <DesktopFooter 
          style={{ paddingTop: '0px' }} 
          middleSectionStyle={{ paddingTop: '50px', paddingBottom: '30px' }} 
        />
      </div>
      <div className="block lg:hidden w-full">
        <MobileFooter />
      </div>
    </>
  );
}
