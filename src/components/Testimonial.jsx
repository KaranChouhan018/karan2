

import React, { useState } from "react";
import Image from "next/image";

// Testimonial data
const testimonials = [
  {
    id: 1,
    quote: '"Karan is phenomenal. <br /> An absolute pleasure to work with!"',
    name: "Pieter Pattyn",
    role: "Founder's Associate",
    company: "Thorny",
    tags: ["WEB DESIGN", "WEB DEVELOPMENT", "SEO"],
    imageSrc: "/image1.jpg",
    imageAlt:
      "Smiling man with black t-shirt against a backdrop with a repeating 'V' pattern",
  },
  {
    id: 2,
    quote:
      '"Working with Karan was a game-changing <br />  experience for our project."',
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechInnovate",
    tags: ["UI/UX", "BRANDING", "PRODUCT STRATEGY"],
    imageSrc: "/image2.jpg",
    imageAlt: "Sarah Johnson in a professional setting",
  }
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="relative w-full">
      <div className="py-16 max-w-[95%] mx-auto">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold overflow-hidden w-full text-black mb-8">
          DON'T TAKE MY WORD FOR IT /
        </h1>

        <div className="flex flex-col md:flex-row w-full md:w-[50%] md:mx-auto sm:gap-2 gap-8 mt-12">
          <div className="w-full md:w-1/3">
            <div className="inline-block text-[#7A7875] mb-4">
              ( Testimonials )
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-md overflow-hidden text-[#7A7875] md:text-md lg:text-xl w-full md:max-w-md">
              Here's what my clients express regarding our collaboration. Their
              satisfaction and meeting expectations are my foremost priorities,
              guaranteeing the optimal experience possible.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-[#7A7875] border-opacity-40 max-w-[95%] mx-auto"></div>

      <div className="min-h-screen flex items-start justify-between hidden  md:block ">
        <div className="max-w-[95%] mx-auto mt-[6%] grid md:grid-cols-1   lg:grid-cols-2 gap-8">
          {/* Left Section - Testimonial */}
          <div className="flex flex-col order-2 items-start">
            <h1 className="text-4xl font-bold text-black leading-tight">
              {current.quote.split("<br />").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < current.quote.split("<br />").length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
            <p className="mt-6 text-[#6A645C] ">
              <span className="font-medium text-black">{current.name}</span>{" "}
              <br />
              {current.role} @{current.company}
            </p>

            {/* Tags */}
            <div className="mt-4 flex gap-2">
              {current.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs border border-[#7A7875] rounded-full text-[#6A645C] "
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="relative w-full h-[70vh] lg:h-[90vh] md:order-1 lg:order-2 rounded-md overflow-hidden">
            <Image
              src={current.imageSrc}
              alt={current.imageAlt}
              width={1080}
              height={1980}
              className="rounded-md grayscale-100" 
            />
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-[6%] flex items-center justify-between w-[50%] px-16 text-[#7A7875] lg:opacity-100 md:opacity-0 opacity-0  ">
          <div className="text-sm">
            {currentTestimonial + 1} <span className="mx-2">——</span>{" "}
            {testimonials.length}
          </div>
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-[#3A3733] text-white rounded-3xl"
            >
              PREV
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-[#3A3733] text-white rounded-3xl"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between gap-3  text-[#7A7875]  p-6 rounded-lg w-full max-w-md mx-auto  md:hidden">
        <div className="text-5xl text-black">01</div>

        <div className="place-items-start">
          {/* Image */}
          <Image
            src="/image1.jpg"
            alt="Portrait of Pieter Pattyn smiling in front of a patterned background"
            width={300}
            height={250}
            className="rounded-lg grayscale-100"
          />

          {/* Testimonial Text */}
          <p className="mt-6 text-xl  text-[#6A645C]  font-semibold leading-snug">
            "Huy is phenomenal. An absolute <br /> pleasure to work with!"
          </p>

          {/* Name & Role */}
          <div className="mt-4 items-start">
            <p className="text-lg font-semibold">Pieter Pattyn</p>
            <p className="text-sm text-textLight">
              <span className="font-semibold">Founder’s Associate</span> @Volup
            </p>
          </div>

          {/* Tags */}
          <div className="flex space-x-2 mt-4">
            {["UI/UX", "WEB DEVELOPMENT", "SEO"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 border border-[#7A7875]  text-xs font-semibold rounded-xl"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-3  text-[#7A7875]  p-6 rounded-lg w-full max-w-md mx-auto  mb-20 md:hidden">
        <div className="text-5xl text-black">02</div>

        <div className="place-items-start">
          {/* Image */}
          <Image
            src="/image2.jpg"
            alt="Portrait of Pieter Pattyn smiling in front of a patterned background"
            width={300}
            height={250}
            className="rounded-lg grayscale-100"
          />

          {/* Testimonial Text */}
          <p className="mt-6 text-xl font-semibold  text-[#6A645C]  leading-snug">
            "Huy is phenomenal. An absolute pleasure to work with!"
          </p>

          {/* Name & Role */}
          <div className="mt-4 items-start">
            <p className="text-lg font-semibold">Pieter Pattyn</p>
            <p className="text-sm text-textLight">
              <span className="font-semibold">Founder’s Associate</span> @Volup
            </p>
          </div>

          {/* Tags */}
          <div className="flex space-x-2 mt-4">
            {["WEB DESIGN", "WEB DEVELOPMENT"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs border border-[#7A7875] font-semibold rounded-xl"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
