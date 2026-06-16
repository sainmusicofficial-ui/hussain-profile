import {
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

import CursorGlow from "@/components/CursorGlow";

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

  title: {
    default: "Hussain Khan | Brand Designer & UI/UX Designer",
    template: "%s | Hussain Khan",
  },

  description:
    "Creative Designer & Brand Strategist helping startups and businesses build memorable brands, websites, and digital experiences.",

  keywords: [
    "Hussain Khan",
    "Brand Designer",
    "UI UX Designer",
    "Web Designer",
    "Product Designer",
    "Brand Strategist",
    "Freelance Designer",
    "Portfolio",
    "Bangalore Designer",
  ],

  authors: [{ name: "Hussain Khan" }],

  openGraph: {
    title: "Hussain Khan | Brand Designer & UI/UX Designer",
    description:
      "Helping startups and businesses build memorable brands, websites, and digital experiences.",
    url: "https://hussainkhan.co.in",
    siteName: "Hussain Khan",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hussain Khan",
    description:
      "Creative Designer & Brand Strategist helping startups build memorable brands and products.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
  className={`${jakarta.variable} ${jetbrains.variable} ${geistMono.variable}`}
>
  {children}
  <CursorGlow />
</body>
    </html>
  );
}