import Image from "next/image";
import { Button } from "../ui/button";
import darkstyles from "@/components/ButtonArrowDark.module.css";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, easeOut } from 'framer-motion'; // Added easeOut import

export function WhyDifferentSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsInitialized(true);
    };

    checkMobile();
    const handleResize = () => checkMobile();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMounted]);

  const { scrollYProgress } = useScroll({
    target: isMounted && isInitialized && !isMobile ? wrapperRef : undefined,
    offset: ["start start", "end start"],
  });

  const SECTION_WIDTH = isMounted ? window.innerWidth : 1200;
  const TOTAL_SECTIONS = 2;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -SECTION_WIDTH * 1.2], // Adjusted for ~160vw total content width
    { ease: easeOut } // Use imported easeOut function
  );

  if (!isMounted || !isInitialized) {
    return (
      <div className="bg-[#15161a] min-h-screen flex items-center justify-center">
        <div className="text-white opacity-50">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#15161a] relative">
      <div className="h-[20vh] bg-[#15161a]"></div>
      
      <motion.div 
        ref={wrapperRef}
        className={`bg-[#15161a] text-white ${isMobile ? 'py-16' : 'h-[300vh]'} w-full relative`}
      >
        <motion.div 
          className={`${isMobile ? 'relative' : 'sticky top-0'} w-full ${isMobile ? '' : 'h-screen'} overflow-hidden flex items-center`}
        >
          <motion.div 
            className={`flex ${isMobile ? 'flex-col gap-10' : 'flex-row gap-10 ml-[9vw]'} w-full md:w-[140vw] px-4 md:px-0`}
            style={isMobile ? {} : { x: isMounted ? x : 0 }}
          >
            {/* First Panel: Comfort meets efficiency */}
            <div className={`${isMobile ? 'w-full' : 'w-[80vw]'}  flex-shrink-0 flex flex-col ${isMobile ? 'gap-4' : 'justify-center'}`}>
              <h2 className={`font-NeGrotesk text-[#d9edf7]  ${isMobile ? 'text-4xl' : 'text-4xl md:text-7xl'} leading-tight `}>
                Why are we <span className="font-baskerville text-[#d9edf7]  font-liBaskerville">different?</span>
                
              </h2>
              <div className="">
                <div className="flex items-center gap-1 mt-1">
                  <div className="border-t border-white w-16"></div>
                  <span className="text-white text-sm italic font-light">01</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-start md:gap-8">
                  <div className="flex-1">
                    <h5 className="font-NeGrotesk text-[#d9edf7]  text-2xl font-light md:text-3xl leading-snug">
                      Comfort meets
                    </h5>
                    <h5 className="text-[#d9edf7]  text-2xl md:text-3xl font-liBaskerville leading-snug">
                      efficiency
                    </h5>
                  </div>
                  <p className="font-NeGrotesk text-[#9aa7ac] text-sm md:text-base leading-relaxed mt-2 md:mt-0 md:max-w-md">
                    Our aligners apply optimal force with a gentle, consistent touch. While traditional aligners may use up to 8.4x more force, ours deliver precise control for a more comfortable experience.**
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 mt-8">
                <div className="col-span-12 md:col-span-6">
                  <Image src="/graph.png" alt="Graph" width={480} height={300} className="rounded-2xl w-full h-auto object-cover" />
                </div>
                <div className="col-span-12 md:col-span-3">
                  <Image src="/mans.png" alt="Mans" width={240} height={150} className="rounded-2xl w-full h-auto object-cover" />
                </div>
                <div className="col-span-12 md:col-span-3">
                  <Image src="/8x.jpg" alt="8x Less Force" width={240} height={150} className="rounded-2xl w-full h-auto object-cover" />
                </div>
              </div>
            </div>
                 
            {/* Second Panel: AirFlex™ aligners */}
            <div className={`${isMobile ? 'w-full' : 'w-[70vw]'} ml-[30vw] flex-shrink-0 flex flex-col ${isMobile ? 'gap-8' : 'justify-center'}`}>
              <h2 className={`font-NeGrotesk text-[#d9edf7]  ${isMobile ? 'text-4xl' : 'text-4xl md:text-7xl'} leading-tight `}>
                Why are we <span className="font-baskerville text-[#d9edf7]  font-liBaskerville">different?</span>
              </h2>
              <div className="">
                <div className="flex items-center gap-1 mt-1">
                  <div className="border-t border-white w-16"></div>
                  <span className="italic text-sm text-[#d9edf7]  font-medium">02</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-start md:gap-8">
                  <div className="flex-1">
                    <h5 className="font-NeGrotesk font-light text-[#d9edf7] text-2xl md:text-3xl leading-snug">
                      AirFlex™ aligners,
                    </h5>
                    <h5 className="font-liBaskerville text-[#d9edf7]  text-2xl md:text-3xl leading-snug">
                      advanced material
                    </h5>
                  </div>
                  <p className="font-NeGrotesk font-light text-[#9aa7ac] text-sm md:text-base leading-relaxed mt-2 md:mt-0 md:max-w-md">
                    AirFlex™ is the new generation of clear aligners, featuring patented HyperElastic™ polymer for sustained optimal force delivery. It supports natural bone remodeling and reduces daytime relapse when not wearing aligners.**
                  </p>
                </div>
              </div>
              <div>
                <Button className={darkstyles.button}>
                  OrthoFX Difference
                </Button>
              </div>
              <div className="grid grid-cols-12 gap-4 mt-8">
                <div className="col-span-12 md:col-span-6">
                  <Image src="/braces.png" alt="Graph" width={480} height={300} className="rounded-2xl w-full h-auto object-cover" />
                </div>
                <div className="col-span-12 md:col-span-3">
                  <Image src="/spike.jpg" alt="Mans" width={240} height={150} className="rounded-2xl w-full h-auto object-cover" />
                </div>
                <div className="col-span-12 md:col-span-3">
                  <Image src="/fda.png" alt="8x Less Force" width={240} height={150} className="rounded-2xl w-full h-auto object-cover" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
