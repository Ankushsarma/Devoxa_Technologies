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

  const isLegalPage = pathname.startsWith('/privacy') || pathname.startsWith('/terms') || pathname.startsWith('/cookie') || pathname.startsWith('/security');

  return (
    <>
      <div className="hidden lg:block w-full [&_footer]:!pb-0 [&_.pb-6]:!pb-0">
        <DesktopFooter 
          style={{ paddingTop: '0px' }} 
          middleSectionStyle={{ paddingTop: '30px', paddingBottom: '30px' }} 
        />
      </div>
      <div className={`block lg:hidden w-full ${isLegalPage ? '[&_footer]:!pt-6 [&>footer>div]:!gap-5 [&_footer_.grid]:!pt-2 [&_footer_.grid]:!gap-4' : ''}`}>
        <MobileFooter />
      </div>
    </>
  );
}
