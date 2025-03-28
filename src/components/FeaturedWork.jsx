'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SplitType from 'split-type';
import DistortionImage from './DistortionImage';


gsap.registerPlugin(ScrollTrigger);

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

const Arrow = () => (
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
);

const FeaturedWork = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Split text animation
    const text = new SplitType(headingRef.current, {
      types: 'chars,words',
      tagName: 'span'
    });

    // Animate the heading characters
    gsap.from(text.chars, {
      opacity: 0,
      y: 100,
      rotateX: -90,
      stagger: 0.02,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        end: "top 20%",
      }
    });

    // Your existing grid items animation
    const gridItems = sectionRef.current.querySelectorAll('.grid_item');
    gsap.set(gridItems, { opacity: 0, y: 0 });

    gsap.to(gridItems, {
      opacity: 1,
      y: 0,
      z: -100,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1
      },
    });

    // Cleanup
    return () => {
      text.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="min-h-screen about-section py-2 bg-[#0C0C0B] z-[10000] " ref={sectionRef}>
      <div className="max-w-[95%] mx-auto px-4 pt-1 md:px-6">
        <SectionHeading 
          title="Featured Work / "
          description="A SELECTION OF OUR MOST PASSIONATELY CRAFTED WORKS WITH FORWARD-THINKING CLIENTS AND FRIENDS OVER THE YEARS."
          headingRef={headingRef}
        />
        <div className="grid grid-cols-1 md:grid-cols-1  lg:grid-cols-2 gap-8">
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

  const handleMouseEnter = () => {
    gsap.to(imageRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    categoriesRef.current.forEach((categoryElement, index) => {
      if (!categoryElement) return; // Prevent null errors

      const originalText = categoryElement.dataset.value;
      let iteration = 0;
      let interval;

      const scrambleText = () => {
        clearInterval(interval);
        interval = setInterval(() => {
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
          iteration += 1 / 3;
        }, 30);
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            scrambleText();
          }
        });
      }, { threshold: 0.5 });

      observer.observe(categoryElement);

      return () => {
        clearInterval(interval);
        observer.disconnect();
      };
    });
  }, [categories]);

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
              {index < categories.length - 1 && <span className="mx-1">•</span>}
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

const SectionHeading = ({ title, description, headingRef }) => (
  <div className="flex flex-col items-end md:flex-col lg:flex-row md:justify-between md:items-start mb-16 gap-4">
    <h1 
      ref={headingRef} 
      className="text-6xl md:text-8xl font-light overflow-hidden"
    >
      {title}
      <span className=" "><sup>(06)</sup></span>
    </h1>
    <p className="w-full  text-[#7A7875] md:max-w-xs text-sm ">{description}</p>
  </div>
);

export default FeaturedWork;
