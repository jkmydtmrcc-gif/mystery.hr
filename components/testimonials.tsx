"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Marko P.",
    location: "Zagreb",
    rating: 5,
    text: "Nevjerojatno iskustvo! U Sport Boxu sam dobio opremu čija vrijednost premašuje 200€. Definitivno ću opet naručiti!",
    box: "Sport Box",
    avatar: "/man-headshot.png",
  },
  {
    name: "Ana K.",
    location: "Split",
    rating: 5,
    text: "Kupila sam Gaming Box kao poklon za rođendan. Prijatelj je bio oduševljen - dobio je prekrasne gaming dodatke!",
    box: "Gaming Box",
    avatar: "/woman-headshot.png",
  },
  {
    name: "Ivan M.",
    location: "Rijeka",
    rating: 5,
    text: "Skeptičan sam bio u početku, ali Tech Box je premašio sva očekivanja. Premium kvaliteta i vrhunska prezentacija.",
    box: "Tech Box",
    avatar: "/man-business-headshot.jpg",
  },
  {
    name: "Petra S.",
    location: "Osijek",
    rating: 5,
    text: "Treći put naručujem i svaki put sam iznenađena! Odlična vrijednost za novac i brza dostava.",
    box: "Clothing Box",
    avatar: "/smiling-woman-headshot.png",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Što Kažu Naši <span className="text-primary">Kupci</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Pridružite se tisućama zadovoljnih kupaca koji su otkrili magiju mystery.hr
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 border-primary/50 bg-background hover:bg-primary/10 lg:-left-16"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={next}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 border-primary/50 bg-background hover:bg-primary/10 lg:-right-16"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <Card className="border-border bg-card">
            <CardContent className="p-8 md:p-12">
              <Quote className="mb-6 h-12 w-12 text-primary/30" />
              <p className="mb-8 text-lg text-foreground md:text-xl">"{testimonials[currentIndex].text}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="h-16 w-16 rounded-full border-2 border-primary object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{testimonials[currentIndex].name}</span>
                    <span className="text-sm text-muted-foreground">iz {testimonials[currentIndex].location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <span className="text-sm text-primary">{testimonials[currentIndex].box}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-primary" : "bg-muted hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
