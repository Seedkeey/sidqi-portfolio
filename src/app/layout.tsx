import type { Metadata } from "next";
import { Barlow_Condensed, IBM_Plex_Mono, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./portfolio.css";

const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Seed | Electrical Engineering Portfolio",
  description:
    "Portfolio Sidqi Sonjaya, mahasiswa Teknik Elektro yang berfokus pada telekomunikasi, IoT, dan infrastruktur jaringan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
