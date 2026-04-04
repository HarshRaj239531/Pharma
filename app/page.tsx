import Hero from "@/src/components/sections/Hero";
import Features from "@/src/components/sections/FeatureCard";
import Stats from "@/src/components/sections/Stats";
import CTA from "@/src/components/sections/CTA";
import Navbar from "@/src/components/Layout/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <CTA />
    </div>
  );
}