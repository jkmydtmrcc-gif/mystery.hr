"use client"

import { useState } from "react"

interface BoxItem {
  name: string
  brand: string
  price: number
  chance: number
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  image: string
}

interface BoxContentProps {
  items: BoxItem[]
}

const rarityColors = {
  common: "bg-blue-500",
  uncommon: "bg-cyan-500",
  rare: "bg-green-500",
  epic: "bg-purple-500",
  legendary: "bg-amber-500",
}

const rarityGlow = {
  common: "shadow-blue-500/20",
  uncommon: "shadow-cyan-500/20",
  rare: "shadow-green-500/20",
  epic: "shadow-purple-500/20",
  legendary: "shadow-amber-500/30",
}

export function BoxContent({ items }: BoxContentProps) {
  const [showAll, setShowAll] = useState(false)
  const displayItems = showAll ? items : items.slice(0, 8)

  return (
    <section className="py-8 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">Sadržaj Kutije</h2>
          <p className="mt-1 text-muted-foreground">Otkrij sve dostupne proizvode u ovoj kutiji</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
          {displayItems.map((item, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg ${rarityGlow[item.rarity]}`}
            >
              {/* Rarity bar at top */}
              <div className={`h-1 w-full ${rarityColors[item.rarity]}`} />

              {/* Chance badge */}
              <div className="absolute right-2 top-3 z-10">
                <span className="rounded bg-background/80 px-2 py-0.5 text-xs font-medium text-foreground backdrop-blur-sm">
                  {item.chance < 0.01 ? item.chance.toFixed(3) : item.chance.toFixed(2)}%
                </span>
              </div>

              {/* Rarity indicator bar (left side progress style) */}
              <div className="absolute left-2 top-3 z-10">
                <div className={`h-1.5 w-6 rounded-full ${rarityColors[item.rarity]}`} />
              </div>

              {/* Product image */}
              <div className="relative mx-auto flex aspect-square w-full items-center justify-center p-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="h-auto max-h-24 w-auto max-w-full object-contain transition-transform group-hover:scale-105"
                />
              </div>

              {/* Product info */}
              <div className="p-3 pt-0">
                <h3 className="truncate text-sm font-medium text-foreground">{item.name}</h3>
                <p className="truncate text-xs text-muted-foreground">{item.brand}</p>
                <p className="mt-1 text-sm font-bold text-primary">€{item.price.toFixed(2)}</p>
              </div>

              {/* Bottom rarity bar with percentage visual */}
              <div className="px-3 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full rounded-full ${rarityColors[item.rarity]}`}
                      style={{ width: `${Math.min(item.chance * 10, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{item.chance.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 8 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-card/80"
            >
              {showAll ? "Prikaži manje" : `Prikaži sve (${items.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
