"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import ParticleField from "@/components/ParticleField";

export default function CTASection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth <= 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      data-scroll-section="cta"
      style={{
        position: "relative",
        padding: isMobile ? "80px 24px" : isTablet ? "100px 40px" : `clamp(80px, 10vw, 140px) clamp(24px, 4vw, 60px)`,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
    >
      {!isMobile && (
        <div style={{ position: "absolute", inset: 0, opacity: 0.5, zIndex: 0 }}>
          <ParticleField />
        </div>
      )}

      <div style={{ position: "relative", zIndex: 1 }}>
        <p
          style={{
            fontFamily: "var(--font-geist-mono)",
            color: "#D7FF00",
            fontSize: "12px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          Got A Project?
        </p>

        <h2
          style={{
            fontSize: isMobile ? "clamp(36px, 10vw, 56px)" : isTablet ? "clamp(48px, 8vw, 72px)" : "clamp(56px, 7vw, 120px)",
            lineHeight: "0.95",
            fontWeight: "700",
            letterSpacing: "-0.05em",
            color: "white",
            maxWidth: "1100px",
            margin: 0,
          }}
        >
          Let's build your next{" "}
          <span style={{ color: "#D7FF00" }}>
            big brand
          </span>
        </h2>

        <p
          style={{
            marginTop: isMobile ? "24px" : "32px",
            maxWidth: "650px",
            color: "#8A8A8A",
            fontSize: isMobile ? "16px" : "clamp(16px, 1.3vw, 18px)",
            lineHeight: "1.8",
          }}
        >
          Whether you're launching a startup, refreshing your identity,
          or building a digital product, let's create something memorable.
        </p>

        <Link href="/contact" style={{ textDecoration: "none" }}>
        <button
          style={{
            marginTop: isMobile ? "32px" : "48px",
            height: isMobile ? "52px" : "64px",
            padding: isMobile ? "0 28px" : "0 36px",
            borderRadius: "999px",
            border: "none",
            backgroundColor: "#D7FF00",
            color: "#000",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontFamily: "var(--font-geist-mono)",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 0 30px rgba(215,255,0,0.35)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}
        >
          Let's Talk ↗
        </button>
        </Link>
      </div>
    </section>
  );
}