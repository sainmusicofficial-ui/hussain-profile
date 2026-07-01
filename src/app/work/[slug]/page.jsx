"use client";

import { caseStudies } from "@/data/caseStudies";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowLeft, Clock, Layers } from "lucide-react";

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug;
  const project = caseStudies.find((p) => p.slug === slug);

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isSmall = isMobile || isTablet;
  const px = isMobile ? "20px" : isTablet ? "32px" : "90px";
  const sectionPy = isMobile ? "60px" : isTablet ? "80px" : "120px";

  if (!project) {
    return <div className="text-white p-20">Project not found</div>;
  }

  const heroImage = `/images/projects/${slug}1.png`;
  const galleryImages = [2, 3, 4].map((n) => `/images/projects/${slug}${n}.png`);

  return (
    <>
      <Navbar />

      <main className="bg-[#0e0e0e] text-white">

        {/* ── HERO HEADER ─────────────────────────────────────── */}
        <section
          className="relative overflow-hidden"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(0,240,255,.08), transparent 35%), #050505",
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')", mixBlendMode: "overlay" }}
          />

          <div
            className="relative z-10 max-w-[1800px] mx-auto"
            style={{
              paddingLeft: px,
              paddingRight: px,
              paddingTop: isMobile ? "100px" : "140px",
              paddingBottom: isMobile ? "48px" : "80px",
            }}
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-3 text-[#7A7A7A] text-[14px] font-mono transition-all duration-300 hover:text-[#D7FF00]"
            >
              <ArrowLeft size={14} />
              Back to Projects
            </Link>

            <div style={{ marginTop: isMobile ? "40px" : "80px" }}>
              <p className="font-mono uppercase tracking-[3px] text-[12px]" style={{ color: "#D7FF00" }}>
                {project.category}
              </p>
            </div>

            <h1
              className="font-bold leading-[0.9]"
              style={{
                fontSize: isMobile ? "clamp(40px, 10vw, 60px)" : isTablet ? "clamp(56px, 8vw, 80px)" : "clamp(80px, 8vw, 130px)",
                marginTop: isMobile ? "16px" : "24px",
              }}
            >
              {project.title}
            </h1>

            <div className="flex items-center flex-wrap gap-6" style={{ marginTop: isMobile ? "24px" : "40px" }}>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#6A6A6A]" />
                <span className="font-mono text-[#8A8A8A] text-[14px]">{project.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-[#6A6A6A]" />
                <span className="font-mono text-[#8A8A8A] text-[14px]">{project.services?.join(" · ")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── HERO IMAGE — full natural height, no cropping ───── */}
        <section style={{ padding: isMobile ? "24px 20px" : isTablet ? "32px" : "40px 60px" }}>
          <div
            style={{
              borderRadius: isMobile ? "16px" : "24px",
              overflow: "hidden",
              position: "relative",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "#081010",
              width: "100%",
            }}
          >
            <Image
              src={heroImage}
              alt={project.title}
              width={1600}
              height={900}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
              onError={(e) => {
                e.target.parentElement.style.minHeight = "400px";
                e.target.style.display = "none";
              }}
            />
          </div>
        </section>

        {/* ── OVERVIEW ────────────────────────────────────────── */}
        <section style={{
          padding: `${sectionPy} ${px}`,
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          marginTop: isMobile ? "24px" : "40px",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isSmall ? "1fr" : "1.7fr 0.8fr",
            gap: isSmall ? "40px" : "80px",
            alignItems: "start",
          }}>
            <div>
              <p style={{ color: "#D7FF00", fontFamily: "monospace", fontSize: "13px", letterSpacing: "2px", marginBottom: "32px" }}>
                // OVERVIEW
              </p>
              <p style={{ fontSize: isMobile ? "18px" : isTablet ? "20px" : "24px", lineHeight: "1.6", color: "#F5F5F5" }}>
                {project.description}
              </p>
            </div>

            <div style={{
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "20px", padding: "24px",
              background: "rgba(255,255,255,0.01)",
              backdropFilter: "blur(10px)",
            }}>
              <p style={{ color: "#00F0FF", fontFamily: "monospace", fontSize: "13px", letterSpacing: "2px", marginBottom: "20px" }}>
                // TECH STACK
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {project.techStack?.map((tech) => (
                  <span key={tech} style={{
                    padding: "10px 16px", borderRadius: "12px",
                    background: "rgba(255,255,255,0.06)",
                    color: "#BDBDBD", fontFamily: "monospace",
                    fontSize: isMobile ? "13px" : "14px",
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CHALLENGE & SOLUTION ────────────────────────────── */}
        <section style={{ padding: `${sectionPy} ${px}`, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isSmall ? "1fr" : "1fr 1fr",
            gap: isSmall ? "48px" : "80px",
          }}>
            <div>
              <p style={{ color: "#00F0FF", fontFamily: "monospace", fontSize: "13px", letterSpacing: "2px", marginBottom: "32px" }}>
                // THE CHALLENGE
              </p>
              <p style={{ fontSize: isMobile ? "17px" : "20px", lineHeight: "1.7", color: "#F5F5F5" }}>
                {project.challenge}
              </p>
            </div>
            <div>
              <p style={{ color: "#D7FF00", fontFamily: "monospace", fontSize: "13px", letterSpacing: "2px", marginBottom: "32px" }}>
                // THE SOLUTION
              </p>
              <p style={{ fontSize: isMobile ? "17px" : "20px", lineHeight: "1.7", color: "#F5F5F5" }}>
                {project.solution}
              </p>
            </div>
          </div>
        </section>

        {/* ── IMAGE GALLERY — natural height, no cropping ─────── */}
        <section style={{ padding: `${sectionPy} ${px}`, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ color: "#D7FF00", fontFamily: "monospace", fontSize: "13px", letterSpacing: "2px", marginBottom: "16px" }}>
            // PROJECT GALLERY
          </p>
          <h2 style={{ fontSize: isMobile ? "32px" : isTablet ? "44px" : "56px", fontWeight: 700, marginBottom: isMobile ? "32px" : "48px" }}>
            Visual Work
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "16px" : "24px" }}>
            {/* First image — full width */}
            <div style={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(255,255,255,0.02)",
            }}>
              <Image
                src={galleryImages[0]}
                alt={`${project.title} — Gallery 1`}
                width={1600}
                height={900}
                style={{ width: "100%", height: "auto", display: "block" }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>

            {/* Images 2 and 3 — side by side on desktop */}
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "16px" : "24px",
            }}>
              {[galleryImages[1], galleryImages[2]].map((src, i) => (
                <div key={i} style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.05)",
                  background: "rgba(255,255,255,0.02)",
                }}>
                  <Image
                    src={src}
                    alt={`${project.title} — Gallery ${i + 2}`}
                    width={800}
                    height={600}
                    style={{ width: "100%", height: "auto", display: "block" }}
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COLOR PALETTE ───────────────────────────────────── */}
        <section style={{ padding: `${sectionPy} ${px}`, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ color: "#D7FF00", fontFamily: "monospace", fontSize: "13px", letterSpacing: "2px", marginBottom: "16px" }}>
            // COLOR SYSTEM
          </p>
          <h2 style={{ fontSize: isMobile ? "32px" : isTablet ? "44px" : "56px", fontWeight: 700, marginBottom: isMobile ? "32px" : "56px" }}>
            Color Palette
          </h2>
          <div style={{ display: "flex", gap: isMobile ? "12px" : "18px", flexWrap: "wrap" }}>
            {project.colors?.map((color) => (
              <div key={color}>
                <div style={{
                  width: isMobile ? "72px" : "100px",
                  height: isMobile ? "72px" : "100px",
                  borderRadius: "14px",
                  background: color,
                  border: "1px solid rgba(255,255,255,.05)",
                }} />
                <p style={{ marginTop: "10px", color: "#7A7A7A", fontFamily: "monospace", fontSize: isMobile ? "11px" : "13px" }}>
                  {color}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TYPOGRAPHY ──────────────────────────────────────── */}
        <section style={{ padding: `${sectionPy} ${px}`, borderBottom: "1px solid rgba(255,255,255,.05)" }}>
          <p style={{ color: "#00F0FF", fontFamily: "monospace", fontSize: "13px", letterSpacing: "2px", marginBottom: "16px" }}>
            // TYPOGRAPHY
          </p>
          <h2 style={{ fontSize: isMobile ? "32px" : isTablet ? "44px" : "56px", fontWeight: 700, marginBottom: isMobile ? "32px" : "48px" }}>
            Type System
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: isSmall ? "1fr" : "1fr 1fr",
            gap: "24px",
          }}>
            {project.typography?.map((font) => (
              <div key={font.name} style={{
                padding: isMobile ? "24px" : "36px",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,.05)",
                background: "rgba(255,255,255,.01)",
              }}>
                <p style={{ color: "#7A7A7A", fontFamily: "monospace", marginBottom: "16px", fontSize: "13px" }}>
                  {font.name}
                </p>
                <h3 style={{ fontSize: isMobile ? "40px" : "60px", fontWeight: 700, marginBottom: "16px" }}>
                  {font.sample}
                </h3>
                <p style={{ color: "#6A6A6A", fontSize: isMobile ? "13px" : "15px", lineHeight: "1.8" }}>
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                  abcdefghijklmnopqrstuvwxyz<br />
                  0123456789
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── HIGHLIGHTS ──────────────────────────────────────── */}
        <section style={{ padding: `${sectionPy} ${px}`, borderBottom: "1px solid rgba(255,255,255,.05)" }}>
          <p style={{ color: "#D7FF00", fontFamily: "monospace", fontSize: "13px", letterSpacing: "2px", marginBottom: "16px" }}>
            // HIGHLIGHTS
          </p>
          <h2 style={{ fontSize: isMobile ? "32px" : isTablet ? "44px" : "56px", fontWeight: 700, marginBottom: isMobile ? "32px" : "48px" }}>
            Project Highlights
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: isMobile ? "12px" : "20px",
          }}>
            {project.highlights?.map((item, index) => (
              <div key={index} style={{
                padding: isMobile ? "24px 16px" : "36px",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,.05)",
                background: "rgba(255,255,255,.01)",
                minHeight: isMobile ? "120px" : "160px",
                display: "flex", alignItems: "center", justifyContent: "center",
                textAlign: "center",
              }}>
                <h3 style={{ fontSize: isMobile ? "16px" : "20px", fontWeight: 600, lineHeight: "1.4", color: "#D7FF00" }}>
                  {item}
                </h3>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: isMobile ? "60px" : "100px" }}>
            <p style={{ color: "#7A7A7A", fontFamily: "monospace", marginBottom: "20px", fontSize: "14px" }}>
              Want to see more?
            </p>
            <Link href="/work">
              <button style={{
                background: "#D7FF00", color: "#000",
                padding: isMobile ? "14px 28px" : "18px 40px",
                borderRadius: "999px", fontWeight: 600,
                fontSize: isMobile ? "14px" : "16px",
                border: "none", cursor: "pointer",
              }}>
                View All Projects ↗
              </button>
            </Link>
          </div>
        </section>

      </main>

      <CTASection />
      <Footer />
    </>
  );
}