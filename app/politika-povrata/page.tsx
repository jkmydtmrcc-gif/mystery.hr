import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AlertTriangle, CheckCircle, Package, RotateCcw, Clock, Mail } from "lucide-react"

export const metadata = {
  title: "Politika Povrata | mystery.hr",
  description: "Saznajte sve o pravu na povrat i procesu vraćanja proizvoda kod mystery.hr.",
}

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Politika <span className="text-primary">Povrata</span>
          </h1>

          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-lg text-muted-foreground">Zadnja izmjena: 1. siječnja 2025.</p>

            {/* Important Notice */}
            <div className="rounded-xl border border-primary/30 bg-primary/10 p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">Važna Napomena za Mystery Boxove</h3>
                  <p className="text-muted-foreground">
                    Zbog prirode mystery boxova (proizvodi nepoznatog sadržaja), pravo na povrat primjenjuje se
                    isključivo na <strong className="text-foreground">neotvorene kutije</strong> s neoštećenom
                    ambalažom. Otvaranjem mystery boxa kupac prihvaća sadržaj i gubi pravo na povrat novca.
                  </p>
                </div>
              </div>
            </div>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">1. Pravo na Odustanak</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Sukladno Zakonu o zaštiti potrošača (NN 41/14, 110/15, 14/19), imate pravo odustati od ugovora
                  sklopljenog na daljinu u roku od <strong className="text-foreground">14 dana</strong> od dana kada ste
                  vi ili treća osoba koju ste odredili (osim prijevoznika) fizički preuzeli robu.
                </p>
                <p>
                  Za ostvarivanje prava na odustanak, morate nas obavijestiti o svojoj odluci putem nedvosmislene pisane
                  izjave (poštom ili e-mailom).
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">2. Uvjeti za Povrat</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <h3 className="font-semibold text-foreground">Prihvaćamo Povrat</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Neotvoreni mystery box</li>
                    <li>• Originalna neoštećena ambalaža</li>
                    <li>• Unutar 14 dana od primitka</li>
                    <li>• S originalnim računom</li>
                    <li>• Oštećen proizvod pri dostavi</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <h3 className="font-semibold text-foreground">Ne Prihvaćamo Povrat</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Otvoreni mystery box</li>
                    <li>• Oštećena ambalaža (osim u transportu)</li>
                    <li>• Nakon isteka roka od 14 dana</li>
                    <li>• Bez originalnog računa</li>
                    <li>• Korišteni proizvodi</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">3. Postupak Povrata</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-background">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">Korak 1: Kontaktirajte nas</h3>
                    <p className="text-muted-foreground">
                      Pošaljite zahtjev za povrat na qube.reach@gmail.com s brojem narudžbe i razlogom povrata.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-background">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">Korak 2: Potvrda i upute</h3>
                    <p className="text-muted-foreground">
                      U roku 24 sata dobit ćete potvrdu i detaljne upute za slanje proizvoda natrag.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-background">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">Korak 3: Pošaljite proizvod</h3>
                    <p className="text-muted-foreground">
                      Sigurno zapakirajte proizvod i pošaljite ga na našu adresu. Preporučujemo slanje s praćenjem.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-background">
                    <RotateCcw className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">Korak 4: Povrat novca</h3>
                    <p className="text-muted-foreground">
                      Nakon primitka i provjere proizvoda, povrat novca izvršit ćemo u roku 14 dana.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">4. Troškovi Povrata</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Odustanak kupca:</strong> Kupac snosi troškove povratne pošiljke.
                </p>
                <p>
                  <strong className="text-foreground">Oštećenje u transportu:</strong> qube d.o.o. snosi sve troškove,
                  uključujući povratnu pošiljku.
                </p>
                <p>
                  <strong className="text-foreground">Pogrešna isporuka:</strong> qube d.o.o. snosi sve troškove i
                  organizira besplatno preuzimanje.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">5. Povrat Novca</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Povrat novca izvršavamo na isti način na koji je izvršeno plaćanje:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Kartično plaćanje - povrat na karticu (3-5 radnih dana nakon obrade)</li>
                  <li>Uplatnica - povrat na bankovni račun (3-5 radnih dana)</li>
                </ul>
                <p>
                  Iznos povrata uključuje cijenu proizvoda. Troškovi dostave vraćaju se samo ako je cijela narudžba
                  vraćena.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">6. Reklamacije</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>U slučaju oštećenja proizvoda pri dostavi ili dostave neispravnog proizvoda, molimo vas da:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Fotografirate oštećenje/neispravnost</li>
                  <li>Prijavite reklamaciju u roku 8 dana od primitka</li>
                  <li>Sačuvate originalnu ambalažu</li>
                </ul>
                <p>Reklamacije šaljite na: qube.reach@gmail.com</p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">7. Rokovi</h2>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Prijava povrata</p>
                      <p className="font-semibold text-foreground">14 dana</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Slanje proizvoda</p>
                      <p className="font-semibold text-foreground">14 dana od prijave</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Povrat novca</p>
                      <p className="font-semibold text-foreground">14 dana od primitka</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">8. Kontakt za Povrate</h2>
              <div className="rounded-xl border border-border bg-card p-6">
                <p className="mb-2">
                  <strong className="text-foreground">qube d.o.o. - Odjel za povrate</strong>
                </p>
                <p className="text-muted-foreground">Ulica Josipa Huttlera 34, 31000 Osijek, Hrvatska</p>
                <p className="text-muted-foreground">OIB: 05419427342</p>
                <p className="text-muted-foreground">Email: qube.reach@gmail.com</p>
                <p className="mt-2 text-sm text-muted-foreground">Radno vrijeme: Pon-Pet 09:00-17:00</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
