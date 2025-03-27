import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { menuSlide } from "./anim";
import styles from "./style.module.scss";


export default function Nav({ onClose, scrollToSection }) {
  const navigationItems = [
    { text: "Services", id: "service" },
    { text: "About", id: "about" },
    { text: "Testimonials", id: "testimonials" },
    { text: "Works", id: "works" },
    { text: "Contact", id: "contact" },
  ];

  return (
    <motion.div
    variants={menuSlide}
      initial = 'initial'
      animate='enter'
      exit= 'exit'
      className={styles.menu}
    >
      <div className={styles.body}>
        <div className={styles.nav}>

          <div className="w-[400px] h-[400px] about-section rounded-full bg-amber-50 absolute top-[-200px] right-[-100px]">

          </div>
          <div className="w-[400px] h-[400px] about-section rounded-full bg-[#E5E5E0] absolute top-[-200px] right-[-200px]">

          </div>

        
        <div className={styles.header}>
          <p className="text-md  mt-10 font-light">Navigation</p>
        </div>
        <ul className="space-y-0">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  scrollToSection(item.id, e);
                  onClose();
                }}
                className=" font-light  transition-colors duration-300"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 space-y-4">
          <h2 className="text-xl  font-bold">Email Address</h2>
          <ul className="space-y-2 text-[20px] font-light text-[#C4C4BB] cl-effect-5">
              <li><Link href=""><span data-hover="codebykaran@gmail.com">codebykaran@gmail.com</span></Link></li>
          </ul>
          <div className="flex flex-row justify-start space-x-2 mt-10">
          <Link
                className="group pointer-events-auto relative flex px-4 py-2 transform-none items-center justify-center overflow-hidden rounded-full border border-[#8C8C73] tracking-base  px-space-lg py-space-sm text-base"
                path="/"
                href="https://cal.com/karan-chouhan-2jvqjy/15min"
              >
                <span className="absolute inset-0 z-10 block overflow-hidden">
                  <span className="block h-full w-full translate-y-full rounded-t-[15rem] bg-[#8C8C73] transition-all duration-500 ease-expo sm:group-hover:translate-y-0 sm:group-hover:rounded-none"></span>
                </span>
                <span className="relative text-sm z-20 block overflow-hidden transition-all">
                  <span
                    after="Linkedin"
                    className="block after:absolute after:left-0 after:block after:translate-y-0 after:transition-all after:duration-500 after:ease-expo after:content-[attr(after)] sm:group-hover:after:-translate-y-[100%]"
                    href="https://cal.com/karan-chouhan-2jvqjy/15min"
                  >
                    <span
                      href="https://cal.com/karan-chouhan-2jvqjy/15min"
                      className="flex transition-all duration-500 ease-expo sm:group-hover:-translate-y-full"
                    >
                      Linkedin
                    </span>
                  </span>
                </span>
              </Link>
           
              <Link
                className="group pointer-events-auto relative flex px-4 py-2 transform-none items-center justify-center overflow-hidden rounded-full border border-[#8C8C73]    tracking-base  px-space-lg py-space-sm text-base"
                path="/"
                href="https://cal.com/karan-chouhan-2jvqjy/15min"
              >
                <span className="absolute inset-0 z-10 block overflow-hidden">
                  <span className="block h-full w-full translate-y-full rounded-t-[15rem] bg-[#8C8C73] transition-all duration-500 ease-expo sm:group-hover:translate-y-0 sm:group-hover:rounded-none"></span>
                </span>
                <span className="relative text-sm z-20 block overflow-hidden transition-all">
                  <span
                    after="Github"
                    className="block after:absolute after:left-0 after:block after:translate-y-0 after:transition-all after:duration-500 after:ease-expo after:content-[attr(after)] sm:group-hover:after:-translate-y-[100%]"
                    href="https://cal.com/karan-chouhan-2jvqjy/15min"
                  >
                    <span
                      href="https://cal.com/karan-chouhan-2jvqjy/15min"
                      className="flex transition-all duration-500 ease-expo sm:group-hover:-translate-y-full"
                    >
                      Github
                    </span>
                  </span>
                </span>
              </Link>
          
              <Link
                className="group pointer-events-auto relative flex px-4 py-2 transform-none items-center justify-center overflow-hidden rounded-full border border-[#8C8C73] tracking-base  px-space-lg py-space-sm text-base"
                path="/"
                href="https://cal.com/karan-chouhan-2jvqjy/15min"
              >
                <span className="absolute inset-0 z-10 block overflow-hidden">
                  <span className="block h-full w-full translate-y-full rounded-t-[15rem] bg-[#8C8C73] transition-all duration-500 ease-expo sm:group-hover:translate-y-0 sm:group-hover:rounded-none"></span>
                </span>
                <span className="relative text-sm z-20 block overflow-hidden transition-all">
                  <span
                    after="Instagram"
                    className="block after:absolute after:left-0 after:block after:translate-y-0 after:transition-all after:duration-500 after:ease-expo after:content-[attr(after)] sm:group-hover:after:-translate-y-[100%]"
                    href="https://cal.com/karan-chouhan-2jvqjy/15min"
                  >
                    <span
                      href="https://cal.com/karan-chouhan-2jvqjy/15min"
                      className="flex transition-all duration-500 ease-expo sm:group-hover:-translate-y-full"
                    >
                      Instagram
                    </span>
                  </span>
                </span>
              </Link>
          </div>
        </div>
        </div>
      </div>
    </motion.div>
  );
}