"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

function FadeIn({ children, delay = 0 }) {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "48px" }}>
      <h2 style={{
        color: "#ffffff", fontSize: "22px", fontWeight: "700",
        marginBottom: "16px", letterSpacing: "-0.01em",
      }}>
        {title}
      </h2>
      <div style={{ color: "#9A9A9A", fontSize: "15px", lineHeight: "1.8" }}>
        {children}
      </div>
    </div>
  );
}

const cookieRows = [
  { name: "_ga", provider: "Google Analytics", purpose: "Distinguishes unique visitors", expiry: "2 years" },
  { name: "_ga_*", provider: "Google Analytics", purpose: "Maintains session state for GA4", expiry: "2 years" },
  { name: "_gid", provider: "Google Analytics", purpose: "Distinguishes visitors for 24-hour reporting", expiry: "24 hours" },
];

export default function CookiePolicyPage() {
  return (
    <main style={{ background: "#050505", minHeight: "100vh" }}>
      <Navbar />
      <div style={{
        maxWidth: "780px",
        margin: "0 auto",
        padding: "160px 24px 120px",
      }}>
        <FadeIn>
          <p style={{
            color: "#D7FF00", fontSize: "11px", letterSpacing: "0.25em",
            textTransform: "uppercase", marginBottom: "16px",
            fontFamily: "var(--font-geist-mono, monospace)",
          }}>
            // Legal
          </p>
          <h1 style={{
            color: "#ffffff", fontSize: "clamp(36px, 6vw, 52px)",
            fontWeight: "800", letterSpacing: "-0.03em", marginBottom: "12px",
          }}>
            Cookie Policy
          </h1>
          <p style={{ color: "#666666", fontSize: "14px", marginBottom: "64px" }}>
            Last updated: June 21, 2026
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <Section title="What Are Cookies">
            <p>
              Cookies are small text files placed on your device when you visit a website.
              They help the site remember information about your visit, such as your
              preferences or how you interact with the site, and are widely used to make
              websites work more effectively and to provide reporting information.
            </p>
          </Section>

          <Section title="Cookies I Use">
            <p style={{ marginBottom: "20px" }}>
              hussainkhan.co.in uses Google Analytics to understand how visitors use the
              Site — which pages are popular, how long visitors stay, and general traffic
              sources. This helps me improve the Site over time. The specific cookies set
              are:
            </p>

            <div style={{
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              overflow: "hidden",
            }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.2fr 1.8fr 1fr",
                gap: "12px",
                padding: "14px 16px",
                background: "rgba(255,255,255,0.03)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}>
                {["Cookie", "Provider", "Purpose", "Expiry"].map((h) => (
                  <span key={h} style={{
                    color: "#D7FF00", fontSize: "11px", fontWeight: "600",
                    textTransform: "uppercase", letterSpacing: "0.08em",
                    fontFamily: "var(--font-geist-mono, monospace)",
                  }}>
                    {h}
                  </span>
                ))}
              </div>
              {cookieRows.map((row, i) => (
                <div key={row.name} style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1.2fr 1.8fr 1fr",
                  gap: "12px",
                  padding: "16px",
                  borderBottom: i < cookieRows.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}>
                  <span style={{ color: "#cccccc", fontSize: "13px", fontFamily: "monospace" }}>{row.name}</span>
                  <span style={{ color: "#9A9A9A", fontSize: "13px" }}>{row.provider}</span>
                  <span style={{ color: "#9A9A9A", fontSize: "13px" }}>{row.purpose}</span>
                  <span style={{ color: "#9A9A9A", fontSize: "13px" }}>{row.expiry}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Why I Use These Cookies">
            <p>
              Google Analytics cookies help me understand visitor behavior in an aggregated,
              anonymized way — like which projects in my portfolio get the most attention,
              or which pages visitors leave from. This isn't used to track you individually
              or sell data; it simply helps me make the Site more useful over time.
            </p>
          </Section>

          <Section title="Managing Cookies">
            <p style={{ marginBottom: "16px" }}>
              You can control or delete cookies through your browser settings at any time.
              Most browsers let you:
            </p>
            <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>View what cookies are stored and delete them individually</li>
              <li>Block third-party cookies</li>
              <li>Block all cookies from being set</li>
              <li>Delete all cookies when you close the browser</li>
            </ul>
            <p style={{ marginTop: "16px" }}>
              Note that blocking all cookies may affect how some parts of the Site function.
              You can also opt out of Google Analytics tracking specifically using the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#D7FF00", textDecoration: "none" }}
              >
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>
          </Section>

          <Section title="Changes to This Policy">
            <p>
              This Cookie Policy may be updated periodically to reflect changes in the
              cookies used on the Site. The "Last updated" date above reflects the most
              recent revision.
            </p>
          </Section>

          <Section title="Related Policies">
            <p>
              For more on how your information is collected and used more broadly, see the{" "}
              <Link href="/privacy-policy" style={{ color: "#D7FF00", textDecoration: "none" }}>
                Privacy Policy
              </Link>.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about this Cookie Policy can be sent to{" "}
              <a href="mailto:hello@hussainkhan.co.in" style={{ color: "#D7FF00", textDecoration: "none" }}>
                hello@hussainkhan.co.in
              </a>.
            </p>
          </Section>
        </FadeIn>
      </div>
      <Footer />
    </main>
  );
}