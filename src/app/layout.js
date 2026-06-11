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
  title: "Hussain Khan",
  description: "Creative Designer & Brand Strategist",
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