'use client';
import { Canvas } from "@react-three/fiber";
import { Fluid } from "@whatisjery/react-fluid-distortion";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
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
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <main className="w-screen overflow-x-hidden" ref={mainRef}>
        <AnimatePresence mode="wait">
          {isLoading && <Preloader />}
        </AnimatePresence>
     
        <div className="w-full h-screen overflow-x-clip">
          <Scene />
        </div>

        <About />
        <FeaturedWork  />
        <AboutSvg />
        <CtaSection />
      </main>

      <div className="fixed top-0 w-screen h-screen pointer-events-none  ">
          <Canvas className="pointer-events-none">
      <EffectComposer>
    <Fluid
     radius={0.03}
     curl={10}
     swirl={5}
     distortion={1}
     force={2}
     pressure={0.94}
     densityDissipation={0.98}
     velocityDissipation={0.99}
     intensity={0.3}
     rainbow={false}
     blend={0}
     showBackground={false}
     backgroundColor='#a7958b'
     fluidColor='#7A7875'
      

  
    />
    </EffectComposer>
  </Canvas>
    </div>

     
  

  
    </>

  );
}