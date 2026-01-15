"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { categories } from "@/lib/products-data"
import { Sparkles, X } from "lucide-react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [discountActive, setDiscountActive] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState("")
  const [discountExpired, setDiscountExpired] = useState(false)
  const [showDiscountPopup, setShowDiscountPopup] = useState(true)
  const [showExpiredPopup, setShowExpiredPopup] = useState(true)
  const scrollRef1 = useRef<HTMLDivElement>(null)
  const scrollRef2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    const firstVisit = localStorage.getItem("mystery_first_visit")
    const now = Date.now()

    if (!firstVisit) {
      const expiryTime = now + 24 * 60 * 60 * 1000
      localStorage.setItem("mystery_first_visit", expiryTime.toString())
      setDiscountActive(true)
    } else {
      const expiryTime = Number.parseInt(firstVisit)
      if (now < expiryTime) {
        setDiscountActive(true)
      } else {
        setDiscountExpired(true)
      }
    }
  }, [])

  useEffect(() => {
    if (!mounted || !discountActive) return

    const updateTimer = () => {
      const firstVisit = localStorage.getItem("mystery_first_visit")
      if (!firstVisit) return

      const expiryTime = Number.parseInt(firstVisit)
      const now = Date.now()
      const diff = expiryTime - now

      if (diff <= 0) {
        setDiscountActive(false)
        setDiscountExpired(true)
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeRemaining(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
      )
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [mounted, discountActive])

  useEffect(() => {
    if (!mounted) return

    // Add animation class after mount
    if (scrollRef1.current) {
      scrollRef1.current.style.animation = "scroll-left 30s linear infinite"
    }
    if (scrollRef2.current) {
      scrollRef2.current.style.animation = "scroll-right 30s linear infinite"
    }
  }, [mounted])

  if (!mounted) return null

  const duplicatedCategories = [...categories, ...categories, ...categories]

  return (
    <section className="bg-gradient-to-b from-card/50 to-background py-3 md:py-4">
      <div className="container mx-auto px-3">
        <div className="mb-4 text-center">
          <h1 className="mb-1 text-3xl font-black tracking-tight text-foreground md:text-4xl lg:text-5xl">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-500 bg-clip-text text-transparent">
              mystery.hr
            </span>
          </h1>
          <p className="text-xs text-muted-foreground md:text-sm">
            Otkrij uzbuđenje nepoznatog - premium mystery boxovi
          </p>
        </div>

        {discountActive && timeRemaining && showDiscountPopup && (
          <div className="mb-3 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-purple-600/20 border border-purple-500/30 px-3 py-2 relative">
            <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
            <p className="text-xs text-center text-foreground md:text-sm">
              <span className="font-semibold text-purple-400">Otključali ste Mystery popust</span> jer prvi put
              posjećujete – <span className="font-bold text-pink-400">50% popusta</span> još{" "}
              <span className="font-mono font-bold text-white bg-purple-600/50 px-1.5 py-0.5 rounded">
                {timeRemaining}
              </span>
            </p>
            <button
              onClick={() => setShowDiscountPopup(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {discountExpired && showExpiredPopup && (
          <div className="mb-3 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 px-3 py-2 relative">
            <Sparkles className="h-4 w-4 text-green-400" />
            <p className="text-xs text-center text-foreground md:text-sm">
              <span className="font-semibold text-green-400">Ne brinite, Mystery Sale traje neograničeno!</span>
            </p>
            <button
              onClick={() => setShowExpiredPopup(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-green-300 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="relative overflow-hidden mb-2">
          <div
            ref={scrollRef1}
            className="flex gap-2 whitespace-nowrap"
            style={{ width: "fit-content", animation: "scroll-left 30s linear infinite" }}
          >
            {duplicatedCategories.map((cat, index) => (
              <Link
                key={`row1-${cat.id}-${index}`}
                href={`/kategorije/${cat.id}`}
                className="group relative flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-white transition-all duration-300 md:px-4 md:py-2 md:text-xs hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${cat.glowColor}90, ${cat.glowColor}60)`,
                  boxShadow: `0 0 15px ${cat.glowColor}60, 0 0 30px ${cat.glowColor}30`,
                }}
              >
                <span className="text-sm drop-shadow-lg md:text-base">{cat.icon}</span>
                <span className="drop-shadow-md whitespace-nowrap">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={scrollRef2}
            className="flex gap-2 whitespace-nowrap"
            style={{ width: "fit-content", animation: "scroll-right 30s linear infinite" }}
          >
            {duplicatedCategories.map((cat, index) => (
              <Link
                key={`row2-${cat.id}-${index}`}
                href={`/kategorije/${cat.id}`}
                className="group relative flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-white transition-all duration-300 md:px-4 md:py-2 md:text-xs hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${cat.glowColor}90, ${cat.glowColor}60)`,
                  boxShadow: `0 0 15px ${cat.glowColor}60, 0 0 30px ${cat.glowColor}30`,
                }}
              >
                <span className="text-sm drop-shadow-lg md:text-base">{cat.icon}</span>
                <span className="drop-shadow-md whitespace-nowrap">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
