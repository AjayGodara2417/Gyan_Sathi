'use client';

// import Banner from "@/components/Banner";
import ChannelDisplay from "@/components/ChannelDisplay";
import Feature from "@/components/Feature";
// import FeatureNotes from "@/components/FeatureNotes";
import Footer from "@/components/Footer";
// import Hero from "@/components/Hero";
import HeroSection from "@/components/HeroSection";
import Join from "@/components/Join";
// import JoinBanner from "@/components/JoinBanner";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <div className="space-y-12">
      <h2 className="text-right font-bold text-3xl pr-12 pt-6">Gyan Sathi</h2>
      {/* Hero Section */}
      {/* <Hero /> */}
      <HeroSection />

      {/* Features Section */}
      <Feature />

      {/* Channels */}
      <ChannelDisplay />

      {/* CTA Section */}

      {/* <FeatureNotes /> */}

      {/* Banner Feature  */}
      {/* <Banner /> */}

      {/* Testimonials */}
      <Testimonial />

      {/* Join CTA */}
      <Join />
      {/* <JoinBanner /> */}

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
