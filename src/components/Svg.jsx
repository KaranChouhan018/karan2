

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Svg() {
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;

    // Get the total length of the path
    const pathLength = path.getTotalLength();

    // Set up initial state - make path invisible
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Create the animation
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: svgRef.current,
        start: "top center", // Animation starts when top of SVG hits center of viewport
        end: "bottom center",
        scrub: 1, // Smooth scrubbing effect
        markers: false, // Set to true for debugging
      },
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={svgRef} className="w-full">
            <svg
        width="1920"
        height="1120"
        viewBox="0 0 1920 1120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <path
        ref={pathRef}
          d="M-51 272.194C33.9097 129.272 276.886 -104.976 569.512 101.408C935.294 359.389 747.891 826.348 668.072 977.678C588.252 1129.01 328.664 1075.68 398.073 897.689C453.6 755.296 737.712 674.058 872.827 651.239C1072.72 608.242 1449.06 597.336 1355.22 897.689C1261.38 1198.04 1498.89 1098.74 1629.38 1011.55C1725.39 953.417 1920.34 854.597 1932 924.352"
          stroke="#E3242B"
          strokeWidth="25"

          strokeLinecap="round"
       
        />
      </svg>
    </div>
  );
}
