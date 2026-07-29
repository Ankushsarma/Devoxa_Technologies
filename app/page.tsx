"use client"

import HomePageDesktop from "@/components/HomePageDesktop"
import HomePageMobile from "@/components/HomePageMobile"

export default function Home() {
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
