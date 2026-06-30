export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://hussainkhan.co.in/#person",
    name: "Hussain Khan",
    url: "https://hussainkhan.co.in",
    image: "https://hussainkhan.co.in/og-image.png",
    jobTitle: "Brand Designer & UI/UX Designer",
    email: "hello@hussainkhan.co.in",
    description:
      "Freelance brand identity designer and UI/UX designer based in Bangalore, India with 4+ years experience helping startups build memorable brands and digital products.",
    sameAs: [
      "https://www.linkedin.com/in/hussain-khan-667b1b227/",
      "https://www.behance.net/hussainkhan018",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Brand Identity Design",
      "UI/UX Design",
      "Website Design",
      "Mobile App Design",
      "Startup MVP Design",
      "Brand Strategy",
      "Logo Design",
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://hussainkhan.co.in/#service",
    name: "Hussain Khan Design Studio",
    image: "https://hussainkhan.co.in/og-image.png",
    url: "https://hussainkhan.co.in",
    email: "hello@hussainkhan.co.in",
    description:
      "Freelance brand identity design and UI/UX design studio offering brand identity, logo design, UI/UX design, website design, and mobile app design for startups and businesses in India and worldwide.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    areaServed: ["India", "Worldwide"],
    priceRange: "$$",
    provider: {
      "@type": "Person",
      "@id": "https://hussainkhan.co.in/#person",
      name: "Hussain Khan",
    },
    founder: {
      "@type": "Person",
      "@id": "https://hussainkhan.co.in/#person",
      name: "Hussain Khan",
    },
    sameAs: [
      "https://www.linkedin.com/in/hussain-khan-667b1b227/",
      "https://www.behance.net/hussainkhan018",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "3",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Shuaib" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "Hussain understood our vision immediately and translated it into a brand identity that felt professional, memorable, and built for growth.",
        name: "Outstanding brand identity work",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Affan Khan" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "From strategy to execution, every step was smooth and well thought out. The final outcome exceeded our expectations.",
        name: "Smooth process, excellent outcome",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Sayeed" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "The attention to detail, consistency, and professionalism throughout the project was outstanding. Highly recommended.",
        name: "Professional and highly detailed",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Design Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Brand Identity Design",
            description:
              "Logo system, color palette, typography guide, and brand guidelines. Timeline: 3–6 weeks.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Design",
            description:
              "Wireframes, UI kits, prototypes, user flows, and design systems. Timeline: 4–8 weeks.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Design",
            description:
              "Responsive, conversion-focused websites with CMS integration and SEO setup. Timeline: 4–8 weeks.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Startup MVP Design",
            description:
              "Rapid product validation — UI design, prototypes, user testing, dev handoff. Timeline: 2–4 weeks.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Design",
            description:
              "iOS and Android app UI, onboarding flows, design systems, app store assets. Timeline: 6–10 weeks.",
          },
        },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://hussainkhan.co.in/#website",
    name: "Hussain Khan",
    url: "https://hussainkhan.co.in",
    description:
      "Portfolio and studio site of Hussain Khan, freelance brand identity designer and UI/UX designer based in Bangalore, India.",
    author: {
      "@type": "Person",
      "@id": "https://hussainkhan.co.in/#person",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://hussainkhan.co.in/work?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does Hussain Khan offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hussain Khan offers brand identity design, UI/UX design, website design, startup MVP design, and mobile app design — serving startups and businesses in India and globally.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Hussain Khan based?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hussain Khan is based in Bangalore, India, and works with clients worldwide on remote design projects.",
        },
      },
      {
        "@type": "Question",
        name: "How many projects has Hussain Khan completed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hussain Khan has completed 50+ projects for 30+ clients across healthcare, hospitality, real estate, e-commerce, and professional services in 4+ years of freelance design work.",
        },
      },
      {
        "@type": "Question",
        name: "How long does brand identity design take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Brand identity design typically takes 3–6 weeks, covering discovery, strategy development, visual exploration, design refinement, and final delivery.",
        },
      },
      {
        "@type": "Question",
        name: "How long does UI/UX design take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UI/UX design projects typically take 4–8 weeks depending on scope and complexity. Startup MVP design can be completed in 2–4 weeks using a rapid design sprint approach.",
        },
      },
      {
        "@type": "Question",
        name: "Do you work with international clients?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Hussain Khan works with clients globally, delivering all projects remotely with structured discovery, regular check-ins, and clear deliverable milestones.",
        },
      },
      {
        "@type": "Question",
        name: "What tools does Hussain Khan use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hussain uses Figma, Adobe Illustrator, Photoshop, and After Effects for design, and React, Next.js, Tailwind CSS, and Framer Motion for development.",
        },
      },
      {
        "@type": "Question",
        name: "How do I contact Hussain Khan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can contact Hussain Khan by emailing hello@hussainkhan.co.in or using the contact form at hussainkhan.co.in/contact.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}