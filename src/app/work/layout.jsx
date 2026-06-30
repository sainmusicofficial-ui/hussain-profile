export const metadata = {
  title: "Portfolio & Case Studies",
  description:
    "Explore branding, UI/UX, and web design case studies by Hussain Khan — projects spanning healthcare, hospitality, real estate, and professional services for startups across India and worldwide.",
  alternates: {
    canonical: "https://hussainkhan.co.in/work",
  },
  openGraph: {
    title: "Portfolio & Case Studies | Hussain Khan — Brand & UI/UX Designer",
    description:
      "Explore branding, UI/UX, and web design case studies by Hussain Khan — projects spanning healthcare, hospitality, real estate, and professional services.",
    url: "https://hussainkhan.co.in/work",
    images: [
      {
        url: "https://hussainkhan.co.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hussain Khan — Portfolio & Case Studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio & Case Studies | Hussain Khan",
    description:
      "Explore branding, UI/UX, and web design case studies by Hussain Khan.",
  },
};

export default function WorkLayout({ children }) {
  return children;
}