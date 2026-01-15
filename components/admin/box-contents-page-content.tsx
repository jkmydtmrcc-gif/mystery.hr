"use client"

import { useEffect, useState } from "react"
import { Search, Edit, Percent, Package, Plus, Trash2, Save, X } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"
import { products, categories } from "@/lib/products-data"
import { boxContents, type BoxItem } from "@/lib/box-content-data"

interface EditableBoxItem extends BoxItem {
  tempId: string
}

export default function BoxContentsPageContent() {
  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const [items, setItems] = useState<EditableBoxItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const productOptions = products.map((p) => ({
    value: p.slug,
    label: p.name,
    category: p.category,
  }))

  const filteredProducts = productOptions.filter(
    (p) =>
      p.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  useEffect(() => {
    if (selectedProduct) {
      const existingItems = boxContents[selectedProduct] || []
      setItems(
        existingItems.map((item, index) => ({
          ...item,
          tempId: `item-${index}`,
        })),
      )
      setIsEditing(false)
    }
  }, [selectedProduct])

  const totalChance = items.reduce((sum, item) => sum + item.chance, 0)
  const isValid = Math.abs(totalChance - 100) < 0.01

  const addItem = () => {
    const newItem: EditableBoxItem = {
      name: "",
      brand: "",
      price: 0,
      chance: 0,
      rarity: "common",
      image: "/placeholder.svg?height=100&width=100",
      tempId: `item-${Date.now()}`,
    }
    setItems([...items, newItem])
  }

  const removeItem = (tempId: string) => {
    setItems(items.filter((item) => item.tempId !== tempId))
  }

  const updateItem = (tempId: string, field: keyof BoxItem, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.tempId === tempId) {
          return { ...item, [field]: value }
        }
        return item
      }),
    )
  }

  const distributeEvenly = () => {
    const evenChance = 100 / items.length
    setItems(items.map((item) => ({ ...item, chance: Number(evenChance.toFixed(2)) })))
  }

  const handleSave = async () => {
    if (!isValid) {
      alert("Šanse moraju zbrojiti 100%!")
      return
    }

    setIsSaving(true)
    try {
      const res = await fetch("/api/admin/box-contents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug: selectedProduct,
          items: items.map(({ tempId, ...item }) => item),
        }),
      })

      if (res.ok) {
        setIsEditing(false)
        alert("Šanse su uspješno spremljene!")
      }
    } catch (error) {
      console.error("Error saving box contents:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "bg-amber-500/10 text-amber-500 border-amber-500/30"
      case "epic":
        return "bg-purple-500/10 text-purple-500 border-purple-500/30"
      case "rare":
        return "bg-green-500/10 text-green-500 border-green-500/30"
      case "uncommon":
        return "bg-cyan-500/10 text-cyan-500 border-cyan-500/30"
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/30"
    }
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
                <h1 className="text-2xl font-bold text-foreground">Šanse za dobitak</h1>
                <p className="text-muted-foreground">Upravljajte sadržajem i šansama za svaki box</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-card border-border lg:col-span-1">
                <CardHeader>
                  <h2 className="font-bold text-foreground">Odaberi proizvod</h2>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Pretraži proizvode..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-background border-border"
                    />
                  </div>
                </CardHeader>
                <CardContent className="max-h-[60vh] overflow-y-auto space-y-2">
                  {filteredProducts.map((product) => {
                    const category = categories.find((c) => c.id === product.category)
                    const hasContent = !!boxContents[product.value]
                    return (
                      <button
                        key={product.value}
                        onClick={() => setSelectedProduct(product.value)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          selectedProduct === product.value
                            ? "border-primary bg-primary/10"
                            : "border-border bg-background hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span>{category?.icon}</span>
                            <span className="font-medium text-foreground line-clamp-1">{product.label}</span>
                          </div>
                          {hasContent && (
                            <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded">
                              Postavljeno
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{product.category}</p>
                      </button>
                    )
                  })}
                </CardContent>
              </Card>

              <Card className="bg-card border-border lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <h2 className="font-bold text-foreground">
                      {selectedProduct ? `Sadržaj: ${selectedProduct}` : "Odaberi proizvod"}
                    </h2>
                    {selectedProduct && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Ukupno: {items.length} stavki •{" "}
                        <span className={isValid ? "text-green-500" : "text-red-500"}>
                          {totalChance.toFixed(2)}% / 100%
                        </span>
                      </p>
                    )}
                  </div>
                  {selectedProduct && (
                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                            <X className="w-4 h-4 mr-1" />
                            Odustani
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleSave}
                            disabled={!isValid || isSaving}
                            className="bg-primary text-primary-foreground"
                          >
                            <Save className="w-4 h-4 mr-1" />
                            {isSaving ? "Spremanje..." : "Spremi"}
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" onClick={() => setIsEditing(true)}>
                          <Edit className="w-4 h-4 mr-1" />
                          Uredi
                        </Button>
                      )}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {!selectedProduct ? (
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Odaberite proizvod s lijeve strane</p>
                    </div>
                  ) : items.length === 0 ? (
                    <div className="text-center py-12">
                      <Percent className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">Nema postavljenih stavki za ovaj box</p>
                      {isEditing && (
                        <Button onClick={addItem}>
                          <Plus className="w-4 h-4 mr-2" />
                          Dodaj prvu stavku
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {isEditing && (
                        <div className="flex gap-2 mb-4">
                          <Button variant="outline" size="sm" onClick={addItem}>
                            <Plus className="w-4 h-4 mr-1" />
                            Dodaj stavku
                          </Button>
                          <Button variant="outline" size="sm" onClick={distributeEvenly}>
                            <Percent className="w-4 h-4 mr-1" />
                            Rasporedi jednako
                          </Button>
                        </div>
                      )}

                      {items.map((item, index) => (
                        <div
                          key={item.tempId}
                          className={`p-4 rounded-xl border ${getRarityColor(item.rarity)} ${
                            isEditing ? "bg-background" : ""
                          }`}
                        >
                          {isEditing ? (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Stavka #{index + 1}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeItem(item.tempId)}
                                  className="text-destructive hover:text-destructive h-8 w-8"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div>
                                  <Label className="text-xs">Naziv</Label>
                                  <Input
                                    value={item.name}
                                    onChange={(e) => updateItem(item.tempId, "name", e.target.value)}
                                    className="h-8 text-sm"
                                    placeholder="Naziv proizvoda"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Brand</Label>
                                  <Input
                                    value={item.brand}
                                    onChange={(e) => updateItem(item.tempId, "brand", e.target.value)}
                                    className="h-8 text-sm"
                                    placeholder="Nike"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Cijena (€)</Label>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    value={item.price}
                                    onChange={(e) =>
                                      updateItem(item.tempId, "price", Number.parseFloat(e.target.value) || 0)
                                    }
                                    className="h-8 text-sm"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Šansa (%)</Label>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    value={item.chance}
                                    onChange={(e) =>
                                      updateItem(item.tempId, "chance", Number.parseFloat(e.target.value) || 0)
                                    }
                                    className="h-8 text-sm"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-xs">Rarietet</Label>
                                  <Select
                                    value={item.rarity}
                                    onValueChange={(value) =>
                                      updateItem(
                                        item.tempId,
                                        "rarity",
                                        value as "common" | "uncommon" | "rare" | "epic" | "legendary",
                                      )
                                    }
                                  >
                                    <SelectTrigger className="h-8 text-sm">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="common">Common</SelectItem>
                                      <SelectItem value="uncommon">Uncommon</SelectItem>
                                      <SelectItem value="rare">Rare</SelectItem>
                                      <SelectItem value="epic">Epic</SelectItem>
                                      <SelectItem value="legendary">Legendary</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-xs">URL slike</Label>
                                  <Input
                                    value={item.image}
                                    onChange={(e) => updateItem(item.tempId, "image", e.target.value)}
                                    className="h-8 text-sm"
                                    placeholder="/images/..."
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                                  <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-medium text-foreground">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {item.brand} • €{item.price.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold">{item.chance}%</p>
                                <p className="text-xs capitalize">{item.rarity}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
