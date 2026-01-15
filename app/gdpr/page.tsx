import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Shield, Eye, Edit, Trash2, Download, Ban, UserX } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "GDPR - Zaštita Podataka | mystery.hr",
  description: "Informacije o vašim pravima prema GDPR regulativi i kako mystery.hr štiti vaše osobne podatke.",
}

export default function GDPRPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                GDPR <span className="text-primary">Prava</span>
              </h1>
              <p className="text-muted-foreground">Opća uredba o zaštiti podataka</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">Što je GDPR?</h2>
              <p className="text-muted-foreground">
                Opća uredba o zaštiti podataka (GDPR - General Data Protection Regulation) je uredba Europske unije koja
                štiti privatnost i osobne podatke građana EU-a. Stupila je na snagu 25. svibnja 2018. godine i
                primjenjuje se na sve tvrtke koje obrađuju osobne podatke građana EU-a.
              </p>
              <p className="text-muted-foreground">
                qube d.o.o. u potpunosti poštuje GDPR regulativu i predani smo zaštiti vaših osobnih podataka.
              </p>
            </section>

            <section>
              <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">Vaša Prava prema GDPR-u</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Pravo Pristupa</h3>
                  <p className="text-sm text-muted-foreground">
                    Imate pravo zatražiti kopiju svih osobnih podataka koje imamo o vama, kao i informacije o tome kako
                    ih koristimo.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <Edit className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Pravo na Ispravak</h3>
                  <p className="text-sm text-muted-foreground">
                    Ako su vaši podaci netočni ili nepotpuni, imate pravo zatražiti ispravak bez nepotrebnog odgađanja.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <Trash2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Pravo na Brisanje</h3>
                  <p className="text-sm text-muted-foreground">
                    Poznato i kao "pravo na zaborav" - možete zatražiti brisanje vaših osobnih podataka pod određenim
                    uvjetima.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <Ban className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Pravo na Ograničenje</h3>
                  <p className="text-sm text-muted-foreground">
                    Možete zatražiti ograničenje obrade vaših podataka dok ne riješimo vaš prigovor ili zahtjev.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <Download className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Pravo na Prenosivost</h3>
                  <p className="text-sm text-muted-foreground">
                    Imate pravo primiti svoje podatke u strukturiranom, strojno čitljivom formatu i prenijeti ih drugom
                    voditelju obrade.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <UserX className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Pravo na Prigovor</h3>
                  <p className="text-sm text-muted-foreground">
                    Možete prigovoriti obradi vaših osobnih podataka za direktni marketing ili kada se obrada temelji na
                    legitimnom interesu.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">Kako Ostvariti Svoja Prava</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Za ostvarivanje bilo kojeg od navedenih prava, možete nas kontaktirati na:</p>
                <div className="rounded-xl border border-border bg-card p-6">
                  <p className="mb-2">
                    <strong className="text-foreground">Službenik za zaštitu podataka (DPO)</strong>
                  </p>
                  <p>Email: qube.reach@gmail.com</p>
                  <p>Adresa: qube d.o.o., Ulica Josipa Huttlera 34, 31000 Osijek, Hrvatska</p>
                  <p>OIB: 05419427342</p>
                </div>
                <p>
                  Vaš zahtjev obraditi ćemo u roku od 30 dana. U složenijim slučajevima, rok se može produžiti za
                  dodatnih 60 dana, o čemu ćemo vas obavijestiti.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">Obrazac za GDPR Zahtjev</h2>
              <div className="rounded-xl border border-border bg-card p-6">
                <p className="mb-4 text-muted-foreground">
                  Za podnošenje GDPR zahtjeva, molimo ispunite sljedeće informacije i pošaljite na qube.reach@gmail.com:
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>Vaše ime i prezime</li>
                  <li>Email adresa povezana s vašim računom</li>
                  <li>Vrsta zahtjeva (pristup, ispravak, brisanje, itd.)</li>
                  <li>Detaljan opis vašeg zahtjeva</li>
                  <li>Dokaz identiteta (kopija osobne iskaznice)</li>
                </ul>
                <Button className="bg-primary text-background hover:bg-gold-dark">Pošalji GDPR Zahtjev</Button>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">Pravo na Pritužbu</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Ako smatrate da smo prekršili vaša prava u vezi sa zaštitom osobnih podataka, imate pravo podnijeti
                  pritužbu nadležnom nadzornom tijelu:
                </p>
                <div className="rounded-xl border border-border bg-card p-6">
                  <p className="mb-2">
                    <strong className="text-foreground">Agencija za zaštitu osobnih podataka (AZOP)</strong>
                  </p>
                  <p>Selska cesta 136, 10000 Zagreb</p>
                  <p>Tel: +385 1 4609 000</p>
                  <p>Email: azop@azop.hr</p>
                  <p>Web: www.azop.hr</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
