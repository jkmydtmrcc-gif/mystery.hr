import Header from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedBoxes } from "@/components/featured-boxes"
import { TrustBadges } from "@/components/trust-badges"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"
import Footer from "@/components/footer"
import { SpinToWinPopup } from "@/components/spin-to-win-popup"
import { ExitIntentPopup } from "@/components/exit-intent-popup"
import { FakeNotification } from "@/components/fake-notification"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturedBoxes />
      <TrustBadges />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
      <Footer />
      <SpinToWinPopup />
      <ExitIntentPopup />
      <FakeNotification />
    </main>
  )
}
