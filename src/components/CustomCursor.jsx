// components/CustomCursor.js
"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorArrowRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorArrow = cursorArrowRef.current;
    
 
    
    // Initial cursor state
    gsap.set(cursor, {
      width: 0,
      height: 0,
      backgroundColor: 'white',
      borderRadius: '50%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
      pointerEvents: 'none'
    });

    gsap.set(cursorArrow, {
      opacity: 0,
      scale: 0
    });

    // Cursor follow animation
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX - cursor.offsetWidth / 2,
        y: e.clientY - cursor.offsetHeight / 2,
        duration: 0.1
      });
    };

    // Handle hover on images
    const handleImageHover = {
      enter: () => {
        gsap.to(cursor, {
          width: 80,
          height: 80,
          backgroundColor: 'white',
          duration: 0.3
        });
        gsap.to(cursorArrow, {
          opacity: 1,
          scale: 1,
          duration: 0.3
        });
      },
      leave: () => {
        gsap.to(cursor, {
          width: 0,
          height: 0,
          backgroundColor: 'white',
          duration: 0.3
        });
        gsap.to(cursorArrow, {
          opacity: 0,
          scale: 0,
          duration: 0.2
        });
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', moveCursor);
    
    // Add hover listeners to all project images
    const projectImages = document.querySelectorAll('.grid_item');
    projectImages.forEach(image => {
      image.addEventListener('mouseenter', handleImageHover.enter);
      image.addEventListener('mouseleave', handleImageHover.leave);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      projectImages.forEach(image => {
        image.removeEventListener('mouseenter', handleImageHover.enter);
        image.removeEventListener('mouseleave', handleImageHover.leave);
      });
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <div ref={cursorRef}>
        <div 
          ref={cursorArrowRef}
          className="flex items-center justify-center w-full h-full"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none"
            className="text-black -rotate-45"
          >
            <path 
              d="M5 12H19M19 12L12 5M19 12L12 19" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
