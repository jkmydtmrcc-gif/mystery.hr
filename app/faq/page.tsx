import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "FAQ - Česta Pitanja | mystery.hr",
  description: "Odgovori na najčešće postavljana pitanja o mystery.hr mystery boxovima.",
}

const faqs = [
  {
    category: "O Mystery Boxovima",
    questions: [
      {
        q: "Što je mystery box?",
        a: "Mystery box je kutija s iznenađenjem koja sadrži pažljivo odabrane premium proizvode. Sadržaj nije unaprijed poznat, ali garantiramo da ukupna vrijednost proizvoda značajno premašuje cijenu boxa.",
      },
      {
        q: "Kakve proizvode mogu očekivati?",
        a: "Naši boxovi sadrže raznovrsne premium proizvode: modne dodatke, elektroniku, kozmetiku, lifestyle proizvode i više. Svaki box je jedinstven i prilagođen kategoriji.",
      },
      {
        q: "Je li garantirana vrijednost veća od cijene?",
        a: "Da! Garantiramo da ukupna maloprodajna vrijednost proizvoda u svakom boxu premašuje cijenu koju ste platili. Ponekad i višestruko!",
      },
      {
        q: "Mogu li odabrati što želim dobiti?",
        a: "Ne, to je suština mystery boxa - iznenađenje! Međutim, možete odabrati tematske boxove koji su fokusirani na određenu kategoriju proizvoda.",
      },
    ],
  },
  {
    category: "Narudžba i Plaćanje",
    questions: [
      {
        q: "Koji načini plaćanja su dostupni?",
        a: "Prihvaćamo kartično plaćanje (Visa, Mastercard, Maestro) putem sigurnog CorvusPay sustava te plaćanje općom uplatnicom.",
      },
      {
        q: "Je li plaćanje sigurno?",
        a: "Apsolutno! Koristimo CorvusPay, vodeći hrvatski payment gateway s 3D Secure autentifikacijom. Ne pohranjujemo podatke o vašoj kartici.",
      },
      {
        q: "Mogu li kupiti box kao poklon?",
        a: "Da! Prilikom narudžbe možete unijeti adresu za dostavu različitu od vaše. Također nudimo opciju poklon pakiranja.",
      },
      {
        q: "Kako mogu iskoristiti kupon kod?",
        a: "Kupon kod unesite prilikom završetka kupovine u polje 'Kupon kod'. Popust će se automatski primijeniti na vašu narudžbu.",
      },
    ],
  },
  {
    category: "Dostava",
    questions: [
      {
        q: "Koliko košta dostava?",
        a: "Dostava na adresu u Hrvatskoj je potpuno besplatna za sve narudžbe!",
      },
      {
        q: "Koliko traje dostava?",
        a: "Narudžbe obrađujemo u roku 24-48 sati. Isporuka na vašu adresu u Hrvatskoj traje 2-5 radnih dana.",
      },
      {
        q: "Mogu li pratiti svoju pošiljku?",
        a: "Da! Nakon slanja primiti ćete SMS i email s brojem za praćenje pošiljke.",
      },
      {
        q: "Što ako nisam kod kuće prilikom dostave?",
        a: "Kurir će vas kontaktirati telefonom. Ako vas ne uspije dobiti, pošiljka će biti spremljena u najbližoj poslovnici za preuzimanje.",
      },
    ],
  },
  {
    category: "Povrat i Reklamacije",
    questions: [
      {
        q: "Mogu li vratiti mystery box?",
        a: "Pravo na povrat primjenjuje se isključivo na NEOTVORENE boxove s neoštećenom ambalažom, u roku 14 dana od primitka. Otvaranjem boxa prihvaćate sadržaj.",
      },
      {
        q: "Što ako je proizvod oštećen?",
        a: "Ako je proizvod oštećen u transportu, odmah nas kontaktirajte i pošaljite fotografije. Organizirat ćemo zamjenu ili povrat novca.",
      },
      {
        q: "Koliko traje povrat novca?",
        a: "Nakon primitka vraćenog proizvoda i provjere, povrat novca izvršavamo u roku 14 dana istim načinom plaćanja.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl">
              Česta <span className="text-primary">Pitanja</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Pronađite odgovore na najčešće postavljana pitanja o mystery.hr mystery boxovima, narudžbama i dostavi.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="mb-4 font-serif text-xl font-bold text-primary">{category.category}</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${categoryIndex}-${faqIndex}`}
                      className="rounded-lg border border-border bg-card px-4"
                    >
                      <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-border bg-card p-8 text-center">
            <h3 className="mb-2 text-xl font-semibold text-foreground">Niste pronašli odgovor?</h3>
            <p className="mb-6 text-muted-foreground">
              Naš tim za podršku je tu za vas. Kontaktirajte nas i rado ćemo vam pomoći!
            </p>
            <Button asChild className="bg-primary text-background hover:bg-gold-dark">
              <Link href="/kontakt">Kontaktirajte Nas</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
