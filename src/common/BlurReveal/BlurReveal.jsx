// components/BlurReveal.jsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const BlurReveal = ({ text, className = '', staggerAmount = 0.05 }) => {
  const textRef = useRef(null);
  const charsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (textRef.current) {
      // Split text into words first, then characters
      const words = text.split(' ');
      const elements = [];
      
      words.forEach((word, wordIndex) => {
        // Create characters for this word
        const chars = word.split('').map((char, charIndex) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.display = 'inline-block';
          span.style.willChange = 'filter, transform';
          charsRef.current.push(span);
          return span;
        });

        // Create word wrapper
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        chars.forEach(char => wordSpan.appendChild(char));
        
        // Add word to elements array
        elements.push(wordSpan);
        
        // Add space after word (except for last word)
        if (wordIndex < words.length - 1) {
          const space = document.createElement('span');
          space.textContent = ' ';
          space.style.display = 'inline-block';
          space.style.width = '0.3em'; // Adjustable word spacing
          elements.push(space);
        }
      });

      // Clear and append all elements
      textRef.current.innerHTML = '';
      elements.forEach(el => textRef.current.appendChild(el));

      // Animate only the character spans
      gsap.fromTo(charsRef.current, {
        filter: 'blur(10px) brightness(0%)',
        willChange: 'filter'
      }, {
          ease: 'none', // Animation easing.
          filter: 'blur(0px) brightness(100%)',
          duration: 2, // Animation duration.
          stagger: 0.05, // Delay between starting animations for each character.
          scrollTrigger: {
            trigger: textRef.current, // Element that triggers the animation.
            start: 'top bottom-=30%', // Animation starts when element hits bottom of viewport.
            end: 'bottom center+=15%', // Animation ends in the center of the viewport.
            toggleActions: 'play none none reverse', // Animation direction on scroll out.
          
            scrub: true, // Animation progress tied to scroll position.
          },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      charsRef.current = []; // Clear refs on cleanup
    };
  }, [text, staggerAmount]);

  return (
    <div 
      ref={textRef}
      className={`opacity-100 text-[clamp(1.5rem,5vw,3rem)] leading-tight max-w-[1000px] user-select-none ${className}`}
    >
      {text}
    </div>
  );
};

export default BlurReveal;