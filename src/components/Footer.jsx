"use client";
import { useEffect, useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

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

// ─── Data ─────────────────────────────────────────────────────────────────────
const footerLinks = [
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Lab", href: "/lab" },
  { name: "Contact", href: "/contact" },
];

const socials = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/hussain-khan-667b1b227/" },
  { name: "Behance", href: "https://www.behance.net/hussainkhan018" },
  { name: "Dribbble", href: "https://dribbble.com" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Footer() {
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
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: isMobile ? "60px 24px 32px" : isTablet ? "80px 40px 32px" : "100px 60px 40px",
      }}
    >
      {/* Top Grid */}
      <FadeIn delay={0}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr",
            gap: isMobile ? "48px 24px" : isTablet ? "48px 40px" : "80px",
            marginBottom: isMobile ? "48px" : "80px",
          }}
        >

          {/* Navigation */}
          <FadeIn delay={0} direction="up">
            <div>
              <p style={{
                fontFamily: "var(--font-geist-mono)",
                color: "#6B6B6B", fontSize: "12px",
                letterSpacing: "0.15em", textTransform: "uppercase",
                marginBottom: "24px",
              }}>
                Navigation
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {footerLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    style={{
                      color: "#B8B8B8", textDecoration: "none",
                      fontSize: isMobile ? "14px" : "15px",
                      transition: "color 0.3s ease, text-shadow 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#D7FF00";
                      e.currentTarget.style.textShadow = "0 0 10px #D7FF00, 0 0 20px #D7FF00";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#B8B8B8";
                      e.currentTarget.style.textShadow = "none";
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Connect */}
          <FadeIn delay={100} direction="up">
            <div>
              <p style={{
                fontFamily: "var(--font-geist-mono)",
                color: "#6B6B6B", fontSize: "12px",
                letterSpacing: "0.15em", textTransform: "uppercase",
                marginBottom: "24px",
              }}>
                Connect
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {socials.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#B8B8B8", textDecoration: "none",
                      display: "flex", alignItems: "center", gap: "6px",
                      fontSize: isMobile ? "14px" : "15px",
                      transition: "color 0.3s ease, text-shadow 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#D7FF00";
                      e.currentTarget.style.textShadow = "0 0 10px #D7FF00, 0 0 20px #D7FF00";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#B8B8B8";
                      e.currentTarget.style.textShadow = "none";
                    }}
                  >
                    {item.name}
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Get In Touch */}
          <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
            <FadeIn delay={200} direction="up">
              <div>
                <p style={{
                  fontFamily: "var(--font-geist-mono)",
                  color: "#6B6B6B", fontSize: "12px",
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  marginBottom: "24px",
                }}>
                  Get In Touch
                </p>

                <a
                  href="mailto:hello@hussainkhan.co.in"
                  style={{
                    color: "#B8B8B8", textDecoration: "none",
                    display: "block", marginBottom: "16px",
                    fontSize: isMobile ? "14px" : "15px",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#D7FF00"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#B8B8B8"}
                >
                  hello@hussainkhan.co.in
                </a>

                <p style={{
                  color: "#6B6B6B", marginBottom: "16px",
                  fontSize: isMobile ? "13px" : "15px",
                }}>
                  Available for freelance projects
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{
                    width: "8px", height: "8px",
                    borderRadius: "999px", background: "#D7FF00",
                    boxShadow: "0 0 8px rgba(215,255,0,0.6)",
                  }} />
                  <span style={{
                    fontFamily: "var(--font-geist-mono)",
                    color: "#D7FF00", fontSize: "12px",
                  }}>
                    Open to work
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </FadeIn>

      {/* Bottom Bar */}
      <FadeIn delay={300}>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "30px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? "8px" : "0",
          }}
        >
          <p style={{ fontFamily: "var(--font-geist-mono)", color: "#6B6B6B", fontSize: "12px" }}>
            © 2026 Hussain Khan. All rights reserved.
          </p>
          <p style={{ fontFamily: "var(--font-geist-mono)", color: "#6B6B6B", fontSize: "12px" }}>
            Designed & Developed by Hussain Khan
          </p>
        </div>
      </FadeIn>
    </footer>
  );
}