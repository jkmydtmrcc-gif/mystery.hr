"use client"

import { useState, useEffect } from "react"
import { ShoppingBag, X } from "lucide-react"

const notifications = [
  { name: "Marko", city: "Zagreb", box: "RGB Overlord Box" },
  { name: "Ana", city: "Split", box: "Pokemon Master" },
  { name: "Petar", city: "Rijeka", box: "PlayStation Bundle" },
  { name: "Ivana", city: "Osijek", box: "Chocolate Heaven" },
  { name: "Nikola", city: "Zadar", box: "Sneakerhead Box" },
  { name: "Sara", city: "Pula", box: "Luxury Women's Perfume" },
  { name: "Luka", city: "Dubrovnik", box: "Football Pro" },
  { name: "Mia", city: "Varaždin", box: "Anime Otaku" },
  { name: "David", city: "Sisak", box: "Car Detailing Pro" },
  { name: "Lea", city: "Karlovac", box: "Japanese Candy" },
  { name: "Filip", city: "Šibenik", box: "Streetwear Hype" },
  { name: "Jana", city: "Velika Gorica", box: "GTA VI Box" },
  { name: "Matej", city: "Slavonski Brod", box: "Yu-Gi-Oh Duel" },
  { name: "Petra", city: "Koprivnica", box: "Marvel Universe" },
  { name: "Ivan", city: "Bjelovar", box: "Basketball Slam" },
]

export function FakeNotification() {
  const [current, setCurrent] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isClosed || !mounted) return

    const showTimer = setTimeout(() => setIsVisible(true), 5000)
    return () => clearTimeout(showTimer)
  }, [isClosed, mounted])

  useEffect(() => {
    if (!isVisible || isClosed || !mounted) return

    const hideTimer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % notifications.length)
        setIsVisible(true)
      }, 2000)
    }, 5000)

    return () => clearTimeout(hideTimer)
  }, [isVisible, current, isClosed, mounted])

  if (!mounted || isClosed) return null

  const notification = notifications[current]

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 w-72 transform transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      }`}
    >
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-lg">
        <div className="p-3">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-primary/20 p-2">
              <ShoppingBag className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium text-primary">{notification.name}</span> iz {notification.city}
              </p>
              <p className="text-xs text-muted-foreground">
                kupio <span className="font-medium">{notification.box}</span>
              </p>
            </div>
            <button
              onClick={() => setIsClosed(true)}
              className="rounded p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
