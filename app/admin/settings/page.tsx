"use client"

import { useState } from "react"
import { Save, Store, Mail, CreditCard, Truck, Bell, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    // Store settings
    storeName: "mystery.hr",
    storeEmail: "qube.reach@gmail.com",
    storePhone: "+385 99 123 4567",
    storeAddress: "Ulica Josipa Huttlera 34, 31000 Osijek, Hrvatska",
    companyName: "qube d.o.o.",
    companyOIB: "05419427342",
    // Email settings
    smtpHost: "",
    smtpPort: "587",
    smtpUser: "",
    smtpPassword: "",
    emailFromName: "mystery.hr",
    emailFromAddress: "info@mystery.hr",
    // Payment settings
    stripeEnabled: true,
    stripePublicKey: "",
    stripeSecretKey: "",
    codEnabled: true,
    bankTransferEnabled: true,
    bankAccount: "HR1234567890123456789",
    // Shipping settings
    freeShippingThreshold: "50",
    standardShippingCost: "4.99",
    expressShippingCost: "9.99",
    // Notification settings
    orderNotifications: true,
    lowStockNotifications: true,
    lowStockThreshold: "5",
    newsletterEnabled: true,
    // Security settings
    twoFactorEnabled: false,
    sessionTimeout: "60",
    maxLoginAttempts: "5",
  })

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert("Postavke su spremljene!")
  }

  const updateSetting = (key: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Postavke</h1>
                <p className="text-muted-foreground">Upravljajte postavkama trgovine</p>
              </div>
              <Button onClick={handleSave} disabled={isSaving} className="bg-primary text-primary-foreground">
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Spremanje..." : "Spremi postavke"}
              </Button>
            </div>

            <Tabs defaultValue="store" className="space-y-6">
              <TabsList className="bg-card border border-border">
                <TabsTrigger
                  value="store"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Store className="w-4 h-4 mr-2" />
                  Trgovina
                </TabsTrigger>
                <TabsTrigger
                  value="email"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </TabsTrigger>
                <TabsTrigger
                  value="payment"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Plaćanje
                </TabsTrigger>
                <TabsTrigger
                  value="shipping"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Truck className="w-4 h-4 mr-2" />
                  Dostava
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Obavijesti
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Sigurnost
                </TabsTrigger>
              </TabsList>

              <TabsContent value="store">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Podaci o trgovini</CardTitle>
                    <CardDescription>Osnovne informacije o vašoj trgovini</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Naziv trgovine</Label>
                        <Input
                          value={settings.storeName}
                          onChange={(e) => updateSetting("storeName", e.target.value)}
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email trgovine</Label>
                        <Input
                          type="email"
                          value={settings.storeEmail}
                          onChange={(e) => updateSetting("storeEmail", e.target.value)}
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Telefon</Label>
                        <Input
                          value={settings.storePhone}
                          onChange={(e) => updateSetting("storePhone", e.target.value)}
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Naziv tvrtke</Label>
                        <Input
                          value={settings.companyName}
                          onChange={(e) => updateSetting("companyName", e.target.value)}
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>OIB</Label>
                        <Input
                          value={settings.companyOIB}
                          onChange={(e) => updateSetting("companyOIB", e.target.value)}
                          className="bg-background border-border"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Adresa</Label>
                      <Textarea
                        value={settings.storeAddress}
                        onChange={(e) => updateSetting("storeAddress", e.target.value)}
                        className="bg-background border-border"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="email">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>SMTP postavke</CardTitle>
                    <CardDescription>Konfiguracija email servera</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>SMTP Host</Label>
                        <Input
                          placeholder="smtp.gmail.com"
                          value={settings.smtpHost}
                          onChange={(e) => updateSetting("smtpHost", e.target.value)}
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>SMTP Port</Label>
                        <Input
                          placeholder="587"
                          value={settings.smtpPort}
                          onChange={(e) => updateSetting("smtpPort", e.target.value)}
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>SMTP Korisnik</Label>
                        <Input
                          value={settings.smtpUser}
                          onChange={(e) => updateSetting("smtpUser", e.target.value)}
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>SMTP Lozinka</Label>
                        <Input
                          type="password"
                          value={settings.smtpPassword}
                          onChange={(e) => updateSetting("smtpPassword", e.target.value)}
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Ime pošiljatelja</Label>
                        <Input
                          value={settings.emailFromName}
                          onChange={(e) => updateSetting("emailFromName", e.target.value)}
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email pošiljatelja</Label>
                        <Input
                          type="email"
                          value={settings.emailFromAddress}
                          onChange={(e) => updateSetting("emailFromAddress", e.target.value)}
                          className="bg-background border-border"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment">
                <div className="space-y-6">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle>Stripe</CardTitle>
                      <CardDescription>Plaćanje karticama putem Stripe-a</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Omogući Stripe</Label>
                        <Switch
                          checked={settings.stripeEnabled}
                          onCheckedChange={(checked) => updateSetting("stripeEnabled", checked)}
                        />
                      </div>
                      {settings.stripeEnabled && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Publishable Key</Label>
                            <Input
                              placeholder="pk_live_..."
                              value={settings.stripePublicKey}
                              onChange={(e) => updateSetting("stripePublicKey", e.target.value)}
                              className="bg-background border-border"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Secret Key</Label>
                            <Input
                              type="password"
                              placeholder="sk_live_..."
                              value={settings.stripeSecretKey}
                              onChange={(e) => updateSetting("stripeSecretKey", e.target.value)}
                              className="bg-background border-border"
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle>Ostale metode plaćanja</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Plaćanje pouzećem</Label>
                          <p className="text-sm text-muted-foreground">Omogućite plaćanje prilikom dostave</p>
                        </div>
                        <Switch
                          checked={settings.codEnabled}
                          onCheckedChange={(checked) => updateSetting("codEnabled", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Bankovni prijenos</Label>
                          <p className="text-sm text-muted-foreground">Omogućite plaćanje prijenosom</p>
                        </div>
                        <Switch
                          checked={settings.bankTransferEnabled}
                          onCheckedChange={(checked) => updateSetting("bankTransferEnabled", checked)}
                        />
                      </div>
                      {settings.bankTransferEnabled && (
                        <div className="space-y-2">
                          <Label>IBAN</Label>
                          <Input
                            value={settings.bankAccount}
                            onChange={(e) => updateSetting("bankAccount", e.target.value)}
                            className="bg-background border-border"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="shipping">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Postavke dostave</CardTitle>
                    <CardDescription>Konfigurirajte cijene i uvjete dostave</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Besplatna dostava od (EUR)</Label>
                        <Input
                          type="number"
                          value={settings.freeShippingThreshold}
                          onChange={(e) => updateSetting("freeShippingThreshold", e.target.value)}
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Standardna dostava (EUR)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={settings.standardShippingCost}
                          onChange={(e) => updateSetting("standardShippingCost", e.target.value)}
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Express dostava (EUR)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={settings.expressShippingCost}
                          onChange={(e) => updateSetting("expressShippingCost", e.target.value)}
                          className="bg-background border-border"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Obavijesti</CardTitle>
                    <CardDescription>Postavke email obavijesti</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Obavijesti o narudžbama</Label>
                        <p className="text-sm text-muted-foreground">Primajte email za svaku novu narudžbu</p>
                      </div>
                      <Switch
                        checked={settings.orderNotifications}
                        onCheckedChange={(checked) => updateSetting("orderNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Obavijesti o niskoj zalihi</Label>
                        <p className="text-sm text-muted-foreground">Primajte email kada proizvod ima nisku zalihu</p>
                      </div>
                      <Switch
                        checked={settings.lowStockNotifications}
                        onCheckedChange={(checked) => updateSetting("lowStockNotifications", checked)}
                      />
                    </div>
                    {settings.lowStockNotifications && (
                      <div className="space-y-2">
                        <Label>Prag niske zalihe</Label>
                        <Input
                          type="number"
                          value={settings.lowStockThreshold}
                          onChange={(e) => updateSetting("lowStockThreshold", e.target.value)}
                          className="bg-background border-border w-32"
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Newsletter</Label>
                        <p className="text-sm text-muted-foreground">Omogućite prijavu na newsletter</p>
                      </div>
                      <Switch
                        checked={settings.newsletterEnabled}
                        onCheckedChange={(checked) => updateSetting("newsletterEnabled", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Sigurnosne postavke</CardTitle>
                    <CardDescription>Zaštitite svoj admin panel</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Dvofaktorska autentifikacija</Label>
                        <p className="text-sm text-muted-foreground">Zahtijevaj 2FA za prijavu</p>
                      </div>
                      <Switch
                        checked={settings.twoFactorEnabled}
                        onCheckedChange={(checked) => updateSetting("twoFactorEnabled", checked)}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Istek sesije (minute)</Label>
                        <Input
                          type="number"
                          value={settings.sessionTimeout}
                          onChange={(e) => updateSetting("sessionTimeout", e.target.value)}
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Max pokušaja prijave</Label>
                        <Input
                          type="number"
                          value={settings.maxLoginAttempts}
                          onChange={(e) => updateSetting("maxLoginAttempts", e.target.value)}
                          className="bg-background border-border"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
