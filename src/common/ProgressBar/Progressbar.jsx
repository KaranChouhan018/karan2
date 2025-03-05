"use client";

import { useCallback, useEffect, useState, forwardRef } from "react";

export const Progressbar = forwardRef(({ target }, ref) => {
  const [readingProgress, setReadingProgress] = useState(0);

  const scrollListener = useCallback(() => {
    if (!ref || !ref.current) {
      return;
    }

    const element = ref.current;
    const totalHeight =
      element.clientHeight - element.offsetTop - window.innerHeight;
    const windowScrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    if (windowScrollTop === 0) {
      return setReadingProgress(0);
    }

    if (windowScrollTop > totalHeight) {
      return setReadingProgress(100);
    }

    setReadingProgress((windowScrollTop / totalHeight) * 100);
  }, [ref]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", scrollListener);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", scrollListener);
      }
    };
  }, [scrollListener]);

  return (
    <div className="h-[300px]z-[500]  bg-[#252525] fixed rounded-full top-[40%] right-14 z-[150] ">
      <div 
        className="w-1 lg:w-2 h-[50px] bg-[#2C8C7D] rounded-full absolute top-0 right-0 transform translate-y-[-50% ]" 
        style={{ top: `${readingProgress}%` }} 
      />
    </div>
  );
});

Progressbar.displayName = 'Progressbar';