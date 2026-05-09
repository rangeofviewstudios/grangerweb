import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const BASE_URL = "https://grangerwang.com";

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
  metadataBase: new URL(BASE_URL),
  title: "Granger Wang | Filmmaker · Videographer · Content Creator",
  description:
    "One partner for every format, every location, every deadline. Atlanta & Athens, Georgia filmmaker specializing in short-form, documentary, commercial, and music video production.",
  keywords: [
    "filmmaker Atlanta",
    "videographer Athens Georgia",
    "content creator Georgia",
    "music video production Atlanta",
    "documentary filmmaker",
    "commercial videographer",
    "short-form video",
    "Granger Wang",
    "Atlanta filmmaker",
    "Georgia videographer",
    "film production Atlanta",
    "creative video production",
  ],
  authors: [{ name: "Granger Wang", url: BASE_URL }],
  creator: "Granger Wang",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Granger Wang | Filmmaker · Videographer · Content Creator",
    description:
      "One partner for every format, every location, every deadline. Atlanta & Athens, Georgia filmmaker specializing in short-form, documentary, commercial, and music video production.",
    url: BASE_URL,
    siteName: "Granger Wang",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/pictures/grangersktech.png",
        width: 1200,
        height: 630,
        alt: "Granger Wang — Filmmaker & Videographer based in Atlanta & Athens, Georgia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Granger Wang | Filmmaker · Videographer · Content Creator",
    description:
      "One partner for every format, every location, every deadline. Atlanta & Athens, Georgia filmmaker.",
    images: ["/pictures/grangersktech.png"],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Granger Wang",
  url: BASE_URL,
  jobTitle: ["Filmmaker", "Videographer", "Content Creator", "Photographer"],
  description:
    "Granger Wang is an Atlanta and Athens, Georgia-based filmmaker and videographer specializing in short-form content, documentary, commercial production, and music videos.",
  email: "contact@grangerwang.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Atlanta",
    addressRegion: "GA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Atlanta", containedInPlace: { "@type": "State", name: "Georgia" } },
    { "@type": "City", name: "Athens", containedInPlace: { "@type": "State", name: "Georgia" } },
  ],
  knowsAbout: [
    "filmmaking",
    "videography",
    "documentary production",
    "commercial video production",
    "music video production",
    "short-form video",
    "photography",
    "content creation",
    "visual storytelling",
  ],
  sameAs: [
    "https://www.youtube.com/@theoneandonlyboi8093",
    "https://www.instagram.com/gwang_studios/",
  ],
  image: `${BASE_URL}/pictures/grangersktech.png`,
};

const creativeWorkSchema = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Granger Wang Portfolio",
  url: BASE_URL,
  author: {
    "@type": "Person",
    name: "Granger Wang",
  },
  description:
    "A portfolio of film, video, and photography work by Granger Wang — documentary, commercial, music video, and short-form content produced in Atlanta and Athens, Georgia.",
  genre: ["Documentary", "Commercial", "Music Video", "Short-form Video", "Photography"],
  locationCreated: {
    "@type": "Place",
    name: "Atlanta & Athens, Georgia",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
