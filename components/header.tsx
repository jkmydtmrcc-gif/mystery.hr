"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, ShoppingCart, X, Home, Grid3X3, HelpCircle, Users, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { categories } from "@/lib/products-data"

function getCartCountFromLocal(): number {
  if (typeof window === "undefined") return 0
  try {
    const cart = JSON.parse(localStorage.getItem("mystery_cart") || "[]")
    return cart.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0)
  } catch {
    return 0
  }
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [showCategories, setShowCategories] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCartCount(getCartCountFromLocal())

    const handleCartUpdate = () => {
      setCartCount(getCartCountFromLocal())
    }

    window.addEventListener("cartUpdated", handleCartUpdate)
    window.addEventListener("storage", handleCartUpdate)

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate)
      window.removeEventListener("storage", handleCartUpdate)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const navItems = [
    { href: "/", label: "Početna", icon: Home },
    { href: "/kategorije", label: "Kategorije", icon: Grid3X3 },
    { href: "/kako-funkcionira", label: "Kako Funkcionira", icon: HelpCircle },
    { href: "/o-nama", label: "O Nama", icon: Users },
    { href: "/kontakt", label: "Kontakt", icon: Mail },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 lg:h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/mystery-hr-logo.png" alt="mystery.hr" width={160} height={53} className="h-8 w-auto lg:h-12" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Početna
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <Link
                href="/kategorije"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Kategorije
              </Link>
              {showCategories && (
                <div className="absolute left-0 top-full pt-2">
                  <div className="grid grid-cols-3 gap-1 rounded-lg border border-border bg-card p-2 shadow-lg min-w-[400px]">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/kategorije/${cat.id}`}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all"
                        style={{
                          boxShadow: `inset 0 0 4px ${cat.glowColor}20`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = `0 0 12px ${cat.glowColor}40, inset 0 0 8px ${cat.glowColor}30`
                          e.currentTarget.style.backgroundColor = `${cat.glowColor}15`
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = `inset 0 0 4px ${cat.glowColor}20`
                          e.currentTarget.style.backgroundColor = "transparent"
                        }}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/kako-funkcionira"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Kako Funkcionira
            </Link>
            <Link
              href="/o-nama"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              O Nama
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/kosarica">
              <Button variant="ghost" size="icon" className="relative text-foreground hover:text-primary">
                <ShoppingCart className="h-5 w-5" />
                {mounted && cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/kategorije">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Istraži Boxove</Button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link href="/kosarica">
              <Button variant="ghost" size="icon" className="relative text-foreground h-9 w-9">
                <ShoppingCart className="h-5 w-5" />
                {mounted && cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="text-foreground h-9 w-9" onClick={() => setIsOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="lg:hidden"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#09090b",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Menu Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              flexShrink: 0,
            }}
          >
            <Image src="/mystery-hr-logo.png" alt="mystery.hr" width={120} height={40} className="h-7 w-auto" />
            <button
              onClick={() => setIsOpen(false)}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "rgba(255,255,255,0.1)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Menu Content */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px",
            }}
          >
            {/* Navigation Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "14px 16px",
                      borderRadius: 12,
                      backgroundColor: "rgba(255,255,255,0.05)",
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        backgroundColor: "rgba(147,51,234,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={20} color="#a855f7" />
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 500 }}>{item.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* Categories with Glow Effects */}
            <div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 16,
                }}
              >
                Kategorije
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 10,
                }}
              >
                {categories.slice(0, 8).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/kategorije/${cat.id}`}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                      padding: "12px 8px",
                      borderRadius: 12,
                      backgroundColor: "rgba(255,255,255,0.05)",
                      textDecoration: "none",
                      border: `1px solid ${cat.glowColor}40`,
                      boxShadow: `0 0 10px ${cat.glowColor}30, inset 0 0 6px ${cat.glowColor}15`,
                    }}
                  >
                    <span style={{ fontSize: 24 }}>{cat.icon}</span>
                    <span
                      style={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.7)",
                        textAlign: "center",
                        lineHeight: 1.2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "100%",
                      }}
                    >
                      {cat.name}
                    </span>
                  </Link>
                ))}
              </div>

              {categories.length > 8 && (
                <Link
                  href="/kategorije"
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 16,
                    padding: "12px",
                    color: "#a855f7",
                    fontSize: 13,
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  Vidi sve kategorije ({categories.length})
                </Link>
              )}
            </div>
          </div>

          {/* Menu Footer */}
          <div
            style={{
              padding: "16px 20px",
              paddingBottom: "calc(16px + env(safe-area-inset-bottom))",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              backgroundColor: "#09090b",
              flexShrink: 0,
            }}
          >
            <Link href="/kategorije" onClick={() => setIsOpen(false)} style={{ display: "block" }}>
              <button
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: 12,
                  border: "none",
                  background: "linear-gradient(to right, #9333ea, #7c3aed)",
                  color: "white",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 0 20px rgba(147, 51, 234, 0.4)",
                }}
              >
                Istraži Mystery Boxove
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
