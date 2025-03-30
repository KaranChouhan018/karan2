// components/Footer.jsx
"use client";

import Link from 'next/link';

const Footer = ( ) => {
  // Get current local time
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const timeZone = 'IND'; // Melbourne time zone as shown in the image

  // Scroll to section function
  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className=" py-16 about-section rounded-t-3xl mt-16 bg-[#0E0E0E] ">
      <div className="container1 max-w-[95%] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div>
            <h3 className="font-medium text-lg mb-4">Menu</h3>
            <div className="h-px w-full bg-[#6D665E] bg-opacity-50 mb-4"></div>
            <ul className="space-y-1 font-light cl-effect-5">
              {[
                { text: "Home", id: "home" },
                { text: "Services", id: "service" },
                { text: "About", id: "about" },
                { text: "Works", id: "works" },
                { text: "Testimonials", id: "testimonials" },
                { text: "Contact", id: "contact" }
              ].map((item, index) => (
                <li key={index} className="w-full touch-auto">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(item.id, e)}
                    className="block w-full py-2 touch-auto"
                  >
                    <span data-hover={item.text} className="block">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials Section */}
          <div>
            <h3 className="font-medium text-lg font-space-mono mb-4">Socials</h3>
            <div className="h-px w-full bg-[#6D665E] mb-4"></div>
            <ul className="space-y-1 font-light cl-effect-5">
              {[
                { text: "LinkedIn", href: "https://www.linkedin.com/in/karan-chouhan-66528a248" },
                { text: "Instagram", href: "https://www.instagram.com/_karxnwrites/" },
                { text: "Fiverr", href: "https://www.fiverr.com/s/kL6x5dL" }, 
                { text: "WhatsApp", href: "https://wa.me/+917898341464" }
              ].map((social, index) => (
                <li key={index} className="w-full touch-auto">
                  <a
                    href={social.href}
                    className="block w-full py-2 touch-auto"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span data-hover={social.text} className="block">{social.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Section */}
          <div className='hidden md:block'>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <div className="h-px w-full bg-[#6D665E] mb-4"></div>
            <ul className="space-y-1 font-light cl-effect-5">
              {[
                { text: "Awwwwards", href: "/" },
                { text: "Figma Templates", href: "/FloatingImage" },
                { text: "Framer Templates", href: "/newsletter" }
              ].map((resource, index) => (
                <li key={index} className="w-full touch-auto">
                  <a
                    href={resource.href}
                    className="block w-full py-2 touch-auto"
                  >
                    <span data-hover={resource.text} className="block">{resource.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='block md:hidden'>
            <h3 className="font-medium mt-6 text-lg mb-4">Resources</h3>
            <div className="h-px w-full bg-[#6D665E] mb-4"></div>
            <ul className="space-y-2 cl-effect-5">
              {[
                  { text: "Awwwwards", href: "https://www.awwwards.com/" },
                  { text: "Figma Templates", href: "https://www.figma.com/templates/" },
                  { text: "Framer Motion", href: "https://www.framer.com/marketplace/" }
              ].map((resource, index) => (
                <li key={index} className="w-full touch-auto">
                  <a
                    href={resource.href}
                    className="block w-full py-2 touch-auto"
                  >
                    <span data-hover={resource.text} className="block">{resource.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        {/* Copyright and Time Section */}
        <div className="mt-[10%] md:mt-[5%]  w-full flex flex-row gap-[10px] md:flex-row justify-between items-end md:items-center">
          <div>
            <p className="text-xl block md:hidden md:text-5xl font-bold">© 2025 </p>
            <p className="text-2xl block md:hidden md:text-5xl font-bold">Karan Chouhan </p>
            <p className="text-2xl block md:hidden md:text-5xl font-bold">All rights reserved.</p>

            <p className='hidden md:block md:text-4xl'>© 2025 Karan Chouhan <br /> All rights reserved.</p>
          </div>
          <div className=" md:mt-0">
            <p className="uppercase text-sm font-bold mb-1">LOCAL TIME</p>
            <p className="font-mono font-normal text-[#7A7875]">{`${hours}:${minutes}, ${timeZone}`}</p>
          </div>
          <div className="flex justify-end ">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-[#CDCDC3] rounded-full p-4 hidden md:block transition-colors hover:bg-[#BDBDB3] relative overflow-hidden group hover:scale-90"
          >
            <div className="flex flex-col transition-transform duration-300 ease-in-out ">
              {/* First SVG - visible by default, moves up on hover */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="black"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 15l7-7 7 7" 
                />
              </svg>
            </div>
            
          </button>
                   
              {/* Second SVG - initially hidden below, acan youppears on hover */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="black"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 15l7-7 7 7" 
                />
              </svg>
        </div>
        </div>


      </div>
    </footer>
  );
};

export default Footer;


