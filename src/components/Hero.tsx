import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-4 py-10 gap-10">
      <div className="md:w-1/2 md:pl-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-fade-in">
          Unlock Your Academic Potential with Our Student Platform
        </h1>
        <p className="mb-6 text-gray-300 text-sm sm:text-base transition-opacity duration-700">
          Join a vibrant community to share notes, ask questions, and enhance
          your learning experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6">
          <Link
            href="/notes"
            className="bg-orange-400 border-2 border-orange-400 text-black px-4 sm:px-6 py-2.5 sm:py-3 rounded-md font-semibold text-sm sm:text-base text-center transition-all duration-300 hover:text-white hover:scale-105 hover:bg-orange-500 hover:border-orange-500 shadow active:scale-95"
          >
            Start Uploading
          </Link>
          <Link
            href="/discussion"
            className="border-2 border-orange-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-md font-semibold text-sm sm:text-base text-center transition-all duration-300 hover:scale-105 hover:text-orange-400 hover:border-orange-400 active:scale-95"
          >
            Clear Doubts
          </Link>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center md:justify-end">
        <Image
          className="rounded-xl transition-all duration-300 hover:brightness-110 hover:scale-[1.01]"
          src="/notebook.png"
          width={600}
          height={350}
          alt="Student discussion"
        />
      </div>
    </section>
  );
};

export default Hero;
