import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Lab from "@/components/Lab";
import CursorGlow from "@/components/CursorGlow";

export default function Page() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <CursorGlow />
      <Navbar />
      <Lab />
      <CTASection />
      <Footer />
    </main>
  );
}