import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About2 from "@/components/About2";
import CTASection from "@/components/CTASection";

export default function Page() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <Navbar />
      <About2 />
      <CTASection />
      <Footer />
    </main>
  );
}