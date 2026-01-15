"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, Package, Mail, ArrowRight, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Confetti from "react-confetti"

export default function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("order")
  const [showConfetti, setShowConfetti] = useState(true)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })

    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          colors={["#D4AF37", "#FFD700", "#B8860B", "#DAA520"]}
        />
      )}

      <Header />

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Hvala vam na narudžbi!</h1>

          <p className="text-xl text-muted-foreground mb-8">
            Vaša narudžba je uspješno zaprimljena i uskoro će biti obrađena.
          </p>

          {orderNumber && (
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <p className="text-muted-foreground mb-2">Broj narudžbe</p>
              <p className="text-2xl font-mono font-bold text-primary">#{orderNumber}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <div className="bg-card border border-border rounded-xl p-6 text-left">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Potvrda na email</h3>
              <p className="text-sm text-muted-foreground">
                Poslali smo potvrdu narudžbe na vašu email adresu s detaljima kupovine.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 text-left">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Brza dostava</h3>
              <p className="text-sm text-muted-foreground">
                Vaš mystery box bit će poslan u roku od 24-48 sati. Pratite status dostave putem emaila.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8 mb-8">
            <Crown className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Postanite VIP kupac!</h3>
            <p className="text-muted-foreground mb-4">
              Pridružite se našem VIP programu i ostvarite ekskluzivne popuste i rani pristup novim boxovima.
            </p>
            <Button variant="outline" className="bg-transparent border-primary text-primary hover:bg-primary/10">
              Saznaj više
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/mystery-boxes">
              <Button className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                Nastavi kupovinu
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full md:w-auto bg-transparent">
                Povratak na početnu
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
