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

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p style={{ color: "#666666", fontSize: "14px", marginBottom: "64px" }}>
            Last updated: June 21, 2026
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <Section title="Overview">
            <p>
              Hussain Khan ("I", "me", or "my") operates hussainkhan.co.in (the "Site").
              This Privacy Policy explains what information I collect when you visit
              or interact with the Site, how it's used, and the choices you have.
              By using the Site, you agree to the practices described here.
            </p>
          </Section>

          <Section title="Information I Collect">
            <p style={{ marginBottom: "16px" }}>
              <strong style={{ color: "#cccccc" }}>Contact form submissions.</strong> When
              you submit an enquiry through the contact form or "Let's Talk" popup, I collect
              your name, email address, message, and optionally your project type and budget
              range. This information is used solely to respond to your enquiry and discuss
              potential work together.
            </p>
            <p style={{ marginBottom: "16px" }}>
              <strong style={{ color: "#cccccc" }}>Usage data.</strong> The Site uses Google
              Analytics to understand how visitors use the Site — pages viewed, time spent,
              general location (city/country level), device and browser type, and referral
              source. This data is aggregated and does not directly identify you personally.
            </p>
            <p>
              <strong style={{ color: "#cccccc" }}>Email correspondence.</strong> If you email
              me directly, I retain that correspondence as needed to respond to and manage
              our communication.
            </p>
          </Section>

          <Section title="How I Use Your Information">
            <p>I use the information collected to:</p>
            <ul style={{ paddingLeft: "20px", marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Respond to enquiries and discuss potential projects</li>
              <li>Understand how visitors use and navigate the Site, to improve it</li>
              <li>Communicate with you about a project you've enquired about</li>
            </ul>
            <p style={{ marginTop: "16px" }}>
              I do not sell, rent, or trade your personal information to third parties for
              marketing purposes.
            </p>
          </Section>

          <Section title="Data Sharing">
            <p>
              Your contact form submissions are processed through Resend, a transactional
              email service, solely to deliver your enquiry to me and send you an automatic
              confirmation. Google Analytics processes anonymized usage data under Google's
              own privacy practices. I do not share your personal information with any other
              third party except as required by law.
            </p>
          </Section>

          <Section title="Data Retention">
            <p>
              I retain contact form submissions and email correspondence for as long as
              reasonably necessary to respond to your enquiry and, if we work together, for
              the duration of our professional relationship and a reasonable period afterward
              for record-keeping purposes. You can request deletion of your data at any time
              (see "Your Rights" below).
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              The Site uses cookies primarily through Google Analytics to understand visitor
              behavior. For details on what cookies are used and how to manage them, see the{" "}
              <Link href="/cookie-policy" style={{ color: "#D7FF00", textDecoration: "none" }}>
                Cookie Policy
              </Link>.
            </p>
          </Section>

          <Section title="Your Rights">
            <p>You can request to:</p>
            <ul style={{ paddingLeft: "20px", marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Access the personal data I hold about you</li>
              <li>Correct any inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for further communication</li>
            </ul>
            <p style={{ marginTop: "16px" }}>
              To make any of these requests, email me at{" "}
              <a href="mailto:hello@hussainkhan.co.in" style={{ color: "#D7FF00", textDecoration: "none" }}>
                hello@hussainkhan.co.in
              </a>.
            </p>
          </Section>

          <Section title="Security">
            <p>
              I take reasonable measures to protect the information you share with me,
              including using secure third-party services (Resend, Google Analytics) that
              maintain their own security standards. However, no method of transmission over
              the internet is 100% secure, and I cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="Children's Privacy">
            <p>
              The Site is not directed at individuals under the age of 18, and I do not
              knowingly collect personal information from children.
            </p>
          </Section>

          <Section title="Changes to This Policy">
            <p>
              I may update this Privacy Policy from time to time to reflect changes in
              practices or for legal/regulatory reasons. The "Last updated" date at the top
              of this page will reflect the most recent revision.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              If you have questions about this Privacy Policy or how your data is handled,
              reach out at{" "}
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