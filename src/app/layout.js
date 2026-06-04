import { Space_Grotesk, Figtree } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-figtree",
});

export const metadata = {
  title: "Hussain Khan",
  description: "Creative Designer & Brand Strategist",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
  className={`${spaceGrotesk.variable} ${figtree.variable}`}
>
  {children}
</body>
    </html>
  );
}