import Header from "@/components/header"
import Footer from "@/components/footer"
import { AllMysteryBoxes } from "@/components/all-mystery-boxes"
import { SpinToWinPopup } from "@/components/spin-to-win-popup"
import { ExitIntentPopup } from "@/components/exit-intent-popup"
import { FakeNotification } from "@/components/fake-notification"

export const metadata = {
  title: "Mystery Boxovi | Mystery.hr - Premium Iznenađenja",
  description: "Pregledajte našu kolekciju premium mystery boxova. Pet, Beauty, Tech i još mnogo toga.",
}

export default function MysteryBoxesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <AllMysteryBoxes />
      <Footer />
      <SpinToWinPopup />
      <ExitIntentPopup />
      <FakeNotification />
    </main>
  )
}
