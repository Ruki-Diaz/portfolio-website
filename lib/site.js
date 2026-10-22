// Single source of truth for the canonical site URL.
// Switch this to the custom domain (e.g. "https://rukshandias.com") once it is live.
export const SITE = "https://rukshandias.vercel.app";

// The generated site-wide social image (app/opengraph-image.js).
export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Rukshan Dias, Data Scientist & Software Engineer in Melbourne",
};

export const PERSON_ID = `${SITE}/#person`;

export const SOCIAL_LINKS = [
  "https://github.com/Ruki-Diaz",
  "https://www.linkedin.com/in/rukshan-dias-a088921a6/",
];

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Rukshan Dias",
  url: SITE,
  image: `${SITE}/profilepic.jpg`,
  jobTitle: "Data Scientist & Software Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Deakin University",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Melbourne",
    addressRegion: "VIC",
    addressCountry: "AU",
  },
  sameAs: SOCIAL_LINKS,
};

// Serialises JSON-LD safely for a <script> tag (escapes "<" to prevent XSS).
export function toJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
