"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import styles from "@/components/ButtonArrow.module.css";

export function HeroSection() {
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#15161a] flex items-center  pt-24">
      {/* Background Image */}
      {/* Background Image - Responsive */}
      <div className="absolute inset-0 h-full w-full overflow-hidden bg-[#15161a]">
        {/* Mobile Image - Only visible on mobile */}
        <div className={`relative w-full h-full md:hidden rounded-b-3xl overflow-hidden`}>
          <Image
            src="/hero-table.jpeg" // Mobile image
            alt="Mobile background"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-[#15161a] opacity-10"></div>
        </div>

        {/* Desktop Image - Only visible on desktop */}
        <div className={`relative w-full h-full hidden md:block rounded-b-4xl overflow-hidden`}>
          <Image
            src="/hero-background.jpeg" // Desktop image
            alt="Desktop background"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-[#15161a] opacity-10"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-8 grid lg:grid-cols-12 gap-16 items-center min-h-[80vh]">
       {/* Content*/}
        <div
          className={`lg:col-span-7 flex flex-col justify-center h-full pb-16 lg:pb-0 transition-all duration-700 ease-out ${
            isContentVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[20px]"
          }`}
        >
          <div className="space-y-6 max-w-2xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-NeGrotesk text-gray-900 leading-[0.9] tracking-tight drop-shadow-lg">
              Be you.
            </h1>
            <p className="text-4xl sm:text-5xl md:text-6xl font-liBaskerville font-light italic text-gray-800 leading-tight drop-shadow-md">
              Smile confidently.
            </p>
          </div>
        </div>

        {/* Content  */}
         {/*  Content */}
        <div className="lg:col-span-5 lg:col-start-8 flex flex-col items-center justify-center pb-10 lg:pb-0 lg:relative lg:items-end lg:justify-end lg:h-[300px]">
          <div className="space-y-4 z-10 max-w-sm text- lg:absolute lg:bottom-0 lg:right-0 lg:text-left lg:max-w-none">
            <p className="text-white text-sm leading-relaxed font-light">
              With AirFlex™ aligners, enjoy up to 50% less wear time <br />
              compared to other brands. OrthoFX&apos;s cutting-edge <br />
              aligners are designed to fit your unique lifestyle and <br />
              treatment goals.*
            </p>
            <Link href="/Become-a-Provider">
              <Button className={styles.ButtonArrow_button__K1nCt}>
                <span>Find a doctor</span>
              </Button>
            </Link>
          </div>

          {/* Extra Image */}
          <div className="hidden lg:block absolute bottom-[-50px] left-[-100px] z-0  rounded-xl p-4">
            <Image
              src="/Percentless.png"
              alt="50% Less wear time with AirFlex aligners"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}