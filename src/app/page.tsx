"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { LuxuryHero as Hero } from "@/components/Hero"
import { FeaturedProperties } from "@/components/FeaturedProperties"
import { LuxuryQuickIntro as QuickIntro } from "@/components/QuickIntro"
import { FilterableListings } from "@/components/FilterableListings"
import AboutSections from "@/components/AboutSections"
import { LuxuryTestimonials as Testimonials } from "@/components/Testimonials"
import { LuxuryContactForm as ContactForm } from "@/components/ContactForm"
import { LuxuryFooter as Footer } from "@/components/Footer"
import { CTABar } from "@/components/CTABar"

type PageType = 'home' | 'apartments' | 'plots' | 'about' | 'contact'

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState<PageType>('home')

  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <main className="min-h-screen">
            <Hero variant="full" className="mb-0" />
            <div className="space-y-0">
              <FeaturedProperties />
              <QuickIntro className="bg-secondary/30" />
              <Testimonials className="bg-background" />
            </div>
          </main>
        )
      
      case 'apartments':
        return (
          <main className="min-h-screen">
            <Hero variant="compact" className="mb-16" />
            <div className="container mx-auto px-4 py-16">
              <FilterableListings
                title="Premium Apartments"
                description="Discover luxury living spaces designed for modern lifestyles with world-class amenities and prime locations."
                propertyType="apartment"
              />
            </div>
          </main>
        )
      
      case 'plots':
        return (
          <main className="min-h-screen">
            <Hero variant="compact" className="mb-16" />
            <div className="container mx-auto px-4 py-16">
              <FilterableListings
                title="Prime Residential Plots"
                description="Build your dream home on carefully selected plots in developing localities with excellent infrastructure and connectivity."
                propertyType="plot"
              />
            </div>
          </main>
        )
      
      case 'about':
        return (
          <main className="min-h-screen">
            <div className="container mx-auto px-4 py-16">
              <AboutSections />
            </div>
          </main>
        )
      
      case 'contact':
        return (
          <main className="min-h-screen">
            <ContactForm />
          </main>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        className="z-50" 
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      {renderPageContent()}
      <CTABar className="relative z-40" />
      <Footer className="relative z-30" />
    </div>
  )
}