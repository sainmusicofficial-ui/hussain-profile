"use client";
import { useEffect, useState, useRef } from "react";
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

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
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
        minHeight: isSmall ? "auto" : "100vh",
        paddingBottom: isSmall ? "80px" : "0",
        background: "#050505",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          padding: isMobile ? "0 24px" : isTablet ? "0 48px" : "0 60px",
        }}
      >
        <div style={{ paddingTop: isMobile ? "110px" : isTablet ? "140px" : "190px" }}>

          {/* Label */}
          <FadeIn delay={0}>
            <p
              style={{
                color: "#D7FF00",
                fontSize: "11px",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                fontWeight: "700",
                marginBottom: isMobile ? "20px" : "30px",
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              Creative Designer & Brand Strategist
            </p>
          </FadeIn>

          {/* Heading */}
          <FadeIn delay={120}>
            <h1
              style={{
                color: "#ffffff",
                fontSize: isMobile
                  ? "clamp(40px, 10vw, 60px)"
                  : isTablet
                  ? "clamp(52px, 7vw, 72px)"
                  : "100px",
                fontWeight: "700",
                lineHeight: "0.92",
                letterSpacing: "-0.03em",
                maxWidth: "100%",
                marginLeft: isMobile ? "0" : isTablet ? "0" : "-40px",
              }}
            >
              Designing Brands,
              <br />
              Interfaces &{" "}
              <span
                style={{
                  color: "#D7FF00",
                  textShadow:
                    "0 0 18px rgba(215,255,0,0.65), 0 0 42px rgba(215,255,0,0.30)",
                }}
              >
                Digital
              </span>
              <br />
              Experiences
            </h1>
          </FadeIn>

          {/* Tablet: Description + Buttons */}
          {isTablet && (
            <>
              <FadeIn delay={240}>
                <p
                  style={{
                    marginTop: "28px",
                    maxWidth: "600px",
                    color: "#6A6A6A",
                    fontSize: "18px",
                    lineHeight: "1.6",
                  }}
                >
                  Creative direction meets modern digital execution.
                  I help startups and brands build unforgettable
                  visual identities and products.
                </p>
              </FadeIn>

              <FadeIn delay={360}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "36px", flexWrap: "wrap" }}>
                  <Link href="/work">
                    <button
                      style={{
                        height: "56px", padding: "0 32px", borderRadius: "999px",
                        backgroundColor: "#D7FF00", color: "#000000",
                        fontSize: "15px", fontWeight: "600", border: "none", cursor: "pointer",
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
                        height: "56px", padding: "0 32px", borderRadius: "999px",
                        backgroundColor: "transparent", color: "#ffffff",
                        fontSize: "15px", fontWeight: "500",
                        border: "1px solid #2A2A2A", cursor: "pointer",
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
            </>
          )}

        </div>
      </div>

      {/* Mobile & Desktop: Description + Buttons */}
      {!isTablet && (
        <div
          style={{
            marginLeft: isMobile ? "24px" : "190px",
            marginRight: isMobile ? "24px" : "60px",
          }}
        >
          <FadeIn delay={240}>
            <p
              style={{
                marginTop: isMobile ? "20px" : "28px",
                maxWidth: "700px",
                color: "#6A6A6A",
                fontSize: isMobile ? "16px" : "20px",
                lineHeight: "1.6",
              }}
            >
              Creative direction meets modern digital execution.
              I help startups and brands build unforgettable
              visual identities and products.
            </p>
          </FadeIn>

          <FadeIn delay={360}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: isMobile ? "12px" : "20px",
                marginTop: isMobile ? "32px" : "42px",
              }}
            >
              <Link href="/work">
                <button
                  style={{
                    height: isMobile ? "52px" : "60px",
                    padding: isMobile ? "0 28px" : "0 36px",
                    borderRadius: "999px", backgroundColor: "#D7FF00",
                    color: "#000000", fontSize: isMobile ? "14px" : "16px",
                    fontWeight: "600", border: "none", cursor: "pointer",
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
                    borderRadius: "999px", backgroundColor: "transparent",
                    color: "#ffffff", fontSize: isMobile ? "14px" : "16px",
                    fontWeight: "500", border: "1px solid #2A2A2A", cursor: "pointer",
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
      )}

      {/* Scroll indicator — desktop only */}
      {!isSmall && (
        <FadeIn delay={480}>
          <div
            style={{
              position: "absolute",
              bottom: "50px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "#666666",
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            Scroll
          </div>
        </FadeIn>
      )}

    </section>
  );
}