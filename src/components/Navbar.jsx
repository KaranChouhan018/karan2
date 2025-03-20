"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import Magnetic from "@/common/Magentic";
import Link from "next/link";
import Nav from "@/Nav";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const navRef = useRef(null);
  const bookRef = useRef(null);
  const [menuIsActive, setMenuIsActive] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    // Initial setup for navbar
    gsap.set(menuRef.current, { 
      y: -100,
      opacity: 0 
    });

    // Animate navbar in
    gsap.to(menuRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      delay: 0.5
    });

    // Navbar scroll animation
    gsap.to(menuRef.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "100 top",
        onUpdate: (self) => {
          // Hide navbar when scrolling down, show when scrolling up
          if (self.direction === 1) {
            gsap.to(menuRef.current, {
              y: 0,
              opacity: 0,
              duration: 0.5,
              ease: "power2.inOut"
            });
          } else {
            gsap.to(menuRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.inOut"
            });
          }
        }
      }
    });

    // Hamburger button animation
    gsap.set(hamburgerRef.current, { 
      scale: 0,
    
    });

    gsap.to(hamburgerRef.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: "1200px top",
        end: "window.innerHeight",
        onLeave: () => {gsap.to(hamburgerRef.current, {scale: 1, duration: 0.25, ease: "power1.out"})},

        onEnterBack: () => {gsap.to(hamburgerRef.current, {scale: 0, duration: 0.25, ease: "power1.out"})}
      }
    });
    

    gsap.to(bookRef.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: "1280px top",
        end: "window.innerHeight",
      

          onLeave: () => {gsap.to(bookRef.current, {scale: 1, duration: 0.25, ease: "power1.out"})},

          onEnterBack: () => {gsap.to(bookRef.current, {scale: 0, duration: 0.25, ease: "power1.out"})}

      },
    });

 

    return () => {
      // Cleanup
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const menuVariants = {
    initial: { y: "-100%" },
    animate: {
      y: 0,
      transition: { duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const menuVariant1 = {
    initial: { y: "-100%" },
    animate: {
      y: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      y: "-100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Adjust this value based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    // Close menu if it's open
    if (menuIsActive) {
      setMenuIsActive(false);
    }
  };

  return (
    <>
      <div 
        ref={menuRef} 
        className="w-screen fixed top-0 flex justify-between px-5 py-1 md:py-10 z-[100] md:px-10 items-center "
      >
        {/* Logo Section */}
        
          <div className="flex flex-col md:flex-row items-start md:gap-16 justify-between md:items-center">
            <div>
              <h1 className="font-bold text-md md:text-xl">CodeByKaran <sup>©</sup></h1>
            </div>
            <div>
              <h1 className="text-sm font-mono ">(Website Designer & Developer)</h1>
            </div>
          </div>
    

        <div className="flex items-center">
          <ul ref={navRef} className="flex flex-col pt-2 md:pt-0 md:flex-row font-light cl-effect-5">
           
            <li>
              <Link href="#about" onClick={(e) => scrollToSection('about', e)}>
                <span data-hover="Services">Services</span>,
              </Link>
            </li>
            <li>
              <Link href="#service" onClick={(e) => scrollToSection('about', e)}>
                <span data-hover="About">About</span>,
              </Link>
            </li>
            <li>
              <Link href="#works" onClick={(e) => scrollToSection('works', e)}>
                <span data-hover="Works">Works</span>,
              </Link>
            </li>
            <li>
              <Link href="#works" onClick={(e) => scrollToSection('works', e)}>
                <span data-hover="PlayGround">PlayGround</span>,
              </Link>
            </li>
            <li>
              <Link href="#contact" onClick={(e) => scrollToSection('contact', e)}>
                <span data-hover="Contact">Contact</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
            ref={hamburgerRef}
            onClick={() => setMenuIsActive(!menuIsActive)}
            className="fixed top-10 right-6 lg:right-10 flex bg-[#CDCDC3] overflow-hidden items-center justify-center w-[55px] h-[55px] md:w-[60px] md:h-[60px] rounded-full before:absolute before:inset-0 before:translate-y-full before:rounded-full before:bg-[#3A3733] before:transition-all before:duration-[400ms] before:ease-in-out hover:before:translate-y-0 after:absolute after:inset-0 after:translate-y-full after:rounded-full after:bg-[#8C8C73] after:transition-all after:duration-[600ms] after:ease-in-out hover:after:translate-y-0 cursor-pointer z-[100]"
          >
            <div className="relative flex flex-col z-40 justify-between h-[14px] w-[32px]">
              <span
                className={`block w-full h-[1px] bg-black transition-transform duration-300 ease-in-out transform-origin-center ${
                  menuIsActive ? "rotate-45 translate-y-[6px]" : ""
                }`}
              />
              <span
                className={`block w-full h-[1px] bg-black transition-transform duration-300 ease-in-out transform-origin-center ${
                  menuIsActive ? "-rotate-45 -translate-y-[6px]" : ""
                }`}
              />
            </div>

            
          </div>

          

          <Link
          ref={bookRef}
        className="group scale-0 pointer-events-auto fixed top-10 right-20 lg:right-26 flex px-6 py-3.5 md:py-4.5 md:px-8 transform-none items-center justify-center overflow-hidden rounded-full bg-[#3A3733] font-bold uppercase tracking-base  px-space-lg py-space-sm z-[100] "
        path="/"
        href='https://cal.com/karan-chouhan-2jvqjy/15min'
      >
        <span className="absolute inset-0 z-10 block overflow-hidden">
          <span className="block h-full w-full translate-y-full rounded-t-[15rem] bg-[#8C8C73] transition-all duration-500 ease-expo sm:group-hover:translate-y-0 sm:group-hover:rounded-none"></span>
        </span>
        <span className="relative text-md z-20 block overflow-hidden transition-all">
          <span
            after="Book a Call  ↗"
            className="block after:absolute after:left-0 after:block after:translate-y-0 after:transition-all after:duration-500 after:ease-expo after:content-[attr(after)] sm:group-hover:after:-translate-y-[100%]"
            href='https://cal.com/karan-chouhan-2jvqjy/15min'
          >
            <span
            href='https://cal.com/karan-chouhan-2jvqjy/15min'
             className="flex transition-all duration-500 ease-expo sm:group-hover:-translate-y-full">
              Book a Call ↗

            </span>
          </span>
        </span>
      </Link>

          
      <AnimatePresence mode="wait">

           {menuIsActive && <Nav />}

       </AnimatePresence>

      
    </>
    
  );
}