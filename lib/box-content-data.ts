// Box content items with chances that sum to 100% for each box
// Each item has: name, brand, price, drop chance (%), rarity, and image

export interface BoxItem {
  name: string
  brand: string
  price: number
  chance: number // percentage that sums to 100
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  image: string
}

// This is the ONLY source of box content data
const BOX_CONTENTS: Record<string, BoxItem[]> = {
  // FCB Lover Box - Barcelona merchandise
  "fcb-lover-box": [
    {
      name: "FCB Dres 2024",
      brand: "Nike",
      price: 89.99,
      chance: 5,
      rarity: "legendary",
      image: "/barcelona-jersey.jpg",
    },
    {
      name: "FCB Šal Premium",
      brand: "Nike",
      price: 29.99,
      chance: 15,
      rarity: "rare",
      image: "/barcelona-scarf.jpg",
    },
    {
      name: "FCB Kapa",
      brand: "Nike",
      price: 24.99,
      chance: 20,
      rarity: "uncommon",
      image: "/barcelona-cap.jpg",
    },
    {
      name: "FCB Privjesak",
      brand: "Official",
      price: 9.99,
      chance: 25,
      rarity: "common",
      image: "/barcelona-keychain.jpg",
    },
    {
      name: "FCB Bedž Set",
      brand: "Official",
      price: 7.99,
      chance: 35,
      rarity: "common",
      image: "/barcelona-badges.jpg",
    },
  ],
  // Basket Box - Basketball merchandise
  "basket-box": [
    {
      name: "Lakers Dres",
      brand: "Nike",
      price: 99.99,
      chance: 5,
      rarity: "legendary",
      image: "/lakers-jersey.jpg",
    },
    {
      name: "Spalding Lopta",
      brand: "Spalding",
      price: 49.99,
      chance: 12,
      rarity: "epic",
      image: "/spalding-basketball.jpg",
    },
    {
      name: "NBA Kapa",
      brand: "New Era",
      price: 34.99,
      chance: 18,
      rarity: "rare",
      image: "/nba-cap.jpg",
    },
    {
      name: "NBA Narukvice",
      brand: "Official",
      price: 14.99,
      chance: 25,
      rarity: "uncommon",
      image: "/nba-wristband.jpg",
    },
    {
      name: "NBA Poster",
      brand: "Official",
      price: 9.99,
      chance: 40,
      rarity: "common",
      image: "/nba-poster.jpg",
    },
  ],
  // Real Box - Real Madrid merchandise
  "real-box": [
    {
      name: "Real Madrid Dres",
      brand: "Adidas",
      price: 89.99,
      chance: 5,
      rarity: "legendary",
      image: "/real-madrid-jersey.jpg",
    },
    {
      name: "Real Madrid Šal",
      brand: "Adidas",
      price: 29.99,
      chance: 15,
      rarity: "rare",
      image: "/real-madrid-scarf.jpg",
    },
    {
      name: "Real Madrid Kapa",
      brand: "Adidas",
      price: 24.99,
      chance: 20,
      rarity: "uncommon",
      image: "/real-madrid-cap.jpg",
    },
    {
      name: "Real Madrid Privjesak",
      brand: "Official",
      price: 9.99,
      chance: 25,
      rarity: "common",
      image: "/real-madrid-keychain.jpg",
    },
    {
      name: "Real Madrid Poster",
      brand: "Official",
      price: 7.99,
      chance: 35,
      rarity: "common",
      image: "/real-madrid-poster.jpg",
    },
  ],
}

export const boxContents = BOX_CONTENTS

// Generic fallback content by category
const FALLBACK_CONTENT: Record<string, BoxItem[]> = {
  sport: [
    {
      name: "Premium Dres",
      brand: "Nike/Adidas",
      price: 89.99,
      chance: 5,
      rarity: "legendary",
      image: "/generic-sports-jersey.png",
    },
    {
      name: "Sportska Lopta",
      brand: "Official",
      price: 49.99,
      chance: 12,
      rarity: "epic",
      image: "/colorful-sports-balls.png",
    },
    {
      name: "Team Šal",
      brand: "Official",
      price: 24.99,
      chance: 18,
      rarity: "rare",
      image: "/team-scarf.jpg",
    },
    {
      name: "Sportske Čarape",
      brand: "Nike",
      price: 14.99,
      chance: 25,
      rarity: "uncommon",
      image: "/sports-socks.jpg",
    },
    {
      name: "Narukvica",
      brand: "Generic",
      price: 9.99,
      chance: 40,
      rarity: "common",
      image: "/woven-friendship-bracelet.png",
    },
  ],
  perfume: [
    {
      name: "Designer Parfem 50ml",
      brand: "Designer",
      price: 89.99,
      chance: 8,
      rarity: "legendary",
      image: "/elegant-perfume-bottle.png",
    },
    {
      name: "Eau de Toilette 30ml",
      brand: "Brand",
      price: 49.99,
      chance: 15,
      rarity: "epic",
      image: "/cologne-bottle.png",
    },
    {
      name: "Travel Set",
      brand: "Mixed",
      price: 29.99,
      chance: 27,
      rarity: "rare",
      image: "/travel-perfume-set.jpg",
    },
    {
      name: "Sample Collection",
      brand: "Mixed",
      price: 19.99,
      chance: 50,
      rarity: "common",
      image: "/perfume-samples.jpg",
    },
  ],
  default: [
    {
      name: "Premium Item",
      brand: "Brand",
      price: 79.99,
      chance: 5,
      rarity: "legendary",
      image: "/premium-product.png",
    },
    {
      name: "Quality Item",
      brand: "Brand",
      price: 49.99,
      chance: 15,
      rarity: "epic",
      image: "/quality-product.jpg",
    },
    {
      name: "Standard Item",
      brand: "Brand",
      price: 29.99,
      chance: 25,
      rarity: "rare",
      image: "/standard-product.png",
    },
    {
      name: "Basic Item",
      brand: "Generic",
      price: 19.99,
      chance: 25,
      rarity: "uncommon",
      image: "/basic-product.png",
    },
    {
      name: "Common Item",
      brand: "Generic",
      price: 9.99,
      chance: 30,
      rarity: "common",
      image: "/common-product.jpg",
    },
  ],
}

export function getBoxContentForProduct(productSlug: string, category: string): BoxItem[] {
  // Check if we have specific content for this exact product slug
  const specificContent = BOX_CONTENTS[productSlug]
  if (specificContent && specificContent.length > 0) {
    return specificContent
  }

  // Fall back to category content
  const categoryContent = FALLBACK_CONTENT[category]
  if (categoryContent && categoryContent.length > 0) {
    return categoryContent
  }

  // Final fallback
  return FALLBACK_CONTENT.default
}

export function getBoxContentForCategory(category: string): BoxItem[] {
  return getBoxContentForProduct("", category)
}
