import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import AnimatedGridBackground from "@/components/ui/AnimatedGridBackground";
import SectionReveal from "@/components/ui/SectionReveal";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <AnimatedGridBackground />
      <main className="flex flex-col min-h-screen bg-transparent relative z-10">
        <Hero />
        <SectionReveal><About /></SectionReveal>
        <SectionReveal><Skills /></SectionReveal>
        <SectionReveal><Projects /></SectionReveal>
        <SectionReveal><Experience /></SectionReveal>
        <SectionReveal><Contact /></SectionReveal>
        <Footer />
      </main>
    </>
  );
}
