import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CodePanel from "@/components/CodePanel";

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <Navbar />
      <Hero />
      <div className="absolute right-[120px] top-[320px]">
  <CodePanel />
</div>    
    </main>
  );
}