"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight, Tag, X, ShieldCheck, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useToast } from "@/hooks/use-toast"

interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

interface AppliedCoupon {
  code: string
  type: string
  value: number
  discount: number
}

function getCartFromLocal(): CartItem[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem("mystery_cart") || "[]")
  } catch {
    return []
  }
}

function saveCartToLocal(cart: CartItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("mystery_cart", JSON.stringify(cart))
  }
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null)
  const [couponError, setCouponError] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart", {
        credentials: "include",
        cache: "no-store",
      })

      if (res.ok) {
        const data = await res.json()
        const apiCart = data.cart || []

        if (apiCart.length === 0) {
          const localCart = getCartFromLocal()
          if (localCart.length > 0) {
            setCart(localCart)
            for (const item of localCart) {
              await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ item }),
                credentials: "include",
              })
            }
          }
        } else {
          setCart(apiCart)
          saveCartToLocal(apiCart)
        }
      } else {
        setCart(getCartFromLocal())
      }
    } catch (error) {
      console.error("[v0] Error fetching cart:", error)
      setCart(getCartFromLocal())
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId)
      return
    }

    const newCart = cart.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    setCart(newCart)
    saveCartToLocal(newCart)

    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
        credentials: "include",
      })
      if (res.ok) {
        const data = await res.json()
        setCart(data.cart)
        saveCartToLocal(data.cart)
        window.dispatchEvent(new Event("cartUpdated"))
      }
    } catch (error) {
      console.error("[v0] Error updating cart:", error)
    }
  }

  const removeItem = async (productId: string) => {
    const newCart = cart.filter((item) => item.productId !== productId)
    setCart(newCart)
    saveCartToLocal(newCart)
    window.dispatchEvent(new Event("cartUpdated"))

    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
        credentials: "include",
      })
      if (res.ok) {
        const data = await res.json()
        setCart(data.cart)
        saveCartToLocal(data.cart)
        toast({
          title: "Uklonjeno iz kosarice",
          description: "Proizvod je uspjesno uklonjen.",
        })
      }
    } catch (error) {
      console.error("[v0] Error removing from cart:", error)
    }
  }

  const applyCoupon = async () => {
    if (!couponCode.trim()) return

    setIsApplyingCoupon(true)
    setCouponError("")

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode, subtotal }),
      })

      const data = await res.json()

      if (!res.ok) {
        setCouponError(data.error || "Nevazeci kupon kod")
        setAppliedCoupon(null)
        return
      }

      setAppliedCoupon(data.coupon)
      setCouponCode("")
      toast({
        title: "Kupon primijenjen!",
        description: `Ustedili ste ${data.coupon.discount}€ s kodom ${data.coupon.code}`,
      })
    } catch {
      setCouponError("Greska pri primjeni kupona")
    } finally {
      setIsApplyingCoupon(false)
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    toast({
      title: "Kupon uklonjen",
      description: "Popust je uklonjen s vase narudzbe.",
    })
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = appliedCoupon?.discount || 0
  const total = subtotal - discount

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("hr-HR", {
      style: "currency",
      currency: "EUR",
    }).format(price)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-card" />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <Link
            href="/kategorije"
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Nastavi kupovinu
          </Link>
        </div>

        <h1 className="mb-8 font-serif text-3xl font-bold text-foreground md:text-4xl">Vasa Kosarica</h1>

        {cart.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-card">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">Vasa kosarica je prazna</h2>
            <p className="mb-8 text-muted-foreground">
              Pregledajte nasu ekskluzivnu ponudu mystery boxova i pronadite savrseno iznenadjenje!
            </p>
            <Link href="/kategorije">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Pregledaj Mystery Boxove
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-3 rounded-xl border border-border bg-card p-3 sm:gap-4 sm:p-4 md:gap-6 md:p-6"
                >
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted sm:h-24 sm:w-24 md:h-32 md:w-32">
                    <img
                      src={item.image || "/placeholder.svg?height=128&width=128"}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                      <h3 className="text-sm font-bold text-foreground sm:text-base md:text-lg line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-base font-bold text-primary sm:text-lg md:text-xl">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:border-primary sm:h-8 sm:w-8 md:h-10 md:w-10"
                        >
                          <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium text-foreground sm:w-8 md:w-12">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:border-primary sm:h-8 sm:w-8 md:h-10 md:w-10"
                        >
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-border bg-card p-4 sm:p-6">
                <h2 className="mb-4 text-lg font-bold text-foreground sm:mb-6 sm:text-xl">Sazetak narudzbe</h2>

                <div className="mb-4 space-y-3 sm:mb-6 sm:space-y-4">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Imate kupon kod?</span>
                  </div>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/10 p-3">
                      <div>
                        <p className="font-mono font-bold text-primary">{appliedCoupon.code}</p>
                        <p className="text-sm text-muted-foreground">
                          {appliedCoupon.type === "percentage"
                            ? `${appliedCoupon.value}% popusta`
                            : `${appliedCoupon.value}€ popusta`}
                        </p>
                      </div>
                      <button onClick={removeCoupon} className="text-muted-foreground hover:text-foreground">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Unesite kod"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase())
                          setCouponError("")
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") applyCoupon()
                        }}
                        className="border-border bg-background font-mono"
                      />
                      <Button
                        onClick={applyCoupon}
                        disabled={isApplyingCoupon || !couponCode.trim()}
                        variant="outline"
                        className="bg-transparent"
                      >
                        {isApplyingCoupon ? "..." : "Primijeni"}
                      </Button>
                    </div>
                  )}

                  {couponError && <p className="text-sm text-destructive">{couponError}</p>}
                </div>

                <div className="mb-4 space-y-3 border-t border-border pt-4 sm:mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Medjuzbroj</span>
                    <span className="text-foreground">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Popust</span>
                      <span className="font-semibold text-green-500">-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dostava</span>
                    <span className="font-semibold text-green-500">Besplatno</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="font-bold text-foreground">Ukupno</span>
                    <span className="font-serif text-lg font-bold text-primary sm:text-xl">{formatPrice(total)}</span>
                  </div>
                </div>

                <Link
                  href={`/placanje?coupon=${appliedCoupon?.code || ""}`}
                  className="mb-4 block w-full rounded-lg bg-gradient-to-r from-primary to-primary/80 py-3 text-center text-sm font-bold text-primary-foreground transition-all hover:from-primary/90 hover:to-primary/70 sm:mb-6 sm:py-4"
                >
                  Nastavi na placanje
                  <ArrowRight className="ml-2 inline-block h-4 w-4 sm:h-5 sm:w-5" />
                </Link>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    100% sigurno placanje karticama
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                    <Truck className="h-4 w-4 text-primary" />
                    Besplatna dostava diljem Hrvatske
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
