"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import Nav from "@/Nav";
import { AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const navRef = useRef(null);
  const bookRef = useRef(null);
  const [menuIsActive, setMenuIsActive] = useState(false);

  // Prevent scrolling when menu is active
  useEffect(() => {
    if (menuIsActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuIsActive]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
        onLeave: () => {
          gsap.to(hamburgerRef.current, {
            scale: 1, 
            duration: 0.25, 
            ease: "power1.out"
          })
        },
        onEnterBack: () => {
          gsap.to(hamburgerRef.current, {
            scale: 0, 
            duration: 0.25, 
            ease: "power1.out"
          })
        }
      }
    });

    gsap.to(bookRef.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: "1280px top",
        end: "window.innerHeight",
        onLeave: () => {
          gsap.to(bookRef.current, {
            scale: 1, 
            duration: 0.25, 
            ease: "power1.out"
          })
        },
        onEnterBack: () => {
          gsap.to(bookRef.current, {
            scale: 0, 
            duration: 0.25, 
            ease: "power1.out"
          })
        }
      },
    });

    return () => {
      // Cleanup
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Scroll to section and close menu
  const scrollToSection = (sectionId) => {
    // Close menu
    setMenuIsActive(false);

    // Find the target section
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate scroll position with offset
      const offset = 100; // Adjust this value based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      // Smooth scroll to section
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Menu items with their corresponding section IDs
  const menuItems = [
    { label: 'Services', sectionId: 'service' },
    { label: 'About', sectionId: 'about' },
    { label: 'Works', sectionId: 'works' },
    { label: 'Testimonials', sectionId: 'testimonials' },
    { label: 'Contact', sectionId: 'contact' }
  ];

  return (
    <>
      <div 
        ref={menuRef} 
        className="w-screen fixed top-0 flex justify-between px-5 py-1 md:py-10 z-[100] md:px-10 items-center"
      >
        {/* Logo Section */}
        <div className="flex flex-col md:flex-row items-start md:gap-16 justify-between md:items-center">
          <div>
            <h1 className="font-bold text-md text-black md:text-xl">CodeByKaran <sup>©</sup></h1>
          </div>
          <div>
            <h1 className="text-sm text-[#6A645C] font-mono">(Website Designer & Developer)</h1>
          </div>
        </div>

        <div className="flex items-center">
          <ul ref={navRef} className="flex flex-col text-[#6A645C] pt-2 md:pt-0 md:flex-row font-light cl-effect-5">
            {menuItems.map((item, index) => (
              <li key={item.sectionId}>
                <button 
                  onClick={() => scrollToSection(item.sectionId)}
                  className="cursor-pointer"
                >
                  <span data-hover={item.label}>{item.label}</span>
                  {index < menuItems.length - 1 ? ',' : ''}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hamburger Menu Button */}
      <div
        ref={hamburgerRef}
        onClick={() => setMenuIsActive(!menuIsActive)}
        className="fixed top-10 right-6 lg:right-10 flex bg-[#CDCDC3] overflow-hidden items-center justify-center w-[55px] h-[55px] md:w-[60px] md:h-[60px] rounded-full  cursor-pointer z-[100]"
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

      {/* Book a Call Button */}
      <Link
        ref={bookRef}
        className="group scale-0 pointer-events-auto fixed top-10 right-22 lg:right-26 flex px-6 py-3.5 md:py-4.5 md:px-8 transform-none items-center justify-center overflow-hidden rounded-full bg-[#3A3733] font-bold uppercase tracking-base px-space-lg py-space-sm z-[100]"
        href='https://cal.com/karan-chouhan-2jvqjy/15min'
      >
        <span className="absolute inset-0 z-10 block overflow-hidden">
          <span className="block h-full w-full translate-y-full rounded-t-[15rem] bg-[#8C8C73] transition-all duration-500 ease-expo sm:group-hover:translate-y-0 sm:group-hover:rounded-none"></span>
        </span>
        <span className="relative text-md z-20 block overflow-hidden transition-all">
          <span
            after="Book a Call  ↗"
            className="block after:absolute after:left-0 after:block after:translate-y-0 after:transition-all after:duration-500 after:ease-expo after:content-[attr(after)] sm:group-hover:after:-translate-y-[100%]"
          >
            <span className="flex transition-all duration-500 ease-expo sm:group-hover:-translate-y-full">
              Book a Call ↗
            </span>
          </span>
        </span>
      </Link>

      {/* Navigation Menu */}
      <AnimatePresence mode="wait">
        {menuIsActive && <Nav />}
      </AnimatePresence>
    </>
  );
}