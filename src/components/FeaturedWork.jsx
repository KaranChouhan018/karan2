'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SplitType from 'split-type';
import DistortionImage from './DistortionImage';

// Register GSAP plugins outside component to avoid multiple registrations
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const WORKS = [
  {
    id: 1,
    title: 'Your Company : Web App',
    categories: ['WEB •', 'DESIGN •', 'DEVELOPMENT •', '3D'],
    image: '/images/floating_1.jpg',
    centerImage: '/p1.png',
    slug: 'https://frontend-v8zc.vercel.app/'
  },
  {
    id: 2,
    title: 'LiveDocs : Text Editor',
    categories: ['CONCEPT •', '3D  •', 'MOGRAPH •', 'VIDEO'],
    image: '/images/floating_2.jpg',
    centerImage: '/p2.png',
    slug: 'https://livedocs-lime.vercel.app/'
  },
  {
    id: 3,
    title: 'Niklas Designs : Portfolio',
    categories: ['WEB •', 'DESIGN •', 'DEVELOPMENT •', '3D'],
    image: '/images/floating_3.jpg',
    centerImage: '/p3.png',
    slug: 'https://www.niklasdesigns.com/'
  },
  {
    id: 4,
    title: 'LukeFrame : Web Agency',
    categories: ['CONCEPT •', '3D  •', 'MOGRAPH •', 'VIDEO '],
    image: '/images/floating_4.jpg',
    centerImage: '/p4.png',
    slug: 'porsche-dream-machine'
  },
  {
    id: 5,
    title: 'Ingenio : Design Studio',
    categories: ['WEB •', 'DESIGN •', 'DEVELOPMENT •', '3D '],
    image: '/images/floating_5.jpg',
    centerImage: '/p9.jpg',
    slug: 'https://ingenio-website.vercel.app/'
  },
  {
    id: 6,
    title: 'Thorny: Digital Agency',
    categories: ['WEB •',  'DESIGN •', 'DEVELOPMENT •', '3D '],
    image: '/images/floating_6.jpg',
    centerImage: '/p10.jpg',
    slug: 'https://thorny-website.vercel.app/'
  }
];

// Memoized Arrow component
const Arrow = React.memo(() => (
  <svg 
    width="40" 
    height="30" 
    viewBox="0 0 24 24" 
    fill="none" 
    className="md:absolute md:transform md:transition-all md:duration-300 md:-translate-x-4 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100"
  >
    <path 
      d="M5 12H19M19 12L12 5M19 12L12 19" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
));

Arrow.displayName = 'Arrow';

// Memoized SectionHeading component
const SectionHeading = React.memo(({ title, subtitle, description, headingRef }) => (
  <div className="flex flex-col items-end md:flex-col lg:flex-row md:justify-between md:items-start mb-16 gap-4">
    <h1 
      ref={headingRef} 
      className="text-6xl md:text-8xl font-light overflow-hidden"
    >
      {title}
      {subtitle}
      <span className=""><sup>(06)</sup></span>
    </h1>
    <p className="w-full text-[#7A7875] md:max-w-xs text-sm">{description}</p>
  </div>
));

SectionHeading.displayName = 'SectionHeading';

const FeaturedWork = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Set up intersection observer for better performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Only run GSAP animations when section is visible
  useEffect(() => {
    if (!isVisible) return;
    
    // Split text animation with reduced complexity
    const text = new SplitType(headingRef.current, {
      types: 'chars',
      tagName: 'span'
    });

    // Simplified heading animation
    gsap.from(text.chars, {
      opacity: 0,
      y: 50, // Reduced travel distance
      stagger: 0.01, // Reduced stagger time
      duration: 0.8, // Faster animation
      ease: "power3.out", // Simpler easing
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        once: true, // Run only once
      }
    });

    // More efficient grid items animation
    const gridItems = sectionRef.current.querySelectorAll('.grid_item');
    gsap.set(gridItems, { opacity: 0, y: 20 }); // Reduced initial offset

    gsap.to(gridItems, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1, // Reduced stagger time
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        scrub: 1, // Smooth scrubbing effect
        ease: 'power2.out',
      },
    });

    // Cleanup
    return () => {
      if (text && text.revert) text.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isVisible]);

  return (
    <section className="min-h-screen about-section py-2 bg-[#0C0C0B] z-[100]" ref={sectionRef}>
      <div className="max-w-[95%] mx-auto px-4 pt-1 md:px-6">
        <SectionHeading 
          title="Featured "
          subtitle="Work /"
          description="A SELECTION OF OUR MOST PASSIONATELY CRAFTED WORKS WITH FORWARD-THINKING CLIENTS AND FRIENDS OVER THE YEARS."
          headingRef={headingRef}
        />
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
          {WORKS.map(work => (
            <ProjectCard key={work.id} {...work} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = React.memo(({ title, categories, image, centerImage, slug }) => {
  const imageRef = useRef(null);
  const categoriesRef = useRef([]);
  const [isInView, setIsInView] = useState(false);

  // Optimized mouse event handlers with useCallback
  const handleMouseEnter = useCallback(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.05, // Reduced scale amount
        duration: 0.2, // Faster animation
        ease: "power1.out" // Simpler easing
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power1.out"
      });
    }
  }, []);

  // Use intersection observer for category text effects
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );
    
    const cardElement = categoriesRef.current[0]?.parentElement?.parentElement;
    if (cardElement) {
      observer.observe(cardElement);
    }
    
    return () => observer.disconnect();
  }, [isInView]);

  // Optimized category text scramble effect
  useEffect(() => {
    if (!isInView) return;
    
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let intervals = [];
    
    categoriesRef.current.forEach((categoryElement, index) => {
      if (!categoryElement) return;

      const originalText = categoryElement.dataset.value;
      let iteration = 0;
      
      const interval = setInterval(() => {
        categoryElement.innerText = originalText
          .split("")
          .map((letter, idx) => {
            if (idx < iteration) {
              return originalText[idx];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if (iteration >= originalText.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 2; // Faster iterations
      }, 50); // Longer interval for better performance
      
      intervals.push(interval);
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [categories, isInView]);

  return (
    <a 
      href={slug}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden grid_item"
    >
      <div className="aspect-[4/3] rounded-3xl relative overflow-hidden">
        <DistortionImage
          ref={imageRef}
          src={image}
          alt={title}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full"
        />
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <Image
            src={centerImage}
            width={500}
            height={500}
            alt={`${title} Center Image`}
            className="w-1/2 h-auto scale-140 rounded-lg"
            priority={false}
            loading="lazy"
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {categories.map((category, index) => (
            <span 
              key={category} 
              className="text-sm" 
              data-value={category} 
              ref={el => categoriesRef.current[index] = el}
            >
              {category}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Arrow />
          <h2 className="text-2xl md:text-4xl font-light tracking-tight md:transform md:transition-transform md:duration-300 md:group-hover:translate-x-12">
            {title}
          </h2>
        </div>
      </div>
    </a>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default FeaturedWork;