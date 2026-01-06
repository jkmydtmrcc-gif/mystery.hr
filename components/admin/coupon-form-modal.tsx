"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface Coupon {
  _id: string
  code: string
  type: "percentage" | "fixed"
  value: number
  minPurchase: number
  maxUses: number
  expiresAt: string
  isActive: boolean
}

interface CouponFormModalProps {
  coupon: Coupon | null
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

export default function CouponFormModal({ coupon, isOpen, onClose, onSave }: CouponFormModalProps) {
  const [formData, setFormData] = useState({
    code: "",
    type: "percentage" as "percentage" | "fixed",
    value: 10,
    minPurchase: 0,
    maxUses: 0,
    expiresAt: "",
    isActive: true,
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        minPurchase: coupon.minPurchase,
        maxUses: coupon.maxUses,
        expiresAt: coupon.expiresAt ? coupon.expiresAt.split("T")[0] : "",
        isActive: coupon.isActive,
      })
    } else {
      setFormData({
        code: "",
        type: "percentage",
        value: 10,
        minPurchase: 0,
        maxUses: 0,
        expiresAt: "",
        isActive: true,
      })
    }
  }, [coupon])

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = ""
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setFormData({ ...formData, code })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = coupon ? `/api/admin/coupons/${coupon._id}` : "/api/admin/coupons"
      const method = coupon ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        onSave()
        onClose()
      }
    } catch (error) {
      console.error("Error saving coupon:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-lg">
        <div className="border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">{coupon ? "Uredi kupon" : "Dodaj kupon"}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="code">Kod kupona</Label>
            <div className="flex gap-2">
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                className="bg-background border-border font-mono"
                placeholder="POPUST20"
                required
              />
              <Button type="button" variant="outline" onClick={generateCode}>
                Generiraj
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tip popusta</Label>
              <Select
                value={formData.type}
                onValueChange={(value: "percentage" | "fixed") => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Postotak (%)</SelectItem>
                  <SelectItem value="fixed">Fiksni iznos (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">Vrijednost ({formData.type === "percentage" ? "%" : "€"})</Label>
              <Input
                id="value"
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: Number.parseFloat(e.target.value) })}
                className="bg-background border-border"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minPurchase">Min. kupovina (€)</Label>
              <Input
                id="minPurchase"
                type="number"
                value={formData.minPurchase}
                onChange={(e) => setFormData({ ...formData, minPurchase: Number.parseFloat(e.target.value) })}
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxUses">Max. korištenja (0 = neograničeno)</Label>
              <Input
                id="maxUses"
                type="number"
                value={formData.maxUses}
                onChange={(e) => setFormData({ ...formData, maxUses: Number.parseInt(e.target.value) })}
                className="bg-background border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiresAt">Datum isteka (opcionalno)</Label>
            <Input
              id="expiresAt"
              type="date"
              value={formData.expiresAt}
              onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
              className="bg-background border-border"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isActive">Aktivan</Label>
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Odustani
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLoading ? "Spremanje..." : "Spremi"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
