import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HowItWorks } from "@/components/how-it-works"
import { Search, CreditCard, Truck, Gift, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Kako Funkcionira | LuxBox",
  description: "Saznajte kako funkcionira kupovina mystery boxova na LuxBox-u - jednostavan proces u 4 koraka.",
}

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary to-background py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            Kako <span className="text-primary">Funkcionira</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Kupovina mystery boxa na LuxBox-u je jednostavna, sigurna i uzbudljiva. Slijedite naš vodič i otkrijte
            luksuzna iznenađenja!
          </p>
        </div>
      </section>

      {/* Steps Component */}
      <HowItWorks />

      {/* Detailed Steps */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-12">
            {/* Step 1 */}
            <div className="flex gap-6 md:gap-8">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-background">
                <Search className="h-8 w-8" />
              </div>
              <div>
                <h3 className="mb-2 font-serif text-2xl font-bold text-foreground">1. Pregledajte Našu Ponudu</h3>
                <p className="mb-4 text-muted-foreground">
                  Istražite našu kolekciju mystery boxova - od Silver do Platinum razine. Svaki box ima različitu cijenu
                  i potencijalnu vrijednost. Odaberite onaj koji najbolje odgovara vašim željama i budžetu.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Silver Box - savršen za početnike
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Gold Box - najpopularniji izbor
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Platinum Box - ultimativni luksuz
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 md:gap-8">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-background">
                <CreditCard className="h-8 w-8" />
              </div>
              <div>
                <h3 className="mb-2 font-serif text-2xl font-bold text-foreground">2. Sigurna Kupovina</h3>
                <p className="mb-4 text-muted-foreground">
                  Dodajte željeni box u košaricu, ispunite podatke za dostavu i odaberite način plaćanja. Koristimo
                  CorvusPay - vodeći hrvatski sustav za online plaćanje koji garantira sigurnost vaših transakcija.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Visa, Mastercard, Maestro kartice
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    SSL enkripcija podataka
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Ne pohranjujemo podatke o karticama
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 md:gap-8">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-background">
                <Truck className="h-8 w-8" />
              </div>
              <div>
                <h3 className="mb-2 font-serif text-2xl font-bold text-foreground">3. Brza Dostava</h3>
                <p className="mb-4 text-muted-foreground">
                  Nakon potvrde plaćanja, vaš box pripremamo i šaljemo u roku 24-48 sati. Dostava na adresu u Hrvatskoj
                  je besplatna. Pratite svoju pošiljku putem SMS i email obavijesti.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Besplatna dostava u Hrvatskoj
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Isporuka za 2-5 radnih dana
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Diskretno pakiranje
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-6 md:gap-8">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-background">
                <Gift className="h-8 w-8" />
              </div>
              <div>
                <h3 className="mb-2 font-serif text-2xl font-bold text-foreground">4. Otvorite i Uživajte!</h3>
                <p className="mb-4 text-muted-foreground">
                  Kada primite svoj mystery box, dolazi trenutak uzbuđenja! Otvorite ga i otkrijte premium proizvode
                  čija ukupna vrijednost višestruko premašuje cijenu boxa. Podijelite svoje iskustvo s nama na
                  društvenim mrežama!
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Garantirana višestruka vrijednost
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    100% originalni proizvodi
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Premium prezentacija
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary/50 py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Spremni za <span className="text-primary">Iznenađenje</span>?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
            Pridružite se tisućama zadovoljnih kupaca i otkrijte magiju LuxBox mystery boxova.
          </p>
          <Button asChild size="lg" className="bg-primary text-background hover:bg-gold-dark">
            <Link href="/mystery-boxes">Pregledaj Boxove</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
