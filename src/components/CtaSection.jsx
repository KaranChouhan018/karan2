"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const CtaSection = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    // Split the text
    const text = new SplitType(headingRef.current, {
      types: 'chars,words',
      tagName: 'span'
    });

    // Set initial state
    gsap.set(text.chars, { 
      opacity: 0,
      y: 100,
      
    });

    // Create animation
    gsap.to(text.chars, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top bottom-=100",
        end: "top center",
        toggleActions: "play none none reverse"
      },
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1.5,
      ease: "power4.out",
      stagger: {
        amount: 0.8,
        from: "start"
      }
    });

    // Cleanup function
    return () => {
      text.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="relative  max-w-[90%] md:max-w-[95%] mx-auto px-4 md:px-6 bg-[#0C0C0B] rounded-lg text-white min-h-screen flex flex-col justify-center items-center p-4 sm:p-6">
      {/* Small text at the top */}
      <p className="text-md font-mono text-[#3A3733] mb-4 sm:mb-6">
        (Need an unfair advantage?) 
      </p>

      {/* Main headline */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 
          ref={headingRef}
          className="text-7xl text-[#C4C4BB] md:text-9xl overflow-hidden font-bold tracking-lighter"
          style={{ perspective: "1000px" }}
        >
          LET&apos;S MAKE
          <br />
          IT HAPPEN
        </h1>
      </div>

      <Link
        className="group pointer-events-auto relative flex px-20 py-8 md:py-10 transform-none items-center justify-center overflow-hidden rounded-full bg-[#3A3733] font-bold uppercase tracking-base  px-space-lg py-space-sm text-base"
        path="/"
        href='https://cal.com/karan-chouhan-2jvqjy/15min'
      >
        <span className="absolute inset-0 z-10 block overflow-hidden">
          <span className="block h-full w-full translate-y-full rounded-t-[15rem] bg-[#8C8C73] transition-all duration-500 ease-expo sm:group-hover:translate-y-0 sm:group-hover:rounded-none"></span>
        </span>
        <span className="relative text-xl z-20 block overflow-hidden transition-all">
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

      {/* Bottom Info Section */}
      <div className="absolute bottom-10 sm:bottom-8 left-0 w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 px-4 sm:px-6">
        <div className="md:flex hidden md:block  md:items-center border border-[#C4C4BB] rounded-md p-2">
          <div className="mr-3">
            <Image
              src="/earth.svg"
              alt=""
            width={6}
            height={6}
              className="w-6 h-6 sm:w-8 sm:h-8 animate-spin"
            />
          </div>
          <div className="border-l border-[#C4C4BB] pl-3">
            <p className="text-[#C4C4BB] text-sm ">Working Globally</p>
            <p className="text-[#C4C4BB] text-sm">
              Available Apr &apos;25
            </p>
          </div>
        </div>

        <div className="text-center sm:text-right cl-effect-5">
          <p className="text-[#C4C4BB] text-md font-bold sm:text-sm">
            FOR FURTHER INQUIRIES
          </p>
          <div className="flex items-center justify-center lg:justify-end ">
          <span className="mr-2 ">↳</span>
          <ul className="space-y-2 font-light text-[#C4C4BB] cl-effect-5">
              <li><Link href="/"><span data-hover="codebykayo.com">codebykayo.com</span></Link></li>
          </ul>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
