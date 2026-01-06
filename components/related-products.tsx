import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice: number
  image: string
  rating: number
  reviews: number
  potentialValue: string
}

export function RelatedProducts({ products, categoryName }: { products: Product[]; categoryName: string }) {
  if (products.length === 0) return null

  return (
    <section className="border-t border-border py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-xl font-semibold text-foreground md:text-2xl">Više iz kategorije {categoryName}</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            const discount = Math.round((1 - product.price / product.originalPrice) * 100)
            return (
              <Card
                key={product.id}
                className="group overflow-hidden border-border bg-card transition-all hover:border-primary/30"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden bg-secondary/30">
                    <div className="absolute left-3 top-3 z-10 rounded bg-primary px-2 py-0.5">
                      <span className="text-xs font-medium text-primary-foreground">-{discount}%</span>
                    </div>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                    <h3 className="mb-1 font-semibold text-foreground line-clamp-1">{product.name}</h3>
                    <p className="mb-2 text-xs text-muted-foreground">{product.potentialValue}</p>
                    <div className="mb-3 flex items-baseline gap-2">
                      <span className="text-lg font-bold text-foreground">{product.price}€</span>
                      <span className="text-sm text-muted-foreground line-through">{product.originalPrice}€</span>
                    </div>
                    <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                      <Link href={`/proizvod/${product.slug}`}>
                        Pogledaj
                        <ArrowRight className="ml-1 h-3 w-3" />
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
