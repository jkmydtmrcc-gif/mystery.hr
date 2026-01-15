"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Eye, EyeOff, Gift } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"

interface Popup {
  id: string
  title: string
  message: string
  type: "discount" | "newsletter" | "announcement" | "welcome"
  discountCode?: string
  discountPercent?: number
  isActive: boolean
  showOnPages: string[]
  triggerType: "time" | "scroll" | "exit" | "immediate"
  triggerValue?: number
  createdAt: string
}

export default function PopupsPage() {
  const [popups, setPopups] = useState<Popup[]>([
    {
      id: "1",
      title: "Dobrodošli na mystery.hr!",
      message: "Dobijte 10% popusta na prvu narudžbu!",
      type: "welcome",
      discountCode: "DOBRODOSLI10",
      discountPercent: 10,
      isActive: true,
      showOnPages: ["home"],
      triggerType: "time",
      triggerValue: 5,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Prijavite se na newsletter",
      message: "Budite prvi koji će saznati o novim mystery boxovima i ekskluzivnim popustima!",
      type: "newsletter",
      isActive: true,
      showOnPages: ["all"],
      triggerType: "scroll",
      triggerValue: 50,
      createdAt: new Date().toISOString(),
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPopup, setEditingPopup] = useState<Popup | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "discount" as Popup["type"],
    discountCode: "",
    discountPercent: 10,
    isActive: true,
    triggerType: "time" as Popup["triggerType"],
    triggerValue: 5,
  })

  const handleSave = () => {
    if (editingPopup) {
      setPopups(popups.map((p) => (p.id === editingPopup.id ? { ...p, ...formData } : p)))
    } else {
      setPopups([
        ...popups,
        {
          id: Date.now().toString(),
          ...formData,
          showOnPages: ["all"],
          createdAt: new Date().toISOString(),
        },
      ])
    }
    setIsModalOpen(false)
    resetForm()
  }

  const handleEdit = (popup: Popup) => {
    setEditingPopup(popup)
    setFormData({
      title: popup.title,
      message: popup.message,
      type: popup.type,
      discountCode: popup.discountCode || "",
      discountPercent: popup.discountPercent || 10,
      isActive: popup.isActive,
      triggerType: popup.triggerType,
      triggerValue: popup.triggerValue || 5,
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Jeste li sigurni da želite obrisati ovaj popup?")) {
      setPopups(popups.filter((p) => p.id !== id))
    }
  }

  const toggleActive = (id: string) => {
    setPopups(popups.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)))
  }

  const resetForm = () => {
    setEditingPopup(null)
    setFormData({
      title: "",
      message: "",
      type: "discount",
      discountCode: "",
      discountPercent: 10,
      isActive: true,
      triggerType: "time",
      triggerValue: 5,
    })
  }

  const getTypeLabel = (type: Popup["type"]) => {
    const labels = {
      discount: "Popust",
      newsletter: "Newsletter",
      announcement: "Obavijest",
      welcome: "Dobrodošlica",
    }
    return labels[type]
  }

  const getTriggerLabel = (type: Popup["triggerType"], value?: number) => {
    const labels = {
      time: `Nakon ${value} sekundi`,
      scroll: `Nakon ${value}% scrolla`,
      exit: "Pri izlasku",
      immediate: "Odmah",
    }
    return labels[type]
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
                <h1 className="text-2xl font-bold text-foreground">Popupi</h1>
                <p className="text-muted-foreground">Upravljajte popup porukama na stranici</p>
              </div>
              <Button
                onClick={() => {
                  resetForm()
                  setIsModalOpen(true)
                }}
                className="bg-primary text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novi popup
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popups.map((popup) => (
                <Card key={popup.id} className={`bg-card border-border ${!popup.isActive ? "opacity-60" : ""}`}>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0">
                    <div className="space-y-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Gift className="w-5 h-5 text-primary" />
                        {popup.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {getTypeLabel(popup.type)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {getTriggerLabel(popup.triggerType, popup.triggerValue)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => toggleActive(popup.id)}>
                        {popup.isActive ? (
                          <Eye className="w-4 h-4 text-green-500" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(popup)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(popup.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-3">{popup.message}</p>
                    {popup.discountCode && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Kod:</span>
                        <code className="text-xs bg-muted px-2 py-1 rounded font-mono">{popup.discountCode}</code>
                        {popup.discountPercent && (
                          <span className="text-xs text-green-500">-{popup.discountPercent}%</span>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {popups.length === 0 && (
              <Card className="bg-card border-border">
                <CardContent className="py-12 text-center">
                  <Gift className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nema popupa. Kreirajte prvi!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingPopup ? "Uredi popup" : "Novi popup"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Naslov</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Naslov popupa"
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label>Poruka</Label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tekst poruke"
                className="bg-background border-border"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tip</Label>
                <Select
                  value={formData.type}
                  onValueChange={(v) => setFormData({ ...formData, type: v as Popup["type"] })}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">Popust</SelectItem>
                    <SelectItem value="newsletter">Newsletter</SelectItem>
                    <SelectItem value="announcement">Obavijest</SelectItem>
                    <SelectItem value="welcome">Dobrodošlica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Okidač</Label>
                <Select
                  value={formData.triggerType}
                  onValueChange={(v) => setFormData({ ...formData, triggerType: v as Popup["triggerType"] })}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="time">Vrijeme</SelectItem>
                    <SelectItem value="scroll">Scroll</SelectItem>
                    <SelectItem value="exit">Izlazak</SelectItem>
                    <SelectItem value="immediate">Odmah</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {(formData.triggerType === "time" || formData.triggerType === "scroll") && (
              <div className="space-y-2">
                <Label>{formData.triggerType === "time" ? "Sekunde" : "Postotak scrolla"}</Label>
                <Input
                  type="number"
                  value={formData.triggerValue}
                  onChange={(e) => setFormData({ ...formData, triggerValue: Number.parseInt(e.target.value) })}
                  className="bg-background border-border"
                />
              </div>
            )}
            {(formData.type === "discount" || formData.type === "welcome") && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Kod za popust</Label>
                  <Input
                    value={formData.discountCode}
                    onChange={(e) => setFormData({ ...formData, discountCode: e.target.value.toUpperCase() })}
                    placeholder="POPUST10"
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Postotak popusta</Label>
                  <Input
                    type="number"
                    value={formData.discountPercent}
                    onChange={(e) => setFormData({ ...formData, discountPercent: Number.parseInt(e.target.value) })}
                    className="bg-background border-border"
                  />
                </div>
              </div>
            )}
            <div className="flex items-center justify-between">
              <Label>Aktivan</Label>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Odustani
            </Button>
            <Button onClick={handleSave} className="bg-primary text-primary-foreground">
              {editingPopup ? "Spremi" : "Kreiraj"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
