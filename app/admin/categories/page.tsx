import { Suspense } from "react"
import CategoriesPageContent from "@/components/admin/categories-page-content"

export default function CategoriesPage() {
  return (
    <Suspense fallback={null}>
      <CategoriesPageContent />
    </Suspense>
  )
}
