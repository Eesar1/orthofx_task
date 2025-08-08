import Image from "next/image"

export function TrustedSection() {
  return (
    <section className="relative bg-[#15161a] text-white/40 overflow-hidden py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col">
        {/* Top Row - Left Image */}
        <div className="flex justify-start pl-14 mb-4 md:mb-1 mt-[-39]">
          <Image
            src="/woman.png"
            alt="Smiling woman"
            width={270}
            height={270}
            className="rounded-4xl object-cover w-[85px] h-[85px] md:w-[175px] md:h-[175px]"
          />
        </div>

        {/* Text - Centered with proper line breaks */}
        <div className="flex flex-col items-center text-center px-9 w-full sm:px-7 max-w-xl mx-auto">
          <h2 className="block text-4xl lg:text-6xl md:text-lg leading-[1] text-[#d9edf7]  font-sans">
            <span className="block text-center mx-auto max-w-xl w-full font-NeGrotesk">
              Trusted by patients and FDA-cleared 
            </span>
            
            <span className="block font-liBaskerville text-[#d9edf7] w-full text-center mx-auto max-w-xl mt-2">
              — Innovation that keeps your smile journey on track.
            </span>
          </h2>
          <p className="mt-4 md:text-base text-[#d9edf7] text-xs max-w-4xl leading-relaxed  font-NeGrotesk">
            Our aligners deliver smoother, predictable progress — so you can enjoy life confidently, knowing your smile is on track.**
          </p>
        </div>
        
        {/* Bottom Right Image - Teeth */}
        <div className="flex justify-end mt-6 md:mt-7 pr-10">
          <div className="relative rounded-[1.5rem] overflow-hidden">
            <Image
              src="/teeth.png"
              alt="Aligners"
              width={170}
              height={170}
              className="rounded-4xl w-[85px] h-[85px] md:w-[175px] md:h-[175px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}