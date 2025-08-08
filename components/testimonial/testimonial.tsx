"use client";
import React, { useState } from "react";
import classNames from "classnames"; // optional, helps with class toggling

const testimonials = [
  {
    id: 1,
    quote: "We wholeheartedly loved AirFlex for our son. The results have truly exceeded our expectations!...",
    author: "Omero M.",
  },
  {
    id: 2,
    quote: "What a great deal for superior service.",
    author: "Lisa D.",
  },
  {
    id: 3,
    quote: "I love that you can actually do monthly payment installments...",
    author: "Ky N.",
  },
  
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const fadeDuration = 300; // ms

  const goTo = (index: number) => {
    setFade(false);
    setTimeout(() => {
      setActiveIndex(index);
      setFade(true);
    }, fadeDuration);
  };

  const goToPrevious = () => {
    goTo((activeIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    goTo((activeIndex + 1) % testimonials.length);
  };

  return (
    <section className="bg-[#15161a] text-white py-24 px-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-2 mb-4">
          <div className="border-t border-white w-16"></div>
          <span className="text-[#d9edf7] font-liBaskerville text-xl font-medium">
            Customer testimonials
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Left Side - Title */}
          <div className="md:w-1/2">
            <h2 className="text-xl md:text-4xl text-[#d9edf7] font-NeGrotesk  mb-6">
              Real people <br />
              real results
            </h2>
          </div>

          {/* Right Side - Testimonial */}
          <div className="md:w-1/2">
            {/* Navigation Controls */}
            <div className="flex items-center justify-left gap-5 mb-25">
              <button
                onClick={goToPrevious}
               className="cursor-pointer"
                aria-label="Previous testimonial"
              >
                <img src="/arrow-left.svg" alt="" />
              </button>

              <span className="text-xl p-3 font-liBaskerville text-[#d9edf7]">
                {activeIndex + 1}/{testimonials.length}
              </span>

              <button
                onClick={goToNext}
              className="cursor-pointer"
                aria-label="Next testimonial"
              >
                <img src="/arrow.svg" alt="" />
              </button>
            </div>

            {/* Testimonial Quote with Fade */}
              <div
              
                className={classNames(
                  "transition-opacity duration-300 ease-in-out",
                  { "opacity-0": !fade, "opacity-100": fade }
                )}
              >
                <img src="/qoute.svg" className="w-6 h-6 top 2px left pl-1" alt="" />
               <p className="font-NeGrotesk text-3xl pr-36 pl-0 text-[#d9edf7] leading-tight px-0 mt-2 mb-2">
                  {testimonials[activeIndex].quote}
                </p>

                <h4 className="text-xl font-liBaskerville text-[#d9edf7]">
                  {testimonials[activeIndex].author}
                </h4>
              </div>
            </div>
          </div>
        </div>
      
    </section>
  );
};

export default Testimonials;