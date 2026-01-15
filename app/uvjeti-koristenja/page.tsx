import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Uvjeti Korištenja | mystery.hr",
  description: "Opći uvjeti korištenja web trgovine mystery.hr.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Uvjeti <span className="text-primary">Korištenja</span>
          </h1>

          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-lg text-muted-foreground">Zadnja izmjena: 1. siječnja 2025.</p>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">1. Opće Odredbe</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Ovi Opći uvjeti korištenja (u daljnjem tekstu: Uvjeti) primjenjuju se na sve korisnike web trgovine
                  mystery.hr (u daljnjem tekstu: Trgovina) koja je u vlasništvu tvrtke qube d.o.o., sa sjedištem na
                  adresi Ulica Josipa Huttlera 34, 31000 Osijek, Hrvatska (OIB: 05419427342).
                </p>
                <p>
                  Pristupom i korištenjem ove Trgovine, korisnik prihvaća ove Uvjete u cijelosti. Ako se ne slažete s
                  ovim Uvjetima, molimo vas da ne koristite našu Trgovinu.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">2. Definicije</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-foreground">Trgovina</strong> - web stranica mystery.hr i sve njezine
                    podstranice
                  </li>
                  <li>
                    <strong className="text-foreground">Prodavatelj</strong> - qube d.o.o.
                  </li>
                  <li>
                    <strong className="text-foreground">Kupac/Korisnik</strong> - fizička ili pravna osoba koja kupuje
                    proizvode putem Trgovine
                  </li>
                  <li>
                    <strong className="text-foreground">Mystery Box</strong> - kutija s iznenađenjem čiji sadržaj nije
                    unaprijed poznat kupcu
                  </li>
                  <li>
                    <strong className="text-foreground">Proizvod</strong> - bilo koji artikl dostupan za kupnju u
                    Trgovini
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">3. Narudžba i Ugovor</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Narudžba se smatra izvršenom nakon što kupac doda proizvode u košaricu, ispuni podatke za dostavu,
                  odabere način plaćanja i potvrdi narudžbu. Kupac će primiti potvrdu narudžbe na email adresu.
                </p>
                <p>
                  Ugovor o kupoprodaji sklapa se u trenutku kada Prodavatelj pošalje potvrdu o zaprimljenoj narudžbi na
                  email adresu Kupca.
                </p>
                <p>
                  Prodavatelj zadržava pravo odbiti narudžbu u slučaju nedostupnosti proizvoda, pogreške u cijeni ili
                  tehničkih problema.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">4. Cijene i Plaćanje</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Sve cijene u Trgovini izražene su u eurima (EUR) i uključuju PDV. Cijena proizvoda vrijedi u trenutku
                  narudžbe.
                </p>
                <p>Dostupni načini plaćanja:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Kartično plaćanje putem CorvusPay sustava (Visa, Mastercard, Maestro)</li>
                  <li>Plaćanje općom uplatnicom</li>
                </ul>
                <p>
                  Sva kartična plaćanja obrađuju se sigurno putem CorvusPay payment gateway-a. qube d.o.o. ne pohranjuje
                  podatke o karticama kupaca.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">5. Dostava</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Dostava se vrši na području Republike Hrvatske. Troškovi dostave su besplatni za sve narudžbe.</p>
                <p>
                  Očekivano vrijeme isporuke je 2-5 radnih dana od potvrde narudžbe. U slučaju kašnjenja, kupac će biti
                  obaviješten putem emaila ili telefona.
                </p>
                <p>
                  Kupac je dužan osigurati točnost podataka za dostavu. qube d.o.o. nije odgovoran za kašnjenja ili
                  neisporuku uzrokovanu netočnim podacima.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">6. Pravo na Odustanak (Povrat)</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Sukladno Zakonu o zaštiti potrošača, kupac ima pravo odustati od ugovora u roku od 14 dana od primitka
                  proizvoda, bez navođenja razloga.
                </p>
                <p>
                  <strong className="text-foreground">Važna napomena za Mystery Boxove:</strong> S obzirom na prirodu
                  mystery boxova (proizvodi nepoznatog sadržaja), pravo na povrat primjenjuje se isključivo na
                  neotvorene kutije s neoštećenom ambalažom. Otvaranjem mystery boxa kupac prihvaća sadržaj i gubi pravo
                  na povrat.
                </p>
                <p>
                  Za više informacija o postupku povrata, pogledajte našu{" "}
                  <a href="/politika-povrata" className="text-primary hover:underline">
                    Politiku povrata
                  </a>
                  .
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">7. Reklamacije</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  U slučaju oštećenja proizvoda ili dostave neispravnog proizvoda, kupac ima pravo na reklamaciju.
                  Reklamaciju je potrebno podnijeti u roku od 8 dana od primitka pošiljke.
                </p>
                <p>Reklamaciju možete podnijeti putem:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Email: qube.reach@gmail.com</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">8. Intelektualno Vlasništvo</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Sav sadržaj na ovoj Trgovini, uključujući ali ne ograničavajući se na tekst, grafiku, logotipe, slike,
                  audio i video materijale, zaštićen je autorskim pravima i drugim pravima intelektualnog vlasništva.
                </p>
                <p>
                  Neovlašteno korištenje, kopiranje ili distribucija sadržaja strogo je zabranjeno i može rezultirati
                  pravnim postupkom.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">9. Ograničenje Odgovornosti</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  qube d.o.o. nije odgovoran za štetu nastalu uslijed više sile, prekida rada sustava, tehničkih
                  problema ili drugih okolnosti izvan naše kontrole.
                </p>
                <p>Odgovornost za neispravnost proizvoda ograničena je na vrijednost kupljenog proizvoda.</p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">10. Rješavanje Sporova</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  U slučaju spora, strane će nastojati riješiti spor mirnim putem. Ako to nije moguće, nadležan je sud u
                  Osijeku, Republika Hrvatska.
                </p>
                <p>
                  Za online rješavanje sporova, potrošači mogu koristiti platformu za online rješavanje sporova Europske
                  unije:{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">11. Izmjene Uvjeta</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  qube d.o.o. zadržava pravo izmjene ovih Uvjeta u bilo kojem trenutku. Izmjene stupaju na snagu danom
                  objave na web stranici. Preporučujemo redovito provjeravanje ovih Uvjeta.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">12. Kontakt</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Za sva pitanja vezana uz ove Uvjete, možete nas kontaktirati:</p>
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
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
