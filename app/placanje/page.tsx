"use client"

import type React from "react"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, CreditCard, Lock, ShieldCheck, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
}

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const couponCode = searchParams.get("coupon")

  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [step, setStep] = useState(1)
  const [discount, setDiscount] = useState(0)

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Hrvatska",
  })

  const [errors, setErrors] = useState<Partial<CustomerInfo>>({})

  useEffect(() => {
    fetchCart()
  }, [])

  useEffect(() => {
    if (couponCode && cart.length > 0) {
      validateCoupon()
    }
  }, [couponCode, cart])

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart")
      if (res.ok) {
        const data = await res.json()
        setCart(data.cart || [])
        if (data.cart?.length === 0) {
          router.push("/kosarica")
        }
      }
    } catch (error) {
      console.error("Error fetching cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const validateCoupon = async () => {
    if (!couponCode) return

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode, subtotal }),
      })

      if (res.ok) {
        const data = await res.json()
        setDiscount(data.coupon.discount)
      }
    } catch (error) {
      console.error("Error validating coupon:", error)
    }
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal - discount

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("hr-HR", {
      style: "currency",
      currency: "EUR",
    }).format(price)

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {}

    if (!customerInfo.firstName.trim()) newErrors.firstName = "Obavezno polje"
    if (!customerInfo.lastName.trim()) newErrors.lastName = "Obavezno polje"
    if (!customerInfo.email.trim()) {
      newErrors.email = "Obavezno polje"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = "Nevažeća email adresa"
    }
    if (!customerInfo.phone.trim()) newErrors.phone = "Obavezno polje"
    if (!customerInfo.address.trim()) newErrors.address = "Obavezno polje"
    if (!customerInfo.city.trim()) newErrors.city = "Obavezno polje"
    if (!customerInfo.postalCode.trim()) newErrors.postalCode = "Obavezno polje"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsProcessing(true)

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          customer: customerInfo,
          couponCode,
          subtotal,
          discount,
          total,
        }),
      })

      const data = await res.json()

      if (res.ok && data.paymentForm) {
        const form = document.createElement("form")
        form.method = "POST"
        form.action = data.paymentForm.action

        Object.entries(data.paymentForm.fields).forEach(([key, value]) => {
          const input = document.createElement("input")
          input.type = "hidden"
          input.name = key
          input.value = value as string
          form.appendChild(input)
        })

        document.body.appendChild(form)
        form.submit()
      } else {
        alert(data.error || "Greška pri kreiranju narudžbe")
        setIsProcessing(false)
      }
    } catch {
      alert("Greška pri kreiranju narudžbe")
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <Link
            href="/kosarica"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Natrag na košaricu
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4 mb-12">
          <div className={`flex items-center gap-2 ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : "1"}
            </div>
            <span className="hidden md:inline font-medium">Podaci</span>
          </div>
          <div className="w-12 h-0.5 bg-border" />
          <div className={`flex items-center gap-2 ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              2
            </div>
            <span className="hidden md:inline font-medium">Plaćanje</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  Kontakt podaci
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ime *</Label>
                    <Input
                      id="firstName"
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                      className={`bg-background border-border ${errors.firstName ? "border-destructive" : ""}`}
                    />
                    {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Prezime *</Label>
                    <Input
                      id="lastName"
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                      className={`bg-background border-border ${errors.lastName ? "border-destructive" : ""}`}
                    />
                    {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className={`bg-background border-border ${errors.email ? "border-destructive" : ""}`}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className={`bg-background border-border ${errors.phone ? "border-destructive" : ""}`}
                    />
                    {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  Adresa dostave
                </h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresa *</Label>
                    <Input
                      id="address"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      className={`bg-background border-border ${errors.address ? "border-destructive" : ""}`}
                      placeholder="Ulica i kućni broj"
                    />
                    {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Grad *</Label>
                      <Input
                        id="city"
                        value={customerInfo.city}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                        className={`bg-background border-border ${errors.city ? "border-destructive" : ""}`}
                      />
                      {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Poštanski broj *</Label>
                      <Input
                        id="postalCode"
                        value={customerInfo.postalCode}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, postalCode: e.target.value })}
                        className={`bg-background border-border ${errors.postalCode ? "border-destructive" : ""}`}
                      />
                      {errors.postalCode && <p className="text-sm text-destructive">{errors.postalCode}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Država</Label>
                      <Input
                        id="country"
                        value={customerInfo.country}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, country: e.target.value })}
                        className="bg-background border-border"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-primary" />
                  </div>
                  Način plaćanja
                </h2>

                <div className="bg-background border border-primary/20 rounded-lg p-4 flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Kartica (CorvusPay)</p>
                    <p className="text-sm text-muted-foreground">Visa, Mastercard, Maestro, Diners</p>
                  </div>
                  <div className="flex gap-2">
                    <img src="/visa-card-logo.png" alt="Visa" className="h-6" />
                    <img src="/mastercard-logo.png" alt="Mastercard" className="h-6" />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4 text-primary" />
                  Vaši podaci su zaštićeni SSL enkripcijom
                </div>
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-6 text-lg font-bold hover:from-primary/90 hover:to-primary/70"
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Obrada...
                  </>
                ) : (
                  <>
                    Nastavi na plaćanje
                    <CreditCard className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-6">Vaša narudžba</h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.productId} className="flex gap-4">
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg?height=64&width=64&query=mystery box"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground text-sm">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Količina: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-foreground">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Međuzbroj</span>
                  <span className="text-foreground">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Popust</span>
                    <span className="text-green-500">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dostava</span>
                  <span className="text-green-500">Besplatno</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-foreground font-bold">Ukupno</span>
                  <span className="text-primary font-bold text-xl">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  100% sigurna kupovina
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4 text-primary" />
                  SSL zaštićeno plaćanje
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
