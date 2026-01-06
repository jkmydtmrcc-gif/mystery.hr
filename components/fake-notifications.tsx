"use client"

import { useState, useEffect } from "react"
import { ShoppingBag, X } from "lucide-react"

const names = [
  "Marko",
  "Ana",
  "Ivan",
  "Petra",
  "Luka",
  "Maja",
  "Tomislav",
  "Ivana",
  "Filip",
  "Sara",
  "Matej",
  "Lucija",
  "Josip",
  "Martina",
  "Ante",
  "Katarina",
]

const locations = [
  "Zagreb",
  "Split",
  "Rijeka",
  "Osijek",
  "Zadar",
  "Pula",
  "Slavonski Brod",
  "Karlovac",
  "Varaždin",
  "Šibenik",
  "Sisak",
  "Dubrovnik",
]

const boxes = ["Silver Box", "Gold Box", "Platinum Box"]

function getRandomNotification() {
  const name = names[Math.floor(Math.random() * names.length)]
  const location = locations[Math.floor(Math.random() * locations.length)]
  const box = boxes[Math.floor(Math.random() * boxes.length)]
  const minutes = Math.floor(Math.random() * 30) + 1
  return { name, location, box, minutes }
}

export function FakeNotifications() {
  const [notification, setNotification] = useState<{
    name: string
    location: string
    box: string
    minutes: number
  } | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const showNotification = () => {
      setNotification(getRandomNotification())
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 5000)
    }

    // Initial delay
    const initialTimer = setTimeout(showNotification, 10000)

    // Recurring notifications
    const interval = setInterval(showNotification, 25000 + Math.random() * 15000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [])

  if (!notification || !isVisible) return null

  return (
    <div className="fixed bottom-20 left-4 z-40 animate-in slide-in-from-left-full duration-500 md:bottom-6">
      <div className="flex max-w-sm items-center gap-3 rounded-xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur-sm">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20">
          <ShoppingBag className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            {notification.name} iz {notification.location}
          </p>
          <p className="text-sm text-muted-foreground">
            upravo kupio/la <span className="text-primary">{notification.box}</span>
          </p>
          <p className="text-xs text-muted-foreground">prije {notification.minutes} min</p>
        </div>
        <button onClick={() => setIsVisible(false)} className="shrink-0 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
