"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSuccess(true)
    setIsSubmitting(false)
  }

  return (
    <section className="bg-gradient-to-r from-secondary via-card to-secondary py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <Gift className="h-8 w-8 text-primary" />
          </div>

          {/* Content */}
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Dobijte <span className="text-primary">10% Popusta</span>
          </h2>
          <p className="mb-8 text-muted-foreground">
            Prijavite se na naš newsletter i odmah dobijte 10% popusta na prvu narudžbu. Plus, budite prvi koji će
            saznati za nove boxove i ekskluzivne ponude!
          </p>

          {/* Form */}
          {isSuccess ? (
            <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-6">
              <p className="text-lg font-medium text-green-400">
                Hvala na prijavi! Provjerite svoj email za kupon kod.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Unesite vaš email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-14 border-border bg-background pl-12 text-foreground placeholder:text-muted-foreground focus:border-primary"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-14 bg-primary px-8 text-background hover:bg-gold-dark"
              >
                {isSubmitting ? "Šaljem..." : "Prijavi se"}
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            Prijavom pristajete na primanje promotivnih poruka. Možete se odjaviti bilo kada.
          </p>
        </div>
      </div>
    </section>
  )
}
