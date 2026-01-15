"use client"

import { useEffect, useState } from "react"
import { Plus, Search, Edit, Trash2, Tag, Copy, Check } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"
import CouponFormModal from "@/components/admin/coupon-form-modal"

interface Coupon {
  _id: string
  code: string
  type: "percentage" | "fixed"
  value: number
  minPurchase: number
  maxUses: number
  usedCount: number
  expiresAt: string
  isActive: boolean
  createdAt: string
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const fetchCoupons = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/admin/coupons")
      if (res.ok) {
        const data = await res.json()
        setCoupons(data.coupons || [])
      }
    } catch (error) {
      console.error("Error fetching coupons:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCoupons()
  }, [])

  const handleDelete = async (couponId: string) => {
    if (!confirm("Jeste li sigurni da želite obrisati ovaj kupon?")) return

    try {
      const res = await fetch(`/api/admin/coupons/${couponId}`, {
        method: "DELETE",
      })
      if (res.ok) {
        fetchCoupons()
      }
    } catch (error) {
      console.error("Error deleting coupon:", error)
    }
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const filteredCoupons = coupons.filter((coupon) => coupon.code.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Kuponi</h1>
                <p className="text-muted-foreground">Upravljajte popust kodovima</p>
              </div>
              <Button
                onClick={() => {
                  setEditingCoupon(null)
                  setIsModalOpen(true)
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Dodaj kupon
              </Button>
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Pretraži kupone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background border-border"
                  />
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-20 bg-muted rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : filteredCoupons.length > 0 ? (
                  <div className="space-y-4">
                    {filteredCoupons.map((coupon) => (
                      <div
                        key={coupon._id}
                        className="bg-background border border-border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Tag className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-foreground text-lg">{coupon.code}</span>
                              <button
                                onClick={() => copyCode(coupon.code)}
                                className="text-muted-foreground hover:text-foreground"
                              >
                                {copiedCode === coupon.code ? (
                                  <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                            <p className="text-muted-foreground text-sm">
                              {coupon.type === "percentage" ? `${coupon.value}% popusta` : `${coupon.value}€ popusta`}
                              {coupon.minPurchase > 0 && ` • Min. ${coupon.minPurchase}€`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Korišteno</p>
                            <p className="text-foreground font-medium">
                              {coupon.usedCount} / {coupon.maxUses || "∞"}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Istječe</p>
                            <p className="text-foreground font-medium">
                              {coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString("hr-HR") : "Nikad"}
                            </p>
                          </div>
                          <div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                coupon.isActive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                              }`}
                            >
                              {coupon.isActive ? "Aktivan" : "Neaktivan"}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingCoupon(coupon)
                                setIsModalOpen(true)
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(coupon._id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Tag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Nema kupona za prikaz</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <CouponFormModal
        coupon={editingCoupon}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingCoupon(null)
        }}
        onSave={fetchCoupons}
      />
    </div>
  )
}
