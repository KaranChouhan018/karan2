"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import Nav from "@/Nav/index";
import { AnimatePresence } from "framer-motion";
import Magnetic from "@/common/Magentic";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const navRef = useRef(null);
  const bookRef = useRef(null);
  const [menuIsActive, setMenuIsActive] = useState(false);

  useEffect(() => {

    
    // // Initial navbar setup
    // gsap.set(menuRef.current, { 
    //   y: -100,
    //   opacity: 0 
    // });

    // // Animate navbar in
    // gsap.to(menuRef.current, {
    //   y: 0,
    //   opacity: 1,
    //   duration: 1,
    //   delay: 0.5
    // });

    // Navbar scroll animation
    gsap.to(menuRef.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "100 top",
        onUpdate: (self) => {
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
      scale: 0
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
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
        ease: "power3.out",
        delay:1.5
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
        className="w-screen fixed top-0 flex justify-between px-5 py-1 md:py-10 z-[100] md:px-10 items-center"
      >
        <div className="flex flex-col md:flex-row items-start md:gap-16 justify-between md:items-center">
          <Link href="/">
            <h1 className="font-bold text-md text-black md:text-xl">YourBrand <sup>©</sup></h1>
          </Link>
          <Magnetic>
            <h1 className="text-sm text-[#6A645C] font-mono">(Website Designer & Developer)</h1>
          </Magnetic>
        </div>

        <div className="flex items-center">
          <ul ref={navRef} className=" md:flex flex-col text-[#6A645C] pt-2 md:pt-0 md:flex-row font-light cl-effect-5">
            <li className="">
              <Link href="#service" onClick={(e) => scrollToSection('service', e)}>
                <span data-hover="Services">Services</span>,
              </Link>
            </li>
            <li className="">
              <Link href="#about" onClick={(e) => scrollToSection('about', e)}>
                <span data-hover="About">About</span>,
              </Link>
            </li>
            <li className="">
              <Link href="#works" onClick={(e) => scrollToSection('works', e)}>
                <span data-hover="Works">Works</span>,
              </Link>
            </li>
            <li className="">
              <Link href="#testimonials" onClick={(e) => scrollToSection('testimonials', e)}>
                <span data-hover="Testimonials">Testimonials</span>,
              </Link>
            </li>
            <li className="">
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
        className="group scale-0 pointer-events-auto fixed top-10 right-22 lg:right-26 flex px-6 py-3.5 md:py-4.5 md:px-8 transform-none items-center justify-center overflow-hidden rounded-full bg-[#3A3733] font-bold uppercase tracking-base px-space-lg py-space-sm z-[100]"
        href='#'
        target="_blank"
      >
        <span className="absolute inset-0 z-10 block overflow-hidden">
          <span className="block h-full w-full translate-y-full rounded-t-[15rem] bg-[#8C8C73] transition-all duration-500 ease-expo sm:group-hover:translate-y-0 sm:group-hover:rounded-none"></span>
        </span>
        <span className="relative text-md z-20 block overflow-hidden transition-all">
          <span
            after="Book a Call"
            className="block after:absolute after:left-0 after:block after:translate-y-0 after:transition-all after:duration-500 after:ease-expo after:content-[attr(after)] sm:group-hover:after:-translate-y-[100%]"
          >
            <span className="flex transition-all duration-500 ease-expo sm:group-hover:-translate-y-full">
              Book a Call 
            </span>
          </span>
        </span>
      </Link>

      <AnimatePresence mode="wait">
        {menuIsActive && (
          <Nav 
            onClose={() => setMenuIsActive(false)} 
            scrollToSection={scrollToSection} 
          />
        )}
      </AnimatePresence>
    </>
  );
}