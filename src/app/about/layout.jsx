export const metadata = {
  title: "About Hussain Khan | Brand Strategist & UI/UX Designer, Bangalore",
  description:
    "Meet Hussain Khan — a freelance brand identity designer and UI/UX designer based in Bangalore, India, with 4+ years of experience helping startups and businesses build memorable brands and digital products.",
  alternates: {
    canonical: "https://hussainkhan.co.in/about",
  },
  openGraph: {
    title: "About Hussain Khan | Brand Strategist & UI/UX Designer, Bangalore",
    description:
      "Freelance brand identity designer and UI/UX designer based in Bangalore, India — helping startups and businesses build memorable brands and digital products.",
    url: "https://hussainkhan.co.in/about",
    images: [
      {
        url: "https://hussainkhan.co.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Hussain Khan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Hussain Khan | Brand Strategist & UI/UX Designer",
    description:
      "Freelance brand identity designer and UI/UX designer based in Bangalore, India.",
  },
};

export default function AboutLayout({ children }) {
  return children;
}