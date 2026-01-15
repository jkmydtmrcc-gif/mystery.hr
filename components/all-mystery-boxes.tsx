"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Star, Clock, Filter, SortAsc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mysteryBoxes = [
  {
    id: "pet-mystery-box",
    name: "Pet Box",
    price: 35,
    originalPrice: 89,
    image: "/pet-mystery-box.jpg",
    rating: 4.8,
    reviews: 189,
    stock: 8,
    potentialValue: "Do 120€",
    category: "lifestyle",
  },
  {
    id: "sex-mystery-box",
    name: "Sex Box",
    price: 50,
    originalPrice: 139,
    image: "/sex-mystery-box.jpg",
    rating: 4.9,
    reviews: 267,
    stock: 6,
    potentialValue: "Do 220€",
    category: "lifestyle",
  },
  {
    id: "garden-mystery-box",
    name: "Garden Box",
    price: 38,
    originalPrice: 95,
    image: "/garden-mystery-box.jpg",
    rating: 4.6,
    reviews: 145,
    stock: 11,
    potentialValue: "Do 140€",
    category: "lifestyle",
  },
  {
    id: "home-mystery-box",
    name: "Home Box",
    price: 42,
    originalPrice: 109,
    image: "/home-mystery-box.jpg",
    rating: 4.7,
    reviews: 234,
    stock: 9,
    potentialValue: "Do 180€",
    category: "lifestyle",
  },
  {
    id: "tech-mystery-box",
    name: "Tech Box",
    price: 49,
    originalPrice: 129,
    image: "/tech-mystery-box.jpg",
    rating: 4.9,
    reviews: 342,
    stock: 5,
    potentialValue: "Do 200€",
    category: "electronics",
  },
  {
    id: "random-mystery-box",
    name: "Random Box",
    price: 30,
    originalPrice: 79,
    image: "/random-mystery-box.jpg",
    rating: 4.5,
    reviews: 412,
    stock: 15,
    potentialValue: "Do 100€",
    category: "surprise",
  },
  {
    id: "perfume-mystery-box",
    name: "Perfume Box",
    price: 45,
    originalPrice: 119,
    image: "/perfume-mystery-box.jpg",
    rating: 4.8,
    reviews: 287,
    stock: 7,
    potentialValue: "Do 200€",
    category: "beauty",
  },
  {
    id: "beauty-mystery-box",
    name: "Beauty Box",
    price: 39,
    originalPrice: 99,
    image: "/beauty-mystery-box.jpg",
    rating: 4.9,
    reviews: 456,
    stock: 12,
    potentialValue: "Do 150€",
    category: "beauty",
  },
  {
    id: "kid-mystery-box",
    name: "Kid Box",
    price: 33,
    originalPrice: 85,
    image: "/kid-mystery-box.jpg",
    rating: 4.7,
    reviews: 298,
    stock: 10,
    potentialValue: "Do 110€",
    category: "kids",
  },
]

export function AllMysteryBoxes() {
  const [mounted, setMounted] = useState(false)
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("popular")
  const [stocks, setStocks] = useState<number[]>([])

  useEffect(() => {
    setMounted(true)
    setStocks(mysteryBoxes.map((box) => box.stock))
  }, [])

  useEffect(() => {
    if (!mounted) return
    const interval = setInterval(() => {
      setStocks((prev) =>
        prev.map((stock) => {
          if (Math.random() > 0.85 && stock > 1) {
            return stock - 1
          }
          return stock
        }),
      )
    }, 45000)
    return () => clearInterval(interval)
  }, [mounted])

  const filteredBoxes = mysteryBoxes
    .filter((box) => filter === "all" || box.category === filter)
    .sort((a, b) => {
      if (sort === "price-low") return a.price - b.price
      if (sort === "price-high") return b.price - a.price
      if (sort === "rating") return b.rating - a.rating
      return b.reviews - a.reviews
    })

  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">Mystery Boxovi</h1>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Izaberite svoj savršeni box. Svaki sadrži pažljivo odabrane premium proizvode.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[160px] border-border bg-card text-sm">
                <SelectValue placeholder="Kategorija" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Svi Boxovi</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="electronics">Elektronika</SelectItem>
                <SelectItem value="beauty">Beauty</SelectItem>
                <SelectItem value="kids">Djeca</SelectItem>
                <SelectItem value="surprise">Iznenađenje</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <SortAsc className="h-4 w-4 text-muted-foreground" />
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[160px] border-border bg-card text-sm">
                <SelectValue placeholder="Sortiraj" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Najpopularniji</SelectItem>
                <SelectItem value="price-low">Cijena: Niska - Visoka</SelectItem>
                <SelectItem value="price-high">Cijena: Visoka - Niska</SelectItem>
                <SelectItem value="rating">Najbolje ocjenjeni</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBoxes.map((box) => {
            const originalIndex = mysteryBoxes.findIndex((b) => b.id === box.id)
            const currentStock = mounted ? stocks[originalIndex] : box.stock
            const discount = Math.round((1 - box.price / box.originalPrice) * 100)

            return (
              <Card
                key={box.id}
                className="group relative overflow-hidden border-border bg-card transition-all duration-300 hover:border-primary/30"
              >
                <CardContent className="p-0">
                  {/* Image section */}
                  <div className="relative aspect-square overflow-hidden bg-secondary/30">
                    {/* Discount badge */}
                    <div className="absolute left-3 top-3 z-10 rounded bg-primary px-2 py-1">
                      <span className="text-xs font-semibold text-background">-{discount}%</span>
                    </div>

                    {/* Stock indicator */}
                    {currentStock <= 10 && (
                      <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded bg-background/90 px-2 py-1">
                        <Clock className="h-3 w-3 text-foreground" />
                        <span className="text-xs font-medium text-foreground">Još {currentStock}</span>
                      </div>
                    )}

                    <img
                      src={box.image || "/placeholder.svg"}
                      alt={box.name}
                      className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content section */}
                  <div className="p-5">
                    {/* Rating */}
                    <div className="mb-2 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm font-medium text-foreground">{box.rating}</span>
                      <span className="text-sm text-muted-foreground">({box.reviews})</span>
                    </div>

                    {/* Name */}
                    <h3 className="mb-1 font-serif text-xl font-semibold text-foreground">{box.name}</h3>

                    {/* Value indicator */}
                    <p className="mb-3 text-sm text-muted-foreground">Vrijednost: {box.potentialValue}</p>

                    {/* Price */}
                    <div className="mb-4 flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-bold text-foreground">{box.price}€</span>
                      <span className="text-sm text-muted-foreground line-through">{box.originalPrice}€</span>
                    </div>

                    {/* CTA Button */}
                    <Button asChild className="w-full bg-primary text-background hover:bg-primary/90">
                      <Link href={`/mystery-boxes/${box.id}`}>
                        Pogledaj Detalje
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
