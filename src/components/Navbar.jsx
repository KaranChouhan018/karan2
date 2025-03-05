"use client";
import { useState , useRef ,useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import Magnetic from "@/common/Magentic";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  const menuRef = useRef(null);
  const [menuIsActive, setMenuIsActive] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

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


  useEffect(() => {
    gsap.set(menuRef.current, { y: -100 });

    gsap.to(menuRef.current, {
      y: -10,
      duration: 1,
      delay: 5,
    })

  }, []);
  return (
    <>
      <div ref={menuRef} className="w-screen fixed top-0 flex justify-between px-5 py-1 md:py-2 z-[100] md:px-10 items-center">
        {/* Logo Section */}
        <Magnetic>
          <div className="flex items-center">
            <Image
              src="/images/logo1.png"
              alt="Logo"
              width={100}
              height={100}
              className="object-fill mix-blend-screen"
            />
          </div>
        </Magnetic>

        {/* Menu Button Section */}
        <Magnetic>
          <div className="flex items-center space-x-4">
            <div className=" hidden md:block text-2xl text-[#CDCDC3]  mix-blend-difference">
              {menuIsActive ? "Close" : "Menu"}
            </div>

            <div
              onClick={() => setMenuIsActive(!menuIsActive)}
              className="relative flex bg-[#CDCDC3] overflow-hidden items-center justify-center w-[60px] h-[60px]  md:w-[70px] md:h-[70px]   rounded-full before:absolute before:inset-0 before:translate-y-full   before:rounded-full before:bg-[#3A3733] before:transition-all before:duration-[400ms] before:ease-in-out hover:before:translate-y-0  after:absolute after:inset-0 after:translate-y-full after:rounded-full after:bg-[#8C8C73] after:transition-all after:duration-[600ms] after:ease-in-out hover:after:translate-y-0 cursor-pointer"
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
          </div>
        </Magnetic>
      </div>

      <div className="w-full   md:w-[700px] h-[500px]  fixed right-0 z-[90]">
        <motion.div
          variants={menuVariants}
          initial="initial"
          animate={menuIsActive ? "animate" : "exit"}
          className={`fixed right-0 bg-[#1C1C1C] z-[90] w-full md:w-[700px] overflow-hidden h-[500px] rounded-b-3xl ${
            menuIsActive ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="absolute bottom-6 right-8 text-white text-right">
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
                hour12: true,
              })}
            </p>
          </div>
          <div className="absolute bottom-[-100px] left-[-100px]  mt-[5%]  w-[300px] h-[300px] bg-[#3A3834] bg-opacity-20 rounded-full">

          </div>
        </motion.div>
        <motion.div
          variants={menuVariant1}
          initial="initial"
          animate={menuIsActive ? "animate" : "exit"}
          className="h-[400px] w-full md:w-[700px] relative z-[100] bg-[#3A3834] shadow-2xl  rounded-b-3xl flex flex-col justify-center px-14 py-20"
        >
          {/* Navigation Links */}
          <div className="flex flex-col items-center justify-center md:justify-start font-extrabold text-3xl md:text-6xl md:flex-row md:space-x-4 mt-[100px] z-[120] mb-20">
            {["HOME", "ABOUT", "WORK"].map((link, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredLink(link)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Link
                  href={`/${link.toLowerCase()}`}
                  className="relative text-white hover:text-gray-400"
                >
                  {link}
                </Link>
                {hoveredLink === link && (
                  <motion.svg
                    className="absolute top-4 left-0 w-full h-10"
                    viewBox="0 0 485 187"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 126.31C399.288 -221.188 108.365 341.759 475 126.31"
                      stroke="yellow"
                      strokeWidth="30"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                )}
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