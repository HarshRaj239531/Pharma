import Hero from "@/src/components/sections/Hero";
import Features from "@/src/components/sections/FeatureCard";
import Stats from "@/src/components/sections/Stats";
import HowItWorks from "@/src/components/sections/HowItWorks";
import Testimonials from "@/src/components/sections/Testimonials";
import Pricing from "@/src/components/sections/Pricing";
import CTA from "@/src/components/sections/CTA";
import { Navbar } from "@/src/components/Layout/Navbar";
import Footer from "@/src/components/Layout/Footer";
import Topbar from "@/src/components/Layout/Topbar";

export default function Home() {
  return (
    <div className="min-h-screen font-sans">

      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}