"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Gift, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ExitIntentPopup() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const hasSeenPopup = localStorage.getItem("exit-popup-seen")
    if (hasSeenPopup) return

    let timeoutId: NodeJS.Timeout

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true)
        localStorage.setItem("exit-popup-seen", "true")
        document.removeEventListener("mouseout", handleMouseLeave)
      }
    }

    // Show after 45 seconds on mobile (no mouse leave)
    timeoutId = setTimeout(() => {
      if (!localStorage.getItem("exit-popup-seen") && !localStorage.getItem("spin-popup-seen")) {
        setIsOpen(true)
        localStorage.setItem("exit-popup-seen", "true")
      }
    }, 45000)

    document.addEventListener("mouseout", handleMouseLeave)

    return () => {
      document.removeEventListener("mouseout", handleMouseLeave)
      clearTimeout(timeoutId)
    }
  }, [mounted])

  useEffect(() => {
    if (!isOpen) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubmitted(true)
  }

  if (!mounted || !isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-primary/30 bg-card shadow-2xl">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-3 top-3 z-10 rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 text-center">
          {!isSubmitted ? (
            <>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1.5">
                <Clock className="h-4 w-4 text-destructive" />
                <span className="font-mono text-sm font-medium text-destructive">{formatTime(timeLeft)}</span>
              </div>

              <h2 className="mb-2 text-2xl font-bold text-foreground">Pričekajte!</h2>
              <p className="mb-4 text-sm text-muted-foreground">Imate ekskluzivni popust koji vas čeka</p>

              <div className="mb-6 rounded-xl border border-primary bg-primary/10 p-6">
                <Gift className="mx-auto mb-2 h-10 w-10 text-primary" />
                <p className="text-4xl font-bold text-primary">15% POPUSTA</p>
                <p className="mt-1 text-sm text-muted-foreground">na prvu narudžbu</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="vas@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 border-border bg-muted text-center text-foreground"
                />
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Pošalji Kupon
                </Button>
              </form>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-3 text-xs text-muted-foreground hover:text-foreground"
              >
                Ne hvala
              </button>
            </>
          ) : (
            <>
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                <Gift className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">Odlično!</h2>
              <p className="mb-4 text-sm text-muted-foreground">Vaš kupon kod:</p>
              <div className="mb-4 rounded-xl border border-primary bg-primary/10 p-4">
                <span className="font-mono text-xl font-bold tracking-wider text-primary">DOBRODOSLI15</span>
              </div>
              <p className="mb-4 text-xs text-muted-foreground">Također poslan na {email}</p>
              <Button
                onClick={() => setIsOpen(false)}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Nastavi Kupovinu
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
