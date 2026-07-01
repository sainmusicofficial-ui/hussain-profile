"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Target, LayoutDashboard, Globe, Rocket, Smartphone } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import CursorGlow from "@/components/CursorGlow";
import Preloader from "@/components/Preloader";
import ParticleField from "@/components/ParticleField";
import CodePanel from "@/components/CodePanel";
import { featuredProjects } from "@/data/projects";

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
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translate(0,0)" : translateMap[direction],
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function useResponsive() {
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
  return { isMobile, isTablet, isSmall: isMobile || isTablet };
}

// ════════════════════════════════════════════════════════════════════════════
//  SECTION: Hero
// ════════════════════════════════════════════════════════════════════════════
function Hero() {
  const { isMobile, isTablet, isSmall } = useResponsive();

  return (
    <section
      data-scroll-section="hero"
      style={{
        minHeight: "100vh",
        background: "#050505",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {!isMobile && <ParticleField />}

      <div style={{
        maxWidth: "1600px",
        margin: "0 auto",
        width: "100%",
        padding: isMobile ? "0 24px" : isTablet ? "0 48px" : "0 60px",
        position: "relative",
        zIndex: 1,
        paddingTop: isMobile ? "110px" : isTablet ? "140px" : "0",
        paddingBottom: isMobile ? "80px" : isTablet ? "80px" : "0",
        boxSizing: "border-box",
      }}>

        <FadeIn delay={0}>
          <p style={{
            color: "#D7FF00",
            fontSize: "11px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            fontWeight: "700",
            marginBottom: isMobile ? "20px" : "30px",
            fontFamily: "var(--font-geist-mono)",
          }}>
            Creative Designer & Brand Strategist
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <h1 style={{
            color: "#ffffff",
            fontSize: isMobile
              ? "clamp(40px, 10vw, 60px)"
              : isTablet
              ? "clamp(52px, 7vw, 72px)"
              : "clamp(56px, 5.5vw, 88px)",
            fontWeight: "700",
            lineHeight: "0.92",
            letterSpacing: "-0.03em",
            maxWidth: isSmall ? "100%" : "55%",
            marginBottom: isMobile ? "20px" : "28px",
          }}>
            Designing Brands,
            <br />
            Interfaces &{" "}
            <span style={{
              color: "#D7FF00",
              textShadow: "0 0 18px rgba(215,255,0,0.65), 0 0 42px rgba(215,255,0,0.30)",
            }}>
              Digital
            </span>
            <br />
            Experiences
          </h1>
        </FadeIn>

        <FadeIn delay={240}>
          <p style={{
            maxWidth: isMobile ? "100%" : isTablet ? "600px" : "500px",
            color: "#6A6A6A",
            fontSize: isMobile ? "16px" : "18px",
            lineHeight: "1.6",
            marginBottom: isMobile ? "32px" : "42px",
          }}>
            Creative direction meets modern digital execution.
            I help startups and brands build unforgettable
            visual identities and products.
          </p>
        </FadeIn>

        <FadeIn delay={360}>
          <div style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: isMobile ? "12px" : "20px",
          }}>
            <Link href="/work">
              <button
                style={{
                  height: isMobile ? "52px" : "60px",
                  padding: isMobile ? "0 28px" : "0 36px",
                  borderRadius: "999px",
                  backgroundColor: "#D7FF00",
                  color: "#000000",
                  fontSize: isMobile ? "14px" : "16px",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 0 40px rgba(215,255,0,0.55)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                View Work
              </button>
            </Link>

            <Link href="/about">
              <button
                style={{
                  height: isMobile ? "52px" : "60px",
                  padding: isMobile ? "0 28px" : "0 36px",
                  borderRadius: "999px",
                  backgroundColor: "transparent",
                  color: "#ffffff",
                  fontSize: isMobile ? "14px" : "16px",
                  fontWeight: "500",
                  border: "1px solid #2A2A2A",
                  cursor: "pointer",
                  transition: "border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#D7FF00";
                  e.currentTarget.style.color = "#D7FF00";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(215,255,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#2A2A2A";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                About Me
              </button>
            </Link>
          </div>
        </FadeIn>
      </div>

      {!isSmall && (
        <FadeIn delay={480}>
          <div style={{
            position: "absolute",
            bottom: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#666666",
            fontSize: "11px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontFamily: "var(--font-geist-mono)",
            zIndex: 1,
          }}>
            Scroll
          </div>
        </FadeIn>
      )}
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SECTION: Projects
// ════════════════════════════════════════════════════════════════════════════
function ProjectCard({ project, isMobile, isTablet, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={index * 150} direction={index % 2 === 0 ? "left" : "right"}>
      <Link href={`/work/${project.slug}`} style={{ textDecoration: "none" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative",
            aspectRatio: "16/9",
            height: "auto",
            borderRadius: isMobile ? "20px" : "28px",
            overflow: "hidden",
            border: `1px solid ${hovered ? "rgba(215,255,0,0.3)" : "#1B1B1B"}`,
            cursor: "pointer",
            transform: hovered ? "translateY(-8px)" : "translateY(0)",
            transition: "transform 0.5s ease, border-color 0.5s ease",
          }}
        >
          <div style={{
            position: "absolute", inset: 0,
            opacity: hovered ? 0.8 : 0.4,
            transition: "opacity 0.5s ease",
            background: project.accent === "cyan" ? "rgba(0,240,255,0.1)" : "rgba(215,255,0,0.1)",
            zIndex: 1, pointerEvents: "none",
          }} />
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <Image src={project.image} alt={project.title} fill
              style={{
                objectFit: "cover",
                transform: hovered ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.7s ease",
              }}
            />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
          </div>
          <div style={{
            position: "relative", zIndex: 2, height: "100%",
            padding: isMobile ? "24px" : "32px",
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
          }}>
            <p style={{
              color: "#D7FF00", fontSize: isMobile ? "9px" : "10px",
              textTransform: "uppercase", letterSpacing: "0.15em",
              marginBottom: isMobile ? "8px" : "16px", fontFamily: "monospace",
            }}>
              {project.services.join(" • ")}
            </p>
            <h3 style={{
              color: "#ffffff",
              fontSize: isMobile ? "22px" : isTablet ? "26px" : "34px",
              fontWeight: "700", marginBottom: "8px", lineHeight: "1.1",
            }}>
              {project.title}
            </h3>
            <p style={{ color: "#7A7A7A", fontSize: isMobile ? "13px" : "15px" }}>
              {project.category}
            </p>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

function Projects() {
  const { isMobile, isTablet, isSmall } = useResponsive();

  return (
    <section data-scroll-section="projects" style={{
      position: "relative",
      padding: isMobile ? "80px 24px" : isTablet ? "100px 40px" : "140px 80px",
    }}>
      <FadeIn direction="up">
        <div style={{
          display: "flex",
          alignItems: isSmall ? "flex-start" : "flex-end",
          flexDirection: isSmall ? "column" : "row",
          justifyContent: "space-between",
          gap: isSmall ? "16px" : "0",
          marginBottom: isMobile ? "40px" : "64px",
        }}>
          <div>
            <p style={{
              color: "#D7FF00", fontSize: "11px", letterSpacing: "0.25em",
              textTransform: "uppercase", marginBottom: "16px", fontFamily: "monospace",
            }}>
              // Featured Projects
            </p>
            <h2 style={{
              color: "#ffffff",
              fontSize: isMobile ? "clamp(36px, 9vw, 52px)" : isTablet ? "52px" : "64px",
              fontWeight: "700", lineHeight: "1",
            }}>
              Selected Work
            </h2>
          </div>
          <Link href="/work">
            <button style={{
              color: "#888888", fontSize: "14px", background: "none",
              border: "none", cursor: "pointer", transition: "color 0.3s ease",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#888888")}
            >
              View All →
            </button>
          </Link>
        </div>
      </FadeIn>
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? "16px" : "24px",
      }}>
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.slug} project={project}
            isMobile={isMobile} isTablet={isTablet} index={i} />
        ))}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SECTION: Services
// ════════════════════════════════════════════════════════════════════════════
const services = [
  {
    id: "01", icon: <Target size={20} />, title: "Brand Identity",
    description: "Crafting distinctive visual identities that capture your brand's essence and resonate with your target audience.",
    timeline: "3–6 weeks",
    deliverables: ["Logo System", "Color Palette", "Typography Guide", "Brand Guidelines", "Stationery Design", "Brand Strategy"],
    process: ["Discovery & Research", "Strategy Development", "Visual Exploration", "Design Refinement", "Final Delivery"],
  },
  {
    id: "02", icon: <LayoutDashboard size={20} />, title: "UI/UX Design",
    description: "Designing intuitive and beautiful interfaces that deliver seamless user experiences across all platforms.",
    timeline: "4–8 weeks",
    deliverables: ["Wireframes", "UI Kit", "Prototypes", "User Flows", "Design System", "Handoff Files"],
    process: ["User Research", "Information Architecture", "Wireframing", "Visual Design", "Prototype & Test"],
  },
  {
    id: "03", icon: <Globe size={20} />, title: "Website Design",
    description: "Building high-performance websites that combine stunning visuals with conversion-focused design.",
    timeline: "4–8 weeks",
    deliverables: ["Responsive Design", "CMS Integration", "SEO Setup", "Analytics", "Performance Optimization", "Launch Support"],
    process: ["Discovery", "Sitemap & Structure", "Design Mockups", "Development", "Launch"],
  },
  {
    id: "04", icon: <Rocket size={20} />, title: "Startup MVP Design",
    description: "Rapidly designing and validating your product concept to get to market faster with confidence.",
    timeline: "2–4 weeks",
    deliverables: ["MVP Scope", "UI Design", "Clickable Prototype", "User Testing", "Iteration", "Dev Handoff"],
    process: ["Problem Definition", "Feature Scoping", "Rapid Prototyping", "User Validation", "Refinement"],
  },
  {
    id: "05", icon: <Smartphone size={20} />, title: "Mobile App Design",
    description: "Creating engaging mobile experiences that users love, optimized for iOS and Android platforms.",
    timeline: "6–10 weeks",
    deliverables: ["App UI Design", "Onboarding Flow", "Design System", "Prototypes", "App Store Assets", "Dev Handoff"],
    process: ["Research & Strategy", "UX Architecture", "UI Design", "Prototyping", "Testing & Launch"],
  },
];

const stats = [
  { numericValue: 50, suffix: "+", label: "Projects Completed" },
  { numericValue: 30, suffix: "+", label: "Happy Clients" },
  { numericValue: 4, suffix: "+", label: "Years Experience" },
  { numericValue: 100, suffix: "%", label: "Client Satisfaction" },
];

function StatCounter({ numericValue, suffix, isMobile }) {
  const numRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;
    const counter = { val: 0 };
    const trigger = ScrollTrigger.create({
      trigger: wrap, start: "top 85%", once: true,
      onEnter: () => {
        gsap.to(counter, {
          val: numericValue, duration: 1.6, ease: "power2.out",
          onUpdate: () => { el.textContent = Math.round(counter.val) + suffix; },
        });
      },
    });
    return () => trigger.kill();
  }, [numericValue, suffix]);

  return (
    <h3 ref={wrapRef} style={{
      color: "white",
      fontSize: isMobile ? "clamp(48px, 12vw, 64px)" : "72px",
      fontWeight: "700", lineHeight: "1",
    }}>
      <span ref={numRef}>0{suffix}</span>
    </h3>
  );
}

function Services() {
  const [openId, setOpenId] = useState(null);
  const [hovered, setHovered] = useState(null);
  const { isMobile, isTablet, isSmall } = useResponsive();

  return (
    <section data-scroll-section="services" style={{
      backgroundColor: "#0a0a0a",
      padding: isMobile ? "80px 24px" : isTablet ? "100px 40px" : "120px 80px",
    }}>
      <FadeIn delay={0}>
        <p style={{
          color: "#00e5ff", fontSize: "12px", fontWeight: "600",
          letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", fontFamily: "monospace",
        }}>// What I Do</p>
      </FadeIn>
      <FadeIn delay={100}>
        <h2 style={{
          color: "white",
          fontSize: isMobile ? "clamp(36px, 9vw, 52px)" : isTablet ? "52px" : "64px",
          fontWeight: "650", letterSpacing: "-0.03em",
          marginBottom: isMobile ? "48px" : "80px",
        }}>Services</h2>
      </FadeIn>

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
                <div style={{
                  display: "flex", alignItems: "center",
                  gap: isMobile ? "12px" : "24px",
                  padding: isMobile ? "24px 0" : "32px 0",
                  transition: "all 0.3s",
                }}>
                  <span style={{
                    color: "#333", fontSize: "12px", fontWeight: "500",
                    minWidth: "24px", fontFamily: "monospace",
                    display: isMobile ? "none" : "block",
                  }}>{service.id}</span>
                  <span style={{ color: isOpen || hovered === service.id ? "#D7FF00" : "#444", transition: "color 0.3s", flexShrink: 0 }}>
                    {service.icon}
                  </span>
                  <span style={{
                    color: isOpen || hovered === service.id ? "#D7FF00" : "white",
                    fontSize: isMobile ? "20px" : isTablet ? "22px" : "28px",
                    fontWeight: "700", letterSpacing: "-0.02em", flex: 1, transition: "color 0.3s",
                  }}>{service.title}</span>
                  {!isMobile && (
                    <span style={{ color: "#444", fontSize: "13px", fontFamily: "monospace", display: isTablet ? "none" : "block" }}>
                      {service.timeline}
                    </span>
                  )}
                  <span style={{
                    color: isOpen || hovered === service.id ? "#D7FF00" : "#444",
                    fontSize: isMobile ? "16px" : "20px", transition: "all 0.3s",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", flexShrink: 0,
                  }}>↗</span>
                </div>

                {isOpen && (
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr",
                    gap: isMobile ? "32px" : isTablet ? "40px" : "60px",
                    paddingBottom: "48px",
                    paddingLeft: isMobile ? "0" : isTablet ? "24px" : "48px",
                  }}>
                    <div>
                      <h3 style={{ color: "white", fontSize: isMobile ? "18px" : "22px", fontWeight: "700", marginBottom: "12px" }}>
                        {service.title}
                      </h3>
                      <p style={{ color: "#888", fontSize: "14px", lineHeight: "1.7" }}>{service.description}</p>
                    </div>
                    <div>
                      <p style={{ color: "#D7FF00", fontSize: "11px", fontWeight: "600", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px", fontFamily: "monospace" }}>
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
                    <div style={{ gridColumn: isMobile ? "1" : isTablet ? "1 / -1" : "auto" }}>
                      <p style={{ color: "#00e5ff", fontSize: "11px", fontWeight: "600", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px", fontFamily: "monospace" }}>
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
                      <p style={{ color: "#555", fontSize: "11px", fontWeight: "600", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px", fontFamily: "monospace" }}>Timeline</p>
                      <p style={{ color: "white", fontSize: "22px", fontWeight: "700", marginBottom: "24px" }}>{service.timeline}</p>
                      <Link href="/contact" style={{ textDecoration: "none" }}>
                        <button style={{
                          height: "48px", padding: "0 28px", borderRadius: "999px",
                          backgroundColor: "#D7FF00", color: "black", fontSize: "14px",
                          fontWeight: "600", border: "none", cursor: "pointer",
                          display: "flex", alignItems: "center", gap: "8px", transition: "opacity 0.2s ease",
                        }}
                          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
                          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                        >
                          Get Started ↗
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          );
        })}
        <div style={{ borderTop: "1px solid #1f1f1f" }} />
      </div>

      <FadeIn delay={0}>
        <div style={{ marginTop: "60px" }}>
          <Link href="/services" style={{ textDecoration: "none" }}>
            <button style={{
              height: isMobile ? "52px" : "60px",
              padding: isMobile ? "0 28px" : "0 36px",
              borderRadius: "999px", border: "1px solid rgba(255,255,255,0.2)",
              color: "white", background: "transparent",
              fontSize: isMobile ? "14px" : "16px", cursor: "pointer", transition: "all 0.3s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#D7FF00"; e.currentTarget.style.color = "#000"; e.currentTarget.style.boxShadow = "0 0 40px rgba(215,255,0,0.6)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Explore All Services ↗
            </button>
          </Link>
        </div>
      </FadeIn>

      <FadeIn delay={0}>
        <div style={{
          marginTop: isMobile ? "80px" : "140px",
          paddingTop: isMobile ? "48px" : "80px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: isMobile ? "40px 24px" : "40px",
        }}>
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 100}>
              <div>
                <StatCounter numericValue={stat.numericValue} suffix={stat.suffix} isMobile={isMobile} />
                <p style={{ color: "#6f6f6f", fontSize: "15px", letterSpacing: "0.08em", marginTop: "12px" }}>
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

// ════════════════════════════════════════════════════════════════════════════
//  SECTION: TechStack
// ════════════════════════════════════════════════════════════════════════════
const tools = [
  "Figma", "Photoshop", "Illustrator", "Canva", "After Effects",
  "HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind CSS",
  "Framer Motion", "Git", "GitHub", "VS Code",
  "WordPress", "Elementor", "Vercel", "Firebase", "ChatGPT", "Claude",
];

function ToolTag({ tool, index, isMobile }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useFadeIn();

  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
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

function TechStack() {
  const { isMobile, isTablet } = useResponsive();

  return (
    <section data-scroll-section="techstack" style={{
      padding: isMobile ? "80px 24px" : isTablet ? "100px 40px" : "140px 80px",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <FadeIn delay={0}>
          <p style={{ color: "#00E5FF", fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: "600", marginBottom: "24px", fontFamily: "monospace" }}>
            // TECH STACK
          </p>
        </FadeIn>
        <FadeIn delay={100}>
          <h2 style={{
            color: "#fff",
            fontSize: isMobile ? "clamp(32px, 9vw, 48px)" : isTablet ? "48px" : "64px",
            fontWeight: "700", letterSpacing: "-0.04em",
            marginBottom: isMobile ? "40px" : "70px",
          }}>
            Tools & Technologies
          </h2>
        </FadeIn>
        <FadeIn delay={200}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: isMobile ? "10px" : "14px", maxWidth: "950px", margin: "0 auto" }}>
            {tools.map((tool, i) => (
              <ToolTag key={tool} tool={tool} index={i} isMobile={isMobile} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SECTION: Testimonials
// ════════════════════════════════════════════════════════════════════════════
const testimonials = [
  { quote: "Hussain understood our vision immediately and translated it into a brand identity that felt professional, memorable, and built for growth.", name: "Shuaib", role: "Director, MedZap" },
  { quote: "From strategy to execution, every step was smooth and well thought out. The final outcome exceeded our expectations.", name: "Affan Khan", role: "Partner, Ruyadar" },
  { quote: "The attention to detail, consistency, and professionalism throughout the project was outstanding. Highly recommended.", name: "Sayeed", role: "Founder, SS Auditors" },
];

function TestimonialsSection() {
  const { isMobile, isTablet } = useResponsive();

  return (
    <section data-scroll-section="testimonials" style={{
      padding: isMobile ? "80px 24px" : isTablet ? "100px 40px" : "140px 60px",
      borderTop: "1px solid rgba(255,255,255,0.06)",
    }}>
      <FadeIn delay={0}>
        <div style={{ marginBottom: isMobile ? "48px" : "80px" }}>
          <p style={{ fontFamily: "var(--font-geist-mono)", color: "#D7FF00", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>
            // Client Words
          </p>
          <h2 style={{ fontSize: isMobile ? "clamp(36px, 9vw, 52px)" : isTablet ? "52px" : "72px", fontWeight: "700", color: "white", letterSpacing: "-0.04em", margin: 0 }}>
            Testimonials
          </h2>
        </div>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)", gap: isMobile ? "16px" : "28px" }}>
        {testimonials.map((item, index) => (
          <FadeIn key={index} delay={index * 150}>
            <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                padding: isMobile ? "28px" : "36px", borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(10px)",
                minHeight: isMobile ? "auto" : isTablet ? "300px" : "340px",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
              }}
            >
              <div>
                <Quote size={isMobile ? 26 : 34} color="#D7FF00" style={{ opacity: 0.4, marginBottom: isMobile ? "20px" : "28px" }} />
                <p style={{ color: "#B8B8B8", fontSize: isMobile ? "16px" : isTablet ? "17px" : "20px", lineHeight: "1.8", margin: 0 }}>
                  "{item.quote}"
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: isMobile ? "28px" : "40px" }}>
                <div style={{
                  width: isMobile ? "40px" : "48px", height: isMobile ? "40px" : "48px",
                  borderRadius: "999px", background: "linear-gradient(135deg, rgba(215,255,0,0.25), rgba(0,240,255,0.2))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontWeight: "700", fontSize: isMobile ? "14px" : "16px", flexShrink: 0,
                }}>
                  {item.name[0]}
                </div>
                <div>
                  <p style={{ color: "white", fontWeight: "600", margin: 0, marginBottom: "4px", fontSize: isMobile ? "14px" : "16px" }}>{item.name}</p>
                  <p style={{ color: "#6B6B6B", margin: 0, fontSize: "13px", fontFamily: "var(--font-geist-mono)" }}>{item.role}</p>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  PAGE: Home
// ════════════════════════════════════════════════════════════════════════════
export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen" style={{ overflowX: "hidden" }}>
      <Preloader />
      <CursorGlow />
      <Navbar />

      <div style={{ position: "relative" }}>
        <Hero />
        <div
          className="hidden xl:block"
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: "60px",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <CodePanel />
        </div>
      </div>

      <Projects />
      <Services />
      <TechStack />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}