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

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <CursorGlow />
      <Navbar />
      <Hero />
      <Projects />
      <Services />
      <TechStack />
      <TestimonialsSection />
      <CTASection />
      <Footer />

      <div className="absolute right-[120px] top-[320px]">
  <CodePanel />
</div>    
    </main>
  );
}