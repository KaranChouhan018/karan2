import CtaSection from "@/components/CtaSection";
import FeaturedWork from "@/components/FeaturedWork";
import { ArrowDownRight } from "lucide-react";

export default function Projects() {
    return (

        <section className="  min-h-screen about-section  ">
        <div className="relative flex items-center justify-center w-full max-w-[95%] mx-auto">
          <h1 className="text-6xl md:text-[280px] font-bold tracking-tight text-black uppercase">
            Projects
          </h1>
          <div className="absolute right-0 top-0 flex flex-col items-center">
            <span className="text-lg md:text-2xl font-medium">14</span>
            <ArrowDownRight className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          
        </div>
        <div>
            <FeaturedWork/>
        </div>
      </section>
        
  
    );
}