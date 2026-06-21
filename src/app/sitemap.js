const caseStudySlugs = [
  "medizap",
  "ss-auditors",
  "brisket-and-chops",
  "ruyadar",
  "myas-and-co",
  "olesome",
  "aurenza",
];

export default function sitemap() {
  const baseUrl = "https://hussainkhan.co.in";
  const now = new Date();

  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/lab`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/cookie-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const caseStudyPages = caseStudySlugs.map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...caseStudyPages];
}