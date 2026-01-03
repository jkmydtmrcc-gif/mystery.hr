"use client"

import { X, Package, User, MapPin, CreditCard, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Order {
  _id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    phone: string
    address: {
      street: string
      city: string
      postalCode: string
      country: string
    }
  }
  items: Array<{
    productId: string
    name: string
    quantity: number
    price: number
  }>
  total: number
  subtotal: number
  discount: number
  status: string
  paymentStatus: string
  paymentMethod: string
  createdAt: string
  updatedAt: string
}

interface OrderDetailsModalProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
}

export default function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  if (!isOpen || !order) return null

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("hr-HR", {
      style: "currency",
      currency: "EUR",
    }).format(amount)

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("hr-HR", {
      dateStyle: "medium",
      timeStyle: "short",
    })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Narudžba #{order.orderNumber}</h2>
            <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <User className="w-4 h-4 text-primary" />
                Podaci o kupcu
              </div>
              <div className="bg-background rounded-lg p-4 space-y-2">
                <p className="text-foreground font-medium">{order.customer?.name}</p>
                <p className="text-muted-foreground">{order.customer?.email}</p>
                <p className="text-muted-foreground">{order.customer?.phone}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <MapPin className="w-4 h-4 text-primary" />
                Adresa dostave
              </div>
              <div className="bg-background rounded-lg p-4 space-y-1">
                <p className="text-foreground">{order.customer?.address?.street}</p>
                <p className="text-muted-foreground">
                  {order.customer?.address?.postalCode} {order.customer?.address?.city}
                </p>
                <p className="text-muted-foreground">{order.customer?.address?.country}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <Package className="w-4 h-4 text-primary" />
              Naručeni proizvodi
            </div>
            <div className="bg-background rounded-lg divide-y divide-border">
              {order.items?.map((item, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-foreground font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Količina: {item.quantity}</p>
                  </div>
                  <p className="text-foreground font-medium">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <CreditCard className="w-4 h-4 text-primary" />
              Detalji plaćanja
            </div>
            <div className="bg-background rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Međuzbroj</span>
                <span className="text-foreground">{formatCurrency(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Popust</span>
                  <span className="text-green-500">-{formatCurrency(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dostava</span>
                <span className="text-foreground">Besplatno</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="text-foreground font-bold">Ukupno</span>
                <span className="text-primary font-bold text-lg">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Status narudžbe</p>
              <p className="text-foreground font-medium capitalize">{order.status}</p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Status plaćanja</p>
              <p className="text-foreground font-medium capitalize">{order.paymentStatus}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            Zadnje ažurirano: {formatDate(order.updatedAt)}
          </div>
        </div>
      </div>
    </div>
  )
}
