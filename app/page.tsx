import Link from "next/link"
import { ClientLayout } from "@/components/ClientLayout"
import { Navbar } from "@/components/layout/Navbar"
import { HeroSection } from "@/components/sections/HeroSection"
import { SocialProofStrip } from "@/components/sections/SocialProofStrip"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { ProcessSection } from "@/components/sections/ProcessSection"
import { PortfolioSection } from "@/components/sections/PortfolioSection"
import { AutomationsSection } from "@/components/sections/AutomationsSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { PricingSection } from "@/components/sections/PricingSection"
import { FAQSection } from "@/components/sections/FAQSection"
import { CTAFinal } from "@/components/sections/CTAFinal"
import { Footer } from "@/components/layout/Footer"

export default function Home() {
  return (
    <ClientLayout>
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofStrip />
        <ServicesSection />
        <ProcessSection />
        <PortfolioSection />
        <AutomationsSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <section className="bg-negro-clave section-padding">
          <div className="container-clave">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-crema font-light mb-6">
                Buscas una agencia digital en Uruguay?
              </h2>
              <p className="text-grafito text-lg mb-8 max-w-[600px] mx-auto">
                Somos un estudio especializado en desarrollo web, e-commerce y automatizaciones para pymes uruguayas.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/agencia-digital-uruguay" className="btn-primary">
                  Conocer agencia Uruguay
                </Link>
                <Link href="/desarrollo-web-uruguay" className="btn-secondary">
                  Desarrollo Web Uruguay
                </Link>
              </div>
            </div>
          </div>
        </section>
        <CTAFinal />
      </main>
      <Footer />
    </ClientLayout>
  )
}
