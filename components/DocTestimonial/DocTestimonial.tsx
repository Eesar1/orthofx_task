"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import styles from "@/components/ButtonArrowW.module.css";
import darkstyles from "@/components/ButtonArrowDark.module.css";

const TestimonialsPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  // Extended doctor data with more quotes
  const doctors = [
    {
      name: "Dr. Block",
      quote: "My favorite features about OrthoFX are the predictable outcomes and financing options which help patients start treatment with little upfront costs.",
      image: "/doctor.avif"
    },
    {
      name: "Dr. Conroy",
      quote: "Gamechanger! The most exciting thing about OrthoFX is the exceptional aligner materials and financing options, all put together in an integrated system.",
      image: "/doctor.avif"
    },
    {
      name: "Dr. Lowe",
      quote: "OrthoFX aligners reduce refinements and treatment time, making my patients happy with faster results.",
      image: "/doctor.avif"
    },
    {
      name: "Dr. Battle",
      quote: "The greatest impact OrthoFX has had in my practice is the flexibility of offering diverse and affordable payment options for my patients.",
      image: "/doctor.avif"
    },
    {
      name: "Dr. Martinez",
      quote: "The precision and reliability of OrthoFX aligners have transformed how I approach orthodontic treatment. My patients see results faster than ever.",
      image: "/doctor.avif"
    },
    {
      name: "Dr. Thompson",
      quote: "What sets OrthoFX apart is their commitment to innovation. The technology behind these aligners is truly remarkable and delivers consistent outcomes.",
      image: "/doctor.avif"
    },
    {
      name: "Dr. Chen",
      quote: "The patient satisfaction rate with OrthoFX has been incredible. The comfort and effectiveness make it an easy recommendation for my practice.",
      image: "/doctor.avif"
    },
    {
      name: "Dr. Williams",
      quote: "OrthoFX has revolutionized my practice workflow. The seamless integration and support system make complex cases manageable and predictable.",
      image: "/doctor.avif"
    }
  ];

  // Create infinite scroll by tripling the array
  const infiniteDoctors = [...doctors, ...doctors, ...doctors];

  // Video autoplay
  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
        } catch (err) {
          console.log("Autoplay prevented:", err);
        }
      }
    };
    playVideo();
  }, []);

  // Initialize carousel to start at the middle set for infinite effect
  useEffect(() => {
    if (carouselRef.current) {
      // Calculate actual card width after render
      const firstCard = carouselRef.current.children[0] as HTMLElement;
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        const gap = 24;
        const initialPosition = doctors.length * (cardWidth + gap);
        carouselRef.current.scrollLeft = initialPosition;
        setCurrentIndex(doctors.length);
      }
    }
  }, [doctors.length]);

  // Check and reset position for infinite scroll
  const checkInfiniteScroll = useCallback(() => {
    if (!carouselRef.current) return;
    
    const firstCard = carouselRef.current.children[0] as HTMLElement;
    if (!firstCard) return;
    
    const cardWidth = firstCard.offsetWidth;
    const gap = 24;
    const scrollLeft = carouselRef.current.scrollLeft;
    const singleSetWidth = doctors.length * (cardWidth + gap);
    
    // If scrolled past the end of the second set, jump to beginning of second set
    if (scrollLeft >= singleSetWidth * 2) {
      carouselRef.current.scrollLeft = singleSetWidth;
      setCurrentIndex(doctors.length);
    }
    // If scrolled before the beginning of the first set, jump to end of second set
    else if (scrollLeft < singleSetWidth) {
      carouselRef.current.scrollLeft = singleSetWidth * 2 - (cardWidth + gap);
      setCurrentIndex(doctors.length * 2 - 1);
    }
  }, [doctors.length]);

  // Navigation functions
  const scrollToCard = useCallback((index: number) => {
    if (!carouselRef.current) return;
    
    const firstCard = carouselRef.current.children[0] as HTMLElement;
    if (!firstCard) return;
    
    const cardWidth = firstCard.offsetWidth;
    const gap = 24;
    const scrollPosition = index * (cardWidth + gap);
    
    carouselRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    
    setCurrentIndex(index);
    
    // Check for infinite scroll reset after smooth scroll animation
    setTimeout(() => {
      checkInfiniteScroll();
    }, 600);
  }, [checkInfiniteScroll]);

  const nextCard = useCallback(() => {
    let nextIndex = currentIndex + 1;
    // If we're at the end of the visible range, wrap to continue seamlessly
    if (nextIndex >= infiniteDoctors.length) {
      nextIndex = doctors.length; // Jump to beginning of second set
    }
    scrollToCard(nextIndex);
  }, [currentIndex, scrollToCard, infiniteDoctors.length, doctors.length]);

  const prevCard = useCallback(() => {
    let prevIndex = currentIndex - 1;
    // If we're at the beginning of the visible range, wrap to continue seamlessly
    if (prevIndex < 0) {
      prevIndex = doctors.length * 2 - 1; // Jump to end of second set
    }
    scrollToCard(prevIndex);
  }, [currentIndex, scrollToCard, doctors.length]);

  // Dragging functionality with smooth transitions
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
    if (carouselRef.current) {
      setStartScrollLeft(carouselRef.current.scrollLeft);
      carouselRef.current.style.transition = "none";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = startScrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    if (!carouselRef.current) return;
    
    // Snap to nearest card after dragging
    const firstCard = carouselRef.current.children[0] as HTMLElement;
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth;
      const gap = 24;
      const scrollPosition = carouselRef.current.scrollLeft;
      const newIndex = Math.round(scrollPosition / (cardWidth + gap));
      
      const clampedIndex = Math.max(0, Math.min(newIndex, infiniteDoctors.length - 1));
      
      // Smooth scroll to the snapped position
      carouselRef.current.scrollTo({
        left: clampedIndex * (cardWidth + gap),
        behavior: 'smooth'
      });
      
      setCurrentIndex(clampedIndex);
      
      // Check for infinite scroll reset after snap animation
      setTimeout(() => {
        checkInfiniteScroll();
      }, 400);
    }
  };

  return (
    <div className="bg-[#15161a] text-blue-300 min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Top label + Main Heading */}
        <div className="text-start mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="border-t border-white w-16"></div>
            <p className="text-xl font-liBaskerville text-[#d9edf7] ">
              Doctor testimonials
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-NeGrotesk text-[#d9edf7] tracking-tight mb-8">
            Trusted by experts
          </h2>

          {/* Button with Arrow */}
          <div className="flex justify-start mb-16">
            <Button className={darkstyles.button}>
              Become a provider
            </Button>
          </div>
        </div>

        {/* Doctor Quotes Carousel */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
          {/* Navigation Arrows - Moved up */}
          <div className="absolute right-4 sm:right-6 lg:right-8 -top-16 flex gap-2 z-10">
            <button 
              onClick={prevCard}
              aria-label="Previous testimonial"
            >
              <img src="/arrow-left.svg" alt="" />
            </button>
            <button 
              onClick={nextCard}
              aria-label="Next testimonial"
            >
              <img src="/arrow.svg" alt="" />
            </button>
          </div>
          
          <div
            ref={carouselRef}
            className={`flex overflow-x-auto scrollbar-hide gap-6 py-2 pl-4 sm:pl-6 lg:pl-8 ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onScroll={() => {
              // Check infinite scroll on any scroll event
              if (!isDragging) {
                setTimeout(() => {
                  checkInfiniteScroll();
                }, 100);
              }
            }}
            style={{ scrollBehavior: "smooth" }}
          >
            {infiniteDoctors.map((doctor, index) => (
              <div
                key={`${doctor.name}-${index}`}
                className="flex-shrink-0 w-[75vw] md:w-[35vw] lg:w-[34vw] bg-[#c8d7de] p-6 rounded-4xl shadow-lg flex flex-col"
              >
                <img src="/qouteblack.svg" className="w-6 h-6 top 2px left pl-1" alt="" />

                <p className="text-lg md:text-xl p-3 font-NeGrotesk text-black mb-6 leading-relaxed flex-grow">
                  {doctor.quote}*
                </p>
                
                {/* Doctor info with image - moved to left bottom */}
                <div className="flex items-center">
                  <div className="relative rounded-full w-12 h-12 overflow-hidden border-2 border-white mr-3">
                    <Image 
                      src={doctor.image}
                      alt={doctor.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <p className="text-base font-liBaskerville text-black">{doctor.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video CTA Section */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden rounded-4xl mx-15 my-16 px-8 md:px-20">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[center_70%] z-20 rounded-4xl"
        >
          <source src="/videos/ortho-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute top-12 left-12 z-30 text-left px-4 max-w-xl">
          <h2 className="text-4xl md:text-7xl font-NeGrotesk text-white mb-8">
            Ready to take the next step?
          </h2>

          <div className="flex flex-col sm:flex-row text-left gap-6">
            <Button className={styles.ButtonArrow_button__K1nCt2}>
              Find a doctor
            </Button>
            <Button className={darkstyles.button}>
              Smile quiz
            </Button>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="mx-auto px-15 sm:px-13 lg:px-16 py-12 md:py-22 text-left text-[#c8d7de] text-xl font-light">
        <p className="mb-2">*FDA: Cleared for at least 12 hours of continuous daily wear time.</p>
        <p className="mb-2">**Data on file.</p>
        <p className="mb-2">¹ These opinions are of patients treated. Results may vary.</p>
        <p>² Opinions of OrthoFX providers mentioned. Clinicians should use their judgement in treating their patients.</p>
      </section>
      
      {/* Custom CSS for scrollbar hiding */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default TestimonialsPage;