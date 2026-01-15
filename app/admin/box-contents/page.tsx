import { Suspense } from "react"
import BoxContentsPageContent from "@/components/admin/box-contents-page-content"

export default function BoxContentsPage() {
  return (
    <Suspense fallback={null}>
      <BoxContentsPageContent />
    </Suspense>
  )
}
