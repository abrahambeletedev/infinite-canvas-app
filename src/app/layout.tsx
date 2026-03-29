import type { Metadata } from "next";
import { Playfair_Display, Inter, Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", style: 'italic' });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const signature = Mrs_Saint_Delafield({ weight: "400", subsets: ["latin"], variable: "--font-signature" });

export const metadata: Metadata = {
  title: "BEVVLEN | Artist Portfolio",
  description: "A digital portfolio showcasing the work of BEVVLEN, a visionary artist exploring the intersection of technology and design",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${signature.variable}`}>
      <body className="bg-[#050505] text-zinc-100 antialiased selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}