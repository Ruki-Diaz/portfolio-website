import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import AnimatedGridBackground from "@/components/ui/AnimatedGridBackground";
import SectionReveal from "@/components/ui/SectionReveal";
import { personJsonLd, toJsonLd } from "@/lib/site";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(personJsonLd) }}
      />
      <CustomCursor />
      <AnimatedGridBackground />
      <main id="main" className="flex flex-col min-h-screen bg-transparent relative z-10">
        <Hero />
        <SectionReveal><Projects /></SectionReveal>
        <SectionReveal><Experience /></SectionReveal>
        <SectionReveal><Skills /></SectionReveal>
        <SectionReveal><Education /></SectionReveal>
        <SectionReveal><Contact /></SectionReveal>
        <Footer />
      </main>
    </>
  );
}
