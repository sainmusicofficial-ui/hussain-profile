import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Services2 from "@/components/Services2";
import CursorGlow from "@/components/CursorGlow";

export default function Page() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <CursorGlow />
      <Navbar />
      <Services2 />
      <CTASection />
      <Footer />
    </main>
  );
}