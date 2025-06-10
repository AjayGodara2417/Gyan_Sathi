// components/HeroSection.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-[90%] mx-auto h-96 sm:h-96 rounded-2xl overflow-hidden">
      {/* Background image */}
      <Image
        src="/testimonial.png" // <-- Replace with actual path like /public/images/hero-plant.png
        alt="Study Plant"
        layout="fill"
        objectFit="cover"
        className="opacity-80"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center ">
        <h1 className="text-white text-2xl sm:text-4xl font-extrabold mb-2">
          Your Study Journey Starts Here
        </h1>
        <p className="text-white text-sm sm:text-base mb-4 max-w-xl">
          Access a wealth of study resources, connect with peers, and enhance your learning experience.
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-full transition">
          <Link rel="stylesheet" href="/notes">Get Started</Link>
        </button>
      </div>
    </section>
  );
}
