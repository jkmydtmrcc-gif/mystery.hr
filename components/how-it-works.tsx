import { Package, CreditCard, Truck, Gift } from "lucide-react"

const steps = [
  {
    icon: Package,
    title: "Odaberite Box",
    description: "Pregledajte našu kolekciju i odaberite mystery box koji vam se najviše sviđa.",
  },
  {
    icon: CreditCard,
    title: "Sigurno Platite",
    description: "Plaćanje karticom putem CorvusPay sustava - potpuno sigurno i zaštićeno.",
  },
  {
    icon: Truck,
    title: "Brza Dostava",
    description: "Vaš box šaljemo u roku 24-48 sati. Dostava na adresu u Hrvatskoj.",
  },
  {
    icon: Gift,
    title: "Otvorite i Uživajte",
    description: "Otkrijte premium proizvode čija vrijednost premašuje cijenu boxa!",
  },
]

export function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-background via-secondary/50 to-background py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Kako <span className="text-primary">Funkcionira</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Jednostavan proces u 4 koraka do vašeg luksuznog iznenađenja
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-gradient-to-r from-primary/50 to-transparent lg:block" />
              )}

              {/* Step Number */}
              <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-primary/30 bg-card" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary to-gold-dark" />
                <step.icon className="relative z-10 h-10 w-10 text-background" />
                <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-background">
                  {index + 1}
                </span>
              </div>

              {/* Content */}
              <h3 className="mb-2 font-serif text-xl font-bold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
