import { HeroSection }      from '@/components/sections/HeroSection'
import { ServicesSection }  from '@/components/sections/ServicesSection'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { AboutSection }     from '@/components/sections/AboutSection'
import { ContactSection }   from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <ContactSection />
    </>
  )
}
