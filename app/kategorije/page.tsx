"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { categories, products } from "@/lib/products-data"
import Link from "next/link"

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="py-4">
        <div className="container mx-auto px-2">
          <h1 className="mb-4 text-center text-xl font-bold text-foreground md:text-2xl">Kategorije</h1>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {categories.map((category) => {
              const categoryProducts = products.filter((p) => p.category === category.id)

              return (
                <Link
                  key={category.id}
                  href={`/kategorije/${category.id}`}
                  className="group flex flex-col items-center rounded-xl border bg-card p-3 transition-all hover:scale-105"
                  style={{
                    borderColor: `${category.glowColor}50`,
                    boxShadow: `0 0 12px ${category.glowColor}30, inset 0 0 8px ${category.glowColor}10`,
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLAnchorElement
                    target.style.boxShadow = `0 0 24px ${category.glowColor}60, inset 0 0 12px ${category.glowColor}20`
                    target.style.borderColor = category.glowColor
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLAnchorElement
                    target.style.boxShadow = `0 0 12px ${category.glowColor}30, inset 0 0 8px ${category.glowColor}10`
                    target.style.borderColor = `${category.glowColor}50`
                  }}
                >
                  <span className="mb-1.5 text-2xl transition-transform group-hover:scale-110 md:text-3xl">
                    {category.icon}
                  </span>
                  <span className="text-center text-[10px] font-semibold text-foreground md:text-xs">
                    {category.name}
                  </span>
                  <span className="mt-0.5 text-[9px] text-muted-foreground md:text-[10px]">
                    {categoryProducts.length} boxova
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
