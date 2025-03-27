import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

export default function SceneText() {
  const textRef = useRef(null);
  const freeRef = useRef(null);

  useEffect(() => {
    const initAnimation = async () => {
      if (textRef.current) {
        // Clear any existing split text
        if (textRef.current.splitType) {
          textRef.current.splitType.revert();
        }

        // Split the text
        const text = new SplitType(textRef.current, {
          types: 'words, chars',
          tagName: 'span'
        });

        // Store the split instance
        textRef.current.splitType = text;

        // Create the reveal animation
        const tl = gsap.timeline();

        // Reset any existing animations
        gsap.set(text.chars, {
          opacity: 0,
          y: 50,
        
        });

        // Animate
        tl.to(text.chars, {
          opacity: 1,
          y: 0,
          
          duration: 1,
          delay: 4.5,
          stagger: 0.02,
          ease: "power4.out"
        });
      }
    };

    initAnimation();

    // Cleanup
    return () => {
      if (textRef.current?.splitType) {
        textRef.current.splitType.revert();
      }
    };
  }, []);

  useEffect(() => {
    gsap.set(freeRef.current, {y: 20 , opacity: 0})
    gsap.to(freeRef.current, {
      y: -40,
      opacity: 1,
      duration: 1,

      delay: 5,


  })  


  }, []);
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2   text-center w-full leading-tight">
      <div className=' overflow-hidden' ref={textRef}>
      <h1  className="md:pr-[15%]  text-4xl  text-[#161614]  md:text-5xl lg:text-6xl font-black font-neue">HI THERE, I&apos;M</h1> <br/>
          <h1 className="md:pl-[15%] text-4xl text-[#161614] md:text-5xl lg:text-6xl font-black font-neue">KARAN CHOUHAN.</h1> <br/>
          
      </div>
      <div className='overflow-hidden mt-[10%] w-[95%] mx-auto text-center md:mt-[4%]' ref={freeRef}>
        <h1 className='text-lg text-[#6A645C] md:text-2xl'>Freelance frontend developer & web designer</h1> 
        <h1 className='text-lg text-[#6A645C] md:text-2xl'>Based in India </h1>
      </div>
    </div>
  );
}