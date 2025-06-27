'use client';

import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Join from "@/components/Join";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <div className="space-y-12">
      <h2 className="text-right font-bold text-3xl pr-6 md:pr-14 pt-2 md:pt-6">Gyan Sathi</h2>

      <HeroSection />

      <Feature />

      <Testimonial />

      <Join />

      <Footer />
    </div>
  );
}
