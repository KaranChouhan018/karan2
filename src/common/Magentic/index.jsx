import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children }) {
    const magnetic = useRef(null);

    useEffect(() => {
        const currentMagnetic = magnetic.current;

        const xTo = gsap.quickTo(currentMagnetic, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(currentMagnetic, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = currentMagnetic.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x * 0.18);
            yTo(y * 0.18);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        currentMagnetic.addEventListener("mousemove", handleMouseMove);
        currentMagnetic.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            if (currentMagnetic) {
                currentMagnetic.removeEventListener("mousemove", handleMouseMove);
                currentMagnetic.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, []);

    return (
        <div ref={magnetic} style={{ display: 'inline-block' }}>
            {children}
        </div>
    );
}
