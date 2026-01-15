"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Star,
  ShoppingCart,
  Shield,
  Truck,
  RotateCcw,
  Check,
  Clock,
  Gift,
  Minus,
  Plus,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { categories } from "@/lib/products-data"
import { BoxContent } from "@/components/box-content"
import { getBoxContentForProduct } from "@/lib/box-content-data"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice: number
  image: string
  rating: number
  reviews: number
  stock: number
  potentialValue: string
  badge?: string
  items?: string
  description: string
  includes: string[]
  gallery: string[]
  category: string
  dominantColor: string
}

const DEFAULT_BOX_VIDEO = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f0fd4258-0e86-47d4-8f1e-2f6acdaec1f5-01HQZKGQHKHMWZ9XRD3ES7ZATJ.webm.webm"

function saveCartToLocal(cart: any[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("mystery_cart", JSON.stringify(cart))
  }
}

export function ProductDetails({ product }: { product: Product }) {
  const [mounted, setMounted] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 59, seconds: 59 })
  const [viewers, setViewers] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const category = categories.find((c) => c.id === product.category)

  const boxContentItems = getBoxContentForProduct(product.slug, product.category)

  const galleryWithVideo = [DEFAULT_BOX_VIDEO, ...product.gallery.filter((item) => !item.endsWith(".webm"))]

  useEffect(() => {
    setMounted(true)
    setViewers(Math.floor(Math.random() * 20) + 15)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return { hours: 5, minutes: 59, seconds: 59 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    const interval = setInterval(() => {
      setViewers((prev) => Math.max(10, prev + Math.floor(Math.random() * 3) - 1))
    }, 15000)
    return () => clearInterval(interval)
  }, [mounted])

  const addToCart = async () => {
    setIsAddingToCart(true)

    const newItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    }

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: newItem }),
        credentials: "include",
      })

      const data = await res.json()

      if (res.ok && data.success) {
        saveCartToLocal(data.cart)

        toast({
          title: "Dodano u košaricu!",
          description: `${product.name} (${quantity}x) je dodan u vašu košaricu.`,
        })

        window.dispatchEvent(new Event("cartUpdated"))

        setTimeout(() => {
          router.push("/kosarica")
        }, 300)
      } else {
        throw new Error(data.error || "Failed to add to cart")
      }
    } catch (error) {
      try {
        const existingCart = JSON.parse(localStorage.getItem("mystery_cart") || "[]")
        const existingIndex = existingCart.findIndex((i: any) => i.productId === newItem.productId)

        if (existingIndex >= 0) {
          existingCart[existingIndex].quantity += newItem.quantity
        } else {
          existingCart.push(newItem)
        }

        localStorage.setItem("mystery_cart", JSON.stringify(existingCart))

        toast({
          title: "Dodano u košaricu!",
          description: `${product.name} (${quantity}x) je dodan u vašu košaricu.`,
        })

        window.dispatchEvent(new Event("cartUpdated"))
        setTimeout(() => router.push("/kosarica"), 300)
      } catch {
        toast({
          title: "Greška",
          description: "Nismo uspjeli dodati proizvod u košaricu. Pokušajte ponovo.",
          variant: "destructive",
        })
      }
    } finally {
      setIsAddingToCart(false)
    }
  }

  const discount = Math.round((1 - product.price / product.originalPrice) * 100)

  const currentItem = galleryWithVideo[selectedImage]
  const isVideo = currentItem?.endsWith(".webm") || currentItem?.endsWith(".mp4")

  return (
    <>
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Početna
            </Link>
            <span>/</span>
            <Link href="/kategorije" className="hover:text-foreground transition-colors">
              Kategorije
            </Link>
            <span>/</span>
            <Link href={`/kategorije/${product.category}`} className="hover:text-foreground transition-colors">
              {category?.name}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          {/* Back Link (Mobile) */}
          <Link
            href={`/kategorije/${product.category}`}
            className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground lg:hidden"
          >
            <ChevronLeft className="h-4 w-4" />
            Natrag
          </Link>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Gallery */}
            <div className="space-y-4">
              <div
                className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-secondary/50 to-background transition-all duration-300"
                style={{
                  boxShadow: `0 0 30px ${product.dominantColor}50, 0 0 60px ${product.dominantColor}30, 0 0 90px ${product.dominantColor}20`,
                }}
              >
                {/* Category badge */}
                <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 backdrop-blur-sm">
                  <span>{category?.icon}</span>
                  <span className="text-sm font-medium">{category?.name}</span>
                </div>

                {/* Discount badge */}
                <div className="absolute right-4 top-4 z-10 rounded-lg bg-primary px-3 py-1.5 shadow-lg">
                  <span className="text-sm font-bold text-primary-foreground">-{discount}%</span>
                </div>

                {isVideo ? (
                  <video
                    src={currentItem}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-contain p-8"
                  />
                ) : (
                  <img
                    src={currentItem || product.image}
                    alt={product.name}
                    className="h-full w-full object-contain p-8"
                  />
                )}
              </div>

              {/* Thumbnails - video first */}
              {galleryWithVideo.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {galleryWithVideo.map((item, index) => {
                    const itemIsVideo = item?.endsWith(".webm") || item?.endsWith(".mp4")
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                          selectedImage === index ? "border-primary" : "border-border hover:border-primary/50"
                        }`}
                        style={
                          selectedImage === index
                            ? {
                                boxShadow: `0 0 15px ${product.dominantColor}60, 0 0 25px ${product.dominantColor}30`,
                              }
                            : undefined
                        }
                      >
                        {itemIsVideo ? (
                          <div className="flex h-full w-full items-center justify-center bg-secondary/50">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                              <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        ) : (
                          <img src={item || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {mounted && (
                <div className="mb-4 inline-flex items-center gap-2 self-start rounded-lg border border-primary/30 bg-primary/10 px-3 py-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Ponuda istječe za:{" "}
                    <span className="font-bold text-primary">
                      {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                  </span>
                </div>
              )}

              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Mystery Box</p>

              {/* Title & Rating */}
              <h1 className="mb-2 text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">{product.name}</h1>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} recenzija)</span>
                {mounted && viewers > 0 && (
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                    {viewers} osoba gleda
                  </span>
                )}
              </div>

              <div className="mb-4 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground md:text-4xl">{product.price}€</span>
                <span className="text-lg text-muted-foreground line-through">{product.originalPrice}€</span>
                <span className="rounded-lg bg-green-500/20 px-2 py-1 text-sm font-medium text-green-400">
                  Ušteda {product.originalPrice - product.price}€
                </span>
              </div>

              <div className="mb-6 flex items-center gap-3 rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 to-transparent p-4">
                <Gift className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Potencijalna vrijednost: {product.potentialValue}</p>
                  <p className="text-sm text-muted-foreground">Sadrži {product.items}</p>
                </div>
              </div>

              {product.stock <= 30 && (
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                  <p className="text-sm text-red-400">
                    Samo <span className="font-bold">{product.stock}</span> na zalihi - požurite!
                  </p>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="mb-2 block text-sm text-muted-foreground">Količina</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center text-lg font-bold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                size="lg"
                onClick={addToCart}
                disabled={isAddingToCart}
                className="mb-6 w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg font-bold shadow-lg shadow-primary/25"
              >
                <ShoppingCart className="h-5 w-5" />
                {isAddingToCart ? "Dodajem..." : `Dodaj u Košaricu · ${(product.price * quantity).toFixed(2)}€`}
              </Button>

              <div className="mb-6 grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card/50 p-3 text-center">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">Besplatna dostava</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card/50 p-3 text-center">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">Sigurno plaćanje</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card/50 p-3 text-center">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">14 dana povrat</span>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="description" className="mt-auto">
                <TabsList className="w-full bg-secondary/50">
                  <TabsTrigger value="description" className="flex-1 text-xs">
                    Opis
                  </TabsTrigger>
                  <TabsTrigger value="contents" className="flex-1 text-xs">
                    Uključeno
                  </TabsTrigger>
                  <TabsTrigger value="shipping" className="flex-1 text-xs">
                    Dostava
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                </TabsContent>
                <TabsContent value="contents" className="mt-4">
                  <p className="mb-3 text-sm font-medium text-foreground">Što možete očekivati:</p>
                  <ul className="space-y-2">
                    {product.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="shipping" className="mt-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">Besplatna dostava u Hrvatskoj</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">Isporuka 2-5 radnih dana</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">Diskretno pakiranje</span>
                    </li>
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <BoxContent items={boxContentItems} />
    </>
  )
}
