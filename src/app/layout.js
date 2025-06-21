import "./globals.css";
import localFont from "next/font/local";
import CustomCursor from "@/components/CustomCursor";
import {Analytics} from '@vercel/analytics/react';
import Navbar from "@/components/Navbar";

// Optimize font loading
const spaceMono = localFont({
  src: "../../public/fonts/GeneralSans-Bold.otf",
  variable: "--font-space-mono",
  display: "swap",
});

const neue = localFont({
  src: "../../public/fonts/PPNeueMontreal-Medium.otf",
  variable: "--font-neue-montreal",
  display: "swap",
});

// Enhanced metadata for better SEO
export const metadata = {
  title: "YourBrand - Front End Developer",
  description:
    "Your Name, Freelance Front End Developer based in Your Location. Specializing in responsive web design, React, and Next.js applications.",
  keywords:
    "front end developer, web developer, React developer, Next.js, Your Location, freelance developer, Your Name",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://yourdomain.com/",
    title: "YourBrand - Front End Developer",
    description:
      "Your Name, Freelance Front End Developer based in Your Location. Specializing in responsive web design, React, and Next.js applications.",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "YourBrand",
      },
    ],
    siteName: "YourBrand",
  },
  alternates: {
    canonical: "https://yourdomain.com",
    languages: {
      "en-US": "https://yourdomain.com/en-US",
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#5bbad5'
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`scroller-hidden ${spaceMono.variable} ${neue.variable}`}
    >
      <body
        className={`  ${spaceMono.className} ${neue.className} antialiased`}
      >
      <Analytics />
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}