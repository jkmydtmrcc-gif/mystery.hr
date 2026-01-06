"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Search, Filter, Download, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"
import OrderDetailsModal from "@/components/admin/order-details-modal"

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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchOrders = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchQuery && { search: searchQuery }),
        ...(statusFilter !== "all" && { status: statusFilter }),
      })

      const res = await fetch(`/api/admin/orders?${params}`)
      if (res.ok) {
        const data = await res.json()
        setOrders(data.orders || [])
        setTotalPages(data.totalPages || 1)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [currentPage, statusFilter])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchOrders()
  }

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        fetchOrders()
      }
    } catch (error) {
      console.error("Error updating order:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "processing":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "shipped":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "Na čekanju",
      processing: "U obradi",
      shipped: "Poslano",
      completed: "Završeno",
      cancelled: "Otkazano",
    }
    return labels[status] || status
  }

  const getPaymentStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "Čeka plaćanje",
      paid: "Plaćeno",
      failed: "Neuspjelo",
      refunded: "Vraćeno",
    }
    return labels[status] || status
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Narudžbe</h1>
                <p className="text-muted-foreground">Upravljajte svim narudžbama</p>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Download className="w-4 h-4 mr-2" />
                Izvezi CSV
              </Button>
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4">
                  <form onSubmit={handleSearch} className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Pretraži po broju narudžbe, imenu, emailu..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-background border-border"
                      />
                    </div>
                  </form>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48 bg-background border-border">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter po statusu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Svi statusi</SelectItem>
                      <SelectItem value="pending">Na čekanju</SelectItem>
                      <SelectItem value="processing">U obradi</SelectItem>
                      <SelectItem value="shipped">Poslano</SelectItem>
                      <SelectItem value="completed">Završeno</SelectItem>
                      <SelectItem value="cancelled">Otkazano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Narudžba</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Kupac</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Proizvodi</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Iznos</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Plaćanje</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Datum</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Akcije</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.length > 0 ? (
                            orders.map((order) => (
                              <tr key={order._id} className="border-b border-border/50 hover:bg-muted/50">
                                <td className="py-3 px-4">
                                  <span className="font-medium text-foreground">#{order.orderNumber}</span>
                                </td>
                                <td className="py-3 px-4">
                                  <div>
                                    <p className="text-foreground">{order.customer?.name}</p>
                                    <p className="text-sm text-muted-foreground">{order.customer?.email}</p>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-muted-foreground">{order.items?.length || 0} stavki</td>
                                <td className="py-3 px-4 text-foreground font-medium">
                                  {new Intl.NumberFormat("hr-HR", {
                                    style: "currency",
                                    currency: "EUR",
                                  }).format(order.total)}
                                </td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`px-2 py-1 rounded text-xs ${
                                      order.paymentStatus === "paid"
                                        ? "bg-green-500/10 text-green-500"
                                        : "bg-yellow-500/10 text-yellow-500"
                                    }`}
                                  >
                                    {getPaymentStatusLabel(order.paymentStatus)}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <Select
                                    value={order.status}
                                    onValueChange={(value) => handleStatusChange(order._id, value)}
                                  >
                                    <SelectTrigger
                                      className={`w-32 h-8 text-xs border ${getStatusColor(order.status)}`}
                                    >
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Na čekanju</SelectItem>
                                      <SelectItem value="processing">U obradi</SelectItem>
                                      <SelectItem value="shipped">Poslano</SelectItem>
                                      <SelectItem value="completed">Završeno</SelectItem>
                                      <SelectItem value="cancelled">Otkazano</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </td>
                                <td className="py-3 px-4 text-muted-foreground">
                                  {new Date(order.createdAt).toLocaleDateString("hr-HR")}
                                </td>
                                <td className="py-3 px-4">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      setSelectedOrder(order)
                                      setIsModalOpen(true)
                                    }}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={8} className="py-8 text-center text-muted-foreground">
                                Nema narudžbi za prikaz
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {totalPages > 1 && (
                      <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-muted-foreground">
                          Stranica {currentPage} od {totalPages}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedOrder(null)
        }}
      />
    </div>
  )
}
