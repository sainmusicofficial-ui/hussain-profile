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

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p style={{ color: "#666666", fontSize: "14px", marginBottom: "64px" }}>
            Last updated: June 21, 2026
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <Section title="Agreement to Terms">
            <p>
              These Terms of Service ("Terms") govern your use of hussainkhan.co.in (the
              "Site"), operated by Hussain Khan, a freelance creative designer and brand
              strategist based in Bangalore, India. By accessing or using the Site, you
              agree to these Terms. If you don't agree, please don't use the Site.
            </p>
          </Section>

          <Section title="Use of the Site">
            <p style={{ marginBottom: "16px" }}>
              The Site is provided to showcase my work, services, and to allow potential
              clients to get in touch. You agree to use the Site only for lawful purposes
              and not to:
            </p>
            <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Attempt to gain unauthorized access to the Site or its systems</li>
              <li>Use the Site to transmit harmful code, spam, or malicious content</li>
              <li>Scrape, copy, or republish content from the Site without permission</li>
              <li>Misrepresent your identity when submitting enquiries</li>
            </ul>
          </Section>

          <Section title="Intellectual Property">
            <p>
              All content on the Site — including but not limited to design work, case
              studies, branding, written content, graphics, and the Site's own design and
              code — is the property of Hussain Khan unless otherwise credited, and is
              protected by applicable copyright and intellectual property laws. Project work
              shown in case studies remains the property of the respective clients where
              applicable, shown here with permission for portfolio purposes. You may not
              reproduce, distribute, or use any content from this Site for commercial
              purposes without prior written consent.
            </p>
          </Section>

          <Section title="Enquiries & Project Work">
            <p style={{ marginBottom: "16px" }}>
              Submitting an enquiry through the contact form does not constitute a binding
              agreement or contract. Any actual project engagement — including scope,
              timeline, pricing, deliverables, and payment terms — will be agreed upon
              separately in writing (such as a proposal, quote, or signed agreement) before
              work begins.
            </p>
            <p>
              Services described on the Site (Brand Identity, UI/UX Design, Website Design,
              etc.) are offered on a project basis. Specific terms, pricing, and timelines
              for each engagement are determined individually and communicated directly to
              the client.
            </p>
          </Section>

          <Section title="No Guarantees">
            <p>
              While I aim to deliver high-quality creative and development work, the Site
              and its content are provided "as is" without warranties of any kind, express
              or implied. I do not guarantee that the Site will be uninterrupted, error-free,
              or secure at all times.
            </p>
          </Section>

          <Section title="Limitation of Liability">
            <p>
              To the fullest extent permitted by law, Hussain Khan shall not be liable for
              any indirect, incidental, special, or consequential damages arising from your
              use of, or inability to use, the Site.
            </p>
          </Section>

          <Section title="Third-Party Links">
            <p>
              The Site may contain links to third-party websites (such as Behance, LinkedIn,
              Instagram, or Dribbble). I am not responsible for the content, privacy
              practices, or terms of any third-party sites.
            </p>
          </Section>

          <Section title="Changes to These Terms">
            <p>
              These Terms may be updated from time to time. Continued use of the Site after
              changes are posted constitutes acceptance of the revised Terms. The "Last
              updated" date above reflects the most recent revision.
            </p>
          </Section>

          <Section title="Governing Law">
            <p>
              These Terms are governed by the laws of India. Any disputes arising from these
              Terms or use of the Site will be subject to the jurisdiction of the courts in
              Bangalore, Karnataka, India.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about these Terms can be sent to{" "}
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