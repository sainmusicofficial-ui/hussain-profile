"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const categories = [
  "All",
  "Branding",
  "Website",
  "Restaurant",
  "Startup MVP",
];

const projects = [
  {
    id: "medizap",
    title: "Medizap",
    category: "Startup MVP",
    tags: ["Website", "Logo Design", "UI/UX", "App Development"],
    description:
      "Healthcare startup focused on simplifying medical access through branding, website design, UI/UX, and mobile product development.",
    year: "2026",
    color: "from-cyan/10 to-cyan/5",
  },

  {
    id: "ss-auditors",
    title: "SS Auditors & Tax Consultants",
    category: "Website",
    tags: ["E-Commerce Website", "Company Profile"],
    description:
      "Professional digital presence and company profile developed for a modern auditing and compliance firm.",
    year: "2024",
    color: "from-volt/10 to-transparent",
  },

  {
    id: "brisket-and-chops",
    title: "Brisket & Chops",
    category: "Restaurant",
    tags: ["Logo Design", "Website", "Pitch Deck"],
    description:
      "Premium restaurant brand built from the ground up including identity, website, and investor-ready presentation.",
    year: "2025",
    color: "from-cyan/8 to-transparent",
  },

  {
    id: "ruyadar",
    title: "Ruyadar Projects LLP",
    category: "Branding",
    tags: [
      "Logo Design",
      "Website",
      "Company Profile",
      "Business Cards",
      "Social Media",
    ],
    description:
      "Complete business branding ecosystem including website, company profile, print assets, and social media management.",
    year: "2025",
    color: "from-volt/8 to-transparent",
  },

  {
    id: "myas-and-co",
    title: "MY AS & CO",
    category: "Website",
    tags: ["Company Profile", "Corporate Website"],
    description:
      "Professional company profile and website crafted to strengthen credibility and business positioning.",
    year: "2026",
    color: "from-cyan/8 to-volt/8",
  },

  {
    id: "olesome",
    title: "Olesome",
    category: "Website",
    tags: ["E-Commerce Website", "Logo Design"],
    description:
      "US-based e-commerce brand featuring a custom website experience and distinctive visual identity.",
    year: "2025",
    color: "from-volt/10 to-cyan/10",
  },

  {
    id: "aurenza",
    title: "Aurenza",
    category: "Branding",
    tags: ["Logo Design", "Brand Identity"],
    description:
      "Luxury-inspired visual identity and logo design created to establish a distinctive and memorable brand presence.",
    year: "2025",
    color: "from-cyan/10 to-transparent",
  },
];

export default function Projects2() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="px-5 md:px-[5vw] py-20 md:py-32 relative">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#D7FF00]/5 rounded-full blur-[150px]" />

        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs tracking-widest uppercase mb-6"
            style={{
              color: "#D7FF00",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            // Portfolio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
          >
            Featured
            <br />
            <span style={{ color: "#D7FF00" }}>Work</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg max-w-xl"
            style={{ color: "#8A8A8A" }}
          >
            A selection of brands, websites, and digital experiences crafted
            to help businesses stand out and grow.
          </motion.p>
        </div>
      </section>

      <div className="syntax-rule" />

      {/* Filters */}
      <section className="px-5 md:px-[5vw] py-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-[#D7FF00] text-black"
                  : "glass text-white/60 hover:text-white"
              }`}
              style={{
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="px-5 md:px-[5vw] py-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="wait">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  delay: i * 0.05,
                  duration: 0.4,
                }}
                layout
              >
                <Link href={`/work/${project.id}`}>
                  <div className="group glass rounded-2xl overflow-hidden cursor-pointer hover:border-[#D7FF00]/20 transition-all duration-500">
                    <div
                      className={`aspect-[16/10] bg-gradient-to-br ${project.color} relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl md:text-7xl font-bold text-white/[0.03] group-hover:text-white/[0.06] transition-all duration-700 group-hover:scale-105">
                          {project.title}
                        </span>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      <div className="absolute inset-0 flex items-end p-6 md:p-8">
                        <div className="w-full">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className="text-[10px] tracking-wider uppercase"
                              style={{
                                color: "#D7FF00",
                                fontFamily:
                                  "var(--font-geist-mono)",
                              }}
                            >
                              {project.year}
                            </span>

                            <span className="text-white/20">·</span>

                            <span
                              className="text-[10px] tracking-wider uppercase"
                              style={{
                                color: "#8A8A8A",
                                fontFamily:
                                  "var(--font-geist-mono)",
                              }}
                            >
                              {project.category}
                            </span>
                          </div>

                          <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-[#D7FF00] transition-colors duration-300">
                            {project.title}
                          </h3>

                          <p
                            className="text-sm mb-4"
                            style={{ color: "#A0A0A0" }}
                          >
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] px-3 py-1 rounded-full border border-white/10"
                                style={{
                                  color: "#8A8A8A",
                                  fontFamily:
                                    "var(--font-geist-mono)",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:bg-[#D7FF00] group-hover:border-[#D7FF00]">
                        <ArrowUpRight className="w-4 h-4 group-hover:text-black" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}