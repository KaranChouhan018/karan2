"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import Magnetic from "@/common/Magentic";
import Link from "next/link";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const navRef = useRef(null);
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
      opacity: 0 
    });

    gsap.to(hamburgerRef.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: "0",
        end: "window.innerheight",
        scrub: true
      },
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    });

    // Navigation links animation
    gsap.to(navRef.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "100 top",
        scrub: true,
      },
      opacity: 0,

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
        
          <div className="flex flex-col items-start md:gap-16 justify-between md:items-center">
            <div>
              <h1 className="font-bold text-md md:text-xl">CodeByKaran <sup>©</sup></h1>
            </div>
            <div>
              <h1 className="text-sm">(Website Designer & Developer)</h1>
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
            className="fixed top-10 right-10 flex bg-[#CDCDC3] overflow-hidden items-center justify-center w-[60px] h-[60px] md:w-[60px] md:h-[60px] rounded-full before:absolute before:inset-0 before:translate-y-full before:rounded-full before:bg-[#3A3733] before:transition-all before:duration-[400ms] before:ease-in-out hover:before:translate-y-0 after:absolute after:inset-0 after:translate-y-full after:rounded-full after:bg-[#8C8C73] after:transition-all after:duration-[600ms] after:ease-in-out hover:after:translate-y-0 cursor-pointer"
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

          
      <div className="w-full   md:w-[600px] h-[500px]  fixed right-0 z-[90]">
        <motion.div
          variants={menuVariants}
          initial="initial"
          animate={menuIsActive ? "animate" : "exit"}
          className={`fixed right-0 bg-[#1C1C1C] z-[90] w-full md:w-[600px] overflow-hidden h-[500px] rounded-b-3xl ${
            menuIsActive ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="absolute bottom-6 right-8 text-sm text-right">
            <p>Located in India</p>
            <p>
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
            <p>
              {new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </p>
          </div>
          <div className="absolute bottom-[-100px] left-[-100px] text-sm  mt-[5%]  w-[300px] h-[300px] bg-[#3A3834] bg-opacity-20 rounded-full">

          </div>
        </motion.div>
        <motion.div
          variants={menuVariant1}
          initial="initial"
          animate={menuIsActive ? "animate" : "exit"}
          className="h-[400px] w-full md:w-[700px] relative z-[100] bg-[#3A3834] shadow-2xl  rounded-b-3xl flex flex-col justify-center px-14 py-20"
        >
          {/* Navigation Links */}
          <div className="flex flex-col items-center justify-center md:justify-start font-extrabold font-space-mono text-5xl md:flex-row md:space-x-4 mt-[100px] z-[120] mb-20">
            {[
              { text: "HOME", id: "home" },
              { text: "ABOUT", id: "about" },
              { text: "WORK", id: "works" },
              { text: "CONTACT", id: "contact" }
            ].map((link, index) => (
              <div key={index} className="relative">
                <Link
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(link.id, e)}
                  className="relative text-white hover:text-gray-400"
                >
                  {link.text}
                </Link>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="text-white">
            <p className="text-gray-400 mb-4 text-center md:text-left">
              Socials
            </p>
            <div className="flex justify-center md:justify-start text-md space-x-6 md:text-xl">
              {["Linkedin", "Telegram", "WhatsApp", "Instagram"].map(
                (social, index) => (
                  <Magnetic key={index}>
                    <Link
                      href="#"
                      className="relative hover-underline-animation"
                    >
                      {social}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 hover:w-full"></span>
                    </Link>
                  </Magnetic>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>

      
    </>
    
  );
}