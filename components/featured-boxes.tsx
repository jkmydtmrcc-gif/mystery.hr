"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { products } from "@/lib/products-data"

export function FeaturedBoxes() {
  const [mounted, setMounted] = useState(false)
  const [addingToCart, setAddingToCart] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

  const featuredProducts = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 12)

  const quickAddToCart = async (box: (typeof products)[0]) => {
    setAddingToCart(box.id)
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item: {
            productId: box.id,
            name: box.name,
            price: box.price,
            quantity: 1,
            image: box.image,
          },
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        toast({
          title: "Dodano u košaricu!",
          description: `${box.name} je dodan u vašu košaricu.`,
        })
        window.dispatchEvent(new Event("cartUpdated"))
      } else {
        throw new Error(data.error || "Failed")
      }
    } catch {
      toast({
        title: "Greška",
        description: "Nismo uspjeli dodati proizvod u košaricu.",
        variant: "destructive",
      })
    } finally {
      setAddingToCart(null)
    }
  }

  return (
    <section className="bg-background py-4" id="boxes">
      <div className="container mx-auto px-2">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground sm:text-lg md:text-xl">Popularni Boxovi</h2>
          <Link href="/kategorije" className="text-xs text-primary hover:underline sm:text-sm">
            Vidi sve
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 xl:grid-cols-6">
          {featuredProducts.map((box) => {
            const discount = Math.round((1 - box.price / box.originalPrice) * 100)

            return (
              <Card
                key={box.id}
                className="product-card-glow group relative overflow-hidden border-border/50 bg-card"
                style={{
                  ["--glow-color" as string]: box.dominantColor || "#8b5cf6",
                }}
              >
                <CardContent className="p-0">
                  <Link href={`/proizvod/${box.slug}`} className="block">
                    <div className="relative aspect-square overflow-hidden bg-secondary/50">
                      {box.tag === "digital" && (
                        <div className="absolute left-1 top-1 z-10 rounded bg-blue-500 px-1 py-0.5">
                          <span className="text-[8px] font-semibold text-white">DIGITAL</span>
                        </div>
                      )}

                      <div className="absolute right-1 top-1 z-10 rounded bg-primary px-1 py-0.5">
                        <span className="text-[8px] font-semibold text-primary-foreground">-{discount}%</span>
                      </div>

                      {mounted && box.stock <= 10 && (
                        <div className="absolute bottom-1 left-1 z-10 flex items-center gap-0.5 rounded bg-destructive/90 px-1 py-0.5">
                          <Clock className="h-2 w-2 text-white" />
                          <span className="text-[8px] font-medium text-white">{box.stock}</span>
                        </div>
                      )}

                      <img
                        src={box.image || "/placeholder.svg"}
                        alt={box.name}
                        className="h-full w-full object-contain p-1 transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  <div className="p-1.5 sm:p-2">
                    <div className="mb-0.5 flex items-center gap-0.5">
                      <Star className="h-2.5 w-2.5 fill-primary text-primary" />
                      <span className="text-[9px] font-medium text-muted-foreground">{box.rating}</span>
                    </div>

                    <p className="text-[8px] text-muted-foreground uppercase tracking-wide">Mystery Box</p>

                    <Link href={`/proizvod/${box.slug}`}>
                      <h3 className="mb-1 line-clamp-1 text-[10px] font-semibold text-foreground transition-colors hover:text-primary sm:text-xs">
                        {box.name}
                      </h3>
                    </Link>

                    <div className="mb-1.5 flex items-baseline gap-1">
                      <span className="text-xs font-bold text-foreground sm:text-sm">{box.price}€</span>
                      <span className="text-[9px] text-muted-foreground line-through">{box.originalPrice}€</span>
                    </div>

                    <Button
                      onClick={() => quickAddToCart(box)}
                      disabled={addingToCart === box.id}
                      size="sm"
                      className="h-6 w-full bg-primary text-[9px] text-primary-foreground hover:bg-primary/90 sm:h-7 sm:text-xs"
                    >
                      {addingToCart === box.id ? "..." : "Kupi"}
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

export default FeaturedBoxes
