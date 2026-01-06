"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Cookie } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all")
    setIsVisible(false)
  }

  const acceptNecessary = () => {
    localStorage.setItem("cookie-consent", "necessary")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card/95 p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20">
              <Cookie className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-foreground">Koristimo kolačiće</h3>
              <p className="text-sm text-muted-foreground">
                Koristimo kolačiće kako bismo poboljšali vaše iskustvo na našoj stranici. Nastavkom korištenja
                pristajete na našu{" "}
                <Link href="/politika-privatnosti" className="text-primary hover:underline">
                  politiku privatnosti
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="flex shrink-0 gap-3">
            <Button
              variant="outline"
              onClick={acceptNecessary}
              className="border-border text-foreground hover:bg-secondary bg-transparent"
            >
              Samo nužni
            </Button>
            <Button onClick={acceptAll} className="bg-primary text-background hover:bg-gold-dark">
              Prihvati sve
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
