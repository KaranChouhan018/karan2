// components/Footer.jsx
"use client";

import Link from 'next/link';

const Footer = ( ) => {
  // Get current local time
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const timeZone = 'IND'; // Melbourne time zone as shown in the image


  return (
    <footer className=" py-16 sticky bottom-0 ">
      <div className="container1 max-w-[95%] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div>
            <h3 className="font-medium text-lg mb-4">Menu</h3>
            <div className="h-px w-full bg-[#6D665E] bg-opacity-50 mb-4"></div>
            <ul className="space-y-2 font-light cl-effect-5">
              <li><Link href="/"><span data-hover="Home">Home</span></Link></li>
              <li><Link href="#/About"><span data-hover="About">About</span></Link></li>
              <li><Link href="/services"><span data-hover="Services">Services</span></Link></li>
              <li><Link href="/works"><span data-hover="Works">Works</span></Link></li>
              <li><Link href="/works"><span data-hover="Contact">Contact</span></Link></li>
            </ul>
          </div>

          {/* Socials Section */}
          <div>
            <h3 className="font-medium text-lg font-space-mono mb-4">Socials</h3>
            <div className="h-px w-full bg-[#6D665E] mb-4"></div>
            <ul className="space-y-2 font-light cl-effect-5">
              <li><Link href="https://linkedin.com"><span data-hover="LinkedIn">LinkedIn</span></Link></li>
              <li><Link href="https://instagram.com"><span data-hover="Instagram">Instagram</span></Link></li>
              <li><Link href="https://bento.me"><span data-hover="Telegram">Telegram</span></Link></li>
              <li><Link href="https://github.com"><span data-hover="WhatsApp">WhatsApp</span></Link></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className='hidden md:block'>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <div className="h-px w-full bg-[#6D665E] mb-4"></div>
            <ul className="space-y-2 font-light cl-effect-5">
              <li><Link href="https://pillarstack.com"><span data-hover="Pillarstack">Pillarstack</span></Link></li>
              <li><Link href="/FloatingImage"><span data-hover="Figma Templates">Figma Templates</span></Link></li>
              <li><Link href="/newsletter"><span data-hover="Monthly Newsletter">Monthly Newsletter</span></Link></li>
            </ul>
          </div>
        </div>
        <div className='block md:hidden'>
            <h3 className="font-medium mt-6 text-lg mb-4">Resources</h3>
            <div className="h-px w-full bg-[#6D665E] mb-4"></div>
            <ul className="space-y-2 cl-effect-5">
              <li><Link href="https://pillarstack.com"><span data-hover="Pillarstack">Pillarstack</span></Link></li>
              <li><Link href="https://figma.com/templates"><span data-hover="Figma Templates">Figma Templates</span></Link></li>
              <li><Link href="/newsletter"><span data-hover="Monthly Newsletter">Monthly Newsletter</span></Link></li>
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
                   
              {/* Second SVG - initially hidden below, appears on hover */}
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


