import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Award, Heart, Shield } from "lucide-react"

export const metadata = {
  title: "O Nama | mystery.hr - Premium Mystery Boxovi",
  description: "Saznajte više o mystery.hr, vodećem hrvatskom brendu premium mystery boxova.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              O <span className="text-primary">mystery.hr</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Kreiramo nezaboravna iskustva kroz pažljivo kurirane mystery boxove ispunjene premium proizvodima. Naša
              misija je donijeti uzbuđenje i iznenađenje u svaki dom.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold text-foreground md:text-4xl">
                Naša <span className="text-primary">Priča</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  mystery.hr je nastao iz jednostavne ideje - svatko zaslužuje malo iznenađenja u životu. Osnovali smo
                  platformu 2024. godine s vizijom stvaranja premium iskustva kupovine koje kombinira uzbuđenje
                  nepoznatog s garancijom kvalitete.
                </p>
                <p>
                  Naš tim pažljivo odabire svaki proizvod koji ulazi u naše boxove, surađujući s renomiranim brendovima
                  kako bismo osigurali da svaki kupac dobije višestruku vrijednost za svoj novac.
                </p>
                <p>
                  Danas smo ponosni na tisuće zadovoljnih kupaca diljem Hrvatske koji su otkrili radost mystery.hr
                  iskustva.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/mystery-box-team-office.jpg"
                alt="mystery.hr tim"
                className="rounded-2xl border border-border"
              />
              <div className="absolute -bottom-6 -left-6 rounded-xl border border-primary/30 bg-card p-4">
                <p className="text-3xl font-bold text-primary">2024</p>
                <p className="text-sm text-muted-foreground">Godina osnivanja</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
              Naše <span className="text-primary">Vrijednosti</span>
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-bold text-foreground">Premium Kvaliteta</h3>
              <p className="text-muted-foreground">Samo provjereni proizvodi poznatih brendova ulaze u naše boxove.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-bold text-foreground">Briga o Kupcima</h3>
              <p className="text-muted-foreground">Vaše zadovoljstvo je naš prioritet - tu smo za vas 24/7.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-bold text-foreground">Sigurnost</h3>
              <p className="text-muted-foreground">Sigurno plaćanje i zaštita vaših podataka su nam na prvom mjestu.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <p className="font-serif text-5xl font-bold text-primary">10K+</p>
              <p className="text-muted-foreground">Zadovoljnih kupaca</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-5xl font-bold text-primary">50K+</p>
              <p className="text-muted-foreground">Isporučenih boxova</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-5xl font-bold text-primary">4.9</p>
              <p className="text-muted-foreground">Prosječna ocjena</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-5xl font-bold text-primary">100%</p>
              <p className="text-muted-foreground">Originalni proizvodi</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-8 text-center font-serif text-3xl font-bold text-foreground">
              Podaci o <span className="text-primary">Tvrtki</span>
            </h2>
            <div className="rounded-xl border border-border bg-card p-8">
              <dl className="space-y-4">
                <div className="flex justify-between border-b border-border pb-4">
                  <dt className="text-muted-foreground">Naziv tvrtke</dt>
                  <dd className="font-semibold text-foreground">qube d.o.o.</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-4">
                  <dt className="text-muted-foreground">Sjedište</dt>
                  <dd className="font-semibold text-foreground">Ulica Josipa Huttlera 34, 31000 Osijek, Hrvatska</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-4">
                  <dt className="text-muted-foreground">OIB</dt>
                  <dd className="font-semibold text-foreground">05419427342</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-4">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd className="font-semibold text-foreground">qube.reach@gmail.com</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Web</dt>
                  <dd className="font-semibold text-foreground">mystery.hr</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
