"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const FORM_ENDPOINT = "https://formspree.io/f/mpqkjjeo";

export default function Contact() {
  // status: "idle" | "submitting" | "success" | "error"
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const successRef = useRef(null);

  // Move focus to the confirmation so keyboard and screen reader users hear it.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        form.reset();
        setStatus("success");
        return;
      }

      const body = await response.json().catch(() => null);
      const detail = body?.errors?.map((err) => err.message).join(". ");
      setError(detail ? `${detail}.` : "Your message couldn't be sent. Please try again, or email me directly.");
      setStatus("error");
    } catch {
      setError("Network error: your message couldn't be sent. Check your connection and try again, or email me directly.");
      setStatus("error");
    }
  };

  const submitting = status === "submitting";

  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20 py-24 px-6 sm:px-12 max-w-6xl mx-auto w-full border-t border-neutral-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center text-center mb-16">
          <h2 id="contact-heading" className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">Let&apos;s Work Together</h2>
          <p className="text-neutral-400 text-lg max-w-2xl">
            I&apos;m open to internships, graduate roles, freelance opportunities, and collaborations.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-10 md:gap-12">
          {/* Contact Links */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold text-white mb-6">Contact Info</h3>
            
            <a
              href="mailto:dias.rukshan@gmail.com"
              className="flex items-center gap-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:bg-neutral-800/50 hover:border-neutral-700 transition-colors group"
            >
              <div className="w-12 h-12 bg-neutral-950 rounded-lg flex items-center justify-center border border-neutral-800 group-hover:border-neutral-700 transition-colors">
                <Mail aria-hidden="true" className="text-neutral-300 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-sm text-neutral-500 font-medium">Email</p>
                <p className="text-white font-medium break-all">dias.rukshan@gmail.com</p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/rukshan-dias-a088921a6/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:bg-neutral-800/50 hover:border-neutral-700 transition-colors group"
            >
              <div className="w-12 h-12 bg-neutral-950 rounded-lg flex items-center justify-center border border-neutral-800 group-hover:border-neutral-700 transition-colors">
                <FaLinkedin aria-hidden="true" className="text-neutral-300 group-hover:text-blue-500 transition-colors text-xl" />
              </div>
              <div>
                <p className="text-sm text-neutral-500 font-medium">LinkedIn</p>
                <p className="text-white font-medium">Rukshan Dias</p>
              </div>
            </a>

            <a
              href="https://github.com/Ruki-Diaz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:bg-neutral-800/50 hover:border-neutral-700 transition-colors group"
            >
              <div className="w-12 h-12 bg-neutral-950 rounded-lg flex items-center justify-center border border-neutral-800 group-hover:border-neutral-700 transition-colors">
                <FaGithub aria-hidden="true" className="text-neutral-300 group-hover:text-white transition-colors text-xl" />
              </div>
              <div>
                <p className="text-sm text-neutral-500 font-medium">GitHub</p>
                <p className="text-white font-medium">@Ruki-Diaz</p>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            {status === "success" ? (
              <div
                role="status"
                className="bg-neutral-900/50 border border-emerald-500/30 rounded-2xl p-8 flex flex-col items-center justify-center h-full text-center gap-4"
              >
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 aria-hidden="true" className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 ref={successRef} tabIndex={-1} className="text-2xl font-bold text-white rounded-md">Message sent!</h3>
                <p className="text-neutral-400">Thanks for reaching out. I&apos;ll get back to you as soon as possible.</p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 rounded-md text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                aria-busy={submitting}
                aria-describedby={status === "error" ? "contact-error" : undefined}
                className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col gap-6"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-neutral-300">Name</label>
                    <input type="text" id="name" name="name" required autoComplete="name" disabled={submitting} placeholder="Jane Smith" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 disabled:opacity-60 transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-neutral-300">Email</label>
                    <input type="email" id="email" name="email" required autoComplete="email" disabled={submitting} placeholder="jane@example.com" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 disabled:opacity-60 transition-all" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-neutral-300">Message</label>
                  <textarea id="message" name="message" required rows={5} disabled={submitting} placeholder="Tell me about your project or role..." className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 disabled:opacity-60 transition-all resize-none" />
                </div>

                {/* Always mounted so screen readers announce errors as they appear. */}
                <div aria-live="assertive" className="empty:-mt-6">
                  {status === "error" && (
                    <p id="contact-error" className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
                      <AlertCircle aria-hidden="true" size={18} className="mt-px shrink-0" />
                      <span>
                        {error}{" "}
                        <a href="mailto:dias.rukshan@gmail.com" className="underline underline-offset-2 hover:text-white">dias.rukshan@gmail.com</a>
                      </span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span>{submitting ? "Sending…" : "Send Message"}</span>
                  {submitting ? <Loader2 aria-hidden="true" size={18} className="animate-spin" /> : <Send aria-hidden="true" size={18} />}
                </button>
                <p aria-live="polite" className="sr-only">{submitting ? "Sending your message" : ""}</p>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
