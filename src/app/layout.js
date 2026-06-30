import {
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

import CursorGlow from "@/components/CursorGlow";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import JsonLd from "@/components/JsonLd";
import AskHussainChat from "@/components/AskHussainChat";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800"],
  variable: "--font-jakarta",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  variable: "--font-mono",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  metadataBase: new URL("https://hussainkhan.co.in"),

  alternates: {
    canonical: "https://hussainkhan.co.in",
  },

  title: {
    default: "Hussain Khan | Freelance Brand & UI/UX Designer in Bangalore",
    template: "%s | Hussain Khan",
  },

 description:
  "Freelance brand designer and UI/UX designer in Bangalore. 4+ years helping startups build memorable brands and digital products.",

  keywords: [
    "Hussain Khan",
    "freelance brand designer Bangalore",
    "UI UX designer for startups India",
    "brand identity designer India",
    "hire brand designer India",
    "startup branding designer",
    "freelance UI UX designer India",
    "Brand Designer Bangalore",
    "Logo Designer Bangalore",
    "Web Designer Bangalore",
  ],

  authors: [{ name: "Hussain Khan", url: "https://hussainkhan.co.in" }],
  creator: "Hussain Khan",
  category: "Design",

  openGraph: {
    title: "Hussain Khan | Freelance Brand & UI/UX Designer in Bangalore",
    description:
      "Hussain Khan is a freelance brand identity designer and UI/UX designer based in Bangalore, India. 4+ years helping startups build memorable brands and digital products.",
    url: "https://hussainkhan.co.in",
    siteName: "Hussain Khan",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://hussainkhan.co.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hussain Khan — Brand Designer & UI/UX Designer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Hussain Khan | Freelance Brand & UI/UX Designer",
    description:
      "Freelance brand identity designer and UI/UX designer based in Bangalore — helping startups build memorable brands and products.",
    creator: "@hussainkhandesign",
    images: ["https://hussainkhan.co.in/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} ${jetbrains.variable} ${geistMono.variable}`}
      >
        <JsonLd />
        <SmoothScroll>
          {children}
          <CursorGlow />
          <CustomCursor />
          <AskHussainChat />
        </SmoothScroll>
      </body>
    </html>
  );
}