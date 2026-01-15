import Header from "@/components/header"
import Footer from "@/components/footer"
import { ProductDetails } from "@/components/product-details"
import { RelatedProducts } from "@/components/related-products"
import { getProductBySlug, getCategoryById, getProductsByCategory } from "@/lib/products-data"
import { notFound } from "next/navigation"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const category = getCategoryById(product.category)
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  const formattedProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug, // THIS WAS MISSING - now box content will work!
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    rating: product.rating,
    reviews: product.reviews,
    stock: product.stock,
    potentialValue: product.potentialValue,
    badge: category?.name || "",
    items: `${product.includes.length}+ premium proizvoda`,
    description: product.description,
    includes: product.includes,
    gallery: product.gallery || [product.image],
    category: product.category,
    dominantColor: product.dominantColor || "#8B5CF6",
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ProductDetails product={formattedProduct} />
      {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} categoryName={category?.name || ""} />}
      <Footer />
    </main>
  )
}
