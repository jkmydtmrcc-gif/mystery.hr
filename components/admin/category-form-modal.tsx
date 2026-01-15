"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface Category {
  id: string
  name: string
  icon: string
  description: string
  glowColor: string
  isActive: boolean
}

interface CategoryFormModalProps {
  category: Category | null
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

const emojiOptions = [
  "🎮",
  "🕹️",
  "💻",
  "🃏",
  "📺",
  "⚽",
  "🌸",
  "🚗",
  "👕",
  "👟",
  "🍬",
  "🏠",
  "🏖️",
  "💎",
  "🎁",
  "🎵",
  "👜",
  "⌚",
  "🎨",
  "📱",
  "🎧",
  "🎬",
  "📚",
  "🍔",
]

export default function CategoryFormModal({ category, isOpen, onClose, onSave }: CategoryFormModalProps) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    icon: "🎮",
    description: "",
    glowColor: "#a855f7",
    isActive: true,
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (category) {
      setFormData({
        id: category.id,
        name: category.name,
        icon: category.icon,
        description: category.description,
        glowColor: category.glowColor,
        isActive: category.isActive,
      })
    } else {
      setFormData({
        id: "",
        name: "",
        icon: "🎮",
        description: "",
        glowColor: "#a855f7",
        isActive: true,
      })
    }
  }, [category])

  const generateId = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[čć]/g, "c")
      .replace(/[šś]/g, "s")
      .replace(/[žź]/g, "z")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  }

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      id: category ? formData.id : generateId(name),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = category ? `/api/admin/categories/${category.id}` : "/api/admin/categories"
      const method = category ? "PUT" : "POST"

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
      console.error("Error saving category:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">{category ? "Uredi kategoriju" : "Dodaj kategoriju"}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Naziv kategorije</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="bg-background border-border"
              placeholder="Gaming"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="id">ID (slug)</Label>
            <Input
              id="id"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className="bg-background border-border font-mono"
              placeholder="gaming"
              required
              disabled={!!category}
            />
            <p className="text-xs text-muted-foreground">Koristi se u URL-u: /kategorije/{formData.id || "slug"}</p>
          </div>

          <div className="space-y-2">
            <Label>Ikona</Label>
            <div className="grid grid-cols-8 gap-2">
              {emojiOptions.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon: emoji })}
                  className={`w-10 h-10 text-xl rounded-lg border transition-all ${
                    formData.icon === emoji
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background hover:border-primary/50"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Opis</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-background border-border"
              placeholder="Gaming oprema i periferija"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="glowColor">Boja (glow efekt)</Label>
            <div className="flex gap-3">
              <Input
                id="glowColor"
                type="color"
                value={formData.glowColor}
                onChange={(e) => setFormData({ ...formData, glowColor: e.target.value })}
                className="w-16 h-10 p-1 bg-background border-border cursor-pointer"
              />
              <Input
                value={formData.glowColor}
                onChange={(e) => setFormData({ ...formData, glowColor: e.target.value })}
                className="bg-background border-border font-mono flex-1"
                placeholder="#a855f7"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isActive">Aktivna kategorija</Label>
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
