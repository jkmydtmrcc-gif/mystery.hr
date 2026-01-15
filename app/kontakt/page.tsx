import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Mail, MapPin, Clock, MessageCircle } from "lucide-react"

export const metadata = {
  title: "Kontakt | mystery.hr",
  description: "Kontaktirajte mystery.hr tim - tu smo za sva vaša pitanja i podršku.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl">
              Kontaktirajte <span className="text-primary">Nas</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Imate pitanja? Tu smo za vas! Javite nam se putem obrasca ili direktno na naše kontakt podatke.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">Email</h3>
                <p className="text-muted-foreground">Odgovaramo u roku 24 sata</p>
                <a href="mailto:qube.reach@gmail.com" className="mt-2 block text-primary hover:underline">
                  qube.reach@gmail.com
                </a>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">Adresa</h3>
                <p className="text-muted-foreground">qube d.o.o.</p>
                <p className="text-foreground">Ulica Josipa Huttlera 34, 31000 Osijek, Hrvatska</p>
                <p className="mt-2 text-sm text-muted-foreground">OIB: 05419427342</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">Radno Vrijeme</h3>
                <div className="space-y-1 text-muted-foreground">
                  <p>Ponedjeljak - Petak: 09:00 - 17:00</p>
                  <p>Subota - Nedjelja: Zatvoreno</p>
                </div>
              </div>

              <div className="rounded-xl border border-primary/30 bg-primary/10 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">Brzi Odgovori</h3>
                <p className="text-muted-foreground">
                  Provjerite naš{" "}
                  <a href="/faq" className="text-primary hover:underline">
                    FAQ
                  </a>{" "}
                  za odgovore na najčešća pitanja.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-8">
              <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">Pošaljite Nam Poruku</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
