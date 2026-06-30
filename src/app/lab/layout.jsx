export const metadata = {
  title: "Lab",
  description:
    "Experimental design and development work by Hussain Khan — interactive UI experiments, motion design, and creative coding explorations.",
  alternates: {
    canonical: "https://hussainkhan.co.in/lab",
  },
  openGraph: {
    title: "Lab | Hussain Khan",
    description:
      "Experimental design and development work — interactive UI, motion design, and creative coding explorations.",
    url: "https://hussainkhan.co.in/lab",
    images: [
      {
        url: "https://hussainkhan.co.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hussain Khan — Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lab | Hussain Khan",
    description: "Experimental design and development work by Hussain Khan.",
  },
};

export default function LabLayout({ children }) {
  return children;
}