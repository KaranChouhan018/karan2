import Image from "next/image";
export default function Testimonial() {
  return (
    <section className="relative  w-full">
      <div className="py-16 max-w-[93%] mx-auto">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold overflow-hidden w-full text-black mb-8">
          DON'T TAKE MY WORD FOR IT /
        </h1>

        <div className="flex flex-col  md:flex-row w-full md:w-[50%] md:mx-auto sm:gap-2 gap-8 mt-12">
          <div className="w-full md:w-1/3">
            <div className="inline-block text-[#7A7875]  mb-4">
              ( Testimonials )
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <p className=" text-md overflow-hidden text-[#7A7875] md:text-xl w-full md:max-w-md">
              Here’s what my clients express regarding our collaboration. Their
              satisfaction and meeting expectations are my foremost priorities,
              guaranteeing the optimal experience possible.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-[#7A7875] border-opacity-40 max-w-[95%] mx-auto "></div>
      <div className="flex flex-row justify-between  text-center  p-6 rounded-lg w-full max-w-md mx-auto ">
    
    <div className="text-5xl text-black">
        01
    </div>

<div className="place-items-center" >
      {/* Image */}
        <Image
          src="/images/floating_3.jpg" 
          alt="Portrait of Pieter Pattyn smiling in front of a patterned background"
          width={300}
          height={250}
          className="rounded-lg"
        />
      

      {/* Testimonial Text */}
      <p className="mt-6 text-xl font-semibold leading-snug">
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
        {["WEB DESIGN", "WEB DEVELOPMENT", "SEO"].map((tag) => (
          <span key={tag} className="px-3 py-1 text-xs font-semibold rounded-md">
            {tag}
          </span>
        ))}
      </div>
</div>

    </div>
      <div className="flex flex-row justify-between gap-8  p-6 rounded-lg w-full max-w-md mx-auto  mb-20">
    
    <div className="text-5xl text-black">
        02
    </div>

<div className="place-items-start" >
      {/* Image */}
        <Image
          src="/images/floating_4.jpg" 
          alt="Portrait of Pieter Pattyn smiling in front of a patterned background"
          width={300}
          height={250}
          className="rounded-lg"
        />
      

      {/* Testimonial Text */}
      <p className="mt-6 text-xl font-semibold  text-[#6A645C]  leading-snug">
        "Huy is phenomenal. An absolute  pleasure to work with!"
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
        {["WEB DESIGN", "WEB DEVELOPMENT", "SEO"].map((tag) => (
          <span key={tag} className="bg-gray-200 px-3 py-1 text-xs font-semibold rounded-md">
            {tag}
          </span>
        ))}
      </div>
</div>

    </div>
    </section>
  );
}
