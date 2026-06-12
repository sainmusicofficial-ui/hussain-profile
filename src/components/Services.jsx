"use client";

import { useState, useEffect, useRef } from "react";
import { Target, LayoutDashboard, Globe, Rocket, Smartphone } from "lucide-react";

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

// ─── Services Data ─────────────────────────────────────────────────────────────
const services = [
  {
    id: "01",
    icon: <Target size={20} />,
    title: "Brand Identity",
    description: "Crafting distinctive visual identities that capture your brand's essence and resonate with your target audience.",
    timeline: "3–6 weeks",
    deliverables: ["Logo System", "Color Palette", "Typography Guide", "Brand Guidelines", "Stationery Design", "Brand Strategy"],
    process: ["Discovery & Research", "Strategy Development", "Visual Exploration", "Design Refinement", "Final Delivery"],
  },
  {
    id: "02",
    icon: <LayoutDashboard size={20} />,
    title: "UI/UX Design",
    description: "Designing intuitive and beautiful interfaces that deliver seamless user experiences across all platforms.",
    timeline: "4–8 weeks",
    deliverables: ["Wireframes", "UI Kit", "Prototypes", "User Flows", "Design System", "Handoff Files"],
    process: ["User Research", "Information Architecture", "Wireframing", "Visual Design", "Prototype & Test"],
  },
  {
    id: "03",
    icon: <Globe size={20} />,
    title: "Website Design",
    description: "Building high-performance websites that combine stunning visuals with conversion-focused design.",
    timeline: "4–8 weeks",
    deliverables: ["Responsive Design", "CMS Integration", "SEO Setup", "Analytics", "Performance Optimization", "Launch Support"],
    process: ["Discovery", "Sitemap & Structure", "Design Mockups", "Development", "Launch"],
  },
  {
    id: "04",
    icon: <Rocket size={20} />,
    title: "Startup MVP Design",
    description: "Rapidly designing and validating your product concept to get to market faster with confidence.",
    timeline: "2–4 weeks",
    deliverables: ["MVP Scope", "UI Design", "Clickable Prototype", "User Testing", "Iteration", "Dev Handoff"],
    process: ["Problem Definition", "Feature Scoping", "Rapid Prototyping", "User Validation", "Refinement"],
  },
  {
    id: "05",
    icon: <Smartphone size={20} />,
    title: "Mobile App Design",
    description: "Creating engaging mobile experiences that users love, optimized for iOS and Android platforms.",
    timeline: "6–10 weeks",
    deliverables: ["App UI Design", "Onboarding Flow", "Design System", "Prototypes", "App Store Assets", "Dev Handoff"],
    process: ["Research & Strategy", "UX Architecture", "UI Design", "Prototyping", "Testing & Launch"],
  },
];

const stats = [
  { value: "50+", label: "Projects Completed" },
  { value: "30+", label: "Happy Clients" },
  { value: "4+",  label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Services() {
  const [openId, setOpenId] = useState(null);
  const [hovered, setHovered] = useState(null);
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
        backgroundColor: "#0a0a0a",
        padding: isMobile
          ? "80px 24px"
          : isTablet
          ? "100px 40px"
          : "120px 80px",
      }}
    >
      {/* Header */}
      <FadeIn delay={0}>
        <p style={{
          color: "#00e5ff", fontSize: "12px", fontWeight: "600",
          letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px",
          fontFamily: "monospace",
        }}>
          // What I Do
        </p>
      </FadeIn>

      <FadeIn delay={100}>
        <h2 style={{
          color: "white",
          fontSize: isMobile ? "clamp(36px, 9vw, 52px)" : isTablet ? "52px" : "64px",
          fontWeight: "650",
          letterSpacing: "-0.03em",
          marginBottom: isMobile ? "48px" : "80px",
        }}>
          Services
        </h2>
      </FadeIn>

      {/* Services List */}
      <div>
        {services.map((service, index) => {
          const isOpen = openId === service.id;
          return (
            <FadeIn key={service.id} delay={index * 80}>
              <div
                style={{ borderTop: "1px solid #1f1f1f", cursor: "pointer" }}
                onClick={() => setOpenId(isOpen ? null : service.id)}
                onMouseEnter={() => setHovered(service.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "12px" : "24px",
                    padding: isMobile ? "24px 0" : "32px 0",
                    transition: "all 0.3s",
                  }}
                >
                  {/* Number */}
                  <span style={{
                    color: "#333", fontSize: "12px", fontWeight: "500",
                    minWidth: "24px", fontFamily: "monospace",
                    display: isMobile ? "none" : "block",
                  }}>
                    {service.id}
                  </span>

                  {/* Icon */}
                  <span style={{
                    color: isOpen || hovered === service.id ? "#D7FF00" : "#444",
                    transition: "color 0.3s", flexShrink: 0,
                  }}>
                    {service.icon}
                  </span>

                  {/* Title */}
                  <span style={{
                    color: isOpen || hovered === service.id ? "#D7FF00" : "white",
                    fontSize: isMobile ? "20px" : isTablet ? "22px" : "28px",
                    fontWeight: "700",
                    letterSpacing: "-0.02em",
                    flex: 1,
                    transition: "color 0.3s",
                  }}>
                    {service.title}
                  </span>

                  {/* Timeline — hidden on mobile */}
                  {!isMobile && (
                    <span style={{
                      color: "#444", fontSize: "13px",
                      fontFamily: "monospace",
                      display: isTablet ? "none" : "block",
                    }}>
                      {service.timeline}
                    </span>
                  )}

                  {/* Arrow */}
                  <span style={{
                    color: isOpen || hovered === service.id ? "#D7FF00" : "#444",
                    fontSize: isMobile ? "16px" : "20px",
                    transition: "all 0.3s",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    flexShrink: 0,
                  }}>
                    ↗
                  </span>
                </div>

                {/* Expanded Content */}
                {isOpen && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr",
                      gap: isMobile ? "32px" : isTablet ? "40px" : "60px",
                      paddingBottom: "48px",
                      paddingLeft: isMobile ? "0" : isTablet ? "24px" : "48px",
                    }}
                  >
                    {/* Title + Description */}
                    <div>
                      <h3 style={{
                        color: "white", fontSize: isMobile ? "18px" : "22px",
                        fontWeight: "700", marginBottom: "12px",
                      }}>
                        {service.title}
                      </h3>
                      <p style={{ color: "#888", fontSize: "14px", lineHeight: "1.7" }}>
                        {service.description}
                      </p>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <p style={{
                        color: "#D7FF00", fontSize: "11px", fontWeight: "600",
                        letterSpacing: "0.15em", textTransform: "uppercase",
                        marginBottom: "20px", fontFamily: "monospace",
                      }}>
                        Deliverables
                      </p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                        {service.deliverables.map((item, i) => (
                          <li key={i} style={{ color: "#ccc", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ color: "#D7FF00", fontSize: "16px" }}>•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Process + Timeline + CTA */}
                    <div style={{ gridColumn: isMobile ? "1" : isTablet ? "1 / -1" : "auto" }}>
                      <p style={{
                        color: "#00e5ff", fontSize: "11px", fontWeight: "600",
                        letterSpacing: "0.15em", textTransform: "uppercase",
                        marginBottom: "20px", fontFamily: "monospace",
                      }}>
                        Process
                      </p>
                      <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", marginBottom: "40px" }}>
                        {service.process.map((step, i) => (
                          <li key={i} style={{ color: "#ccc", fontSize: "14px", display: "flex", alignItems: "center", gap: "12px" }}>
                            <span style={{ color: "#444", fontSize: "12px", minWidth: "20px", fontFamily: "monospace" }}>0{i + 1}</span>
                            {step}
                          </li>
                        ))}
                      </ol>

                      <p style={{
                        color: "#555", fontSize: "11px", fontWeight: "600",
                        letterSpacing: "0.15em", textTransform: "uppercase",
                        marginBottom: "12px", fontFamily: "monospace",
                      }}>
                        Timeline
                      </p>
                      <p style={{ color: "white", fontSize: "22px", fontWeight: "700", marginBottom: "24px" }}>
                        {service.timeline}
                      </p>
                      <button
                        style={{
                          height: "48px", padding: "0 28px", borderRadius: "999px",
                          backgroundColor: "#D7FF00", color: "black", fontSize: "14px",
                          fontWeight: "600", border: "none", cursor: "pointer",
                          display: "flex", alignItems: "center", gap: "8px",
                          transition: "opacity 0.2s ease",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                      >
                        Get Started ↗
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          );
        })}

        {/* Bottom border */}
        <div style={{ borderTop: "1px solid #1f1f1f" }} />
      </div>

      {/* Explore Button */}
      <FadeIn delay={0}>
        <div style={{ marginTop: "60px" }}>
          <button
            style={{
              height: isMobile ? "52px" : "60px",
              padding: isMobile ? "0 28px" : "0 36px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              background: "transparent",
              fontSize: isMobile ? "14px" : "16px",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#D7FF00";
              e.currentTarget.style.color = "#000";
              e.currentTarget.style.boxShadow = "0 0 40px rgba(215,255,0,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Explore All Services ↗
          </button>
        </div>
      </FadeIn>

      {/* Stats Grid */}
      <FadeIn delay={0}>
        <div
          style={{
            marginTop: isMobile ? "80px" : "140px",
            paddingTop: isMobile ? "48px" : "80px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: isMobile ? "40px 24px" : "40px",
          }}
        >
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 100}>
              <div>
                <h3 style={{
                  color: "white",
                  fontSize: isMobile ? "clamp(48px, 12vw, 64px)" : "72px",
                  fontWeight: "700",
                  lineHeight: "1",
                }}>
                  {stat.value}
                </h3>
                <p style={{
                  color: "#6f6f6f",
                  fontSize: "15px",
                  letterSpacing: "0.08em",
                  marginTop: "12px",
                }}>
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </FadeIn>

    </section>
  );
}