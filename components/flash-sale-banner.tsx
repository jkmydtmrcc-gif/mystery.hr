"use client"

import { useState, useEffect } from "react"

export function FlashSaleBanner() {
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 47, seconds: 30 })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        if (seconds > 0) seconds--
        else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else {
          hours = 23
          minutes = 59
          seconds = 59
        }
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [mounted])

  if (!mounted) return <div className="h-10 border-b border-border bg-muted" />

  return (
    <div className="border-b border-primary/20 bg-card">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-3 px-4 py-2.5 text-center text-sm">
        <span className="font-medium text-foreground">
          <span className="text-primary">POSEBNA PONUDA</span> - Do 60% popusta
        </span>
        <span className="text-muted-foreground">|</span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          Istjece za:
          <span className="font-mono font-medium text-foreground">
            {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
        </span>
      </div>
    </div>
  )
}
