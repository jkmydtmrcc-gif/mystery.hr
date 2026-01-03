import { Suspense } from "react"
import OrderSuccessContent from "@/components/order-success-content"

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  )
}
