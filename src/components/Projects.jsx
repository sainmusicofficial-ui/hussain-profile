"use client";
import { useEffect, useState, useRef } from "react";
import { featuredProjects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";

// ─── Scroll Animation ─────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
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

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, isMobile, isTablet, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={index * 150} direction={index % 2 === 0 ? "left" : "right"}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          height: isMobile ? "280px" : isTablet ? "380px" : "520px",
          borderRadius: isMobile ? "20px" : "28px",
          overflow: "hidden",
          border: `1px solid ${hovered ? "rgba(215,255,0,0.3)" : "#1B1B1B"}`,
          cursor: "pointer",
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
          transition: "transform 0.5s ease, border-color 0.5s ease",
        }}
      >
        {/* Glow overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: hovered ? 0.8 : 0.4,
            transition: "opacity 0.5s ease",
            background:
              project.accent === "cyan"
                ? "rgba(0,240,255,0.1)"
                : "rgba(215,255,0,0.1)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Image */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{
              objectFit: "cover",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.7s ease",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.55)",
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            padding: isMobile ? "24px" : "32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <p
            style={{
              color: "#D7FF00",
              fontSize: isMobile ? "9px" : "10px",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: isMobile ? "8px" : "16px",
              fontFamily: "monospace",
            }}
          >
            {project.services.join(" • ")}
          </p>

          <h3
            style={{
              color: "#ffffff",
              fontSize: isMobile ? "22px" : isTablet ? "26px" : "34px",
              fontWeight: "700",
              marginBottom: "8px",
              lineHeight: "1.1",
            }}
          >
            {project.title}
          </h3>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                color: "#7A7A7A",
                fontSize: isMobile ? "13px" : "15px",
              }}
            >
              {project.category}
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Projects() {
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
        position: "relative",
        padding: isMobile
          ? "80px 24px"
          : isTablet
          ? "100px 40px"
          : "140px 80px",
      }}
    >
      {/* Heading Row */}
      <FadeIn direction="up">
        <div
          style={{
            display: "flex",
            alignItems: isSmall ? "flex-start" : "flex-end",
            flexDirection: isSmall ? "column" : "row",
            justifyContent: "space-between",
            gap: isSmall ? "16px" : "0",
            marginBottom: isMobile ? "40px" : "64px",
          }}
        >
          <div>
            <p
              style={{
                color: "#D7FF00",
                fontSize: "11px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                marginBottom: "16px",
                fontFamily: "monospace",
              }}
            >
              // Featured Projects
            </p>
            <h2
              style={{
                color: "#ffffff",
                fontSize: isMobile
                  ? "clamp(36px, 9vw, 52px)"
                  : isTablet
                  ? "52px"
                  : "64px",
                fontWeight: "700",
                lineHeight: "1",
              }}
            >
              Selected Work
            </h2>
          </div>

          <Link href="/work">
            <button
              style={{
                color: "#888888",
                fontSize: "14px",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#888888")}
            >
              View All →
            </button>
          </Link>
        </div>
      </FadeIn>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "16px" : "24px",
        }}
      >
        {featuredProjects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            isMobile={isMobile}
            isTablet={isTablet}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}