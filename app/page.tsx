"use client";

import { Hero } from "@/components/ui/animated-hero";
import { TechStackMarquee } from "@/components/TechStackMarquee";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { AIWorkflow } from "@/components/AIWorkflow";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <TechStackMarquee />
      <FeaturedProjects />
      <AIWorkflow />
      <Footer />
    </main>
  );
}
