"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CodePanel from "@/components/CodePanel";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <main
      className="bg-[#050505] min-h-screen"
      style={{ overflowX: "hidden" }}
    >
      <Preloader />
      <CursorGlow />
      <Navbar />

      {/* Hero + CodePanel — CodePanel is absolute on desktop, hidden on mobile/tablet */}
      <div style={{ position: "relative" }}>
        <Hero />
        <div style={{ position: "absolute", top: "320px", right: "120px" }}>
          <CodePanel />
        </div>
      </div>

      <Projects />
      <Services />
      <TechStack />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}