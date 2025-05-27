import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
   <section className="flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-10 py-20 gap-10">
   <div className="md:w-1/2">
     <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-fade-in">
       Unlock Your Academic Potential with Our Collaborative Student Platform
     </h1>
     <p className="mb-6 text-gray-300 text-sm sm:text-base transition-opacity duration-700">
       Join a vibrant community to share notes, ask questions, and enhance your learning experience.
     </p>
     <div className="space-x-4">
       <Link
         href="#"
         className="bg-orange-400 text-black px-6 py-3 rounded-full font-semibold transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-lg"
       >
         Join
       </Link>
       <Link
         href="#"
         className="border border-gray-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:text-orange-400 hover:border-orange-400"
       >
         Learn More
       </Link>
     </div>
   </div>
   <div className="md:w-1/2 flex justify-center md:justify-end">
     <Image
       className="rounded-xl transition-all duration-300 hover:brightness-110 hover:scale-[1.01]"
       src="/group.jpg"
       width={700}
       height={350}
       alt="Student discussion"
     />
   </div>
 </section>
  )
}

export default Hero