import React, { useState } from "react";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { menuSlide } from "./anim";
import Link from "next/link";


export default function index() {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.menu}
    >
      <div className={styles.body}>
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname);
          }}
          className={styles.nav}
        >
          <div className={styles.header}>
            <p>Navigation</p>
          </div>
          <div>
            <div>
              <ul className=" font-light cl-effect-5">
                {[
                  { text: "Services", id: "services" },
                  { text: "About", id: "about" },
                  { text: "Testimonials", id: "testimonials" },
                  { text: "Works", id: "works" },
                  { text: "Contact", id: "contact" },
                ].map((item, index) => (
                  <li key={index} className="w-full touch-auto">
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => scrollToSection(item.id, e)}
                      className="block w-full touch-auto"
                    >
                      <span data-hover={item.text} className="block">
                        {item.text}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <h1 className="font-bold">Email Address</h1>
          <p className=" text-[#999999] cl-effect-5">codebykaran@gmail.com</p>

          <div className="flex mt-8 space-x-2 ">
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
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
