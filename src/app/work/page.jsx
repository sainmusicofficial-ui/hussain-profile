import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Projects2 from "@/components/Projects2";
import CTASection from "@/components/CTASection";

export default function Page() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <Navbar />
      <Projects2 />
      <CTASection />
      <Footer />
    </main>
  );
}