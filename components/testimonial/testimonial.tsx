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
    <section className="bg-black text-white py-24 px-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-2 mb-4">
          <div className="border-t border-white w-16"></div>
          <span className="text-white font-liBaskerville text-sm font-medium">
            Customer Testimonials
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Left Side - Title */}
          <div className="md:w-1/2">
            <h2 className="text-xl md:text-4xl text-white font-light mb-6">
              Real people <br />
              real results
            </h2>
          </div>

          {/* Right Side - Testimonial */}
          <div className="md:w-1/2">
            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={goToPrevious}
                className="inline-flex items-center gap-2 px-4 py-2 bg-black border-2 text-sm font-semibold rounded-full shadow hover:bg-gray-500"
                aria-label="Previous testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <span className="text-sm text-gray-400">
                {activeIndex + 1}/{testimonials.length}
              </span>

              <button
                onClick={goToNext}
                className="inline-flex items-center gap-2 px-4 py-2 bg-black border-2 text-sm font-semibold rounded-full shadow hover:bg-gray-500"
                aria-label="Next testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Testimonial Quote with Fade */}
            <div className="border-l border-gray-600 pl-8 min-h-[140px]">
              <div
                className={classNames(
                  "transition-opacity duration-300 ease-in-out",
                  { "opacity-0": !fade, "opacity-100": fade }
                )}
              >
                <p className="italic text-lg text-gray-300 leading-relaxed mb-4">
                  "{testimonials[activeIndex].quote}"
                </p>
                <h4 className="text-base font-semibold text-white">
                  {testimonials[activeIndex].author}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;