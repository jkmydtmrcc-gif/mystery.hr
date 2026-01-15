"use client"

import { useState, useEffect } from "react"
import { X, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const prizes = [
  { label: "5%", color: "#a855f7" },
  { label: "DOSTAVA", color: "#1e1b4b" },
  { label: "10%", color: "#a855f7" },
  { label: "15€", color: "#1e1b4b" },
  { label: "15%", color: "#a855f7" },
  { label: "20%", color: "#1e1b4b" },
  { label: "25%", color: "#a855f7" },
  { label: "BOX", color: "#1e1b4b" },
]

const prizeLabels: Record<string, string> = {
  "5%": "5% POPUSTA",
  DOSTAVA: "BESPLATNA DOSTAVA",
  "10%": "10% POPUSTA",
  "15€": "15€ BONUS",
  "15%": "15% POPUSTA",
  "20%": "20% POPUSTA",
  "25%": "25% POPUSTA",
  BOX: "BESPLATNI MINI BOX",
}

const probabilities = [0.25, 0.2, 0.2, 0.15, 0.1, 0.05, 0.04, 0.01]

export function SpinToWinPopup() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSpinning, setIsSpinning] = useState(false)
  const [hasSpun, setHasSpun] = useState(false)
  const [prize, setPrize] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const hasSeenPopup = localStorage.getItem("spin-popup-seen")
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [mounted])

  const selectPrize = () => {
    const random = Math.random()
    let cumulative = 0
    for (let i = 0; i < probabilities.length; i++) {
      cumulative += probabilities[i]
      if (random <= cumulative) return i
    }
    return 0
  }

  const spin = async () => {
    if (!email || isSpinning || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return

    setIsSpinning(true)
    localStorage.setItem("spin-popup-seen", "true")

    const prizeIndex = selectPrize()
    const sliceAngle = 360 / prizes.length
    const targetAngle = 360 - (prizeIndex * sliceAngle + sliceAngle / 2)
    const totalRotation = rotation + 360 * 5 + targetAngle

    setRotation(totalRotation)

    try {
      await fetch("/api/spin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, prizeIndex }),
      })
    } catch (error) {
      // Silent fail for API
    }

    setTimeout(() => {
      setIsSpinning(false)
      setHasSpun(true)
      setPrize(prizeLabels[prizes[prizeIndex].label])
    }, 5000)
  }

  const handleClose = () => {
    setIsOpen(false)
    if (!hasSpun) {
      localStorage.setItem("spin-popup-seen", "true")
    }
  }

  if (!mounted || !isOpen) return null

  const segmentAngle = 360 / prizes.length // 45 degrees per segment

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-primary/30 bg-card shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 text-center">
          {!hasSpun ? (
            <>
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
                <Gift className="h-7 w-7 text-primary" />
              </div>

              <h2 className="mb-2 text-2xl font-bold text-foreground">Zavrtite i Osvojite!</h2>
              <p className="mb-4 text-sm text-muted-foreground">Unesite email i zavrtite kotač za ekskluzivni popust</p>

              {/* Wheel Container */}
              <div className="relative mx-auto mb-6 h-52 w-52 sm:h-60 sm:w-60">
                {/* Pointer */}
                <div className="absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-1">
                  <div className="h-0 w-0 border-y-[12px] border-r-[20px] border-y-transparent border-r-primary drop-shadow-lg" />
                </div>

                {/* Wheel */}
                <div
                  className="relative h-full w-full rounded-full border-4 border-primary shadow-xl overflow-hidden transition-transform duration-[5000ms] ease-out"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  {/* Wheel segments using SVG for precise control */}
                  <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                    {prizes.map((p, i) => {
                      const startAngle = i * segmentAngle
                      const endAngle = (i + 1) * segmentAngle
                      const startRad = (startAngle - 90) * (Math.PI / 180)
                      const endRad = (endAngle - 90) * (Math.PI / 180)

                      const x1 = 50 + 50 * Math.cos(startRad)
                      const y1 = 50 + 50 * Math.sin(startRad)
                      const x2 = 50 + 50 * Math.cos(endRad)
                      const y2 = 50 + 50 * Math.sin(endRad)

                      const largeArc = segmentAngle > 180 ? 1 : 0

                      // Text position - middle of segment, closer to edge
                      const textAngle = startAngle + segmentAngle / 2
                      const textRad = (textAngle - 90) * (Math.PI / 180)
                      const textX = 50 + 32 * Math.cos(textRad)
                      const textY = 50 + 32 * Math.sin(textRad)

                      return (
                        <g key={i}>
                          <path d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`} fill={p.color} />
                          <text
                            x={textX}
                            y={textY}
                            fill="white"
                            fontSize="5"
                            fontWeight="bold"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                          >
                            {p.label}
                          </text>
                        </g>
                      )
                    })}
                  </svg>
                </div>

                {/* Center Button */}
                <div className="absolute left-1/2 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600 shadow-lg border-2 border-white/20">
                  <span className="text-[9px] font-bold text-white">SPIN</span>
                </div>
              </div>

              <Input
                type="email"
                placeholder="vas@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4 h-12 border-border bg-muted text-center text-foreground"
                disabled={isSpinning}
              />

              <Button
                onClick={spin}
                disabled={!email || isSpinning || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {isSpinning ? "Vrtim..." : "ZAVRTI KOTAČ"}
              </Button>

              <p className="mt-3 text-xs text-muted-foreground">Prijavom prihvaćate primanje promotivnih ponuda</p>
            </>
          ) : (
            <>
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                <Gift className="h-10 w-10 text-primary" />
              </div>

              <h2 className="mb-2 text-3xl font-bold text-foreground">Čestitamo!</h2>
              <p className="mb-4 text-muted-foreground">Osvojili ste:</p>

              <div className="mb-6 rounded-xl border border-primary bg-primary/10 p-6">
                <span className="text-2xl font-bold text-primary">{prize}</span>
              </div>

              <div className="mb-4 rounded-lg bg-muted p-3">
                <p className="text-sm text-muted-foreground">Kupon poslan na:</p>
                <p className="font-medium text-foreground">{email}</p>
              </div>

              <Button onClick={handleClose} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Nastavi Kupovinu
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
