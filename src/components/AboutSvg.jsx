import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from 'next/image';
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSvg() {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const headingRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;

    // Get the total length of the path
    const pathLength = path.getTotalLength();

    // Set up initial state - make path invisible
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Create the animation
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: svgRef.current,
        start: "top center", // Animation starts when top of SVG hits center of viewport
        end: "bottom center",
        scrub: 1, // Smooth scrubbing effect
        markers: false, // Set to true for debugging
      },
    });

    // Split the h1 text into characters
    const headingText = new SplitType(headingRef.current, {
      types: 'lines, chars',
      tagName: 'span'
    });

    // Set initial state for heading characters
    gsap.set(headingText.lines, {
      opacity: 0,
    });

    // Create animation for heading characters
    gsap.to(headingText.lines, {
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
      },
    });

    // Parallax effect for the image
    gsap.fromTo(imageRef.current, 
      { y: 0 }, // Starting position
      {
        y: -50, // Move up by 50px (adjust as needed)
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom", // Start when the top of the image hits the bottom of the viewport
          end: "bottom top", // End when the bottom of the image hits the top of the viewport
          scrub: true, // Smooth scrubbing effect
          markers: false, // Set to true for debugging
        }
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      headingText.revert(); // Revert the SplitType changes
    };
  }, []);

  return (
    <div ref={svgRef} className="w-full relative font-neue ">
      <svg
        width="1937"
        height="1446"
        viewBox="0 0 1937 1446"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d="M1924.22 132.324C1723.25 168.114 1388.65 72.7746 1180.75 50.0926C972.848 27.4106 511.653 8.72079 407.501 381.5C302.479 757.392 671.739 927.314 836 971.5C1057.66 1031.13 1361.74 892.04 1305.5 517.5C1255.5 184.5 1657.99 372.94 1579.5 634.5C1538 772.798 1163.37 1058.7 1305.5 1301.7C1395.29 1455.22 1781.65 1398.06 1914.15 1331.06"
          stroke="#3A3733"
          strokeWidth="25"
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute top-0 left-0 right-0 bottom-0  mt-[20%] md:mt-[5%] flex items-start justify-center ">
        <Link
          className="group pointer-events-auto relative flex px-10 md:px-20 py-4 md:py-8 transform-none items-center justify-center overflow-hidden rounded-full bg-[#3A3733] font-bold uppercase tracking-base  px-space-lg py-space-sm text-base"
          href={"/Projects"}
        >
          <span className="absolute inset-0 z-10 block overflow-hidden">
            <span className="block h-full w-full translate-y-full rounded-t-[15rem] bg-[#8C8C73] transition-all duration-500 ease-expo sm:group-hover:translate-y-0 sm:group-hover:rounded-none"></span>
          </span>
          <span className="relative text-xl z-20 block overflow-hidden transition-all">
            <span
              after="See more Work ↗"
              className="block after:absolute after:left-0 after:block after:translate-y-0 after:transition-all after:duration-500 after:ease-expo after:content-[attr(after)] sm:group-hover:after:-translate-y-[100%]"
            >
              <span className="flex transition-all duration-500 ease-expo sm:group-hover:-translate-y-full">
                See more Work ↗
              </span>
            </span>
          </span>
        </Link>
      </div>

      <div className="flex w-full md:flex-row flex-col px-6  md:px-16 items-start justify-between absolute top-[15%]  md:top-[20%]">
        <div>
          <svg
            className="w-24 h-24 rotate-90 hidden md:block"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="w-full md:w-[60%] text-6xl overflow-hidden md:text-5xl lg:text-9xl font-bold">
          <h1>DESIGNER</h1>
          <h1>DEVELOPER,</h1>
          <h1>CREATOR /</h1>
        </div>
      </div>

      <div className="flex flex-col  md:px-16 md:justify-between w-full  md:flex-row min-h-screen absolute top-[30%]  md:top-[40%] text-white">
        {/* Left side - Image */}
        <div className="p-6 flex place-items-center">
          <div ref={imageRef} className="max-w-md mx-auto overflow-hidden">
            <Image 
              src="/images/floating_1.jpg"
              alt="Profile"
              className="w-full h-full grayscale"
              width={500}
              height={300}
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="md:w-[60%] p-6 flex flex-col justify-center">
          <div className="max-w-lg">
            {/* Main intro */}
            <div className="mb-16">
              <h1 ref={headingRef}  className="text-xl overflow-hidden md:text-2xl text-[#D0D0C6] font-light leading-relaxed">
                 With a passion for design and development, I take projects from
                ideation to launch, ensuring a seamless journey that leaves a
                lasting positive impact on the digital landscape and your
                business.
              </h1>
            </div>

            {/* About section */}
            <div className="mb-12 ">
              <h2 className="text-[#D0D0C6] text-sm mb-4">(ABOUT ME)</h2>
              <p className="text-[#7A7875] text-md  mb-6">
                Creating great web experiences is my primary focus. I ensure
                each project leaves users with a feel-good sensation through
                meticulous attention to detail and user-centric design
                principles.
              </p>
              <p className="text-[#7A7875] text-md">
                When I&apos;m not immersed in web development and design, you can
                find me sharing insights about my freelance journey on YouTube,
                bouldering, playing music, or tending to my cherished
                houseplants.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
