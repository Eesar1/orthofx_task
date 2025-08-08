import Image from "next/image";
import { Button } from "../ui/button";
import darkstyles from "@/components/ButtonArrowDark.module.css";
import { useState, useEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function WhyDifferentSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollingTitleRef = useRef<HTMLDivElement>(null);
  const titleAnimation = useRef<gsap.core.Tween | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Check device type and set client flag
  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Setup ScrollTrigger animation
  useEffect(() => {
    if (!isClient || !sectionRef.current || !containerRef.current || !scrollingTitleRef.current) return;

    // Clear existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.id === 'whyDifferentTrigger' || trigger.vars.id === 'whyDifferentTitleVert') {
        trigger.kill();
      }
    });

    // Set up the scrolling title animation - all positioning in GSAP, not in JSX
    gsap.set(scrollingTitleRef.current, {
      x: window.innerWidth,
      opacity: 1,
      y: 0,
      position: "fixed",
      width: "max-content",
      overflow: "hidden",
      top: "5vh",
      left: 0,
      zIndex: 10
    });

    // Calculate container scroll distance for horizontal scrolling
    const containerScrollDistance = (containerRef.current?.scrollWidth ?? 0) - window.innerWidth;
    
    // Store cleanup functions from each media query - MUST be declared before use in matchMedia
    const cleanupFunctions: (() => void)[] = [];

    // 1. Title moves from right to center as you vertically scroll - FIXED TO USE MAIN SECTION
    const verticalTitleTween = gsap.to(scrollingTitleRef.current, {
      x: 0,
      ease: "none",
      paused: true,
    });

    ScrollTrigger.create({
      id: 'whyDifferentTitleVert',
      trigger: sectionRef.current, // CHANGED: Use main section instead of section1
      start: "top bottom", // when main section starts entering
      end: "top top",      // when main section is fully at top
      scrub: true,
      onUpdate: (self) => {
        verticalTitleTween.progress(self.progress);
      },
    });

    // 2. Title moves from center to left as you horizontally scroll
    // Use title's own width for more accurate animation
    titleAnimation.current = gsap.to(scrollingTitleRef.current, {
      x: -containerScrollDistance, // Use the same distance as container
      ease: "none",
      paused: true
    });

    // Create media-specific ScrollTriggers
    ScrollTrigger.matchMedia({
      // Desktop
      "(min-width: 768px)": () => {
        const horizontalScroll = gsap.to(containerRef.current, {
          x: () => -containerScrollDistance,
          ease: "none",
        });

        const trigger = ScrollTrigger.create({
          id: 'whyDifferentTrigger',
          trigger: sectionRef.current,
          start: "top top", // This is already correct for "start as soon as section hits top"
          end: () => `+=${containerScrollDistance}`,
          pin: true,
          scrub: true,
          animation: horizontalScroll,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Sync title animation progress with horizontal scroll progress
            if (titleAnimation.current) {
              titleAnimation.current.progress(self.progress);
            }
          },
          onLeave: () => {
            if (scrollingTitleRef.current) {
              // Fix the title in place where it ended up
              // Use getBoundingClientRect to get the exact current position
              const rect = scrollingTitleRef.current.getBoundingClientRect();
              gsap.set(scrollingTitleRef.current, {
                position: "absolute",
                top: window.scrollY + rect.top,
                left: rect.left,
                x: 0 // Reset x since we're using absolute positioning with exact coordinates
              });
            }
          },
          onEnterBack: () => {
            if (scrollingTitleRef.current) {
              // Restore fixed positioning and let the animation handle x position
              gsap.set(scrollingTitleRef.current, {
                position: "fixed",
                top: "5vh",
                left: 0,
                // Don't set x here, let the titleAnimation handle it based on scroll progress
              });
            }
          }
        });
        // Add cleanup function for this media query
        cleanupFunctions.push(() => {
          if (trigger) trigger.kill();
        });
        
        return () => {
          if (trigger) trigger.kill();
        };
      },
      
      // Mobile
      "(max-width: 767px)": () => {
        // Only horizontal scroll, no vertical scroll animation!
        const horizontalScroll = gsap.to(containerRef.current, {
          x: () => -containerScrollDistance,
          ease: "none",
        });

        // Consistent positioning for mobile
        gsap.set(scrollingTitleRef.current, {
          y: 10, // Mobile-specific offset
          opacity: 1,
          position: "fixed"
        });

        const trigger = ScrollTrigger.create({
          id: 'whyDifferentTrigger',
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${containerScrollDistance}`,
          pin: true,
          scrub: true,
          animation: horizontalScroll,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Sync title animation progress with horizontal scroll progress
            if (titleAnimation.current) {
              titleAnimation.current.progress(self.progress);
            }
          },
          onLeave: () => {
            if (scrollingTitleRef.current) {
              // Fix the title in place where it ended up
              // Use getBoundingClientRect to get the exact current position
              const rect = scrollingTitleRef.current.getBoundingClientRect();
              gsap.set(scrollingTitleRef.current, {
                position: "absolute",
                top: window.scrollY + rect.top,
                left: rect.left,
                x: 0, // Reset x since we're using absolute positioning with exact coordinates
                y: 10 // Keep mobile offset
              });
            }
          },
          onEnterBack: () => {
            if (scrollingTitleRef.current) {
              // Restore fixed positioning and let the animation handle x position
              gsap.set(scrollingTitleRef.current, {
                position: "fixed",
                top: "5vh",
                left: 0,
                y: 10, // Keep mobile offset
                // Don't set x here, let the titleAnimation handle it based on scroll progress
              });
            }
          }
        });
        // Add cleanup function for this media query
        cleanupFunctions.push(() => {
          if (trigger) trigger.kill();
        });
        
        return () => {
          if (trigger) trigger.kill();
        };
      }
    });

    // Add cleanup for vertical title animation
    const verticalTitleTrigger = ScrollTrigger.getById('whyDifferentTitleVert');
    cleanupFunctions.push(() => {
      if (verticalTitleTrigger) verticalTitleTrigger.kill();
      verticalTitleTween.kill();
    });
    
    // Return a single cleanup function that calls all stored cleanup functions
    return () => {
      // Execute all cleanup functions
      cleanupFunctions.forEach(cleanup => cleanup());
      
      // Kill the title animation
      if (titleAnimation.current) {
        titleAnimation.current.kill();
        titleAnimation.current = null;
      }
    };
  }, [isClient, isMobile]);

  // Show a loading state during server-side rendering
  if (!isClient) {
    return (
      <div className="bg-[#15161a] relative">
        <div className="h-[20vh] bg-[#15161a]"></div>
        <div className="bg-[#15161a] min-h-screen flex items-center justify-center">
          <div className="text-white opacity-50">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-[#15161a]">
      {/* Scrolling title that moves from right to left */}
      <div 
        ref={scrollingTitleRef} 
        className="whitespace-nowrap absolute overflow-hidden"
        // Position is managed entirely by GSAP, not inline styles
      >
        <h2 className="font-NeGrotesk text-blue-100 text-4xl md:text-5xl lg:text-7xl leading-tight px-4">
          Why are we <span className="font-liBaskerville">different?</span>
          &nbsp;&nbsp;&nbsp;Why are we <span className="font-liBaskerville">different?</span>
          &nbsp;&nbsp;&nbsp;Why are we <span className="font-liBaskerville">different?</span>
        </h2>
      </div>
      
      {/* Main scroll container */}
      <div 
        ref={sectionRef}
        className={`bg-[#15161a] text-white ${isMobile ? 'py-16' : 'h-[100vh]'} w-full relative`}
      >
        <div 
          className={`${isMobile ? 'relative' : 'sticky top-0'} w-full ${isMobile ? 'min-h-auto' : 'h-screen'} overflow-hidden`}
        >
          <div 
            ref={containerRef}
            className={`flex ${isMobile ? 'flex-col gap-10' : 'flex-row'} h-full items-center section-container ${isMobile ? 'pb-[50vh]' : ''}`}
          >
            {/* First Section - Comfort meets efficiency */}
<div
  className={`${
    isMobile ? "w-full min-h-[80vh]" : "w-screen"
  } flex-shrink-0 h-full flex flex-col justify-between px-4 md:px-12 section-panel`}
>
  <div className="max-w-6xl mx-auto w-full">
    <div className="pt-32" />

    {/* TOP BLOCK: heading, desktop paragraph (inline), images, buttons, etc. */}
    <div className="top-block">
      <div className="flex items-center gap-2 mt-4">
        <div className="border-t border-white w-16" />
        <span className="text-white text-sm font-liBaskerville">01</span>
      </div>

      {/* Heading + (desktop) paragraph */}
      <div className="flex flex-col md:flex-row md:items-start md:gap-7">
        <div className="flex-1">
          <h5 className="font-NeGrotesk text-blue-100 text-4xl font-light md:text-4xl ">
            Comfort meets
          </h5>
          <h5 className="text-blue-100 text-2xl md:text-5xl font-liBaskerville ">
            efficiency
          </h5>
        </div>

        {/* Desktop paragraph - stays inline on desktop */}
        <p className="hidden md:block font-NeGrotesk text-white text-sm md:text-base leading-relaxed mt-2 md:mt-0 md:max-w-md">
          Our aligners apply optimal force with a gentle, consistent touch.
          While traditional aligners may use up to 8.4x more force, ours deliver
          precise control for a more comfortable experience.**
        </p>
      </div>

      {/* Images */}
      <div className="grid grid-cols-12 gap-4 mt-8">
        {/* Main image - shows on all sizes and appears on top on mobile (order) */}
        <div className="col-span-12 md:col-span-6 order-1 md:order-none">
          <Image
            src="/graph.png"
            alt="Graph"
            width={480}
            height={300}
            className="rounded-4xl w-full h-[270px] mt-[-12] object-cover"
          />
        </div>

        {/* Side images - hidden on mobile to match original behavior */}
        <div className="col-span-12 md:col-span-3 hidden md:block">
          <Image
            src="/mans.png"
            alt="Mans"
            width={240}
            height={150}
            className="rounded-4xl w-full h-[270px] mt-[-12] object-cover"
          />
        </div>

        <div className="col-span-12 md:col-span-3 hidden md:block">
          <Image
            src="/8x.jpg"
            alt="8x Less Force"
            width={240}
            height={150}
            className="rounded-4xl w-full h-[270px] mt-[-12] object-cover"
          />
        </div>
      </div>
    </div>

    {/* BOTTOM BLOCK: mobile-only paragraph pinned to bottom of panel */}
    <div className="bottom-block mt-6 md:hidden">
      <p className="font-NeGrotesk text-white text-sm leading-relaxed">
        Our aligners apply optimal force with a gentle, consistent touch.
        While traditional aligners may use up to 8.4x more force, ours deliver
        precise control for a more comfortable experience.**
      </p>
    </div>
  </div>
</div>


{/* Second Section - AirFlex aligners */}
<div
  className={`${
    isMobile ? "w-full min-h-[80vh]" : "w-screen"
  } flex-shrink-0 h-full flex flex-col justify-between px-4 md:px-12 section-panel`}
>
  <div className="max-w-6xl mx-auto w-full">
    <div className="pt-32" />

    {/* TOP BLOCK: heading, desktop paragraph (inline), images, button */}
    <div className="top-block">
      <div className="flex items-center gap-2 mt-4">
        <div className="border-t border-white w-16" />
        <span className="italic text-sm text-blue-100 font-medium">02</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-start md:gap-8">
        <div className="flex-1">
          <h5 className="font-NeGrotesk font-light text-blue-100 text-2xl md:text-4xl leading-snug">
            AirFlex™ aligners,
          </h5>
          <h5 className="font-liBaskerville text-blue-100 text-2xl md:text-4xl mt-[-5] leading-snug">
            advanced material
          </h5>
        </div>

        {/* Desktop paragraph - inline on desktop */}
        <p className="hidden md:block font-NeGrotesk text-gray-300 text-m  mt-2 md:mt-0 md:max-w-md">
          AirFlex™ is the new generation of clear aligners, featuring patented
          HyperElastic™ polymer for sustained optimal force delivery. It
          supports natural bone remodeling and reduces daytime relapse when not
          wearing aligners.**
        </p>
      </div>
    </div>

    <div className="mb-2 mt-[-4]">
      <Button className={darkstyles.button}>OrthoFX Difference</Button>
    </div>

    {/* Images */}
    <div className="grid grid-cols-12 gap-4 mt-1">
      <div className="col-span-12 md:col-span-6 order-1 md:order-none">
        <Image
          src="/braces.png"
          alt="Braces"
          width={480}
          height={300}
          className="rounded-4xl w-full h-57 object-cover"
        />
      </div>

      <div className="col-span-12 md:col-span-3 hidden md:block">
        <Image
          src="/spike.jpg"
          alt="Spike"
          width={240}
          height={150}
          className="rounded-4xl w-80 h-57 object-cover"
        />
      </div>

      <div className="col-span-12 md:col-span-3 hidden md:block">
        <Image
          src="/fda.png"
          alt="FDA Approved"
          width={240}
          height={150}
          className="rounded-4xl w-60 h-57 object-cover"
        />
      </div>
    </div>

    {/* Mobile-only bottom paragraph */}
    <div className="bottom-block mt-6 md:hidden">
      <p className="font-NeGrotesk  text-gray-300 text-m">
        AirFlex™ is the new generation of clear aligners, featuring patented
        HyperElastic™ polymer for sustained optimal force delivery. It
        supports natural bone remodeling and reduces daytime relapse when not
        wearing aligners.**
      </p>
    </div>
  </div>
</div>


          </div>
        </div>
      </div>
    </div>
  );
}