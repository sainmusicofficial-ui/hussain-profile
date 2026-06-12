"use client";
import { useEffect, useState, useRef } from "react";

// ─── Scroll Animation ─────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useFadeIn();
  const translateMap = {
    up: "translateY(32px)",
    left: "translateX(-32px)",
    right: "translateX(32px)",
    none: "none",
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0,0)" : translateMap[direction],
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Tools Data ───────────────────────────────────────────────────────────────
const tools = [
  "Figma", "Photoshop", "Illustrator", "Canva", "After Effects",
  "HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind CSS",
  "Framer Motion", "Git", "GitHub", "VS Code",
  "WordPress", "Elementor",
  "Vercel", "Firebase",
  "ChatGPT", "Claude",
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TechStack() {
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

  const isSmall = isMobile || isTablet;

  return (
    <section
      style={{
        padding: isMobile ? "80px 24px" : isTablet ? "100px 40px" : "140px 80px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Label */}
        <FadeIn delay={0}>
          <p
            style={{
              color: "#00E5FF",
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: "600",
              marginBottom: "24px",
              fontFamily: "monospace",
            }}
          >
            // TECH STACK
          </p>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={100}>
          <h2
            style={{
              color: "#fff",
              fontSize: isMobile ? "clamp(32px, 9vw, 48px)" : isTablet ? "48px" : "64px",
              fontWeight: "700",
              letterSpacing: "-0.04em",
              marginBottom: isMobile ? "40px" : "70px",
            }}
          >
            Tools & Technologies
          </h2>
        </FadeIn>

        {/* Tags */}
        <FadeIn delay={200}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: isMobile ? "10px" : "14px",
              maxWidth: "950px",
              margin: "0 auto",
            }}
          >
            {tools.map((tool, i) => (
              <ToolTag key={tool} tool={tool} index={i} isMobile={isMobile} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Tool Tag ─────────────────────────────────────────────────────────────────
function ToolTag({ tool, index, isMobile }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useFadeIn();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 40}ms, transform 0.5s ease ${index * 40}ms, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease`,
        padding: isMobile ? "10px 18px" : "14px 24px",
        borderRadius: "14px",
        border: `1px solid ${hovered ? "#D7FF00" : "rgba(255,255,255,0.08)"}`,
        background: "rgba(255,255,255,0.02)",
        color: hovered ? "#D7FF00" : "#B8B8B8",
        fontSize: isMobile ? "14px" : "18px",
        fontFamily: "var(--font-geist-mono)",
        cursor: "default",
        boxShadow: hovered ? "0 0 30px rgba(215,255,0,0.18)" : "none",
      }}
    >
      {tool}
    </div>
  );
}