import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import SmoothScroller from "@/components/layout/SmoothScroller";
import { SITE } from "@/lib/site";

const inter = Inter({ subsets: ["latin"] });

const TITLE = "Rukshan Dias | Data Scientist & Software Engineer, Melbourne";
const DESCRIPTION = "Rukshan Dias is a Melbourne-based data scientist and software engineer (Deakin University). Live ML projects, open-data analytics and full-stack apps.";

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: TITLE,
    template: "%s | Rukshan Dias",
  },
  description: DESCRIPTION,
  authors: [{ name: "Rukshan Dias", url: SITE }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "Rukshan Dias",
    locale: "en_AU",
    url: "/",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU" className="dark scroll-smooth">
      <body className={`${inter.className} bg-neutral-950 text-neutral-100 antialiased min-h-screen flex flex-col selection:bg-blue-500/30 selection:text-blue-200`}>
        <SmoothScroller>
          <Navbar />
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
