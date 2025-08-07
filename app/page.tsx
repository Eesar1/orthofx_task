"use client"

import type React from "react"
import { Navbar } from "@/components/navbar/navbar";
import { HeroSection } from "@/components/heroSection/heroSection"
import LifestyleSection from "@/components/lifeStyle/lifeStyle";
import ConSultant from "@/components/consultation/ConSultant";
import Testimonials from "../components/testimonial/testimonial";
import Footer from "../components/footer/footer";
import DocTestimonial from "../components/DocTestimonial/DocTestimonial";
import { TrustedSection } from "@/components/trusted/TrustedSection";
import { WhyDifferentSection } from "@/components/WhyDifferentSection/WhyDifferentSection";


export default function OrthoFXHomepage() {
  // This function is passed to the Header component for smooth scrolling
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for fixed header height
        behavior: "smooth",
      })
      // No need to close mobile menu here, Header component manages its own state
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar handleSmoothScroll={handleSmoothScroll} />
      <HeroSection />
      <TrustedSection />
      <WhyDifferentSection />
      <LifestyleSection/>
      <ConSultant/>
      <Testimonials />
      <DocTestimonial />
      <Footer />
      
    </div>
  )
}
