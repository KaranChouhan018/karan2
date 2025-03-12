import CtaSection from "@/components/CtaSection";
import FeaturedWork from "@/components/FeaturedWork";
import { ArrowDownRight } from "lucide-react";

export default function Projects() {
    return (

        <section className="  min-h-screen p-6">
        <div className="relative flex items-center justify-center w-full max-w-5xl">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-black uppercase">
            Projects
          </h1>
          <div className="absolute right-0 bottom-2 flex flex-col items-center">
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