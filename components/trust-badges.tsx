import { Shield, CreditCard, Truck, Award, Lock, HeadphonesIcon } from "lucide-react"

const badges = [
  { icon: Shield, label: "100% Originalni Proizvodi" },
  { icon: CreditCard, label: "Sigurno Plaćanje" },
  { icon: Truck, label: "Brza Dostava" },
  { icon: Award, label: "Premium Kvaliteta" },
  { icon: Lock, label: "SSL Zaštita" },
  { icon: HeadphonesIcon, label: "24/7 Podrška" },
]

export function TrustBadges() {
  return (
    <section className="border-y border-border bg-card py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                <badge.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
