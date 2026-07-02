"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ParticleField from "@/components/ParticleField";

// ── Easy-to-edit config ──────────────────────────────────────────────
const BOOKING_MONTH = "July";           // update this each month
const CAL_LINK = "https://cal.com/hussainkhan";
const WHATSAPP_LINK =
  "https://wa.me/917892309480?text=Hi%20Hussain%2C%20I%20found%20your%20portfolio%20and%20want%20to%20discuss%20a%20project";
// ─────────────────────────────────────────────────────────────────────

export default function CTASection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      data-scroll-section="cta"
      style={{
        position: "relative",
        padding: isMobile ? "100px 24px" : "140px 60px",
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
        {/* Availability line */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#D7FF00",
              boxShadow: "0 0 12px #D7FF00",
              display: "inline-block",
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-geist-mono)",
              color: "#D7FF00",
              fontSize: "12px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Currently booking — 2 slots for {BOOKING_MONTH}
          </p>
        </div>

        <h2
          style={{
            fontSize: isMobile ? "clamp(40px, 12vw, 56px)" : "clamp(64px, 8vw, 110px)",
            lineHeight: "0.98",
            fontWeight: "700",
            letterSpacing: "-0.04em",
            color: "white",
            maxWidth: "1100px",
            margin: 0,
          }}
        >
          Let's build something{" "}
          <span style={{ color: "#D7FF00" }}>
            people remember
          </span>
        </h2>

        <p
          style={{
            marginTop: "32px",
            maxWidth: "650px",
            color: "#8A8A8A",
            fontSize: isMobile ? "16px" : "18px",
            lineHeight: "1.8",
          }}
        >
          Whether you're launching a startup, refreshing your identity,
          or building a digital product, let's create something memorable.
          Book a free 30-minute discovery call — no pressure, no pitch.
        </p>

        {/* Buttons */}
        <div
          style={{
            marginTop: "48px",
            display: "flex",
            flexWrap: "wrap",
            gap: isMobile ? "12px" : "16px",
            alignItems: "center",
          }}
        >
          {/* Primary — Book a discovery call */}
          <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <button
              style={{
                height: "60px",
                padding: isMobile ? "0 28px" : "0 36px",
                borderRadius: "999px",
                border: "none",
                backgroundColor: "#D7FF00",
                color: "#000",
                fontSize: isMobile ? "14px" : "15px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily: "var(--font-geist-mono)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(215,255,0,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Book a discovery call ↗
            </button>
          </a>

          {/* Secondary — WhatsApp */}
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <button
              style={{
                height: "60px",
                padding: isMobile ? "0 24px" : "0 32px",
                borderRadius: "999px",
                border: "1px solid rgba(37,211,102,0.5)",
                backgroundColor: "transparent",
                color: "#25D366",
                fontSize: isMobile ? "14px" : "15px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily: "var(--font-geist-mono)",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(37,211,102,0.1)";
                e.currentTarget.style.borderColor = "#25D366";
                e.currentTarget.style.boxShadow = "0 0 24px rgba(37,211,102,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(37,211,102,0.5)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a11.899 11.899 0 005.71 1.454h.006c6.585 0 11.946-5.359 11.949-11.945a11.86 11.86 0 00-3.487-8.404z"/>
              </svg>
              Chat on WhatsApp
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}