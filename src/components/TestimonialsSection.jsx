"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

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

// ─── Testimonials Data ────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: "Hussain understood our vision immediately and translated it into a brand identity that felt professional, memorable, and built for growth.",
    name: "Shuaib",
    role: "Director, MedZap",
  },
  {
    quote: "From strategy to execution, every step was smooth and well thought out. The final outcome exceeded our expectations.",
    name: "Affan Khan",
    role: "Partner, Ruyadar",
  },
  {
    quote: "The attention to detail, consistency, and professionalism throughout the project was outstanding. Highly recommended.",
    name: "Sayeed",
    role: "Founder, SS Auditors",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TestimonialsSection() {
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
        padding: isMobile ? "80px 24px" : isTablet ? "100px 40px" : "140px 60px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Header */}
      <FadeIn delay={0}>
        <div style={{ marginBottom: isMobile ? "48px" : "80px" }}>
          <p
            style={{
              fontFamily: "var(--font-geist-mono)",
              color: "#D7FF00",
              fontSize: "12px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            // Client Words
          </p>
          <h2
            style={{
              fontSize: isMobile ? "clamp(36px, 9vw, 52px)" : isTablet ? "52px" : "72px",
              fontWeight: "700",
              color: "white",
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            Testimonials
          </h2>
        </div>
      </FadeIn>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)",
          gap: isMobile ? "16px" : "28px",
        }}
      >
        {testimonials.map((item, index) => (
          <FadeIn key={index} delay={index * 150}>
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                padding: isMobile ? "28px" : "36px",
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(10px)",
                minHeight: isMobile ? "auto" : isTablet ? "300px" : "340px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Quote
                  size={isMobile ? 26 : 34}
                  color="#D7FF00"
                  style={{ opacity: 0.4, marginBottom: isMobile ? "20px" : "28px" }}
                />
                <p
                  style={{
                    color: "#B8B8B8",
                    fontSize: isMobile ? "16px" : isTablet ? "17px" : "20px",
                    lineHeight: "1.8",
                    margin: 0,
                  }}
                >
                  "{item.quote}"
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginTop: isMobile ? "28px" : "40px",
                }}
              >
                <div
                  style={{
                    width: isMobile ? "40px" : "48px",
                    height: isMobile ? "40px" : "48px",
                    borderRadius: "999px",
                    background: "linear-gradient(135deg, rgba(215,255,0,0.25), rgba(0,240,255,0.2))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "700",
                    fontSize: isMobile ? "14px" : "16px",
                    flexShrink: 0,
                  }}
                >
                  {item.name[0]}
                </div>
                <div>
                  <p style={{ color: "white", fontWeight: "600", margin: 0, marginBottom: "4px", fontSize: isMobile ? "14px" : "16px" }}>
                    {item.name}
                  </p>
                  <p style={{ color: "#6B6B6B", margin: 0, fontSize: "13px", fontFamily: "var(--font-geist-mono)" }}>
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}