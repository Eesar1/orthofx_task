import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
  <footer className="bg-[#15161a] text-white">
    {/* divider */}
    <div className="border-t border-[#d9edf7]"></div>
  <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-10 pt-8 pb-8">  {/* changed pt-16 to pt-8 */}
  {/* Top Section: 3 Columns in One Row */}
  <div className="grid grid-cols-3 md:grid-cols-3 ">
    {/* Company Column */}
    <div>
      <h3 className="text-2xl font-liBaskerville mb-3 text-[#d9edf7] pb-1">Company</h3> {/* changed mb-6 to mb-3 */}
      <ul className="space-y-4 font-NeGrotesk ">
          {[
            { title: "About", href: "#" },
            { title: "OrthoFX Difference", href: "#" },
          ].map((item, i) => (
            <li key={i}>
              <Link href={item.href} className="text-[#d9edf7] hover:text-[#d9edf7] transition">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Products Column */}
      <div className="w-full px-4 md:px-6 lg:px-8 -ml-25"> 

       <h3 className="text-2xl font-light mb-3 font-liBaskerville text-[#d9edf7] pb-2">Products</h3> {/* changed mb-6 to mb-3 */}
         <ul className=" font-NeGrotesk space-y-4">
          {[
            "AirFlex™",
            "FXClear™",
            "FXBright™",
            "FXRetainers",
            "FXPay™",
            "FXOnTrack™",
            "Directions for Use",
          ].map((item, i) => (
            <li key={i}>
              <Link href="#" className="text-[#d9edf7] hover:text-[#d9edf7] transition">  
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Resources Column */}
      <div className="w-full px-1 md:px-3 lg:px-1 -ml-35"> 
        <h3 className="text-2xl mb-3 font-liBaskerville text-[#d9edf7] pb-2">Resources</h3> {/* changed mb-6 to mb-3 */}
      <ul className="space-y-4 font-NeGrotesk ">
          {[
            "Find a Doctor",
            "FXOnTrack Photo Guide",
            "Blog",
            "FAQ",
            "Press",
            "Events & Webinars",
            "Terms & Conditions",
          ].map((item, i) => (
            <li key={i}>
              <Link href="#" className="text-[#d9edf7] hover:text-[#d9edf7] transition">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>

  {/* Full-width SVG BELOW the content */}
  <div className="w-full">
    <img
      src="/oortho-name.svg"
      alt="OrthoFX logo"
      className="w-full object-cover"
    />
  </div>
</footer>

  );
};

export default Footer;