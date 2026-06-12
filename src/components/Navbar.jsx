"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navItems = [
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Lab", href: "/lab" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50,
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      >
        <div style={{ padding: isMobile ? "16px 24px" : "16px 60px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

            {/* Logo */}
            <Link
              href="/"
              style={{
                color: "white", fontSize: "26px", fontWeight: "bold",
                letterSpacing: "-0.03em", textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.textShadow = "0 0 12px rgba(215,255,0,0.5)"}
              onMouseLeave={(e) => e.currentTarget.style.textShadow = "none"}
            >
              HK<span style={{ color: "#D7FF00" }}>.</span>
            </Link>

            {/* Desktop Nav */}
            {!isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: "80px" }}>
                <nav>
                  <ul style={{
                    display: "flex", alignItems: "center", gap: "46px",
                    fontSize: "16px", color: "#686868", letterSpacing: "0.08em",
                    listStyle: "none", margin: 0, padding: 0,
                    fontFamily: "var(--font-geist-mono)",
                  }}>
                    {navItems.map((item) => (
                      <li
                        key={item.name}
                        style={{ cursor: "pointer", transition: "color 0.3s" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "white"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#686868"}
                      >
                        <Link href={item.href} style={{ color: "inherit", textDecoration: "none" }}>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <button
                  style={{
                    height: "52px", padding: "0 32px", borderRadius: "999px",
                    backgroundColor: "#D7FF00", color: "black", fontSize: "16px",
                    fontWeight: "600", border: "none", cursor: "pointer",
                    transition: "transform 0.3s",
                    fontFamily: "var(--font-geist-mono)", letterSpacing: "0.05em",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  Let's Talk ↗
                </button>
              </div>
            )}

            {/* Hamburger Button */}
            {isMobile && (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "8px", display: "flex", flexDirection: "column",
                  gap: "5px", zIndex: 60,
                }}
                aria-label="Toggle menu"
              >
                <span style={{
                  display: "block", width: "24px", height: "2px",
                  background: "#ffffff",
                  transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
                  transition: "transform 0.3s ease",
                }} />
                <span style={{
                  display: "block", width: "24px", height: "2px",
                  background: "#ffffff",
                  opacity: menuOpen ? 0 : 1,
                  transition: "opacity 0.3s ease",
                }} />
                <span style={{
                  display: "block", width: "24px", height: "2px",
                  background: "#ffffff",
                  transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
                  transition: "transform 0.3s ease",
                }} />
              </button>
            )}

          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobile && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 40,
            background: "rgba(5,5,5,0.97)",
            backdropFilter: "blur(20px)",
            display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "center",
            gap: "0px",
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.4s cubic-bezier(0.76,0,0.24,1)",
          }}
        >
          {/* Nav Links */}
          <nav>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, textAlign: "center" }}>
              {navItems.map((item, i) => (
                <li
                  key={item.name}
                  style={{
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.4s ease ${i * 80 + 100}ms, transform 0.4s ease ${i * 80 + 100}ms`,
                    padding: "16px 0",
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      color: "#888888", textDecoration: "none",
                      fontSize: "clamp(36px, 8vw, 56px)",
                      fontWeight: "800", letterSpacing: "-0.02em",
                      fontFamily: "var(--font-geist-mono)",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#D7FF00"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#888888"}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <div
            style={{
              marginTop: "48px",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.4s ease ${navItems.length * 80 + 100}ms, transform 0.4s ease ${navItems.length * 80 + 100}ms`,
            }}
          >
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "inline-block",
                height: "52px", lineHeight: "52px",
                padding: "0 36px", borderRadius: "999px",
                backgroundColor: "#D7FF00", color: "#050505",
                fontSize: "16px", fontWeight: "700", textDecoration: "none",
                fontFamily: "var(--font-geist-mono)", letterSpacing: "0.05em",
              }}
            >
              Let's Talk ↗
            </Link>
          </div>

          {/* Bottom mono label */}
          <p
            style={{
              position: "absolute", bottom: "40px",
              fontFamily: "monospace", fontSize: "11px",
              color: "#333333", letterSpacing: "3px", textTransform: "uppercase",
              opacity: menuOpen ? 1 : 0,
              transition: "opacity 0.4s ease 600ms",
            }}
          >
            Hussain Khan — Designer
          </p>
        </div>
      )}
    </>
  );
}