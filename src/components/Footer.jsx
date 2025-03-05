// components/Footer.jsx
"use client";

import Link from 'next/link';

const Footer = ( ) => {
  // Get current local time
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const timeZone = 'IND'; // Melbourne time zone as shown in the image

  return (
    <footer className=" py-16 ">
      <div className="container1 max-w-[95%] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div>
            <h3 className="font-medium text-lg mb-4">Menu</h3>
            <div className="h-px w-full bg-[#6D665E] bg-opacity-50 mb-4"></div>
            <ul className="space-y-2 font-light ">
              <li><Link href="/" className="hover:text-stone-900">Home</Link></li>
              <li><Link href="/" className="hover:text-stone-900">About</Link></li>
              <li><Link href="/services" className="hover:text-stone-900">Services</Link></li>
              <li><Link href="/works" className="hover:text-stone-900">Works</Link></li>
              <li><Link href="/works" className="hover:text-stone-900">Contact</Link></li>
            </ul>
          </div>

          {/* Socials Section */}
          <div>
            <h3 className="font-medium text-lg mb-4">Socials</h3>
            <div className="h-px w-full bg-[#6D665E] mb-4"></div>
            <ul className="space-y-2 font-light">
              <li><Link href="https://linkedin.com" className="font-thin">LinkedIn</Link></li>
              <li><Link href="https://instagram.com" className="hover:text-stone-900">Instagram</Link></li>
              <li><Link href="https://bento.me" className="hover:text-stone-900">Telegram</Link></li>
              <li><Link href="https://github.com" className="hover:text-stone-900">WhatsApp</Link></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className='hidden md:block'>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <div className="h-px w-full bg-[#6D665E] mb-4"></div>
            <ul className="space-y-2 font-light">
              <li><Link href="https://pillarstack.com" className="hover:text-stone-900">Pillarstack</Link></li>
              <li><Link href="https://figma.com/templates" className="hover:text-stone-900">Figma Templates</Link></li>
              <li><Link href="/newsletter" className="hover:text-stone-900">Monthly Newsletter</Link></li>
            </ul>
          </div>
        </div>
        <div className='block md:hidden'>
            <h3 className="font-medium mt-6 text-lg mb-4">Resources</h3>
            <div className="h-px w-full bg-[#6D665E] mb-4"></div>
            <ul className="space-y-2">
              <li><Link href="https://pillarstack.com" className="hover:text-stone-900">Pillarstack</Link></li>
              <li><Link href="https://figma.com/templates" className="hover:text-stone-900">Figma Templates</Link></li>
              <li><Link href="/newsletter" className="hover:text-stone-900">Monthly Newsletter</Link></li>
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
            <p className="font-mono font-normal text-[#7A7875]">{`${hours}:${minutes} AM, ${timeZone}`}</p>
          </div>
          <div className="flex justify-end ">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-stone-200 rounded-full p-4 hidden md:block hover:bg-stone-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
        </div>


      </div>
    </footer>
  );
};

export default Footer;


