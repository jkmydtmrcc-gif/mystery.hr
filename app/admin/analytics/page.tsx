"use client"

import { useState } from "react"
import { TrendingUp, Users, ShoppingCart, Package, Euro, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  // Mock data - u produkciji bi se dohvacalo s API-ja
  const stats = {
    revenue: { value: 15420, change: 12.5, trend: "up" },
    orders: { value: 324, change: 8.2, trend: "up" },
    customers: { value: 156, change: -3.1, trend: "down" },
    avgOrderValue: { value: 47.59, change: 5.4, trend: "up" },
  }

  const topProducts = [
    { name: "FCB Lover Box", sales: 45, revenue: 2250 },
    { name: "Basket Box", sales: 38, revenue: 1900 },
    { name: "Real Box", sales: 32, revenue: 1600 },
    { name: "Sport Mix Box", sales: 28, revenue: 2800 },
    { name: "Dunk Dream Box", sales: 25, revenue: 1875 },
  ]

  const topCategories = [
    { name: "Sport", sales: 156, percentage: 48 },
    { name: "Odjeća", sales: 89, percentage: 27 },
    { name: "Obuća", sales: 45, percentage: 14 },
    { name: "Dom", sales: 34, percentage: 11 },
  ]

  const recentActivity = [
    { type: "order", message: "Nova narudžba #1234", time: "Prije 5 min" },
    { type: "user", message: "Novi korisnik registriran", time: "Prije 15 min" },
    { type: "order", message: "Narudžba #1233 poslana", time: "Prije 32 min" },
    { type: "product", message: "Proizvod 'UFC Box' niska zaliha", time: "Prije 1h" },
    { type: "order", message: "Nova narudžba #1232", time: "Prije 2h" },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Statistika</h1>
                <p className="text-muted-foreground">Pregled performansi trgovine</p>
              </div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-48 bg-card border-border">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Zadnjih 7 dana</SelectItem>
                  <SelectItem value="30d">Zadnjih 30 dana</SelectItem>
                  <SelectItem value="90d">Zadnjih 90 dana</SelectItem>
                  <SelectItem value="1y">Zadnja godina</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Ukupni prihod</p>
                      <p className="text-2xl font-bold text-foreground mt-1">
                        {new Intl.NumberFormat("hr-HR", { style: "currency", currency: "EUR" }).format(
                          stats.revenue.value,
                        )}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Euro className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-1 mt-3 text-sm ${stats.revenue.trend === "up" ? "text-green-500" : "text-red-500"}`}
                  >
                    {stats.revenue.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span>{stats.revenue.change}%</span>
                    <span className="text-muted-foreground">od prošlog perioda</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Narudžbe</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stats.orders.value}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-1 mt-3 text-sm ${stats.orders.trend === "up" ? "text-green-500" : "text-red-500"}`}
                  >
                    {stats.orders.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span>{stats.orders.change}%</span>
                    <span className="text-muted-foreground">od prošlog perioda</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Novi korisnici</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stats.customers.value}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-500" />
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-1 mt-3 text-sm ${stats.customers.trend === "up" ? "text-green-500" : "text-red-500"}`}
                  >
                    {stats.customers.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span>{Math.abs(stats.customers.change)}%</span>
                    <span className="text-muted-foreground">od prošlog perioda</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Prosj. vrijednost</p>
                      <p className="text-2xl font-bold text-foreground mt-1">
                        {new Intl.NumberFormat("hr-HR", { style: "currency", currency: "EUR" }).format(
                          stats.avgOrderValue.value,
                        )}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-orange-500" />
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-1 mt-3 text-sm ${stats.avgOrderValue.trend === "up" ? "text-green-500" : "text-red-500"}`}
                  >
                    {stats.avgOrderValue.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span>{stats.avgOrderValue.change}%</span>
                    <span className="text-muted-foreground">od prošlog perioda</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts & Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Products */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Najprodavaniji proizvodi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={product.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                            {index + 1}
                          </span>
                          <span className="text-foreground">{product.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-foreground font-medium">
                            {new Intl.NumberFormat("hr-HR", { style: "currency", currency: "EUR" }).format(
                              product.revenue,
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">{product.sales} prodaja</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Categories */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Kategorije po prodaji
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topCategories.map((category) => (
                      <div key={category.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-foreground">{category.name}</span>
                          <span className="text-muted-foreground">
                            {category.sales} prodaja ({category.percentage}%)
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Nedavna aktivnost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            activity.type === "order"
                              ? "bg-green-500"
                              : activity.type === "user"
                                ? "bg-blue-500"
                                : "bg-orange-500"
                          }`}
                        />
                        <span className="text-foreground">{activity.message}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
