import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Top Section: 3 Columns in One Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Column */}
          <div>
            <h3 className="text-xl font-liBaskervillefont-bold mb-6 border-b border-gray-700 pb-2">Company</h3>
            <ul className="space-y-4">
              {[
                { title: "About", href: "#" },
                { title: "OrthoFX Difference", href: "#" },
              ].map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
       
          {/* Products Column */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-b font-liBaskerville border-gray-700 pb-2">Products</h3>
            <ul className="space-y-4">
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
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-liBaskerville border-b border-gray-700 pb-2">Resources</h3>
            <ul className="space-y-4">
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
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
          

        {/* Divider */}
        <div className="border-t border-gray-800 my-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} OrthoFX. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((label, i) => (
              <Link key={i} href="#" className="text-gray-500 hover:text-white transition text-sm">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;