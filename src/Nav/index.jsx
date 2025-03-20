import React, { useState } from 'react'
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from './anim';
import Link from 'next/link';

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Work",
    href: "/work",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
]

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
            <div onMouseLeave={() => {setSelectedIndicator(pathname)}} className={styles.nav}>
                    <div className={styles.header}>
                        <p>Navigation</p>
                    </div>
                    <div>
                    <div>
            <ul className="space-y-2 font-light cl-effect-5">
              {[
                { text: "Home", id: "home" },
                { text: "Services", id: "services" },
                { text: "About", id: "about" },
                { text: "Works", id: "works" },
                { text: "Contact", id: "contact" }
              ].map((item, index) => (
                <li key={index} className="w-full touch-auto">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(item.id, e)}
                    className="block w-full py-2 touch-auto"
                  >
                    <span data-hover={item.text} className="block">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

                    </div>
            </div>
            <div className={styles.footer}>
                <a>Awwwards</a>
                <a>Instagram</a>
                <a>Dribble</a>
                <a>LinkedIn</a>
            </div>
        </div>
    </motion.div>
  )
}