import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SplitType from "split-type";
import Svg from "./Svg";
import Image from "next/image";

export default function Services() {
  const containerRef = useRef(null);
  const servicesRef = useRef(null);
  const serviceItemsRef = useRef([]);
  const headerTitleRef = useRef(null);
  const headerTextRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);


        // Split text for header elements
        const titleSplit = new SplitType(headerTitleRef.current, {
          types: 'chars,words',
          tagName: 'span'
        });
    
        const textSplit = new SplitType(headerTextRef.current, {
          types: 'lines,words',
          tagName: 'span'
        });
    
        // Header animations timeline
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
          }
        });
    
        // Animate title characters
        headerTl.from(titleSplit.chars, {
          opacity: 0,
          y: 100,
          
          stagger: 0.02,
          duration: 1,
          ease: "power4.out"
        })
        // Animate paragraph words
        .from(textSplit.lines, {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.03,
          ease: "power3.out"
        }, "-=0.5");
    
    // Set initial states
    gsap.set(serviceItemsRef.current.slice(1), {
      yPercent: 100,
      opacity: 1
    });

    // Create main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top 20%",
        end: "+=300%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
      }
    });

    // Add animations for each service item with different yPercent values
    serviceItemsRef.current.forEach((item, index) => {
      if (index === 1) {
        tl.to(item, {
          yPercent: 11,
          opacity: 1,
          duration: 1,
          ease: "none"
        });
      }
      if (index === 2) {
        tl.to(item, {
          yPercent: 18,
          opacity: 1,
          duration: 1,
          ease: "none"
        });
      }

    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      
      <section className="relative mt-[5rem]">
        {/* Header Section - Static */}
        <div className="py-16 max-w-[90%] mx-auto">
          <h1 
          ref={headerTitleRef}
          className="text-6xl md:text-7xl lg:text-8xl font-bold overflow-hidden text-[#D0D0C6] mb-8">
            HOW I CAN HELP YOU /
          </h1>
          
          <div className="flex flex-col  md:flex-row w-full md:w-[50%] md:mx-auto sm:gap-2 gap-8 mt-12">
            <div className="w-full md:w-1/3">
              <div className="inline-block mb-4">( SERVICES )</div>
            </div>
            <div className="w-full md:w-2/3">
              <p
               ref={headerTextRef}
               className=" text-md overflow-hidden text-[#7A7875] md:text-xl w-full md:max-w-md">
                Frustrated with websites that don&apos;t reflect your brand or drive
                growth? I craft premium web experiences that captivate and help
                you focus on growing your business.
              </p>
            </div>
          </div>
        </div>

        {/* Services Section - Pinned with stacking animation */}
        <div ref={servicesRef} className="relative h-screen">
          <div className="border-t border-[#7A7875] border-opacity-40 ">
            {/* Service 1 */}
            <div 
              ref={el => serviceItemsRef.current[0] = el}
              className="service-panel h-[70%] bg-[#0C0C0B] border-t border-[#7A7875] border-opacity-40 absolute inset-0  py-8 px-4  md:px-16 flex flex-col md:flex-row border-b border-[#7A7875] border-opacity-40"
            >
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold">(01)</h2>
              </div>
              <div className="w-full md:w-2/3">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl md:text-3xl text-[#D0D0C6]  font-bold">Web Development</h3>
                  <Image
                    src="/Shape.svg"
                    height={6}
                    width={6}
                    alt="Arrow"
                    className="w-6 h-6 hidden lg:block"
                  />
                </div>
                <p className="text-lg  lg:max-w-[50%]  text-[#7A7875] mb-8">
                  A website developed to captivate and convert can elevate your
                  brand to new heights. My custom-coded sites are meticulously
                  crafted to reflect your unique identity, delivering seamless
                  experiences with a focus on animation —keeping your audience
                  engaged and returning.
                </p>

                <div className="space-y-4 text-xl font-bold">
                  <div className="border-t border-[#7A7875] border-opacity-40 py-4">
                    <div className="flex ">
                      <span className=" text-[#40403B] text-opacity-90 mr-4">01</span>
                      <span className="font-medium">CMS Integration</span>
                    </div>
                  </div>
                  <div className="border-t border-[#7A7875] border-opacity-40 py-4">
                    <div className="flex">
                      <span className=" text-[#40403B] text-opacity-90 mr-4">02</span>
                      <span className="font-medium">Motion & Animations</span>
                    </div>
                  </div>
                  <div className="border-t border-[#7A7875] border-opacity-40 py-4">
                    <div className="flex">
                      <span className=" text-[#40403B] text-opacity-90 mr-4">03</span>
                      <span className="font-medium">3D Development</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div 
              ref={el => serviceItemsRef.current[1] = el}
              className="service-panel h-[70%]  bg-[#0C0C0B] absolute inset-0 py-8 px-4  md:px-16 flex flex-col md:flex-row border-t border-[#7A7875] border-opacity-40"
            >
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold">(02)</h2>
              </div>
              <div className="w-full md:w-2/3">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl md:text-3xl text-[#D0D0C6]  font-bold">UI/UX Design</h3>
                  <Image
                    src="/Shape.svg"
                    height={6}
                    width={6}
                    alt="Arrow"
                    className="w-6 h-6 hidden lg:block"
                  />
                </div>
                <p className="text-lg lg:max-w-[50%]  text-[#7A7875]  mb-8">
                  User experience determines the success of your digital product.
                  I create intuitive interfaces that guide users naturally through
                  your website, increasing conversions while establishing a strong
                  visual identity that resonates with your target audience.
                </p>

                <div className="space-y-4 text-xl font-bold">
                  <div className="border-t border-[#7A7875] border-opacity-40 py-4">
                    <div className="flex">
                      <span className=" text-[#40403B] text-opacity-90 mr-4">01</span>
                      <span className=" font-medium">
                        Wireframing & Prototyping
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-[#7A7875] border-opacity-40 py-4">
                    <div className="flex">
                      <span className=" text-[#40403B] text-opacity-90 mr-4">02</span>
                      <span className=" font-medium">User Research</span>
                    </div>
                  </div>
                  <div className="border-t border-[#7A7875] border-opacity-40 py-4">
                    <div className="flex">
                      <span className=" text-[#40403B] text-opacity-90 mr-4">03</span>
                      <span className=" font-medium">Interface Design</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div 
              ref={el => serviceItemsRef.current[2] = el}
              className="service-panel h-[85%]  bg-[#0C0C0B]  absolute inset-0 py-8 px-4   md:px-16 flex flex-col md:flex-row border-t  border-[#7A7875] border-opacity-40"
            >
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold">(03)</h2>
              </div>
              <div className="w-full md:w-2/3">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl md:text-3xl text-[#D0D0C6]  font-bold">Brand Strategy</h3>
                  <Image
                    src="/Shape.svg"
                    height={6}
                    width={6}
                    alt="Arrow"
                    className="w-6 h-6 hidden lg:block"
                  />
                  
                </div>
                <p className="text-lg  lg:max-w-[50%]  text-[#7A7875] mb-8">
                  A compelling brand strategy sets the foundation for all your marketing efforts.
                  I help you define your unique position in the market, develop a consistent voice
                  and visual language, and create a coherent narrative that connects with your target audience.
                </p>

                <div className="space-y-4 text-xl font-bold">
                  <div className="border-t border-[#7A7875] border-opacity-40 py-4">
                    <div className="flex">
                      <span className=" text-[#7A7875] text-opacity-90 mr-4">01</span>
                      <span className="font-medium">
                        Brand Identity
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-[#7A7875] border-opacity-40 py-4">
                    <div className="flex">
                      <span className=" text-[#7A7875] text-opacity-90 mr-4">02</span>
                      <span className="font-medium">Content Strategy</span>
                    </div>
                  </div>
                  <div className="border-t border-[#7A7875] border-opacity-40 py-4">
                    <div className="flex">
                      <span className=" text-[#7A7875] text-opacity-90 mr-4">03</span>
                      <span className="font-medium">Market Positioning</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}