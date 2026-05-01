import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const chunko = localFont({
  src: [
    {
      path: "../../public/font/chunko-bold-demo/Chunko Bold Demo.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/font/chunko-bold-demo/Chunko Bold Demo.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-chunko",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Granger Wang — Creative Director & Photographer",
  description:
    "Portfolio of Granger Wang — Creative Director, Photographer, and Visual Storyteller based in Atlanta, GA.",
  openGraph: {
    title: "Granger Wang",
    description: "Creative Director & Photographer · Atlanta, GA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${chunko.variable} ${cormorant.variable} ${dmSans.variable}`}
      style={{ colorScheme: "dark" }}
    >
      <body className="bg-ink text-canvas antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
