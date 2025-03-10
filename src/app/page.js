'use client';
import { Canvas } from "@react-three/fiber";
import { Fluid } from "@whatisjery/react-fluid-distortion";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import Navbar from "@/components/Navbar"; 
import Preloader from "@/Preloader";
import Scene from "@/components/Scene";
import About from "@/components/About";
import FeaturedWork from "@/components/FeaturedWork";
import AboutSvg from "@/components/AboutSvg";
import CtaSection from "@/components/CtaSection"; 
import { EffectComposer } from "@react-three/postprocessing";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <main className="w-screen overflow-x-hidden" ref={mainRef}>
        {/* <AnimatePresence mode="wait">
          {isLoading && <Preloader />}
        </AnimatePresence> */}
   
        <div className="w-full h-screen overflow-x-clip">
          <Scene />
        </div>

        <About />
        <FeaturedWork  />
        <AboutSvg />
        <CtaSection />
      </main>

  

  
    </>

  );
}