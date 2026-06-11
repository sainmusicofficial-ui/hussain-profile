"use client";

import { ArrowUpRight } from "lucide-react";

const footerLinks = [
"Work",
"About",
"Services",
"Lab",
"Contact",
];

const socials = [
"Instagram",
"LinkedIn",
"Behance",
"Dribbble",
];

export default function Footer() {
return (
<footer
style={{
borderTop: "1px solid rgba(255,255,255,0.08)",
padding: "100px 60px 40px",
}}
>
<div
style={{
display: "grid",
gridTemplateColumns: "1fr 1fr 1fr",
gap: "80px",
marginBottom: "80px",
}}
>
{/* Navigation */} <div>
<p
style={{
fontFamily: "var(--font-geist-mono)",
color: "#6B6B6B",
fontSize: "12px",
letterSpacing: "0.15em",
textTransform: "uppercase",
marginBottom: "24px",
}}
>
Navigation </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {footerLinks.map((item) => (
          <a
            key={item}
            href="#"
            style={{
              color: "#B8B8B8",
              textDecoration: "none",
              transition: "0.3s",
            }}

            onMouseEnter={(e) => {
    e.target.style.color = "#D7FF00";
    e.target.style.textShadow =
      "0 0 10px #D7FF00, 0 0 20px #D7FF00";
  }}

  onMouseLeave={(e) => {
    e.target.style.color = "#B8B8B8";
    e.target.style.textShadow = "none";
  }}

          >
            {item}
          </a>
        ))}
      </div>
    </div>

    {/* Connect */}
    <div>
      <p
        style={{
          fontFamily: "var(--font-geist-mono)",
          color: "#6B6B6B",
          fontSize: "12px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "24px",
        }}
      >
        Connect
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {socials.map((item) => (
          <a
            key={item}
            href="#"
            style={{
              color: "#B8B8B8",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}

            onMouseEnter={(e) => {
      e.currentTarget.style.color = "#D7FF00";
      e.currentTarget.style.textShadow =
        "0 0 10px #D7FF00, 0 0 20px #D7FF00";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = "#B8B8B8";
      e.currentTarget.style.textShadow = "none";
    }}

          >
            {item}
            <ArrowUpRight size={14} />
          </a>
        ))}
      </div>
    </div>

    {/* Contact */}
    <div>
      <p
        style={{
          fontFamily: "var(--font-geist-mono)",
          color: "#6B6B6B",
          fontSize: "12px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "24px",
        }}
      >
        Get In Touch
      </p>

      <p
        style={{
          color: "#B8B8B8",
          marginBottom: "16px",
        }}
      >
        hello@hussainkhan.design
      </p>

      <p
        style={{
          color: "#6B6B6B",
          marginBottom: "12px",
        }}
      >
        Available for freelance projects
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "999px",
            background: "#D7FF00",
          }}
        />

        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            color: "#D7FF00",
            fontSize: "12px",
          }}
        >
          Open to work
        </span>
      </div>
    </div>
  </div>

  <div
    style={{
      borderTop: "1px solid rgba(255,255,255,0.08)",
      paddingTop: "30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <p
      style={{
        fontFamily: "var(--font-geist-mono)",
        color: "#6B6B6B",
        fontSize: "12px",
      }}
    >
      © 2026 Hussain Khan. All rights reserved.
    </p>

    <p
      style={{
        fontFamily: "var(--font-geist-mono)",
        color: "#6B6B6B",
        fontSize: "12px",
      }}
    >
      Designed & Developed by Hussain Khan
    </p>
  </div>
</footer>


);
}
