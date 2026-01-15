import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Politika Privatnosti | mystery.hr",
  description: "Saznajte kako mystery.hr prikuplja, koristi i štiti vaše osobne podatke.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Politika <span className="text-primary">Privatnosti</span>
          </h1>

          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-lg text-muted-foreground">Zadnja izmjena: 1. siječnja 2025.</p>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">1. Uvod</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  qube d.o.o. (u daljnjem tekstu: "mi", "naš" ili "Tvrtka") posvećena je zaštiti privatnosti svojih
                  korisnika. Ova Politika privatnosti objašnjava kako prikupljamo, koristimo, dijelimo i štitimo vaše
                  osobne podatke kada koristite našu web stranicu mystery.hr i povezane usluge.
                </p>
                <p>
                  Korištenjem naše web stranice pristajete na prikupljanje i korištenje vaših podataka kako je opisano u
                  ovoj Politici privatnosti.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">2. Voditelj Obrade Podataka</h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="rounded-xl border border-border bg-card p-6">
                  <p>
                    <strong className="text-foreground">qube d.o.o.</strong>
                  </p>
                  <p>Ulica Josipa Huttlera 34, 31000 Osijek, Hrvatska</p>
                  <p>OIB: 05419427342</p>
                  <p>Email: qube.reach@gmail.com</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">3. Koje Podatke Prikupljamo</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Prikupljamo sljedeće kategorije osobnih podataka:</p>

                <h3 className="font-semibold text-foreground">3.1 Podaci koje nam direktno dajete:</h3>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Ime i prezime</li>
                  <li>Email adresa</li>
                  <li>Adresa za dostavu</li>
                  <li>Broj telefona</li>
                  <li>Podaci za izdavanje računa (naziv tvrtke, OIB za pravne osobe)</li>
                </ul>

                <h3 className="font-semibold text-foreground">3.2 Podaci koje automatski prikupljamo:</h3>
                <ul className="list-disc space-y-2 pl-6">
                  <li>IP adresa</li>
                  <li>Vrsta preglednika i uređaja</li>
                  <li>Operativni sustav</li>
                  <li>Stranice koje posjećujete na našoj web stranici</li>
                  <li>Vrijeme i datum posjeta</li>
                  <li>Podaci o kolačićima (cookies)</li>
                </ul>

                <h3 className="font-semibold text-foreground">3.3 Podaci o transakcijama:</h3>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Povijest narudžbi</li>
                  <li>Podaci o plaćanju (NE pohranjujemo podatke o karticama - to radi CorvusPay)</li>
                  <li>Podaci o dostavi</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">4. Svrhe Obrade Podataka</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Vaše osobne podatke koristimo za:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Obradu i isporuku vaših narudžbi</li>
                  <li>Komunikaciju o statusu narudžbe</li>
                  <li>Pružanje korisničke podrške</li>
                  <li>Slanje marketinških poruka (uz vaš pristanak)</li>
                  <li>Poboljšanje naše web stranice i usluga</li>
                  <li>Sprječavanje prijevara i zaštitu sigurnosti</li>
                  <li>Ispunjavanje zakonskih obveza</li>
                  <li>Analizu i statistiku posjeta</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">5. Pravna Osnova za Obradu</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Obrađujemo vaše podatke na temelju:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-foreground">Izvršenja ugovora</strong> - za obradu narudžbi i pružanje
                    usluga
                  </li>
                  <li>
                    <strong className="text-foreground">Vašeg pristanka</strong> - za marketinšku komunikaciju i
                    kolačiće
                  </li>
                  <li>
                    <strong className="text-foreground">Legitimnog interesa</strong> - za poboljšanje usluga i sigurnost
                  </li>
                  <li>
                    <strong className="text-foreground">Zakonske obveze</strong> - za računovodstvene i porezne svrhe
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">6. Dijeljenje Podataka</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Vaše podatke možemo dijeliti sa sljedećim kategorijama primatelja:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-foreground">Dostavne službe</strong> - za dostavu narudžbi
                  </li>
                  <li>
                    <strong className="text-foreground">Procesori plaćanja</strong> - CorvusPay za obradu transakcija
                  </li>
                  <li>
                    <strong className="text-foreground">IT pružatelji usluga</strong> - hosting i tehnička podrška
                  </li>
                  <li>
                    <strong className="text-foreground">Državna tijela</strong> - kada je to zakonski obvezno
                  </li>
                </ul>
                <p>NE prodajemo vaše osobne podatke trećim stranama.</p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">7. Kolačići (Cookies)</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Koristimo kolačiće za poboljšanje vašeg iskustva na web stranici. Vrste kolačića koje koristimo:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-foreground">Nužni kolačići</strong> - potrebni za funkcioniranje stranice
                  </li>
                  <li>
                    <strong className="text-foreground">Analitički kolačići</strong> - za razumijevanje kako koristite
                    stranicu
                  </li>
                  <li>
                    <strong className="text-foreground">Marketinški kolačići</strong> - za personalizirane oglase
                  </li>
                </ul>
                <p>
                  Možete upravljati postavkama kolačića putem postavki svog preglednika ili putem našeg cookie bannera.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">8. Sigurnost Podataka</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Primjenjujemo odgovarajuće tehničke i organizacijske mjere za zaštitu vaših podataka:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>SSL enkripcija za siguran prijenos podataka</li>
                  <li>Ograničen pristup osobnim podacima</li>
                  <li>Redovito ažuriranje sigurnosnih sustava</li>
                  <li>Edukacija zaposlenika o zaštiti podataka</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">9. Rok Čuvanja Podataka</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Vaše podatke čuvamo:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Podaci o narudžbama: 10 godina (računovodstvena obveza)</li>
                  <li>Podaci za marketing: dok ne povučete pristanak</li>
                  <li>Podaci korisničkog računa: dok je račun aktivan</li>
                  <li>Kolačići: ovisno o vrsti, od sesije do 2 godine</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">10. Vaša Prava</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Sukladno GDPR-u, imate sljedeća prava:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-foreground">Pravo pristupa</strong> - uvid u svoje osobne podatke
                  </li>
                  <li>
                    <strong className="text-foreground">Pravo na ispravak</strong> - ispravak netočnih podataka
                  </li>
                  <li>
                    <strong className="text-foreground">Pravo na brisanje</strong> - brisanje vaših podataka ("pravo na
                    zaborav")
                  </li>
                  <li>
                    <strong className="text-foreground">Pravo na ograničenje obrade</strong> - ograničavanje načina
                    korištenja podataka
                  </li>
                  <li>
                    <strong className="text-foreground">Pravo na prenosivost</strong> - primanje podataka u
                    strukturiranom formatu
                  </li>
                  <li>
                    <strong className="text-foreground">Pravo na prigovor</strong> - prigovor na obradu za direktni
                    marketing
                  </li>
                  <li>
                    <strong className="text-foreground">Pravo na povlačenje pristanka</strong> - povlačenje pristanka u
                    bilo kojem trenutku
                  </li>
                </ul>
                <p>Za ostvarivanje svojih prava, kontaktirajte nas na: qube.reach@gmail.com</p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">11. Pritužbe</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Ako smatrate da smo prekršili vaša prava u vezi sa zaštitom osobnih podataka, imate pravo podnijeti
                  pritužbu Agenciji za zaštitu osobnih podataka (AZOP):
                </p>
                <div className="rounded-xl border border-border bg-card p-6">
                  <p>
                    <strong className="text-foreground">Agencija za zaštitu osobnih podataka</strong>
                  </p>
                  <p>Selska cesta 136, 10000 Zagreb</p>
                  <p>Web: www.azop.hr</p>
                  <p>Email: azop@azop.hr</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">12. Izmjene Politike</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Zadržavamo pravo izmjene ove Politike privatnosti. O značajnim izmjenama bit ćete obaviješteni putem
                  naše web stranice ili emaila.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">13. Kontakt</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Za sva pitanja o privatnosti i zaštiti podataka:</p>
                <div className="rounded-xl border border-border bg-card p-6">
                  <p>
                    <strong className="text-foreground">Službenik za zaštitu podataka</strong>
                  </p>
                  <p>qube d.o.o.</p>
                  <p>Ulica Josipa Huttlera 34, 31000 Osijek, Hrvatska</p>
                  <p>OIB: 05419427342</p>
                  <p>Email: qube.reach@gmail.com</p>
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
