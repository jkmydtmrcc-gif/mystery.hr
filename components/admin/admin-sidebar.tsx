"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  Settings,
  LogOut,
  Crown,
  Gift,
  BarChart3,
  FolderOpen,
  Percent,
  ImageIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: LayoutDashboard, label: "Pregled", href: "/admin/dashboard" },
  { icon: ShoppingCart, label: "Narudžbe", href: "/admin/orders" },
  { icon: Package, label: "Proizvodi", href: "/admin/products" },
  { icon: FolderOpen, label: "Kategorije", href: "/admin/categories" },
  { icon: Percent, label: "Šanse za dobitak", href: "/admin/box-contents" },
  { icon: ImageIcon, label: "Mediji", href: "/admin/media" },
  { icon: Users, label: "Korisnici", href: "/admin/users" },
  { icon: Tag, label: "Kuponi", href: "/admin/coupons" },
  { icon: Gift, label: "Popupi", href: "/admin/popups" },
  { icon: BarChart3, label: "Statistika", href: "/admin/analytics" },
  { icon: Settings, label: "Postavke", href: "/admin/settings" },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
            <Crown className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-foreground">mystery.hr</h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Odjava</span>
        </button>
      </div>
    </aside>
  )
}
