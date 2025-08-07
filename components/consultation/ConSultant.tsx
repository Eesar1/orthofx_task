import { useEffect, useRef, useState } from "react";
import { steps } from "@/constants";
import Image from "next/image";
import { Button } from "../ui/button";
import styles from "@/components/ButtonArrow.module.css";
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ConSultant = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardTrackRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Update ScrollTrigger when Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update);

    // Handle mobile detection
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Setup ScrollTrigger animation
  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current || !cardTrackRef.current) return;

    // Clear existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Create media-specific ScrollTriggers
    ScrollTrigger.matchMedia({
      // Desktop
      "(min-width: 768px)": () => {
        // Calculate vertical movement for desktop
        const movement = (steps.length - 1) * 100 + 50;
        
        const animation = gsap.to(cardTrackRef.current, {
          y: `-${movement}%`,
          ease: "none",
        });

        return ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (steps.length - 0.5)}`,
          pin: true,
          scrub: true,
          animation: animation,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (self.progress === 1 && self.animation) {
              // Ensure pin releases at end
              self.animation.progress(1);
            }
          }
        });
      },
      
      // Mobile
      "(max-width: 767px)": () => {
        // Calculate horizontal movement for mobile
        const movement = (steps.length - 1) * 100 + 50;
        
        const animation = gsap.to(cardTrackRef.current, {
          x: `-${movement}%`,
          ease: "none",
        });

        return ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (steps.length - 0.5)}`,
          pin: true,
          scrub: true,
          animation: animation,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (self.progress === 1 && self.animation) {
              // Ensure pin releases at end
              self.animation.progress(1);
            }
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#15161a] overflow-hidden py-16"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 h-full w-full rounded-4xl overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src="/Doctor.png"
            alt="Doctor background"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0  rounded-4xl "></div>
        </div>
      </div>

      {/* Foreground Content */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 w-full relative z-10 px-4 md:px-6 items-center">

        {/* Left Side: Heading + CTA */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <div className="border-t border-white w-16"></div>
            <span className="text-white font-liBaskerville text-sm font-medium">
              How it Works
            </span>
          </div>

          <h2 className="text-white text-3xl font-NeGrotesk sm:text-4xl lg:text-5xl leading-[1.2] max-w-md mb-6">
            3 easy steps to a <span className="font-liBaskerville">confident smile</span>
          </h2>

          <Button className={styles.ButtonArrow_button__K1nCt}>
            Find a doctor
          </Button>
        </div>

        {/* Right Side: Cards */}
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-full max-w-[460px] h-[400px] relative ">
            {/* Cards Container */}
            <div
              ref={cardTrackRef}
              className={`absolute ${
                isMobile 
                  ? 'flex-row flex w-[100%] h-full' 
                  : 'flex-col w-full h-[100%]'
              }`}
            >
              {steps.map(({ step, title, desc }) => (
                <div 
                  key={step}
                  className={`
                    ${isMobile ? 'w-full flex-shrink-3' : 'w-full'} 
                    h-full p-2
                  `}
                >
                  <div className="h-full w-full  justify-between bg-[#c8d7de] p-20 rounded-3xl shadow-xl">
                    <div className="text-black text-xl  font-liBaskerville mb-5">
                      Step {step}
                    </div>
                    <h3 className="text-black font-NeGrotesk text-xl leading-tight mb-2">
                      {title}
                    </h3>
                    <p className="text-gray-700 text-l leading-relaxed font-NeGrotesk">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConSultant;