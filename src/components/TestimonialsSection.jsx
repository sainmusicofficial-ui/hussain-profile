"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Hussain understood our vision immediately and translated it into a brand identity that felt professional, memorable, and built for growth.",
    name: "Shuaib",
    role: "Director, MedZap",
  },
  {
    quote:
      "From strategy to execution, every step was smooth and well thought out. The final outcome exceeded our expectations.",
    name: "Affan Khan",
    role: "Partner, Ruyadar",
  },
  {
    quote:
      "The attention to detail, consistency, and professionalism throughout the project was outstanding. Highly recommended.",
    name: "Sayeed",
    role: "Founder, SS Auditors",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      style={{
        padding: "140px 60px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ marginBottom: "80px" }}
      >
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
            fontSize: "72px",
            fontWeight: "700",
            color: "white",
            letterSpacing: "-0.04em",
            margin: 0,
          }}
        >
          Testimonials
        </h2>
      </motion.div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "28px",
        }}
      >
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ y: -10 }}
            style={{
              padding: "36px",
              borderRadius: "24px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
              backdropFilter: "blur(10px)",
              minHeight: "340px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Quote
                size={34}
                color="#D7FF00"
                style={{
                  opacity: 0.4,
                  marginBottom: "28px",
                }}
              />

              <p
                style={{
                  color: "#B8B8B8",
                  fontSize: "20px",
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
                marginTop: "40px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "999px",
                  background:
                    "linear-gradient(135deg, rgba(215,255,0,0.25), rgba(0,240,255,0.2))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "700",
                }}
              >
                {item.name[0]}
              </div>

              <div>
                <p
                  style={{
                    color: "white",
                    fontWeight: "600",
                    margin: 0,
                    marginBottom: "4px",
                  }}
                >
                  {item.name}
                </p>

                <p
                  style={{
                    color: "#6B6B6B",
                    margin: 0,
                    fontSize: "13px",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                >
                  {item.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}