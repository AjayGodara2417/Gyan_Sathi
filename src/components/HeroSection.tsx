import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-[90%] mx-auto h-fit sm:h-96 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      {/* Background image */}
      <Image
        src="/gpt2.png"
        alt="Study Plant"
        layout="fill"
        objectFit="cover"
        className="opacity-85 transition-opacity duration-500 hover:opacity-100"
        priority
      />

      {/* Overlay */}
      <div className="absolute text-white inset-0 flex flex-col items-center justify-center text-center ">
        <h1 className="text-2xl sm:text-4xl font-extrabold mb-2">
          Your Study Journey Starts Here
        </h1>
        <p className="text-sm sm:text-base mb-4 max-w-xl">
          Access a wealth of study resources, connect with peers, and enhance your learning experience.
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-full transition">
          <Link rel="stylesheet" href="/notes">Get Started</Link>
        </button>
      </div>
    </section>
  );
}
