export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://hussainkhan.co.in/#person",
    name: "Hussain Khan",
    url: "https://hussainkhan.co.in",
    image: "https://hussainkhan.co.in/og-image.jpg",
    jobTitle: "Brand Designer & UI/UX Designer",
    description:
      "Hussain Khan is a freelance brand designer and UI/UX designer based in Bangalore, India, with 4+ years of experience helping startups and businesses build memorable brands, websites, and digital products.",
    knowsAbout: [
      "Brand Identity Design",
      "UI/UX Design",
      "Website Design",
      "Mobile App Design",
      "Brand Strategy",
      "Startup MVP Design",
      "Figma",
      "React",
      "Next.js",
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional Experience",
      description: "4+ years of professional design experience across branding, UI/UX, and web development",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.linkedin.com/in/hussain-khan-667b1b227/",
      "https://www.behance.net/hussainkhan018",
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://hussainkhan.co.in/#service",
    name: "Hussain Khan — Design Studio",
    url: "https://hussainkhan.co.in",
    email: "hello@hussainkhan.co.in",
    image: "https://hussainkhan.co.in/og-image.jpg",
    description:
      "Freelance creative design studio offering brand identity, UI/UX design, website design, startup MVP design, and mobile app design for startups and businesses worldwide.",
    founder: {
      "@type": "Person",
      "@id": "https://hussainkhan.co.in/#person",
      name: "Hussain Khan",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    priceRange: "$$",
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
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Shuaib" },
        reviewBody:
          "Hussain understood our vision immediately and translated it into a brand identity that felt professional, memorable, and built for growth.",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Affan Khan" },
        reviewBody:
          "From strategy to execution, every step was smooth and well thought out. The final outcome exceeded our expectations.",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Sayeed" },
        reviewBody:
          "The attention to detail, consistency, and professionalism throughout the project was outstanding. Highly recommended.",
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
              "Crafting distinctive visual identities including logo systems, color palettes, typography guides, brand guidelines, and brand strategy. Timeline: 3–6 weeks.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Design",
            description:
              "Designing intuitive interfaces including wireframes, UI kits, prototypes, user flows, and design systems for web and mobile platforms. Timeline: 4–8 weeks.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Design",
            description:
              "Building high-performance, responsive websites with CMS integration, SEO setup, analytics, and launch support. Timeline: 4–8 weeks.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Startup MVP Design",
            description:
              "Rapidly designing and validating product concepts including UI design, clickable prototypes, user testing, and dev handoff. Timeline: 2–4 weeks.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Design",
            description:
              "Creating engaging iOS and Android app experiences with onboarding flows, design systems, prototypes, and app store assets. Timeline: 6–10 weeks.",
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
      "Portfolio and design studio of Hussain Khan — brand designer and UI/UX designer based in Bangalore, India.",
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
          text: "Hussain Khan offers Brand Identity Design, UI/UX Design, Website Design, Startup MVP Design, and Mobile App Design. He works with startups and businesses worldwide from his studio in Bangalore, India.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Hussain Khan based?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hussain Khan is a freelance designer based in Bangalore, Karnataka, India. He works with clients worldwide and is fully remote-friendly.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a brand identity project take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A brand identity design project with Hussain Khan typically takes 3–6 weeks, covering discovery and research, strategy development, visual exploration, design refinement, and final delivery.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a website design project take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Website design projects typically take 4–8 weeks, including discovery, sitemap and structure planning, design mockups, development, and launch support.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a startup MVP design take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Startup MVP design projects are completed in 2–4 weeks, covering problem definition, feature scoping, rapid prototyping, user validation, and refinement.",
        },
      },
      {
        "@type": "Question",
        name: "What tools does Hussain Khan use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hussain Khan uses Figma, Adobe Photoshop, Illustrator, and After Effects for design. For development he uses React, Next.js, Tailwind CSS, and Framer Motion. He also integrates AI tools like ChatGPT and Claude into his workflow.",
        },
      },
      {
        "@type": "Question",
        name: "How many projects has Hussain Khan completed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hussain Khan has completed 50+ projects for 30+ happy clients over 4+ years, maintaining 100% client satisfaction across brand identity, UI/UX, and web design work.",
        },
      },
      {
        "@type": "Question",
        name: "How do I contact Hussain Khan for a project?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can reach Hussain Khan through the contact page at hussainkhan.co.in/contact or by emailing hello@hussainkhan.co.in. He is available for freelance projects worldwide.",
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
