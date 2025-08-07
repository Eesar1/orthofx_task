import Image from "next/image"

export function TrustedSection() {
  return (
    <section className="relative bg-[#15161a] text-white/40 overflow-hidden py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col">
        {/* Top Row - Left Image */}
        <div className="flex justify-start mb-1 md:mb-1">
          <Image
            src="/woman.png"
            alt="Smiling woman"
            width={120}
            height={120}
            className="rounded-2xl object-cover w-[80px] h-[80px] md:w-[120px] md:h-[120px]"
          />
        </div>

        {/* Text - Centered with proper line breaks */}
        <div className="flex flex-col items-center text-center px-4 w-full sm:px-4 max-w-6xl mx-auto">
          <h2 className="block text-4xl lg:text-6xl md:text-lg leading-[1.2] text-[#d9edf7]  font-sans">
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
        <div className="flex justify-end mt-5 md:mt-1">
          <div className="relative rounded-[1.5rem] overflow-hidden">
            <Image
              src="/teeth.png"
              alt="Aligners"
              width={120}
              height={120}
              className="rounded-2xl w-[80px] h-[80px] md:w-[120px] md:h-[120px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}