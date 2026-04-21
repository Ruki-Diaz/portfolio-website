import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://rukshandias.com"),
  title: "Rukshan Dias | Software Engineer & Data Science Student",
  description: "Portfolio of Rukshan Dias, a Computer Science undergraduate majoring in Data Science, focused on software engineering, AI, and modern web development.",
  keywords: ["Rukshan Dias", "Software Engineer", "Data Science", "Portfolio", "AI", "Web Development"],
  authors: [{ name: "Rukshan Dias" }],
  openGraph: {
    title: "Rukshan Dias | Software Engineer & Data Science Student",
    description: "Portfolio of Rukshan Dias, a Computer Science undergraduate majoring in Data Science, focused on software engineering, AI, and modern web development.",
    type: "website",
    /* IMPORTANT: Place your final OG image in the public folder as public/og-image.png */
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rukshan Dias Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rukshan Dias | Software Engineer & Data Science Student",
    description: "Portfolio of Rukshan Dias, a Computer Science undergraduate majoring in Data Science, focused on software engineering, AI, and modern web development.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-neutral-950 text-neutral-100 antialiased min-h-screen flex flex-col selection:bg-blue-500/30 selection:text-blue-200`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
