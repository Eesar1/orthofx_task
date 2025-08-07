"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import styles from "@/components/ButtonArrow.module.css";
import { ChevronDown, Menu, X, User } from "lucide-react"

interface HeaderProps {
  handleSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void
}

export function Navbar({ handleSmoothScroll }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<"products" | "services" | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [navStyle, setNavStyle] = useState<"light" | "dark">("light")
  const [isAtTop, setIsAtTop] = useState(true)
  const [isBeyond100vh, setIsBeyond100vh] = useState(false)
  const lastScrollY = useRef(0)
  const headerRef = useRef<HTMLElement>(null)

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Check if at top of page
      setIsAtTop(currentScrollY === 0)
      
      // Check if beyond 100vh
      setIsBeyond100vh(currentScrollY > window.innerHeight)
      
      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
      lastScrollY.current = currentScrollY
      
      // Determine nav style based on background color
      if (headerRef.current && !isBeyond100vh) {
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
  }, [isBeyond100vh])

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

  // Determine styles based on scroll position
  const shouldUseDarkMode = isBeyond100vh && !isAtTop;
  const textColor = shouldUseDarkMode ? "text-white" : 
                   isAtTop ? "text-[#15161a]" : 
                   navStyle === "light" ? "text-white" : "text-[#15161a]";
                   
  const bgColor = shouldUseDarkMode ? "bg-[#15161a]" : 
                 isAtTop ? "bg-transparent" : 
                 navStyle === "light" ? "bg-[#15161a]" : "bg-white";

  return (
    <>
      <header 
        ref={headerRef}
        className={`flex items-center justify-between px-3 md:px-16 py-4 md:py-6 fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled ? "-translate-y-full" : "translate-y-0"
        } ${bgColor} ${isMobileMenuOpen ? 'xl:flex hidden' : 'flex'}`}
      >
        {/* Logo */}
        <div className={`text-2xl md:text-3xl font-bold tracking-tight ${textColor}`}>
        <img
           src="/logo.svg"
           alt="Logo"
            className={`
              
               transition-all duration-300
                ${!(shouldUseDarkMode || navStyle === "light") ? "invert" : ""}
  `}/>
        </div>

        {/* Desktop Navigation */}
        <nav className={`hidden xl:flex mr-auto space-x-4 lg:space-x-3`}>
          {/* OrthoFX Difference */}
          <div className="relative group cursor-pointer">
            <a
              href="#difference"
              onClick={(e) => handleSmoothScroll(e, "difference")}
              className={`relative z-10 px-3 py-2 font-NeGrotesk ml-5 text-sm ${textColor} hover:bg-[#d9edf7] hover:rounded-md transition-all duration-300 ease-in-out`}
            >
              OrthoFX Difference
            </a>
          </div>

          {/* Products Dropdown */}
          <div className="relative dropdown-container">
            <button 
              onClick={() => toggleDropdown("products")}
              className={`relative z-10 font-NeGrotesk px-3 py-1 text-sm hover:bg-[#d9edf7] hover:rounded-md transition-all duration-300 ease-in-out whitespace-nowrap flex items-center ${textColor}`}
            >
              Products
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${openDropdown === "products" ? "rotate-180" : ""}`} />
            </button>

            {openDropdown === "products" && (
              <div 
                className="absolute top-full left-0 mt-2 bg-[#15161a] rounded-md shadow-lg z-50 min-w-[200px]"
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a 
                  href="/products/airflex" 
                  className="block px-4 py-3 text-sm text-[#C5EDF7] transition-colors "
                >
                  <div className="font-light font-NeGrotesk text-white">AirFlex™</div>
                  <div className="text-xs font-NeGrotesk  text-[#9aa7ac] mt-1">FDA-cleared aligner system</div>
                </a>
                <a 
                  href="/products/fxclear" 
                  className="block px-4 py-3 font-NeGrotesk text-sm text-[#C5EDF7]  transition-colors "
                >
                  <div className="font-light font-NeGrotesk text-white">FXClear™</div>
                  <div className="text-xs font-NeGrotesk  text-[#9aa7ac] mt-1">Advanced technology aligners</div>
                </a>
                <a 
                  href="/products/fxbright" 
                  className="block px-4 py-3 font-NeGrotesk text-sm text-[#C5EDF7]  transition-colors"
                >
                  <div className="font-light font-NeGrotesk text-white">FXBright™</div>
                  <div className="text-xs font-NeGrotesk  text-[#9aa7ac] mt-1">Teeth whitening aligners</div>
                </a>
              </div>
            )}
          </div>

          {/* Services Dropdown */}
          <div className="relative dropdown-container">
            <button 
              onClick={() => toggleDropdown("services")}
              className={`relative z-10 px-3 py-1 text-sm font-NeGrotesk font-light hover:bg-[#d9edf7] hover:rounded-md transition-all duration-300 ease-in-out whitespace-nowrap flex items-center ${textColor}`}
            >
              Services
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${openDropdown === "services" ? "rotate-180" : ""}`} />
            </button>

            {openDropdown === "services" && (
              <div 
                className="absolute top-full left-0 mt-2 bg-[#15161a]  rounded-md shadow-lg z-50 min-w-[200px]"
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a 
                  href="/services/fxpay" 
                  className="block px-4 py-3 text-sm text-[#C5EDF7] transition-colors "
                >
                  <div className="font-light font-NeGrotesk text-white">FXPay™</div>
                  <div className="text-xs font-NeGrotesk text-[#9aa7ac] mt-1">Flexible payment plans</div>
                </a>
                <a 
                  href="/services/fxontrack" 
                  className="block px-4 py-3 text-sm text-[#C5EDF7]  transition-colors"
                >
                  <div className="font-light font-NeGrotesk text-white">FXOnTrack™</div>
                  <div className="text-xs font-NeGrotesk  text-[#9aa7ac] mt-1">AI-powered progress tracking</div>
                </a>
              </div>
            )}
          </div>

          {/* Smile Results */}
          <div className="relative group cursor-pointer">
            <a
              href="#results"
              onClick={(e) => handleSmoothScroll(e, "results")}
              className={`relative z-10 px-3 py-2 font-NeGrotesk text-sm font-light hover:bg-[#d9edf7] hover:rounded-md transition-all duration-300 ease-in-out whitespace-nowrap ${textColor}`}
            >
              Smile Results
            </a>
          </div>

          {/* Smile Quiz */}
          <div className="relative group cursor-pointer">
            <a
              href="#quiz"
              onClick={(e) => handleSmoothScroll(e, "quiz")}
              className={`relative z-10 px-3 font-NeGrotesk py-2 text-sm font-light hover:bg-[#d9edf7] hover:rounded-md transition-all duration-300 ease-in-out whitespace-nowrap ${textColor}`}
            >
              Smile Quiz
            </a>
          </div>
        </nav>

        {/* Desktop Buttons and Mobile Menu Toggle */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <Button className={`${
            isAtTop 
              ? "bg-[#292930] text-white hover:text-black hover:bg-white" 
              : shouldUseDarkMode 
                ? "bg-[#292930] text-white hover:bg-gray-200"
                : navStyle === "light" 
                  ? "bg-white text-[#15161a] hover:bg-gray-300" 
                  : "bg-black text-white hover:bg-gray-500"
          } rounded-full px-5 py-2.5 text-sm font-NeGrotesk transition-all duration-200 whitespace-nowrap hidden xl:inline-flex`}>
            Become a provider
          </Button>
          <Button
            variant={shouldUseDarkMode ? "ghost" : undefined}
            size="icon"
            className={`rounded-full w-9 h-9 md:w-10 md:h-10 flex-shrink-0 hidden xl:flex ${
              isAtTop 
                ? "bg-[#292930] text-white hover:text-black hover:bg-white" 
                : shouldUseDarkMode 
                  ? "text-white bg-[#292930] hover:bg-gray-800"
                  : navStyle === "light" 
                    ? "bg-white text-[#15161a] hover:bg-gray-200" 
                    : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            <User className="w-4 h-4" />
          </Button>
          
          
<div
  onClick={toggleMobileMenu}
  className={`cursor-pointer xl:hidden flex flex-col justify-center items-center w-8 h-8 relative group transition-all duration-300`}
>
  <div className="relative flex flex-col justify-center items-center h-6 w-6">
  {/* Top bar */}
  <div
    className="absolute h-[2px] transition-all duration-300 origin-center"
    style={{
      width: "24px",
      background: isMobileMenuOpen ? "#fff" : (shouldUseDarkMode || navStyle === "light" ? "#fff" : "#000"),
      transform: isMobileMenuOpen
        ? "rotate(45deg) translateY(0px)"
        : "translateY(-6px)",
      top: "50%",
      marginTop: "-1px",
    }}
  />

  {/* Middle bar */}
  <div
    className="absolute h-[2px] transition-all duration-300 origin-center"
    style={{
      width: "24px",
      background: isMobileMenuOpen ? "#fff" : (shouldUseDarkMode || navStyle === "light" ? "#fff" : "#000"),
      opacity: isMobileMenuOpen ? 0 : 1,
      top: "50%",
      marginTop: "-1px",
    }}
  />

  {/* Bottom bar */}
  <div
    className="absolute h-[2px] transition-all duration-300 origin-center"
    style={{
      width: isMobileMenuOpen ? "24px" : "16px", // Short when closed
      left: isMobileMenuOpen ? "auto" : "0",      // Align left when closed
      background: isMobileMenuOpen ? "#fff" : (shouldUseDarkMode || navStyle === "light" ? "#fff" : "#000"),
      transform: isMobileMenuOpen
        ? "rotate(-45deg) translateY(0px)"
        : "translateY(6px)",
      top: "50%",
      marginTop: "-1px",
    }}
  />

  {/* Close text */}
  {isMobileMenuOpen && (
    <div className="absolute -bottom-5 text-xs text-center w-full transition-opacity duration-300 text-white">
      Close
    </div>
  )}
</div>

</div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#15161a] z-40 xl:hidden transition-all duration-500 ease-in-out ${
        isMobileMenuOpen 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-full pointer-events-none'
      }`}>
        <div className={`flex flex-col items-start justify-start px-6 pt-24 overflow-y-auto h-full transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
          {/* Mobile Menu Close Button */}
          <div
            onClick={toggleMobileMenu}
            className="fixed top-6 right-6 z-50 cursor-pointer flex items-center gap-2"
          >
            <div className="relative flex flex-col justify-center items-center h-6 w-6">
              {/* X Icon */}
              <div
                className="absolute h-[2px] transition-all duration-300 origin-center"
                style={{
                  width: "24px",
                  background: "#fff",
                  transform: "rotate(45deg) translateY(0px)",
                  top: "50%",
                  marginTop: "-1px",
                }}
              />
              <div
                className="absolute h-[2px] transition-all duration-300 origin-center"
                style={{
                  width: "24px",
                  background: "#fff",
                  transform: "rotate(-45deg) translateY(0px)",
                  top: "50%",
                  marginTop: "-1px",
                }}
              />
            </div>
            
            {/* Close text next to X */}
            <div className="text-sm text-white font-light">
              Close
            </div>
          </div>

          <nav className="flex flex-col items-start space-y-6 w-full max-w-md">
      
      {/* Section Label */}
      <span className="text-[#C5EDF7] text-2xl font-liBaskerville">Company</span>

      {/* Simple Links */}
      {[
        { href: "#difference", label: "OrthoFX Difference" },
        { href: "#results", label: "Smile Results" },
        { href: "#quiz", label: "Smile Quiz" },
      ].map(({ href, label }) => (
        <a
          key={label}
          href={href}
          className="py-0 text-[#C5EDF7] text-base w-full"
          onClick={(e) => {
            handleSmoothScroll(e, href.replace("#", ""));
            toggleMobileMenu();
          }}
        >
          {label}
        </a>
      ))}

      {/* Products Section */}
      <span className="text-[#C5EDF7] font-liBaskerville  text-xl mt-6">Products</span>

      {[
        {
          href: "/products/airflex",
          title: "AirFlex™",
          desc: "The first FDA-cleared aligner system for at least 12 hours of continuous daily wear time.",
        },
        {
          href: "/products/fxclear",
          title: "FXClear™",
          desc: "Combining advanced technology and remote monitoring to keep your treatment on track comfortably.",
        },
        {
          href: "/products/fxbright",
          title: "FXBright™",
          desc: "Enjoy effortless whiter teeth from the start of your orthodontic treatment.",
        },
        {
          href: "/products/fxretainers",
          title: "FXRetainers",
          desc: "Keep your smile straighter and brighter for long-lasting results.",
        },
      ].map(({ href, title, desc }) => (
        <a
          key={title}
          href={href}
          className="block py-2 text-[#C5EDF7] w-full"
          onClick={toggleMobileMenu}
        >
          <h4 className="text-base text-white font-NeGrotesk ">{title}</h4>
          <p className="text-sm font-NeGrotesk text-[#90CFE8]">{desc}</p>
        </a>
      ))}

      {/* Services Section */}
      <span className="text-[#C5EDF7] font-liBaskerville text-xl   mt-6">Services</span>

      {[
        {
          href: "/services/fxpay",
          title: "FXPay™",
          desc: "Flexible payment plans to keep you covered.",
        },
        {
          href: "/services/fxontrack",
          title: "FXOnTrack™",
          desc: "AI-powered platform that enables your doctor to monitor your progress remotely.",
        },
      ].map(({ href, title, desc }) => (
        <a
          key={title}
          href={href}
          className="block py-2 text-[#C5EDF7] w-full"
          onClick={toggleMobileMenu}
        >
          <h4 className="text-base text-white font-semibold">{title}</h4>
          <p className="text-sm text-[#90CFE8]">{desc}</p>
        </a>
      ))}

      {/* Buttons */}
      <div className="flex flex-row sticky bottom-0 z-50 items-center justify-center gap-4 mt-8 w-full">
         <Button
    className="bg-[#292930] text-white hover:bg-gray-200 rounded-full w-47 h-12 px-5 py-2.5 text-sm font-light transition-all duration-200 whitespace-nowrap xl:inline-flex"
  >
    Become a provider
  </Button>
        <Button className={styles.ButtonArrow_button__K1nCt}>
          <span>Find a doctor</span>
        </Button>
      </div>
    </nav>
        </div>
      </div>
    </>
  )
}