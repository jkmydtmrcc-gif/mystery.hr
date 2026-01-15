import { Suspense } from "react"
import MediaPageContent from "@/components/admin/media-page-content"

export default function MediaPage() {
  return (
    <Suspense fallback={null}>
      <MediaPageContent />
    </Suspense>
  )
}
