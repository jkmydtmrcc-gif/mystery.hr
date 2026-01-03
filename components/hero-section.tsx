"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { categories } from "@/lib/products-data"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="bg-gradient-to-b from-card/50 to-background py-2 md:py-3">
      <div className="container mx-auto px-3">
        <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 md:flex-nowrap md:overflow-x-auto md:justify-start md:scrollbar-hide">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/kategorije/${cat.id}`}
              className="group relative flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium text-white transition-all duration-300 md:shrink-0 md:px-3 md:py-1.5 md:text-xs"
              style={{
                background: `linear-gradient(135deg, ${cat.glowColor}90, ${cat.glowColor}60)`,
                boxShadow: `0 0 15px ${cat.glowColor}60, 0 0 30px ${cat.glowColor}30, 0 4px 15px rgba(0,0,0,0.3)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 25px ${cat.glowColor}90, 0 0 50px ${cat.glowColor}50, 0 0 75px ${cat.glowColor}30, 0 4px 20px rgba(0,0,0,0.4)`
                e.currentTarget.style.transform = "scale(1.05)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 15px ${cat.glowColor}60, 0 0 30px ${cat.glowColor}30, 0 4px 15px rgba(0,0,0,0.3)`
                e.currentTarget.style.transform = "scale(1)"
              }}
            >
              <span className="text-xs drop-shadow-lg md:text-sm">{cat.icon}</span>
              <span className="drop-shadow-md">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
