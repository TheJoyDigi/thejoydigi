import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import s from "./art.module.css";
import { CORAL, INK, MINT, RevealWords, rng, Scene, SectionKicker, SKY, SUN } from "./primitives";

const CONFETTI = (() => {
  const rand = rng(99);
  return Array.from({ length: 28 }, (_, i) => ({
    x: (rand() - 0.5) * 520,
    y: -80 - rand() * 260,
    r: rand() * 720 - 360,
    c: [CORAL, SKY, SUN, MINT][i % 4],
    w: 6 + rand() * 8,
    round: i % 3 === 0,
  }));
})();

type Fields = { name: string; email: string; phone: string; message: string };
const EMPTY: Fields = { name: "", email: "", phone: "", message: "" };

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold uppercase tracking-[0.15em] text-[#003B49]/70 mb-2">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0, x: [0, -6, 6, -3, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-2 text-sm font-semibold text-[#E0474C]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = (err: string) =>
  `w-full rounded-2xl border-2 bg-[#FDF6EC] px-5 py-3.5 text-[#003B49] placeholder:text-[#003B49]/35 outline-none transition-all duration-200 focus:bg-white focus:shadow-[4px_4px_0_0_#003B49] focus:-translate-x-0.5 focus:-translate-y-0.5 ${
    err ? "border-[#E0474C]" : "border-[#003B49]/20 focus:border-[#003B49]"
  }`;

export default function Contact() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Fields>(EMPTY);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length === 0) return "";
    if (numbers.length <= 3) return `(${numbers}`;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const validateForm = () => {
    const newErrors = { ...EMPTY };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!phoneDigits) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (phoneDigits.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, phone: formData.phone.replace(/\D/g, "") }),
      });
      const data = await response.json();
      if (response.ok) {
        setShowSuccess(true);
        setFormData(EMPTY);
        setErrors(EMPTY);
      } else {
        setSubmitError(data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Scene id="contact" className="relative bg-[#FDF6EC] pt-10 pb-24 md:pb-32 overflow-hidden scroll-mt-16">
      <div className="container mx-auto px-4 grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
        <div className="text-center lg:text-left">
          <SectionKicker>Say hello</SectionKicker>
          <h2 className="font-display !py-0 mt-4 text-5xl md:text-7xl font-[460] leading-[0.95] tracking-tight text-[#003B49] mb-8">
            <RevealWords text="Let's Start Your" /> <RevealWords text="Digital Journey" delay={0.15} wordClassName="italic text-[#4ABEFF]" />
          </h2>
          <div className="relative mx-auto lg:mx-0 w-full max-w-[440px] aspect-[2/1]">
            <svg viewBox="0 0 440 220" className={`absolute inset-0 w-full h-full overflow-visible ${s.live}`} aria-hidden>
              <path d="M -40 160 C 60 40, 180 40, 240 120 S 380 220, 460 60" fill="none" stroke={INK} strokeOpacity={0.3} strokeWidth={2.5} strokeDasharray="6 10" />
              <g className={s.plane}>
                <g transform="translate(-22 -16)">
                  <path d="M0 16 L44 0 L30 32 L22 20 Z" fill="#fff" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
                  <path d="M22 20 L44 0 L16 18" fill={SKY} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
                </g>
              </g>
            </svg>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start text-[#003B49] font-semibold">
            <a href="mailto:hello@thejoydigi.com" className="rounded-full border-2 border-[#003B49] px-5 py-2 hover:bg-[#003B49] hover:text-white transition-colors no-underline hover:no-underline">
              hello@thejoydigi.com
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2rem] border-2 border-[#003B49] bg-white p-6 md:p-10 shadow-[10px_10px_0_0_#003B49]"
        >
          <AnimatePresence>
            {submitError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 rounded-2xl border-2 border-[#E0474C] bg-[#FF6B6B]/10 p-4 font-semibold text-[#B8323A]"
              >
                {submitError}
              </motion.div>
            )}
          </AnimatePresence>
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field id="name" label="Name" error={errors.name}>
                <input type="text" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputCls(errors.name)} placeholder="Your name" required />
              </Field>
              <Field id="phone" label="Phone" error={errors.phone}>
                <input type="tel" id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })} placeholder="(XXX) XXX-XXXX" maxLength={14} className={inputCls(errors.phone)} required />
              </Field>
            </div>
            <Field id="email" label="Email" error={errors.email}>
              <input type="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputCls(errors.email)} placeholder="you@brand.com" required />
            </Field>
            <Field id="message" label="Message" error={errors.message}>
              <textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} className={`${inputCls(errors.message)} resize-none`} placeholder="Tell us about your idea…" required />
            </Field>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={isSubmitting ? undefined : { y: -3 }}
              whileTap={{ scale: 0.97 }}
              className={`group relative w-full overflow-hidden rounded-full px-6 py-4 text-lg font-bold text-white flex items-center justify-center gap-3 ${
                isSubmitting ? "bg-[#FF6B6B] cursor-not-allowed" : "bg-[#003B49]"
              }`}
            >
              {!isSubmitting && (
                <span className="absolute inset-0 -translate-x-full bg-[#FF6B6B] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0" />
              )}
              <span className="relative flex items-center gap-3">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </>
                )}
              </span>
            </motion.button>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#003B49]/60 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="success-title"
              initial={{ scale: 0.6, rotate: -6, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-[2rem] border-2 border-[#003B49] bg-white p-8 text-center shadow-[10px_10px_0_0_#003B49]"
            >
              <svg className="pointer-events-none absolute left-1/2 top-16 overflow-visible" width="0" height="0" aria-hidden>
                {CONFETTI.map((c, i) => (
                  <motion.g
                    key={i}
                    initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                    animate={{ x: c.x, y: [0, c.y, c.y + 320], rotate: c.r, opacity: [1, 1, 0] }}
                    transition={{ duration: 1.8, ease: [0.2, 0.7, 0.4, 1], delay: 0.15 }}
                  >
                    {c.round ? <circle r={c.w / 2} fill={c.c} /> : <rect x={-c.w / 2} y={-c.w / 4} width={c.w} height={c.w / 2} rx={1} fill={c.c} />}
                  </motion.g>
                ))}
              </svg>
              <svg viewBox="0 0 80 80" className="mx-auto mb-4 h-20 w-20" aria-hidden>
                <motion.circle cx={40} cy={40} r={34} fill={MINT} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 12 }} />
                <motion.path d="M25 41 L36 52 L56 30" fill="none" stroke={INK} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }} />
              </svg>
              <h3 id="success-title" className="font-display !py-0 text-3xl font-semibold text-[#003B49] mb-2">
                Thank You!
              </h3>
              <p className="text-[#003B49]/80 mb-6">Your message has been sent successfully. I&apos;ll get back to you soon.</p>
              <button onClick={() => setShowSuccess(false)} className="rounded-full bg-[#003B49] px-8 py-3 font-bold text-white hover:bg-[#FF6B6B] transition-colors">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Scene>
  );
}
