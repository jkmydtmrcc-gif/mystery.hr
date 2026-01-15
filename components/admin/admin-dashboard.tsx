"use client"

import { useEffect, useState } from "react"
import { ShoppingCart, Users, DollarSign, Package, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  revenueChange: number
  ordersChange: number
}

interface RecentOrder {
  _id: string
  orderNumber: string
  customer: { name: string; email: string }
  total: number
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([fetch("/api/admin/stats"), fetch("/api/admin/orders?limit=5")])

        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setStats(statsData)
        }

        if (ordersRes.ok) {
          const ordersData = await ordersRes.json()
          setRecentOrders(ordersData.orders || [])
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const statCards = [
    {
      title: "Ukupni Prihod",
      value: stats?.totalRevenue || 0,
      change: stats?.revenueChange || 0,
      icon: DollarSign,
      format: "currency",
    },
    {
      title: "Narudžbe",
      value: stats?.totalOrders || 0,
      change: stats?.ordersChange || 0,
      icon: ShoppingCart,
      format: "number",
    },
    {
      title: "Korisnici",
      value: stats?.totalCustomers || 0,
      change: 12,
      icon: Users,
      format: "number",
    },
    {
      title: "Proizvodi",
      value: stats?.totalProducts || 0,
      change: 0,
      icon: Package,
      format: "number",
    },
  ]

  const formatValue = (value: number, format: string) => {
    if (format === "currency") {
      return new Intl.NumberFormat("hr-HR", {
        style: "currency",
        currency: "EUR",
      }).format(value)
    }
    return value.toLocaleString("hr-HR")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500"
      case "processing":
        return "bg-blue-500/10 text-blue-500"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500"
      case "cancelled":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Završeno"
      case "processing":
        return "U obradi"
      case "pending":
        return "Na čekanju"
      case "cancelled":
        return "Otkazano"
      default:
        return status
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-card rounded-xl" />
          ))}
        </div>
        <div className="h-96 bg-card rounded-xl" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pregled</h1>
        <p className="text-muted-foreground">Dobrodošli natrag u admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{formatValue(stat.value, stat.format)}</div>
              <div className="flex items-center gap-1 mt-1">
                {stat.change >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span className={stat.change >= 0 ? "text-green-500" : "text-red-500"}>{Math.abs(stat.change)}%</span>
                <span className="text-muted-foreground text-sm">od prošlog mjeseca</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Nedavne Narudžbe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Broj narudžbe</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Kupac</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Iznos</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Datum</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order._id} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-3 px-4 text-foreground font-medium">#{order.orderNumber}</td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-foreground">{order.customer?.name}</p>
                          <p className="text-sm text-muted-foreground">{order.customer?.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-foreground">
                        {new Intl.NumberFormat("hr-HR", {
                          style: "currency",
                          currency: "EUR",
                        }).format(order.total)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("hr-HR")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      Nema narudžbi za prikaz
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
