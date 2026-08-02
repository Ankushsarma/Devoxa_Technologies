import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, EB_Garamond, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import ErrorSuppressor from '@/components/ErrorSuppressor'
const inter = Inter({
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap'
})

const serif = EB_Garamond({
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap'
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-mono',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Devoxa Technologies — Digital Experiences',
  description: 'Devoxa Technologies (Devoxa Technologies) — Crafting immersive digital experiences through web development, mobile apps, and AI solutions. Founded by Nayab Gauhar & Nikhil Raj, Bihar, India.',
  keywords: ['digital agency', 'web design', 'web development', 'brand strategy', 'motion design', 'creative studio', 'UI/UX design', 'Devoxa Technologies', 'Nayab Gauhar', 'Nikhil Raj', 'Bihar', 'India'],
  authors: [{ name: 'Nayab Gauhar' }, { name: 'Nikhil Raj' }],
  creator: 'Devoxa Technologies',
  metadataBase: new URL('https://devoxa.tech'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://devoxa.tech',
    siteName: 'Devoxa Technologies',
    title: 'Devoxa Technologies | Digital Agency from Bihar',
    description: 'Crafting immersive digital dreams that push boundaries and captivate audiences worldwide.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Devoxa Technologies' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devoxa Technologies — Devoxa Technologies',
    description: 'We craft immersive digital experiences that push boundaries and captivate audiences worldwide.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  verification: {
    google: 'BwK20MlSAMMtxGYImJgqt5Ve5GP5wQT0ABMnyKeAYrc',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themecolor: "#f1eef1",
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Devoxa Technologies',
  description: 'Devoxa Technologies — A creative digital studio from Bihar, India.',
  url: 'https://devoxa.tech',
  foundingDate: '2020',
  founders: [
    { '@type': 'Person', name: 'Nayab Gauhar' },
    { '@type': 'Person', name: 'Nikhil Raj' },
  ],
  address: { '@type': 'PostalAddress', addressLocality: 'Bihar', addressCountry: 'India' },
  contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: 'support@beyondyourimagination.shop', telephone: '+91-8544005858' },
}

import { Toaster } from "sonner"
import { AuthProvider } from "@/context/auth-context"
import GlobalFooter from "@/components/GlobalFooter"

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>

                <Script
          id="fast-scroll"
          dangerouslySetInnerHTML={{
            __html: `
              let scrollTimeout;
              window.addEventListener('scroll', function() {
                if(!document.body.classList.contains('fast-scroll')) {
                  document.body.classList.add('fast-scroll');
                }
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(function() {
                  document.body.classList.remove('fast-scroll');
                }, 150);
              }, { passive: true });
            `
          }}
        />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <style dangerouslySetInnerHTML={{ __html: `html.scroll-restoring body { opacity: 0; } html.scroll-restoring-done body { transition: opacity 0.4s ease-out; opacity: 1; }` }} />
        <Script
          id="scroll-restore"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (window.location.pathname === '/' && (sessionStorage.getItem("homeScroll") || sessionStorage.getItem("homeMobileScroll"))) {
                  document.documentElement.classList.add("scroll-restoring");
                }
              } catch (e) {}
            `
          }}
        />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${serif.variable} ${mono.variable} antialiased bg-transparent text-foreground font-sans selection:bg-theme-900 selection:text-[#f1eef1] overflow-x-hidden`}>
        <ErrorSuppressor />
        <AuthProvider>
          {children}
          <GlobalFooter />
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  )
}
