"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X, User } from "lucide-react"

interface HeaderProps {
  handleSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void
}

export function Navbar({ handleSmoothScroll }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<"products" | "services" | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [navStyle, setNavStyle] = useState<"light" | "dark">("light")
  const lastScrollY = useRef(0)
  const headerRef = useRef<HTMLElement>(null)

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
      lastScrollY.current = currentScrollY
      
      // Determine nav style based on background color
      if (headerRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect()
        const elementBelow = document.elementFromPoint(
          window.innerWidth / 2,
          headerRect.bottom + 10
        )
        
        if (elementBelow) {
          const bgColor = getComputedStyle(elementBelow).backgroundColor
          const isDarkBg = isColorDark(bgColor)
          setNavStyle(isDarkBg ? "dark" : "light")
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check if color is dark
  const isColorDark = (color: string): boolean => {
    const rgb = color.match(/\d+/g)
    if (!rgb) return false
    
    const [r, g, b] = rgb.map(Number)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness < 128
  }

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Dropdown toggle
  const toggleDropdown = (dropdown: "products" | "services") => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.dropdown-container')) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <header 
        ref={headerRef}
        className={`flex items-center justify-between px-6 md:px-8 py-4 md:py-6 fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled ? "-translate-y-full" : "translate-y-0"
        } ${
          navStyle === "dark" 
            ? "bg-black/80 backdrop-blur-sm text-white" 
            : "bg-white/80 backdrop-blur-sm text-black"
        }`}
      >
        <div className="text-2xl md:text-3xl font-bold tracking-tight">
          <span>Ortho</span>
          <span className="font-Baskervville">FX</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-6 lg:space-x-8">
          {/* OrthoFX Difference */}
          <div className="relative group cursor-pointer flex items-center">
            <a
              href="#difference"
              onClick={(e) => handleSmoothScroll(e, "difference")}
              className="relative z-10 px-3 py-1 text-sm font-medium whitespace-nowrap"
            >
              OrthoFX Difference
            </a>
            <span className="absolute inset-0 group-hover:bg-blue-100 group-hover:rounded-md transition-all duration-300 ease-in-out z-0" />
          </div>

          {/* Products Dropdown */}
          <div className="relative dropdown-container">
            <button 
              onClick={() => toggleDropdown("products")}
              className="relative z-10 px-3 py-1 text-sm group-hover:bg-blue-100 font-medium whitespace-nowrap flex items-center"
            >
              Products
              <ChevronDown className={`w-4 h-4 ml-1  transition-transform ${openDropdown === "products" ? "rotate-180" : ""}`} />
            </button>

            {openDropdown === "products" && (
              <div 
                className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[200px]"
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a 
                  href="/products/airflex" 
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors border-b border-gray-100"
                >
                  <div className="font-medium">AirFlex™</div>
                  <div className="text-xs text-gray-500 mt-1">FDA-cleared aligner system</div>
                </a>
                <a 
                  href="/products/fxclear" 
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors border-b border-gray-100"
                >
                  <div className="font-medium">FXClear™</div>
                  <div className="text-xs text-gray-500 mt-1">Advanced technology aligners</div>
                </a>
                <a 
                  href="/products/fxbright" 
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                >
                  <div className="font-medium">FXBright™</div>
                  <div className="text-xs text-gray-500 mt-1">Teeth whitening aligners</div>
                </a>
              </div>
            )}
          </div>

          {/* Services Dropdown */}
          <div className="relative dropdown-container">
            <button 
              onClick={() => toggleDropdown("services")}
              className="relative z-10 px-3 py-1 text-sm font-medium whitespace-nowrap flex items-center"
            >
              Services
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${openDropdown === "services" ? "rotate-180" : ""}`} />
            </button>

            {openDropdown === "services" && (
              <div 
                className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[200px]"
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a 
                  href="/services/fxpay" 
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors border-b border-gray-100"
                >
                  <div className="font-medium">FXPay™</div>
                  <div className="text-xs text-gray-500 mt-1">Flexible payment plans</div>
                </a>
                <a 
                  href="/services/fxontrack" 
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                >
                  <div className="font-medium">FXOnTrack™</div>
                  <div className="text-xs text-gray-500 mt-1">AI-powered progress tracking</div>
                </a>
              </div>
            )}
          </div>

          {/* Smile Results */}
          <div className="relative group cursor-pointer flex items-center">
            <a
              href="#results"
              onClick={(e) => handleSmoothScroll(e, "results")}
              className="relative z-10 px-3 py-1 text-sm font-medium whitespace-nowrap"
            >
              Smile Results
            </a>
            <span className="absolute inset-0 group-hover:bg-blue-100 group-hover:rounded-md transition-all duration-300 ease-in-out z-0" />
          </div>

          {/* Smile Quiz */}
          <div className="relative group cursor-pointer flex items-center">
            <a
              href="#quiz"
              onClick={(e) => handleSmoothScroll(e, "quiz")}
              className="relative z-10 px-3 py-1 text-sm font-medium whitespace-nowrap"
            >
              Smile Quiz
            </a>
            <span className="absolute inset-0 group-hover:bg-blue-100 group-hover:rounded-md transition-all duration-300 ease-in-out z-0" />
          </div>
        </nav>

        {/* Desktop Buttons and Mobile Menu Toggle */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <Button className={`${
            navStyle === "dark" 
              ? "bg-white text-black hover:bg-gray-200" 
              : "bg-black text-white hover:bg-gray-800"
          } rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 whitespace-nowrap hidden xl:inline-flex`}>
            Become a provider
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${
              navStyle === "dark" 
                ? "bg-white/20 text-white hover:bg-white/30" 
                : "bg-black/10 text-black hover:bg-black/20"
            } w-9 h-9 md:w-10 md:h-10 flex-shrink-0 hidden xl:flex`}
          >
            <User className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full w-9 h-9 flex-shrink-0 xl:hidden ${
              navStyle === "dark" ? "text-white" : "text-black"
            }`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-md z-40 flex flex-col items-center justify-center xl:hidden pt-20">
          <nav className="flex flex-col items-center space-y-6 w-full max-w-md px-6">
            <a
              href="#difference"
              className="w-full text-center py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={(e) => {
                handleSmoothScroll(e, "difference")
                toggleMobileMenu()
              }}
            >
              OrthoFX Difference
            </a>
            
            {/* Products dropdown in mobile */}
            <div className="w-full">
              <button 
                onClick={() => toggleDropdown("products")}
                className="w-full text-center py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
              >
                Products
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${openDropdown === "products" ? "rotate-180" : ""}`} />
              </button>
              
              {openDropdown === "products" && (
                <div className="mt-2 bg-gray-50 rounded-lg py-2">
                  <a 
                    href="/products/airflex" 
                    className="block px-6 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    AirFlex™
                  </a>
                  <a 
                    href="/products/fxclear" 
                    className="block px-6 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    FXClear™
                  </a>
                  <a 
                    href="/products/fxbright" 
                    className="block px-6 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    FXBright™
                  </a>
                </div>
              )}
            </div>

            {/* Services dropdown in mobile */}
            <div className="w-full">
              <button 
                onClick={() => toggleDropdown("services")}
                className="w-full text-center py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
              >
                Services
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${openDropdown === "services" ? "rotate-180" : ""}`} />
              </button>
              
              {openDropdown === "services" && (
                <div className="mt-2 bg-gray-50 rounded-lg py-2">
                  <a 
                    href="/services/fxpay" 
                    className="block px-6 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    FXPay™
                  </a>
                  <a 
                    href="/services/fxontrack" 
                    className="block px-6 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    FXOnTrack™
                  </a>
                </div>
              )}
            </div>

            <a
              href="#results"
              className="w-full text-center py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={(e) => {
                handleSmoothScroll(e, "results")
                toggleMobileMenu()
              }}
            >
              Smile Results
            </a>
            <a
              href="#quiz"
              className="w-full text-center py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={(e) => {
                handleSmoothScroll(e, "quiz")
                toggleMobileMenu()
              }}
            >
              Smile Quiz
            </a>
            <Button
              className="w-full bg-black text-white rounded-full py-3 text-base font-medium transition-all duration-200 mt-4"
              onClick={toggleMobileMenu}
            >
              Become a provider
            </Button>
          </nav>
        </div>
      )}
    </>
  )
}