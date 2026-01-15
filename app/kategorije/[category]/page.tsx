import Header from "@/components/header"
import Footer from "@/components/footer"
import { categories, getCategoryById, getProductsByCategory } from "@/lib/products-data"
import Link from "next/link"
import { Star, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: categoryId } = await params
  const category = getCategoryById(categoryId)

  if (!category) {
    return { title: "Kategorija nije pronađena | mystery.hr" }
  }

  const products = getProductsByCategory(categoryId)

  return {
    title: `${category.name} Mystery Boxovi | mystery.hr`,
    description: `Istražite ${products.length} ${category.name.toLowerCase()} mystery boxova na mystery.hr. Premium iznenađenja, ekskluzivni proizvodi i sigurna dostava diljem Hrvatske.`,
    keywords: `${category.name.toLowerCase()} mystery box, ${category.name.toLowerCase()} box hrvatska, mystery.hr ${category.name.toLowerCase()}, poklon ${category.name.toLowerCase()}`,
    openGraph: {
      title: `${category.name} Mystery Boxovi | mystery.hr`,
      description: `Istražite ${products.length} ${category.name.toLowerCase()} mystery boxova. Premium iznenađenja po najboljim cijenama!`,
      locale: "hr_HR",
      type: "website",
      siteName: "mystery.hr",
    },
  }
}

function ProductCard({ box }: { box: ReturnType<typeof getProductsByCategory>[0] }) {
  const discount = Math.round((1 - box.price / box.originalPrice) * 100)

  return (
    <Card
      className="group relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/50 product-card-glow"
      style={{
        ["--glow-color" as string]: box.dominantColor || "#8b5cf6",
      }}
    >
      <CardContent className="p-0">
        <Link href={`/proizvod/${box.slug}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-secondary/50">
            {box.tag === "digital" && (
              <div className="absolute left-1 top-1 z-10 rounded bg-blue-500 px-1 py-0.5">
                <span className="text-[8px] font-semibold text-white sm:text-[10px]">DIGITAL</span>
              </div>
            )}

            {box.stock <= 20 && (
              <div className="absolute left-1 bottom-1 z-10 flex items-center gap-0.5 rounded-full bg-destructive px-1 py-0.5">
                <Clock className="h-2 w-2 text-white" />
                <span className="text-[8px] font-medium text-white">{box.stock}</span>
              </div>
            )}

            <div className="absolute right-1 top-1 z-10 rounded bg-primary px-1 py-0.5">
              <span className="text-[8px] font-semibold text-primary-foreground sm:text-[10px]">-{discount}%</span>
            </div>

            <img
              src={box.image || "/placeholder.svg"}
              alt={box.name}
              className="h-full w-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-105 sm:p-3"
            />
          </div>
        </Link>

        <div className="p-1.5 sm:p-3">
          <div className="mb-0.5 flex items-center gap-0.5">
            <Star className="h-2.5 w-2.5 fill-primary text-primary" />
            <span className="text-[9px] font-medium sm:text-xs">{box.rating}</span>
          </div>

          <Link href={`/proizvod/${box.slug}`}>
            <h3 className="mb-0.5 line-clamp-2 text-[10px] font-semibold leading-tight text-foreground transition-colors hover:text-primary sm:text-sm">
              {box.name}
            </h3>
          </Link>

          <div className="mb-1.5 flex items-baseline gap-1">
            <span className="text-xs font-bold text-foreground sm:text-lg">{box.price}€</span>
            <span className="text-[8px] text-muted-foreground line-through sm:text-xs">{box.originalPrice}€</span>
          </div>

          <Button
            asChild
            className="h-6 w-full bg-primary text-[9px] text-primary-foreground hover:bg-primary/90 sm:h-8 sm:text-xs"
          >
            <Link href={`/proizvod/${box.slug}`}>Kupi</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryId } = await params
  const category = getCategoryById(categoryId)

  if (!category) {
    notFound()
  }

  const categoryProducts = getProductsByCategory(categoryId)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="sticky top-14 z-40 border-b border-border/50 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-2 py-2">
          <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-5 md:flex md:flex-nowrap md:gap-2 md:overflow-x-auto md:scrollbar-hide">
            {categories.map((cat) => {
              const isActive = cat.id === categoryId
              return (
                <Link
                  key={cat.id}
                  href={`/kategorije/${cat.id}`}
                  className={`flex flex-col items-center justify-center gap-0.5 rounded-lg px-1.5 py-1.5 text-center transition-all duration-300 md:flex-row md:gap-1.5 md:rounded-full md:px-3 md:py-1.5 ${
                    isActive ? "text-white" : "bg-card/50 text-muted-foreground hover:text-white"
                  }`}
                  style={
                    isActive
                      ? {
                          background: `linear-gradient(135deg, ${cat.glowColor}95, ${cat.glowColor}70)`,
                          boxShadow: `0 0 20px ${cat.glowColor}80, 0 0 40px ${cat.glowColor}50, 0 0 60px ${cat.glowColor}30`,
                        }
                      : {
                          background: `linear-gradient(135deg, ${cat.glowColor}20, ${cat.glowColor}10)`,
                          boxShadow: `0 0 10px ${cat.glowColor}30, inset 0 0 15px ${cat.glowColor}10`,
                          border: `1px solid ${cat.glowColor}40`,
                        }
                  }
                >
                  <span className="text-sm md:text-base">{cat.icon}</span>
                  <span className="text-[9px] font-medium leading-tight md:text-xs">{cat.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <section className="py-2 lg:py-4">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{category.icon}</span>
              <div>
                <h1 className="text-lg font-bold text-foreground sm:text-2xl">{category.name}</h1>
                <p className="text-xs text-muted-foreground">{categoryProducts.length} mystery boxova</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5">
            {categoryProducts.map((box) => (
              <ProductCard key={box.id} box={box} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
