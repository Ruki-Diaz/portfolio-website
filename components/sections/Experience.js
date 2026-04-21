"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const workData = [
  {
    title: "Software Developer Intern (Data & AI)",
    organization: "Irys Group",
    date: "Mar 2026 - May 2026",
    description: "Designed and developed web-based and data-driven solutions to improve internal inventory tracking and operational efficiency. Worked on translating business requirements into technical specifications and contributed to software development initiatives involving data and AI-focused problem solving.",
    icon: Briefcase,
  },
  {
    title: "IT Support & Inventory Specialist",
    organization: "Irys Middle East LLC",
    date: "Sep 2023 - Feb 2025",
    description: "Resolved 50+ technical issues monthly, configured systems across 100+ endpoints, delivered training sessions for 20+ staff, and improved system performance by 30%.",
    icon: Briefcase,
  },
  {
    title: "Web Developer Intern",
    organization: "RCA Technology",
    date: "Feb 2023 - Aug 2023",
    description: "Developed web features and improved performance by 20%. Worked in a team to deliver projects on time.",
    icon: Briefcase,
  },
];

const educationData = [
  {
    title: "Bachelor of Computer Science (Data Science Major)",
    organization: "Deakin University",
    date: "Jul 2024 – Nov 2026",
    description: "Currently pursuing a Bachelor of Computer Science with a major in Data Science, focusing on software engineering, artificial intelligence, and modern data-driven application development.",
    icon: GraduationCap,
  },
  {
    title: "Higher National Diploma in Information Technology",
    organization: "ANC School of Postgraduate Education",
    date: "Sep 2022 – Sep 2023",
    description: "Completed a Higher National Diploma in Information Technology, strengthening foundational knowledge in software development, databases, and core computing concepts.",
    icon: GraduationCap,
  },
  {
    title: "Primary and Secondary Education",
    organization: "St. Sebastian's College",
    date: "Jan 2008 – May 2022",
    description: "Completed primary and secondary education while actively participating in basketball, swimming, media, and Western brass band activities.",
    icon: GraduationCap,
  },
];

const TimelineItem = ({ item, index, type }) => {
  const Icon = item.icon;
  const isEducation = type === "education";
  
  // Theme variables based on type
  const textColor = isEducation ? "text-blue-400" : "text-emerald-400";
  const borderColor = isEducation ? "group-hover:border-blue-500/40" : "group-hover:border-emerald-500/40";
  const bgGlow = isEducation 
    ? "group-hover:from-blue-500/10 group-hover:to-purple-500/5" 
    : "group-hover:from-emerald-500/10 group-hover:to-teal-500/5";
  const iconGlow = isEducation 
    ? "group-hover:shadow-[0_0_20px_rgba(96,165,250,0.5)]" 
    : "group-hover:shadow-[0_0_20px_rgba(52,211,153,0.5)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="relative pl-8 md:pl-12 group"
    >
      {/* Timeline dot with icon */}
      <div className={`absolute -left-[24px] md:-left-[32px] top-4 w-12 h-12 md:w-16 md:h-16 bg-neutral-950 border border-neutral-800 rounded-full flex items-center justify-center group-hover:scale-110 ${borderColor} transition-all duration-500 z-10 shadow-xl`}>
        <div className={`w-8 h-8 md:w-12 md:h-12 bg-neutral-900 rounded-full flex items-center justify-center ${iconGlow} transition-all duration-500`}>
          <Icon size={20} className={textColor} />
        </div>
      </div>

      <div className={`relative bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 md:p-8 hover:bg-neutral-800/60 ${borderColor} transition-all duration-500 overflow-hidden hover:shadow-[0_0_40px_rgba(0,0,0,0.6)] hover:-translate-y-1`}>
        {/* Subtle background glow on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 ${bgGlow}`} />

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4 gap-4">
            <div>
              <span className={`inline-block text-xs font-bold tracking-widest uppercase mb-3 ${textColor} opacity-80`}>
                {type === "education" ? "Education" : "Work Experience"}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-300 transition-all duration-500">
                {item.title}
              </h3>
              <h4 className={`text-lg font-medium mt-1.5 flex items-center gap-2 ${textColor}`}>
                {item.organization}
              </h4>
            </div>
            <div className="flex-shrink-0">
              <span className="inline-flex items-center text-sm font-semibold px-4 py-1.5 bg-neutral-950 border border-neutral-800 rounded-full text-neutral-300 whitespace-nowrap group-hover:border-neutral-600 transition-colors shadow-inner">
                {item.date}
              </span>
            </div>
          </div>
          
          <div className="h-px w-full bg-gradient-to-r from-neutral-800 to-transparent my-5" />
          
          <p className="text-neutral-400 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 sm:px-12 max-w-5xl mx-auto border-t border-neutral-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white">Experience & Education</h2>
          <div className="h-px bg-neutral-800 flex-1 ml-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12">
          {/* Work Experience Timeline */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-10 pl-2">Professional Experience</h3>
            <div className="relative border-l-2 border-neutral-800/60 ml-4 md:ml-6 space-y-12 pb-8">
              {workData.map((item, index) => (
                <TimelineItem key={`work-${index}`} item={item} index={index} type="work" />
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-10 pl-2">Academic Background</h3>
            <div className="relative border-l-2 border-neutral-800/60 ml-4 md:ml-6 space-y-12 pb-8">
              {educationData.map((item, index) => (
                <TimelineItem key={`edu-${index}`} item={item} index={index} type="education" />
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
