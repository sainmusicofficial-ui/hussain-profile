"use client";
import { useState, useEffect, useRef } from "react";
import {
  Palette, Layout, Globe, Rocket, Smartphone, Megaphone,
  Package, Target, ArrowUpRight, ChevronDown, ChevronUp, Zap
} from "lucide-react";

// ─── Scroll Animation ─────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useFadeIn();
  const translateMap = { up: "translateY(28px)", left: "translateX(-28px)", right: "translateX(28px)", none: "none" };
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

// ─── Responsive Hook ───────────────────────────────────────────────────────────
function useBreakpoint() {
  const [bp, setBp] = useState("desktop");
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 640) setBp("mobile");
      else if (w <= 1024) setBp("tablet");
      else setBp("desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return bp;
}

// ─── Services Data ────────────────────────────────────────────────────────────
const services = [
  {
    icon: Palette, num: "01", title: "Brand Identity", timeline: "3–6 weeks",
    description: "Crafting distinctive visual identities that capture your brand's essence and resonate with your target audience.",
    deliverables: ["Logo System", "Color Palette", "Typography Guide", "Brand Guidelines", "Stationery Design", "Brand Strategy"],
    process: ["Discovery & Research", "Strategy Development", "Visual Exploration", "Design Refinement", "Final Delivery"],
  },
  {
    icon: Layout, num: "02", title: "UI/UX Design", timeline: "4–8 weeks",
    description: "Designing intuitive digital experiences that delight users and drive business results through research-backed decisions.",
    deliverables: ["User Research", "Wireframes", "UI Design", "Prototypes", "Design System", "Usability Testing"],
    process: ["User Research", "Information Architecture", "Wireframing", "Visual Design", "Prototype & Test"],
  },
  {
    icon: Globe, num: "03", title: "Website Design", timeline: "4–10 weeks",
    description: "Building modern, performant websites that convert visitors into customers with stunning visuals and seamless UX.",
    deliverables: ["Website Design", "Responsive Layouts", "CMS Integration", "SEO Optimization", "Performance Audit", "Launch Support"],
    process: ["Strategy & Planning", "Content Architecture", "Design & Prototype", "Development", "Testing & Launch"],
  },
  {
    icon: Rocket, num: "04", title: "Startup MVP Design", timeline: "2–6 weeks",
    description: "Rapid design and prototyping for startups looking to validate ideas and launch products quickly with maximum impact.",
    deliverables: ["MVP Strategy", "Product Design", "User Flows", "Interactive Prototype", "Pitch Deck Design", "Launch Assets"],
    process: ["Lean Discovery", "Rapid Prototyping", "User Validation", "Design Sprint", "Launch Ready"],
  },
  {
    icon: Smartphone, num: "05", title: "Mobile App Design & MVP", timeline: "4–12 weeks",
    description: "Design and develop modern mobile app experiences for startups, businesses, and digital brands with AI-assisted workflows.",
    deliverables: ["App UI/UX Design", "iOS & Android Interfaces", "Interactive Prototypes", "User Flow Systems", "App Branding", "SaaS Dashboards"],
    process: ["User Research", "Flow Mapping", "UI Design", "Prototype Testing", "Development Handoff"],
  },
  {
    icon: Zap, num: "06", title: "Creative Direction", timeline: "Ongoing",
    description: "Leading the creative vision for brands and projects, ensuring every touchpoint tells a cohesive, compelling story.",
    deliverables: ["Creative Strategy", "Art Direction", "Campaign Concepts", "Visual Storytelling", "Team Guidance", "Quality Oversight"],
    process: ["Vision Setting", "Concept Development", "Creative Execution", "Review & Refine", "Final Direction"],
  },
  {
    icon: Megaphone, num: "07", title: "Social Media Branding", timeline: "2–4 weeks",
    description: "Creating scroll-stopping social media identities and content systems that build engaged communities.",
    deliverables: ["Social Templates", "Content Strategy", "Visual Guidelines", "Story/Reel Templates", "Post Series", "Analytics Setup"],
    process: ["Audience Analysis", "Content Planning", "Template Design", "Launch & Monitor", "Optimize"],
  },
  {
    icon: Package, num: "08", title: "Packaging Design", timeline: "3–6 weeks",
    description: "Designing packaging that commands attention on shelves and creates unforgettable unboxing experiences.",
    deliverables: ["Packaging Design", "Label Design", "Box/Bag Design", "Mockups", "Print-Ready Files", "Material Specs"],
    process: ["Research & Concepts", "Structural Design", "Visual Design", "Prototyping", "Production"],
  },
  {
    icon: Target, num: "09", title: "Marketing Strategy", timeline: "2–8 weeks",
    description: "Developing data-driven marketing strategies that amplify your brand message and drive measurable growth.",
    deliverables: ["Market Analysis", "Marketing Plan", "Campaign Design", "Ad Creatives", "Landing Pages", "Performance Reports"],
    process: ["Market Research", "Strategy Formation", "Creative Development", "Campaign Launch", "Analyze & Scale"],
  },
];

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ service, index, bp }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = service.icon;
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, bp]);

  return (
    <FadeIn delay={index * 60}>
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>

        {/* Row */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: "100%",
            padding: isMobile ? "20px 0" : "36px 0",
            display: "flex",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            background: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            color: "#ffffff",
            gap: isMobile ? "12px" : "0",
          }}
        >
          <div style={{
            display: "flex",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? "16px" : isTablet ? "24px" : "40px",
            minWidth: 0,
            flex: 1,
          }}>
            {/* Number */}
            {!isMobile && (
              <span style={{ fontFamily: "monospace", fontSize: "12px", color: "rgba(255,255,255,0.2)", minWidth: "24px" }}>
                {service.num}
              </span>
            )}

            {/* Icon */}
            <div
              style={{
                width: isMobile ? "36px" : "40px", height: isMobile ? "36px" : "40px", borderRadius: "10px",
                background: isOpen ? "rgba(215,255,0,0.1)" : "rgba(255,255,255,0.04)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: isOpen ? "#D7FF00" : "rgba(255,255,255,0.4)",
                transition: "all 0.3s ease", flexShrink: 0,
              }}
            >
              <Icon size={isMobile ? 16 : 18} />
            </div>

            {/* Title + desc */}
            <div style={{ minWidth: 0 }}>
              <h3
                style={{
                  fontSize: isMobile ? "18px" : "clamp(18px, 2vw, 28px)",
                  fontWeight: "700",
                  color: isOpen ? "#D7FF00" : "#ffffff",
                  transition: "color 0.3s ease",
                  marginBottom: "4px",
                }}
              >
                {service.title}
              </h3>
              {!isMobile && (
                <p style={{ fontSize: "14px", color: "#555555", maxWidth: "500px" }}>
                  {service.description}
                </p>
              )}
            </div>
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "12px" : "24px", flexShrink: 0 }}>
            {!isMobile && (
              <span style={{ fontFamily: "monospace", fontSize: "13px", color: "#444444" }}>
                {service.timeline}
              </span>
            )}
            {isOpen
              ? <ChevronUp size={18} color="rgba(255,255,255,0.4)" />
              : <ChevronDown size={18} color="rgba(255,255,255,0.4)" />
            }
          </div>
        </button>

        {/* Mobile-only description shown above expandable when open or always */}
        {isMobile && (
          <p style={{ fontSize: "13px", color: "#555555", marginBottom: "12px", paddingRight: "8px" }}>
            {service.description}
          </p>
        )}

        {/* Expandable Content */}
        <div
          ref={contentRef}
          style={{
            height: `${contentHeight}px`,
            overflow: "hidden",
            transition: "height 0.35s ease, opacity 0.35s ease",
            opacity: isOpen ? 1 : 0,
          }}
        >
          <div
            style={{
              paddingBottom: isMobile ? "28px" : "40px",
              paddingLeft: isMobile ? "0" : isTablet ? "64px" : "104px",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr",
              gap: isMobile ? "28px" : "40px",
            }}
          >
            {/* Deliverables */}
            <div>
              <p style={{ fontFamily: "monospace", fontSize: "11px", color: "#D7FF00", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
                Deliverables
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {service.deliverables.map((d) => (
                  <li key={d} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#D7FF00", flexShrink: 0 }} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div>
              <p style={{ fontFamily: "monospace", fontSize: "11px", color: "#00F0FF", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
                Process
              </p>
              <ol style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {service.process.map((p, i) => (
                  <li key={p} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.2)", minWidth: "20px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {p}
                  </li>
                ))}
              </ol>
            </div>

            {/* Timeline + CTA */}
            <div style={{ gridColumn: isMobile ? "1 / -1" : isTablet ? "1 / -1" : "auto" }}>
              <p style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
                Timeline
              </p>
              <p style={{ fontSize: "24px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }}>
                {service.timeline}
              </p>

              <a href="/contact"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "12px 24px", background: "#D7FF00", color: "#050505",
                  fontSize: "14px", fontWeight: "700", borderRadius: "100px",
                  textDecoration: "none", transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                Get Started
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </FadeIn>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Services2() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  return (
    <div style={{ background: "#050505", minHeight: "100vh" }}>

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: isMobile ? "100px 24px 60px" : isTablet ? "140px 40px 80px" : "180px 60px 120px",
        }}
      >
        {/* Glow */}
        <div style={{
          position: "absolute", top: 0, left: "25%",
          width: "400px", height: "400px",
          background: "rgba(0,240,255,0.05)",
          borderRadius: "50%", filter: "blur(150px)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1300px" }}>
          <FadeIn delay={0}>
            <p style={{ fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "3px", fontSize: "13px", color: "#D7FF00", marginBottom: "24px" }}>
              // SERVICES
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 style={{
              fontWeight: "800",
              fontSize: isMobile ? "clamp(36px, 10vw, 44px)" : isTablet ? "64px" : "clamp(60px, 6vw, 100px)",
              lineHeight: "0.95",
              marginBottom: "24px",
            }}>
              What I{" "}
              <span style={{ color: "#D7FF00", textShadow: "0 0 40px rgba(215,255,0,0.7)" }}>
                offer
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p style={{
              fontSize: isMobile ? "16px" : "20px",
              color: "#777777",
              maxWidth: "520px",
              lineHeight: "1.7",
              fontWeight: "300",
            }}>
              End-to-end creative services designed for startups, brands, and businesses that demand excellence.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: isMobile ? "0 24px" : isTablet ? "0 40px" : `0 clamp(32px, 4vw, 60px)` }} />

      {/* Services List */}
      <section style={{ padding: isMobile ? "20px 24px 60px" : isTablet ? "30px 40px 80px" : "40px 60px 120px" }}>
        {services.map((service, i) => (
          <ServiceCard key={service.num} service={service} index={i} bp={bp} />
        ))}
      </section>

    </div>
  );
}