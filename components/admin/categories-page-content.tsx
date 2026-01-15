"use client"

import { useEffect, useState } from "react"
import { Plus, Search, Edit, Trash2, FolderOpen, GripVertical } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"
import CategoryFormModal from "@/components/admin/category-form-modal"
import { categories as defaultCategories } from "@/lib/products-data"

interface Category {
  id: string
  name: string
  icon: string
  description: string
  glowColor: string
  isActive: boolean
}

export default function CategoriesPageContent() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const fetchCategories = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/admin/categories")
      if (res.ok) {
        const data = await res.json()
        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories)
        } else {
          setCategories(
            defaultCategories.map((c) => ({
              ...c,
              isActive: true,
            })),
          )
        }
      } else {
        setCategories(
          defaultCategories.map((c) => ({
            ...c,
            isActive: true,
          })),
        )
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
      setCategories(
        defaultCategories.map((c) => ({
          ...c,
          isActive: true,
        })),
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleDelete = async (categoryId: string) => {
    if (!confirm("Jeste li sigurni da želite obrisati ovu kategoriju?")) return

    try {
      const res = await fetch(`/api/admin/categories/${categoryId}`, {
        method: "DELETE",
      })
      if (res.ok) {
        fetchCategories()
      }
    } catch (error) {
      console.error("Error deleting category:", error)
    }
  }

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Kategorije</h1>
                <p className="text-muted-foreground">Upravljajte kategorijama proizvoda</p>
              </div>
              <Button
                onClick={() => {
                  setEditingCategory(null)
                  setIsModalOpen(true)
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Dodaj kategoriju
              </Button>
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Pretraži kategorije..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background border-border"
                  />
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : filteredCategories.length > 0 ? (
                  <div className="space-y-3">
                    {filteredCategories.map((category) => (
                      <div
                        key={category.id}
                        className="bg-background border border-border rounded-xl p-4 flex items-center justify-between gap-4 group hover:border-primary/30 transition-all"
                        style={{
                          borderLeftColor: category.glowColor,
                          borderLeftWidth: "4px",
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="cursor-grab text-muted-foreground hover:text-foreground">
                            <GripVertical className="w-5 h-5" />
                          </div>
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                            style={{ backgroundColor: `${category.glowColor}20` }}
                          >
                            {category.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div
                            className="w-6 h-6 rounded-full border-2 border-border"
                            style={{ backgroundColor: category.glowColor }}
                            title={category.glowColor}
                          />
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              category.isActive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                            }`}
                          >
                            {category.isActive ? "Aktivna" : "Neaktivna"}
                          </span>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingCategory(category)
                                setIsModalOpen(true)
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(category.id)}
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
                    <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Nema kategorija za prikaz</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <CategoryFormModal
        category={editingCategory}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingCategory(null)
        }}
        onSave={fetchCategories}
      />
    </div>
  )
}
