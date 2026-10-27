"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { TimelineItem } from "@/components/sections/Experience";

const educationData = [
  {
    title: "Bachelor of Computer Science (Data Science Major)",
    organization: "Deakin University",
    date: "Jul 2024 – Present",
    highlights: ["Distinction average", "Graduating February 2027"],
    description: "Focusing on software engineering, artificial intelligence, and modern data-driven application development.",
    tech: ["Data Science", "Software Engineering", "Artificial Intelligence", "Machine Learning"],
  },
  {
    title: "Higher National Diploma in Information Technology",
    organization: "ANC School of Postgraduate Education",
    date: "Sep 2022 – Sep 2023",
    description: "Strengthened foundational knowledge in software development, databases, and core computing concepts.",
    tech: ["Information Technology", "Databases", "Software Development", "Computer Networks"],
  },
];

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="scroll-mt-20 py-24 px-6 sm:px-12 max-w-6xl mx-auto w-full border-t border-neutral-800">
      <SectionHeading id="education-heading" eyebrow="Academic background">Education</SectionHeading>

      <ol className="relative max-w-4xl ml-2 sm:ml-3 border-l border-neutral-800 space-y-8">
        {educationData.map((item, index) => (
          <TimelineItem key={item.title} item={item} index={index}>
            {item.highlights && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="px-3 py-1 rounded-full text-sm font-medium text-blue-200 bg-blue-500/10 border border-blue-500/25"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 text-neutral-300 leading-relaxed">{item.description}</p>
          </TimelineItem>
        ))}
      </ol>
    </section>
  );
}
