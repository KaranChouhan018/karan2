import "./globals.css";
import localFont from 'next/font/local';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

// Optimize font loading
const spaceMono = localFont({
  src: '../../public/fonts/GeneralSans-Bold.otf',
  variable: '--font-space-mono',
  display: 'swap',
});

const neue = localFont({
  src: '../../public/fonts/PPNeueMontreal-Medium.otf',
  variable: '--font-neue-montreal',
  display: 'swap',
});

// Enhanced metadata for better SEO
export const metadata = {
  title: "CodebyKaran - Front End Developer",
  description: "Karan Chouhan, Freelance Front End Developer based in India. Specializing in responsive web design, React, and Next.js applications.",
  keywords: "front end developer, web developer, React developer, Next.js, India, freelance developer, Karan Chouhan",
  robots: "index, follow",
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://codebykaran.com/',
    title: 'CodebyKaran - Front End Developer',
    description: 'Karan Chouhan, Freelance Front End Developer based in India. Specializing in responsive web design, React, and Next.js applications.',
    images: [
      {
        url: '/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'CodebyKaran',
      }
    ],
    siteName: 'CodebyKaran',
  },
  canonical: 'https://codebykaran.com',
  alternates: {
    canonical: 'https://codebykaran.com',
    languages: {
      'en-US': 'https://codebykaran.com/en-US',
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className={`scroller-hidden ${spaceMono.variable} ${neue.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />

        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
        {/* Preconnect to any third-party domains you'll load resources from */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Structured data for rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Karan Chouhan",
              "url": "https://codebykaran.com",
              "jobTitle": "Front End Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              },
              "sameAs": [
                "https://github.com/KaranChouhan018",
                "https://www.linkedin.com/in/karan-chouhan-66528a248/",
                "https://x.com/KaranChouh2108?t=GRjwhfujAuRZHNj9NnzF-A&s=09"
              ]
            })
          }}
        />
      </head>
      <body className={`${spaceMono.className} ${neue.className} antialiased`}>
        <CustomCursor />
        <Navbar />
        <main>{children}</main>

      </body>
    </html>
  );
}