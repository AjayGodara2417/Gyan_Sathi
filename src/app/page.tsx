'use client';
import Banner from "@/components/Banner";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Join from "@/components/Join";
import JoinBanner from "@/components/JoinBanner";
import Testimonial from "@/components/Testimonial";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-white bg-black font-sans">

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Feature />

      {/* CTA Section */}
      <Join />

      {/* Banner Feature  */}
      <Banner />

      {/* Testimonials */}
      <Testimonial />

      {/* Join CTA */}
      <JoinBanner />

      {/* Footer */}
      <Footer />
    </div>
  );
}
