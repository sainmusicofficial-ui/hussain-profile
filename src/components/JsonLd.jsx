export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Hussain Khan",
    url: "https://hussainkhan.co.in",
    image: "https://hussainkhan.co.in/og-image.jpg",
    jobTitle: "Brand Designer & UI/UX Designer",
    description:
      "Creative Designer & Brand Strategist helping startups and businesses build memorable brands, websites, and digital experiences.",
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
      "Brand Strategy",
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Hussain Khan — Design & Development",
    image: "https://hussainkhan.co.in/og-image.jpg",
    "@id": "https://hussainkhan.co.in",
    url: "https://hussainkhan.co.in",
    email: "hello@hussainkhan.co.in",
    description:
      "Freelance creative design and brand strategy studio offering brand identity, UI/UX design, website design, and mobile app design for startups and businesses.",
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
    founder: {
      "@type": "Person",
      name: "Hussain Khan",
    },
    sameAs: [
      "https://www.linkedin.com/in/hussain-khan-667b1b227/",
      "https://www.behance.net/hussainkhan018",
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
              "Crafting distinctive visual identities that capture your brand's essence and resonate with your target audience.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Design",
            description:
              "Designing intuitive and beautiful interfaces that deliver seamless user experiences across all platforms.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Design",
            description:
              "Building high-performance websites that combine stunning visuals with conversion-focused design.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Startup MVP Design",
            description:
              "Rapidly designing and validating your product concept to get to market faster with confidence.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Design",
            description:
              "Creating engaging mobile experiences that users love, optimized for iOS and Android platforms.",
          },
        },
      ],
    },
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
    </>
  );
}