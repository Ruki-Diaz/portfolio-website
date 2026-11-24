import GlassHeadlineHero from "@/components/ui/glass-headline-hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import MobileSectionNav from "@/components/layout/MobileSectionNav";
import CustomCursor from "@/components/ui/CustomCursor";
import AnimatedGridBackground from "@/components/ui/AnimatedGridBackground";
import SectionReveal from "@/components/ui/SectionReveal";

// Ground first, then four accents in one hue (docs/design-system.md §2).
const HERO_COLORS = ["#07090F", "#2F4CFF", "#6F8CFF", "#1B2A6B", "#E8EDFF"];

export default function Home() {
  return (
    <>
      <CustomCursor />
      <AnimatedGridBackground />
      <main className="flex flex-col min-h-screen bg-transparent relative z-10">
        {/* The hero renders its own <section> without an id, so the anchor sits on this wrapper. */}
        <div id="hero" className="hero-glass">
          <GlassHeadlineHero
            eyebrow="Rukshan Dias · Melbourne"
            title="Data Scientist & Software Engineer"
            description="I build data products and web apps on live open data, from forecasting models to full-stack platforms."
            primaryAction={{ label: "View projects", href: "#projects" }}
            secondaryAction={{ label: "View CV", href: "/cv.pdf" }}
            colors={HERO_COLORS}
          />
        </div>
        <SectionReveal><Projects /></SectionReveal>
        <SectionReveal><Experience /></SectionReveal>
        <SectionReveal><Skills /></SectionReveal>
        <SectionReveal><About /></SectionReveal>
        <SectionReveal><Contact /></SectionReveal>
        <Footer sectionNav />
      </main>
      <MobileSectionNav />
    </>
  );
}
