import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CookieConsent } from "@/components/cookie-consent"
import { Toaster } from "@/components/ui/toaster"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })
const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-sans" })

export const metadata: Metadata = {
  metadataBase: new URL("https://mystery.hr"),
  title: {
    default: "mystery.hr | Premium Mystery Boxovi u Hrvatskoj - Luksuzna Iznenađenja",
    template: "%s | mystery.hr",
  },
  description:
    "Otkrijte uzbuđenje nepoznatog s premium mystery boxovima na mystery.hr! Sport, Gaming, Tech, TV serije, Odjeća i još mnogo toga. Vrijednost proizvoda daleko premašuje cijenu. Brza i sigurna dostava diljem Hrvatske. Qube d.o.o. Osijek.",
  keywords: [
    "mystery box",
    "mystery box hrvatska",
    "mystery.hr",
    "premium mystery box",
    "luksuzni pokloni",
    "iznenađenje box",
    "poklon ideje",
    "sport mystery box",
    "gaming mystery box",
    "tech mystery box",
    "tv serije box",
    "odjeća mystery box",
    "online kupovina hrvatska",
    "poklon za njega",
    "poklon za nju",
    "birthday gift box",
    "surprise box croatia",
    "qube d.o.o.",
  ],
  authors: [{ name: "qube d.o.o.", url: "https://mystery.hr" }],
  creator: "qube d.o.o.",
  publisher: "mystery.hr",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "mystery.hr | Premium Mystery Boxovi - Luksuzna Iznenađenja",
    description:
      "Otkrijte uzbuđenje nepoznatog s premium mystery boxovima! Sport, Gaming, Tech, TV i više. Vrijednost proizvoda daleko premašuje cijenu!",
    url: "https://mystery.hr",
    siteName: "mystery.hr",
    locale: "hr_HR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "mystery.hr - Premium Mystery Boxovi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "mystery.hr | Premium Mystery Boxovi",
    description: "Otkrijte uzbuđenje nepoznatog s premium mystery boxovima! Vrijednost daleko premašuje cijenu!",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://mystery.hr",
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "ecommerce",
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="hr" className={`${playfair.variable} ${inter.variable} dark bg-background`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "mystery.hr",
              url: "https://mystery.hr",
              description: "Premium Mystery Boxovi u Hrvatskoj",
              publisher: {
                "@type": "Organization",
                name: "qube d.o.o.",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Osijek",
                  addressCountry: "HR",
                },
                email: "qube.reach@gmail.com",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://mystery.hr/pretraga?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "mystery.hr",
              url: "https://mystery.hr",
              description: "Premium Mystery Boxovi - Sport, Gaming, Tech, TV i više",
              priceRange: "€€",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Osijek",
                addressCountry: "HR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "45.5550",
                longitude: "18.6955",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "00:00",
                closes: "23:59",
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        <CookieConsent />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
