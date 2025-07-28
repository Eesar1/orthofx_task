import { Cards } from "@/constants";

export default function LifestyleSection() {
  return (
    <section className="bg-black py-24 px-6">
      {/* Heading and CTA */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] items-start mb-16">
        <h2 className="text-4xl sm:text-5xl font-light text-blue-200 tracking-tight leading-snug md:leading-tight">
          Aligned<br />
          <span className="font-liBaskerville text-blue-200">to your lifestyle</span>
        </h2>
        <div className="flex justify-center flex-col mt-[5.2rem]">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-semibold rounded-full shadow-lg hover:bg-gray-100 transition">
            Find a doctor
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Cards Section */}
<div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
  {Cards.map((card, idx) => (
    <div
      key={idx}
      className="relative group  overflow-hidden cursor-pointer hover:shadow-2xl rounded-2xl shadow-xl bg-gray-900 h-[500px]"
    >
      <img
        src={card.image}
        alt={card.title}
        className="absolute  inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      
      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        <div className="mb-4">
          <h3 className="text-white font-light  text-2xl mb-3">
            {card.title} {card.title2 && (
              <span className="text-white font-liBaskerville">{card.title2}
            </span>
            )} 

          </h3>
          
          {card.description && (
            <div className="  p-4 rounded-lg">
              <p className="text-gray-200 text-sm leading-relaxed">
                {card.description.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>
        
          
        <div className="flex justify-end">
          {card.type === "button" ? (
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-semibold rounded-full shadow hover:bg-gray-200 transition">
              {card.cta}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <div className="group-hover:bg-blue-300 transition-all duration-300 rounded-full p-3">
              <div className="text-black group-hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
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
