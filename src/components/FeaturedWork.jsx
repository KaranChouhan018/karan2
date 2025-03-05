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
    title: 'Synthetic Human',
    categories: ['WEB', 'DESIGN', 'DEVELOPMENT', '3D'],
    image: '/images/floating_1.jpg',
    slug: 'synthetic-human'
  },
  {
    id: 2,
    title: 'Porsche: Dream Machine',
    categories: ['CONCEPT', '3D ILLUSTRATION', 'MOGRAPH', 'VIDEO'],
    image: '/images/floating_2.jpg',
    slug: 'porsche-dream-machine'
  },
  {
    id: 3,
    title: 'Synthetic Human',
    categories: ['WEB', 'DESIGN', 'DEVELOPMENT', '3D'],
    image: '/images/floating_3.jpg',
    slug: 'synthetic-human'
  },
  {
    id: 4,
    title: 'Porsche: Dream Machine',
    categories: ['CONCEPT', '3D ILLUSTRATION', 'MOGRAPH', 'VIDEO'],
    image: '/images/floating_4.jpg',
    slug: 'porsche-dream-machine'
  },
  {
    id: 5,
    title: 'Synthetic Human',
    categories: ['WEB', 'DESIGN', 'DEVELOPMENT', '3D'],
    image: '/images/floating_5.jpg',
    slug: 'synthetic-human'
  },
  {
    id: 6,
    title: 'Porsche: Dream Machine',
    categories: ['CONCEPT', '3D ILLUSTRATION', 'MOGRAPH', 'VIDEO'],
    image: '/images/floating_6.jpg',
    slug: 'porsche-dream-machine'
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
    <section className="min-h-screen z-[10000] p-4 md:p-8" ref={sectionRef}>
      <div className="max-w-[95%] mx-auto">
        <SectionHeading 
          title="Featured Work / "
          description="A SELECTION OF OUR MOST PASSIONATELY CRAFTED WORKS WITH FORWARD-THINKING CLIENTS AND FRIENDS OVER THE YEARS."
          headingRef={headingRef}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {WORKS.map(work => (
            <ProjectCard key={work.id} {...work} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = React.memo(({ title, categories, image, slug }) => {
  const imageRef = useRef(null);

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

  return (
    <Link href={`/projects/${slug}`} className="group block overflow-hidden grid_item">
      <div 
        
        className="aspect-[4/3] rounded-3xl relative overflow-hidden"
    
      >
        <DistortionImage
         ref={imageRef}
        
          src={image}
          alt={title}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full"
        />
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {categories.map((category, index) => (
            <span key={category} className="text-sm text-white">
              {category}{index < categories.length - 1 && ' • '}
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
    </Link>
  );
});

ProjectCard.displayName = 'ProjectCard';

const SectionHeading = ({ title, description, headingRef }) => (
  <div className="flex flex-col items-end md:flex-row md:justify-between md:items-start mb-16 gap-4">
    <h1 
      ref={headingRef} 
      className="text-6xl md:text-8xl font-light overflow-hidden"
    >
      {title}
    </h1>
    <p className="w-full  text-[#7A7875] md:max-w-xs text-sm ">{description}</p>
  </div>
);

export default FeaturedWork;
