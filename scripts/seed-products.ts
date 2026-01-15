import { MongoClient } from "mongodb"

const products = [
  {
    name: "Pet Mystery Box",
    slug: "pet-mystery-box",
    description:
      "Savršeno iznenađenje za vašeg ljubimca! Igračke, poslastice, dodaci za njegu i ekskluzivni pet artikli. Vaš ljubimac zaslužuje najbolje!",
    price: 35,
    originalPrice: 70,
    image: "/pet-mystery-box.jpg",
    category: "pet",
    stock: 145,
    isActive: true,
    potentialItems: [
      "Premium igračke za pse/mačke",
      "Grickalice vrhunske kvalitete",
      "Dodaci za njegu",
      "Pet pribor",
      "Ogrlice i povodci",
      "Krevet za ljubimce",
    ],
    minValue: 50,
    maxValue: 120,
  },
  {
    name: "Sex Mystery Box",
    slug: "sex-mystery-box",
    description:
      "Diskretno pakiranje, maksimalna uzbuđenja! Luksuzni intimni proizvodi, wellness artikli i ekskluzivna iznenađenja za posebne trenutke. 18+",
    price: 45,
    originalPrice: 95,
    image: "/images/image.png",
    gallery: ["/images/image.png", "https://cdn.empiredrop.com/boxes/video-turn/01JM2458V2VJ6XJ1QE6WB05938.webm"],
    category: "adult",
    stock: 85,
    isActive: true,
    potentialItems: [
      "Premium wellness proizvodi",
      "Luksuzno rublje",
      "Aromatizirane svijeće",
      "Masažna ulja",
      "Diskretni gadgeti",
      "Spa proizvodi",
    ],
    minValue: 75,
    maxValue: 160,
  },
  {
    name: "Garden Mystery Box",
    slug: "garden-mystery-box",
    description:
      "Za ljubitelje vrtlarstva! Sjemenke rijetkih biljaka, vrtlarsko oruđe, dekoracije za vrt i sve što vam treba za savršenu zelenu oazu.",
    price: 30,
    originalPrice: 65,
    image: "/garden-mystery-box.jpg",
    category: "garden",
    stock: 120,
    isActive: true,
    potentialItems: [
      "Ekskluzivne sjemenke",
      "Vrtlarsko oruđe",
      "LED svjetla za biljke",
      "Ukrasne posude",
      "Gnojiva i dodaci",
      "Vrtne dekoracije",
    ],
    minValue: 50,
    maxValue: 110,
  },
  {
    name: "Home Mystery Box",
    slug: "home-mystery-box",
    description:
      "Transformirajte svoj dom! Ekskluzivni dekorativni artikli, praktični dodaci, ambient rasvjeta i sve za moderan, luksuzan dom.",
    price: 40,
    originalPrice: 85,
    image: "/home-mystery-box.jpg",
    category: "home",
    stock: 95,
    isActive: true,
    potentialItems: [
      "Dekorativni jastuci",
      "LED ambient rasvjeta",
      "Svijeće i difuzori",
      "Zidni ukrasi",
      "Organizatori prostora",
      "Smart home gadgeti",
    ],
    minValue: 65,
    maxValue: 140,
  },
  {
    name: "Tech Mystery Box",
    slug: "tech-mystery-box",
    description:
      "Najnoviji tech gadgeti i inovacije! Pametni uređaji, gaming oprema, audio oprema i sve što tech entuzijasti obožavaju.",
    price: 50,
    originalPrice: 105,
    image: "/tech-mystery-box.jpg",
    category: "tech",
    stock: 150,
    isActive: true,
    potentialItems: [
      "Bluetooth slušalice",
      "Power bank",
      "Smart watch band",
      "USB hub",
      "Wireless punjač",
      "Gaming oprema",
    ],
    minValue: 80,
    maxValue: 180,
  },
  {
    name: "Random Mystery Box",
    slug: "random-mystery-box",
    description:
      "Ultimativno iznenađenje! Mix proizvoda iz svih kategorija - nikad ne znate što ćete dobiti. Najveća uzbuđenja i najbolji omjer cijene i vrijednosti!",
    price: 25,
    originalPrice: 55,
    image: "/random-mystery-box.jpg",
    category: "random",
    stock: 200,
    isActive: true,
    potentialItems: [
      "Tech gadgeti",
      "Fashion dodaci",
      "Beauty proizvodi",
      "Home dekoracije",
      "Snacks & treats",
      "Lifestyle artikli",
    ],
    minValue: 40,
    maxValue: 90,
  },
  {
    name: "Perfume Mystery Box",
    slug: "perfume-mystery-box",
    description:
      "Otkrijte luksuzne mirise! Designerski parfemi, niche fragrances i ekskluzivne mirisne kolekcije. Savršen poklon za ljubitelje mirisa.",
    price: 42,
    originalPrice: 90,
    image: "/perfume-mystery-box.jpg",
    category: "perfume",
    stock: 110,
    isActive: true,
    potentialItems: [
      "Designer parfemi 50ml",
      "Niche fragrance uzorci",
      "Body mist",
      "Mirisne svijeće",
      "Travel size parfemi",
      "Eau de toilette",
    ],
    minValue: 70,
    maxValue: 160,
  },
  {
    name: "Beauty Mystery Box",
    slug: "beauty-mystery-box",
    description:
      "Ljepota u jednoj kutiji! Premium šminka, njega kože, hair care proizvodi i beauty alati od renomiranih brendova. Vaša nova beauty rutina počinje ovdje!",
    price: 38,
    originalPrice: 80,
    image: "/beauty-mystery-box.jpg",
    category: "beauty",
    stock: 130,
    isActive: true,
    potentialItems: [
      "Premium šminka",
      "Serumi za lice",
      "Hair care proizvodi",
      "Beauty alati",
      "Sheet maske",
      "Nail care set",
    ],
    minValue: 60,
    maxValue: 135,
  },
  {
    name: "Kid Mystery Box",
    slug: "kid-mystery-box",
    description:
      "Radost za najmlađe! Edukativne igračke, creative setovi, knjige i zabavni dodaci za djecu. Sigurno, kvalitetno i puno zabave!",
    price: 32,
    originalPrice: 68,
    image: "/kid-mystery-box.jpg",
    category: "kids",
    stock: 165,
    isActive: true,
    potentialItems: [
      "Edukativne igračke",
      "STEM setovi",
      "Bojice i art setovi",
      "Puzzle",
      "Knjige za djecu",
      "Plišane igračke",
    ],
    minValue: 50,
    maxValue: 110,
  },
]

async function seedProducts() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error("❌ MONGODB_URI is not defined in .env.local")
    console.error("Please create .env.local file with MONGODB_URI")
    process.exit(1)
  }

  const cleanUri = uri.replace(/:27017/g, "").replace(/\/$/, "")

  const client = new MongoClient(cleanUri)

  try {
    console.log("🔄 Connecting to MongoDB...")
    await client.connect()
    console.log("✅ Connected to MongoDB successfully!")

    const db = client.db("mysterybox")
    const productsCollection = db.collection("products")

    console.log("🔄 Clearing existing products...")
    await productsCollection.deleteMany({})
    console.log("✅ Cleared existing products")

    console.log("🔄 Inserting new products...")
    const productsWithDates = products.map((product) => ({
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    await productsCollection.insertMany(productsWithDates)

    console.log("✅ Successfully seeded products!")
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.log(`📦 Total products: ${products.length}`)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    products.forEach((product) => {
      console.log(`   ✓ ${product.name} - €${product.price}`)
    })
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.log("🔗 View products: http://localhost:3000/mystery-boxes")
  } catch (error) {
    console.error("❌ Error seeding products:", error)
    if (error instanceof Error) {
      console.error("Error details:", error.message)
    }
    process.exit(1)
  } finally {
    await client.close()
    console.log("🔌 MongoDB connection closed")
  }
}

seedProducts()
