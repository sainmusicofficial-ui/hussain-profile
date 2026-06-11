import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact2 from "@/components/Contact2";

export default function Page() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <Navbar />
      <Contact2 />
      <Footer />
    </main>
  );
}