"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  const [status, setStatus] = useState({ submitted: false, submitting: false, error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitted: false, submitting: true, error: null });

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mpqkjjeo", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus({ submitted: true, submitting: false, error: null });
        form.reset();
      } else {
        setStatus({ submitted: false, submitting: false, error: "Failed to send message. Please try again." });
      }
    } catch (error) {
      setStatus({ submitted: false, submitting: false, error: "An error occurred. Please try again later." });
    }
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-12 max-w-5xl mx-auto border-t border-neutral-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Let&apos;s Work Together</h2>
          <p className="text-neutral-400 text-lg max-w-2xl">
            Let&apos;s work together. I&apos;m open to internships, graduate roles, freelance opportunities, and collaborations.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Contact Links */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold text-white mb-6">Contact Info</h3>
            
            <a
              href="mailto:dias.rukshan@gmail.com"
              className="flex items-center gap-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:bg-neutral-800/50 hover:border-neutral-700 transition-colors group"
            >
              <div className="w-12 h-12 bg-neutral-950 rounded-lg flex items-center justify-center border border-neutral-800 group-hover:border-neutral-700 transition-colors">
                <Mail className="text-neutral-300 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-sm text-neutral-500 font-medium">Email</p>
                <p className="text-white font-medium">dias.rukshan@gmail.com</p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/rukshan-dias-a088921a6/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:bg-neutral-800/50 hover:border-neutral-700 transition-colors group"
            >
              <div className="w-12 h-12 bg-neutral-950 rounded-lg flex items-center justify-center border border-neutral-800 group-hover:border-neutral-700 transition-colors">
                <FaLinkedin className="text-neutral-300 group-hover:text-blue-500 transition-colors text-xl" />
              </div>
              <div>
                <p className="text-sm text-neutral-500 font-medium">LinkedIn</p>
                <p className="text-white font-medium">Rukshan Dias</p>
              </div>
            </a>

            <a
              href="https://github.com/rukshandias"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:bg-neutral-800/50 hover:border-neutral-700 transition-colors group"
            >
              <div className="w-12 h-12 bg-neutral-950 rounded-lg flex items-center justify-center border border-neutral-800 group-hover:border-neutral-700 transition-colors">
                <FaGithub className="text-neutral-300 group-hover:text-white transition-colors text-xl" />
              </div>
              <div>
                <p className="text-sm text-neutral-500 font-medium">GitHub</p>
                <p className="text-white font-medium">@rukshandias</p>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            {status.submitted ? (
              <div className="bg-neutral-900/50 border border-emerald-500/30 rounded-2xl p-8 flex flex-col items-center justify-center h-full text-center gap-4">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                <p className="text-neutral-400">Thanks for reaching out. I'll get back to you as soon as possible.</p>
                <button 
                  onClick={() => setStatus({ submitted: false, submitting: false, error: null })}
                  className="mt-4 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 flex flex-col gap-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-neutral-400">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-neutral-400">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-neutral-400">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                  />
                </div>

                {status.error && (
                  <p className="text-sm font-medium text-red-400">{status.error}</p>
                )}

                <button
                  type="submit"
                  disabled={status.submitting}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span>{status.submitting ? "Sending..." : "Send Message"}</span>
                  <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
