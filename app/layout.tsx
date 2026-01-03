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
  title: "mystery.hr | Premium Mystery Boxovi - Luksuzna Iznenađenja",
  description:
    "Otkrijte luksuzna iznenađenja s našim premium mystery boxovima na mystery.hr. Sport, Gaming, Tech, Home i još mnogo toga. Ekskluzivni proizvodi, višestruka vrijednost, sigurna dostava diljem Hrvatske.",
  keywords:
    "mystery box hrvatska, mystery.hr, luksuzni pokloni, iznenađenje box, premium mystery box, poklon ideje, online kupovina, sport box, gaming box, tech box",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "mystery.hr | Premium Mystery Boxovi - Luksuzna Iznenađenja",
    description:
      "Otkrijte luksuzna iznenađenja s našim premium mystery boxovima na mystery.hr. Vrijednost proizvoda daleko premašuje cijenu!",
    locale: "hr_HR",
    type: "website",
    siteName: "mystery.hr",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="hr" className={`${playfair.variable} ${inter.variable} dark bg-background`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        <CookieConsent />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
