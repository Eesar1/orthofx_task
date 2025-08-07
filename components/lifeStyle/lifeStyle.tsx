import React, { useState, useEffect } from 'react';
import { Cards } from "@/constants";
import { Button } from "../ui/button";
import styles from "@/components/ButtonArrowW.module.css";
import style from '@/components/ButtonArrow.module.css';
import darkstyles from "@/components/ButtonArrowDarkest.module.css"

// Custom hook for responsive design
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  return isMobile;
}

export default function LifestyleSection() {
  const [activeCard, setActiveCard] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClient(true);
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (idx: number) => {
    if (isMobile) return; // Disable click functionality on mobile
    
    setShowContent(false);
    setActiveCard(idx);
    setTimeout(() => setShowContent(true), 500);
  };

  if (!isClient || isLoading) {
    return (
      <section className="bg-[#15161a] py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="h-[100px] flex items-center justify-center">
            <div className="text-blue-200">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  // Mobile layout - all cards expanded in vertical stack
  if (isMobile) {
    return (
      <section className="bg-[#15161a] py-24 px-6">
        {/* Heading and CTA */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] items-start mb-16">
          <h2 className="text-4xl sm:text-5xl font-NeGrotesk text-blue-200 tracking-tight leading-snug md:leading-tight">
            Aligned<br />
            <span className="font-liBaskerville text-blue-200">to your lifestyle</span>
          </h2>
          <div className="flex justify-center flex-col mt-[5.2rem]">
            <Button className={styles.ButtonArrow_button__K1nCt}>
              Find a doctor
            </Button>
          </div>
        </div>

        {/* Mobile Cards - Vertical Stack */}
        <div className="flex flex-col gap-8">
          {Cards.map((card, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-4xl shadow-xl bg-gray-900 h-[500px]"
            >
              {/* Background Image with Black Overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-40"></div>
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              {/* Content Container */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <div className="w-full">
                  <h3 className="text-white font-light mb-3 text-4xl">
                    {card.title}
                    {card.title2 && (
                      <span className="font-liBaskerville text-white">{card.title2}</span>
                    )}
                  </h3>
                  
                  {card.description && (
                    <div className="overflow-hidden transform">
                      <div className="pt-5 pb-4 rounded-lg">
                        <p className="text-gray-200 text-base">
                          {card.description.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                              {line}
                              {i < card.description.split('\n').length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex mt-6 justify-start">
                    <Button 
                      className={styles.ButtonArrow_button__K1nCt}
                    >
                      <span className="flex items-center gap-2">
                        {card.cta}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Desktop layout
  return (
    <section className="bg-[#15161a] py-24 px-6">
      {/* Heading and CTA */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] items-start mb-16">
        <h2 className="text-4xl sm:text-5xl font-NeGrotesk text-blue-200 tracking-tight leading-snug md:leading-tight">
          Aligned<br />
          <span className="font-liBaskerville text-blue-200">to your lifestyle</span>
        </h2>
        <div className="flex justify-center flex-col mt-[5.2rem]">
          <Button className={styles.ButtonArrow_button__K1nCt2}>
            Find a doctor
          </Button>
        </div>
      </div>

      {/* Expandable Cards Section */}
      <div className="w-full flex cursor-pointer gap-6 h-[800px] justify-start">
      {Cards.map((card, idx) => (
        <div
          key={idx}
          className={`relative group overflow-hidden rounded-4xl shadow-xl bg-gray-900 transition-all duration-75 ${
            activeCard === idx ? 'flex-[8]' : 'flex-[4]'
          }${idx === 0 ? ' ml-10' : ''} ${darkstyles.card}`} // Add card class here
          onClick={() => handleCardClick(idx)}
        >
            {/* Background Image with Black Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-40"></div>
            </div>
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 transition-all duration-500 ${
              activeCard === idx
                ? 'bg-gradient-to-t from-black/60 via-black/10 to-transparent'
                : 'bg-gradient-to-t from-black/70 via-black/20 to-black/10'
            }`}></div>
            
            {/* Content Container */}
          <div className={`relative group z-10 h-full flex flex-col p-3 transition-all duration-500 justify-end`}>
            <div className={`transition-all duration-400 ${
              activeCard === idx ? 'w-full' : 'w-auto'
            }`}>
                
                {/* Collapsed State */}
              {activeCard !== idx && (
                <div className="flex items-end cursor-pointer justify-between h-full w-full">
                  <div className="flex flex-col">
                    <span className="text-white font-NeGrotesk text-5xl">{card.title}</span>
                    {card.title2 && (
                      <span className="font-liBaskerville text-white text-4xl">{card.title2}</span>
                    )}
                  </div>
                  <Button 
                    className={`${darkstyles.buttondarkest}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(idx);
                    }}
                  >
                    <svg
                      width="24"
                      height="12"
                      viewBox="0 0 24 12"
                      className={`${darkstyles.arrowIcon}`}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13 12C13 12 18 8 24 6C18 4 13 0 13 0C13 0 14.3378 2.6756 16.1711 5.5H0V6.5H16.1711C14.3378 9.3244 13 12 13 12Z"
                      />
                    </svg>
                  </Button>
                </div>
              )}
                
                {/* Expanded State - Content with Fade Animation */}
                {activeCard === idx && (
                  <div className={`transition-all duration-500 ${showContent ? 'opacity-90' : 'opacity-100'}`}>
                    <h3 className="text-white font-NeGrotesk mb-3 text-5xl">
                      {card.title}
                      {card.title2 && (
                        <span className="font-liBaskerville text-white">{card.title2}</span>
                      )}
                    </h3>
                    
                    {card.description && (
                      <div className=" overflow-hidden transform">
                        <div className="pt-5 pb-4 px-4 rounded-lg">
                          <p className="text-gray-200 font-NeGrotesk text-xl">
                            {card.description.split('\n').map((line, i) => (
                              <React.Fragment key={i}>
                                {line}
                                {i < card.description.split('\n').length - 1 && <br />}
                              </React.Fragment>
                            ))}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className={`flex mt-auto justify-end`}>
                      <Button 
                        className={style.ButtonArrow_button__K1nCt}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="flex items-center gap-2">
                          {card.cta}
                        </span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}