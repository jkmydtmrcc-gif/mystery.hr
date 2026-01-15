import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ProductDetails } from "@/components/product-details"
import { RelatedProducts } from "@/components/related-products"
import { SpinToWinPopup } from "@/components/spin-to-win-popup"
import { ExitIntentPopup } from "@/components/exit-intent-popup"
import { FakeNotification } from "@/components/fake-notification"

const products = {
  "pet-mystery-box": {
    id: "pet-mystery-box",
    name: "Pet Mystery Box",
    price: 35,
    originalPrice: 89,
    image: "/pet-mystery-box.jpg",
    rating: 4.8,
    reviews: 189,
    stock: 8,
    potentialValue: "45€ - 120€",
    badge: "Ljubimci",
    items: "5-7 proizvoda",
    description:
      "Savršeno iznenađenje za vašeg ljubimca! Premium igračke, poslastice vrhunske kvalitete, dodaci za njegu i ekskluzivni pet artikli. Vaš ljubimac zaslužuje najbolje - oduševite ga luksuznim proizvodima koji će mu donijeti radost!",
    includes: [
      "Premium igračke za pse/mačke",
      "Grickalice vrhunske kvalitete",
      "Dodaci za njegu krzna i zubi",
      "Praktični pet pribor",
      "Moderne ogrlice i povodci",
      "Udoban krevet ili deka",
    ],
    gallery: ["/pet-mystery-box.jpg", "/pet-mystery-box.jpg", "/pet-mystery-box.jpg"],
  },
  "sex-mystery-box": {
    id: "sex-mystery-box",
    name: "Sex Mystery Box",
    price: 50,
    originalPrice: 139,
    image: "/sex-mystery-box.jpg",
    rating: 4.9,
    reviews: 267,
    stock: 6,
    potentialValue: "70€ - 220€",
    badge: "18+ Ekskluzivno",
    items: "5-7 proizvoda",
    description:
      "Diskretno pakiranje, maksimalna uzbuđenja! Luksuzni intimni proizvodi, wellness artikli i ekskluzivna iznenađenja za posebne trenutke. Poboljšajte intimnost uz premium proizvode koji će vašu vezu podići na višu razinu. 18+",
    includes: [
      "Premium wellness proizvodi",
      "Luksuzno donje rublje",
      "Aromatizirane svijeće i difuzori",
      "Profesionalna masažna ulja",
      "Diskretni gadgeti vrhunske kvalitete",
      "Spa proizvodi za dvoje",
    ],
    gallery: ["/sex-mystery-box.jpg", "/sex-mystery-box.jpg", "/sex-mystery-box.jpg"],
  },
  "garden-mystery-box": {
    id: "garden-mystery-box",
    name: "Garden Mystery Box",
    price: 38,
    originalPrice: 95,
    image: "/garden-mystery-box.jpg",
    rating: 4.6,
    reviews: 145,
    stock: 11,
    potentialValue: "50€ - 140€",
    badge: "Vrtlari",
    items: "5-7 proizvoda",
    description:
      "Za ljubitelje vrtlarstva! Rijetke sjemenke egzotičnih biljaka, profesionalno vrtlarsko oruđe, moderne dekoracije za vrt i sve što vam treba za savršenu zelenu oazu. Stvorite vrt iz snova!",
    includes: [
      "Ekskluzivne sjemenke rijetkih biljaka",
      "Profesionalno vrtlarsko oruđe",
      "LED grow lights za biljke",
      "Dizajnerske ukrasne posude",
      "Organska gnojiva i dodaci",
      "Moderne vrtne dekoracije",
    ],
    gallery: ["/garden-mystery-box.jpg", "/garden-mystery-box.jpg", "/garden-mystery-box.jpg"],
  },
  "home-mystery-box": {
    id: "home-mystery-box",
    name: "Home Mystery Box",
    price: 42,
    originalPrice: 109,
    image: "/home-mystery-box.jpg",
    rating: 4.7,
    reviews: 234,
    stock: 9,
    potentialValue: "65€ - 180€",
    badge: "Home Decor",
    items: "5-7 proizvoda",
    description:
      "Transformirajte svoj dom u luksuzni prostor! Ekskluzivni dekorativni artikli, praktični smart dodaci, premium ambient rasvjeta i sve za moderan, luksuzan dom koji odiše stilom i elegancijom.",
    includes: [
      "Premium dekorativni jastuci",
      "Smart LED ambient rasvjeta",
      "Dizajnerske svijeće i difuzori",
      "Moderni zidni ukrasi",
      "Praktični organizatori prostora",
      "Smart home gadgeti",
    ],
    gallery: ["/home-mystery-box.jpg", "/home-mystery-box.jpg", "/home-mystery-box.jpg"],
  },
  "tech-mystery-box": {
    id: "tech-mystery-box",
    name: "Tech Mystery Box",
    price: 49,
    originalPrice: 129,
    image: "/tech-mystery-box.jpg",
    rating: 4.9,
    reviews: 342,
    stock: 5,
    potentialValue: "70€ - 200€",
    badge: "Tech Lover",
    items: "4-6 proizvoda",
    description:
      "Najnoviji tech gadgeti i inovacije koje će oduševiti svakog tech entuzijasta! Pametni uređaji najnovije generacije, gaming oprema, premium audio oprema i sve što tech ljubitelji obožavaju. Budite korak ispred!",
    includes: [
      "Premium Bluetooth slušalice",
      "High-capacity power bank",
      "Smart watch band kolekcija",
      "Multifunkcionalni USB hub",
      "Bežični brzi punjač",
      "Gaming oprema i dodaci",
    ],
    gallery: ["/tech-mystery-box.jpg", "/tech-mystery-box.jpg", "/tech-mystery-box.jpg"],
  },
  "random-mystery-box": {
    id: "random-mystery-box",
    name: "Random Mystery Box",
    price: 30,
    originalPrice: 79,
    image: "/random-mystery-box.jpg",
    rating: 4.5,
    reviews: 412,
    stock: 15,
    potentialValue: "60€ - 130€",
    badge: "Najpopularniji",
    items: "6-8 proizvoda",
    description:
      "Ultimativno iznenađenje za one koji vole avanture! Mix premium proizvoda iz svih kategorija - nikad ne znate što ćete dobiti, a to je upravo čarolija! Najveća uzbuđenja i najbolji omjer cijene i vrijednosti u našoj ponudi!",
    includes: [
      "Najnoviji tech gadgeti",
      "Moderni fashion dodaci",
      "Premium beauty proizvodi",
      "Luksuzne home dekoracije",
      "Gourmet snacks & treats",
      "Ekskluzivni lifestyle artikli",
    ],
    gallery: ["/random-mystery-box.jpg", "/random-mystery-box.jpg", "/random-mystery-box.jpg"],
  },
  "perfume-mystery-box": {
    id: "perfume-mystery-box",
    name: "Perfume Mystery Box",
    price: 45,
    originalPrice: 119,
    image: "/perfume-mystery-box.jpg",
    rating: 4.8,
    reviews: 287,
    stock: 7,
    potentialValue: "70€ - 200€",
    badge: "Mirisi",
    items: "4-6 proizvoda",
    description:
      "Otkrijte svijet luksuznih mirisa! Ekskluzivni designer parfemi, rijetki niche fragrances i mirisne kolekcije koje će vas osvojiti. Savršen poklon za ljubitelje sofisticiranih mirisa koji žele istaknuti svoju jedinstvenu osobnost.",
    includes: [
      "Designer parfemi 50ml+ bočice",
      "Ekskluzivni niche fragrance uzorci",
      "Premium body mist",
      "Luksuzne mirisne svijeće",
      "Travel size parfemi za put",
      "Eau de toilette kolekcija",
    ],
    gallery: ["/perfume-mystery-box.jpg", "/perfume-mystery-box.jpg", "/perfume-mystery-box.jpg"],
  },
  "beauty-mystery-box": {
    id: "beauty-mystery-box",
    name: "Beauty Mystery Box",
    price: 39,
    originalPrice: 99,
    image: "/beauty-mystery-box.jpg",
    rating: 4.9,
    reviews: 456,
    stock: 12,
    potentialValue: "65€ - 150€",
    badge: "Beauty Hit",
    items: "5-7 proizvoda",
    description:
      "Ljepota u jednoj luksuznoj kutiji! Premium šminka renomiranih brendova, napredna njega kože, profesionalni hair care proizvodi i beauty alati koje koriste i profesionalci. Vaša nova beauty rutina počinje ovdje!",
    includes: [
      "Premium high-end šminka",
      "Profesionalni serumi za lice",
      "Vrhunski hair care proizvodi",
      "Beauty alati i dodaci",
      "Korejske sheet maske kolekcija",
      "Kompletan nail care set",
    ],
    gallery: ["/beauty-mystery-box.jpg", "/beauty-mystery-box.jpg", "/beauty-mystery-box.jpg"],
  },
  "kid-mystery-box": {
    id: "kid-mystery-box",
    name: "Kid Mystery Box",
    price: 33,
    originalPrice: 85,
    image: "/kid-mystery-box.jpg",
    rating: 4.7,
    reviews: 298,
    stock: 10,
    potentialValue: "50€ - 110€",
    badge: "Za Djecu",
    items: "5-7 proizvoda",
    description:
      "Radost i osmijeh za najmlađe članove obitelji! Edukativne igračke koje razvijaju kreativnost, STEM setovi za učenje kroz igru, kreativni art setovi i zabavni dodaci. Sigurno, kvalitetno i puno neograničene zabave!",
    includes: [
      "Edukativne igračke za razvoj",
      "STEM setovi za učenje",
      "Profesionalne bojice i art setovi",
      "Zanimljivi puzzle za sve uzraste",
      "Ilustrirane knjige za djecu",
      "Kvalitetne mekane plišane igračke",
    ],
    gallery: ["/kid-mystery-box.jpg", "/kid-mystery-box.jpg", "/kid-mystery-box.jpg"],
  },
}

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params
  const product = products[id as keyof typeof products]
  if (!product) {
    return {
      title: "Proizvod nije pronađen | Mystery.hr",
    }
  }
  return {
    title: `${product.name} | Mystery.hr - Premium Mystery Box`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: Params }) {
  const { id } = await params
  const product = products[id as keyof typeof products]

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background animate-fade-in">
      <Header />
      <ProductDetails product={product} />
      <RelatedProducts currentId={id} />
      <Footer />
      <SpinToWinPopup />
      <ExitIntentPopup />
      <FakeNotification />
    </main>
  )
}
