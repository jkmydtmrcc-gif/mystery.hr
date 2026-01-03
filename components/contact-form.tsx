"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSuccess(true)
    setIsSubmitting(false)
  }

  if (isSuccess) {
    return (
      <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
          <Send className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-foreground">Poruka Poslana!</h3>
        <p className="text-muted-foreground">Hvala na poruci. Odgovorit ćemo vam u najkraćem mogućem roku.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Ime i prezime *</Label>
          <Input id="name" required placeholder="Vaše ime" className="border-border bg-background" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" required placeholder="vas@email.hr" className="border-border bg-background" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefon</Label>
        <Input id="phone" type="tel" placeholder="+385..." className="border-border bg-background" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Tema *</Label>
        <Select required>
          <SelectTrigger className="border-border bg-background">
            <SelectValue placeholder="Odaberite temu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="order">Pitanje o narudžbi</SelectItem>
            <SelectItem value="product">Pitanje o proizvodu</SelectItem>
            <SelectItem value="return">Povrat/Reklamacija</SelectItem>
            <SelectItem value="partnership">Poslovni upit</SelectItem>
            <SelectItem value="other">Ostalo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="order-number">Broj narudžbe (ako je primjenjivo)</Label>
        <Input id="order-number" placeholder="LB-12345" className="border-border bg-background" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Poruka *</Label>
        <Textarea
          id="message"
          required
          rows={5}
          placeholder="Opišite vaš upit..."
          className="border-border bg-background"
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-background hover:bg-gold-dark">
        {isSubmitting ? (
          "Šaljem..."
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Pošalji Poruku
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Slanjem obrasca pristajete na obradu podataka u skladu s našom{" "}
        <a href="/politika-privatnosti" className="text-primary hover:underline">
          Politikom privatnosti
        </a>
        .
      </p>
    </form>
  )
}
