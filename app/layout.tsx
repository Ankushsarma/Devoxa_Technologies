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
  description: 'Devoxa Technologies (Devoxa Technologies) — Crafting immersive digital experiences through web development, mobile apps, and AI solutions. Founded by Nikhil Kumar & Ankush Sharma, Bihar, India.',
  keywords: ['digital agency', 'web design', 'web development', 'brand strategy', 'motion design', 'creative studio', 'UI/UX design', 'Devoxa Technologies', 'Nikhil Kumar', 'Ankush Sharma', 'Bihar', 'India'],
  authors: [{ name: 'Ankush Sharma' }, { name: 'Nikhil Kumar' }],
  creator: 'Devoxa Technologies',
  metadataBase: new URL('https://devoxatechnologies.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://devoxatechnologies.com',
    siteName: 'Devoxa Technologies',
    title: 'Devoxa Technologies | Digital Agency from Bihar',
    description: 'Crafting immersive digital dreams that push boundaries and captivate audiences worldwide.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devoxa Technologies — Devoxa Technologies',
    description: 'We craft immersive digital experiences that push boundaries and captivate audiences worldwide.',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
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
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://devoxatechnologies.com/#organization',
      name: 'Devoxa Technologies',
      legalName: 'Devoxa Technologies',
      alternateName: 'DevoxaTech',
      description: 'Devoxa Technologies is an innovative IT company and creative digital studio based in Bihar, India. Founded by Nikhil Kumar and Ankush Sharma, we specialize in web development, mobile applications, cloud infrastructure, AI automation, and enterprise-grade software solutions.',
      url: 'https://devoxatechnologies.com',
      logo: 'https://devoxatechnologies.com/logo.png',
      foundingDate: '2020',
      founders: [
        { '@type': 'Person', name: 'Nikhil Kumar' },
        { '@type': 'Person', name: 'Ankush Sharma' }
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bihar',
        addressRegion: 'Bihar',
        addressCountry: 'India'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'support@beyondyourimagination.shop',
        telephone: '+91-8544005858',
        availableLanguage: ['English', 'Hindi']
      },
      sameAs: [
        'https://www.linkedin.com/in/devoxa-technologies-b6717b428/',
        'https://twitter.com/devoxatech',
        'https://instagram.com/devoxatech'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://devoxatechnologies.com/#website',
      url: 'https://devoxatechnologies.com',
      name: 'Devoxa Technologies',
      description: 'Enterprise IT Solutions, AI Automation & Digital Experiences',
      publisher: {
        '@id': 'https://devoxatechnologies.com/#organization'
      }
    }
  ]
}

import { Toaster } from "sonner"
import { AuthProvider } from "@/context/auth-context"
import { PerformanceProvider } from "@/context/PerformanceContext"
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
        <PerformanceProvider>
          <AuthProvider>
            {children}
            <GlobalFooter />
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </PerformanceProvider>
      </body>
    </html>
  )
}