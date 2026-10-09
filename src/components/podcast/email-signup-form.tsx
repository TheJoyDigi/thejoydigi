import React, { useState } from "react";
import { track } from "@/lib/analytics";

const tones = {
  anthropic: {
    input:
      "w-full rounded-xl border border-white/20 bg-[#101418] px-4 py-3 font-medium text-[#F4EFE6] placeholder:text-[#F4EFE6]/40 focus:outline-none focus:border-[#E2725B] focus:ring-1 focus:ring-[#E2725B]",
    button:
      "rounded-xl bg-[#E2725B] px-6 py-3 font-semibold text-[#101418] transition-transform hover:-translate-y-0.5 disabled:opacity-60",
    success:
      "rounded-xl border border-[#E2725B]/50 bg-[#E2725B]/10 p-5 text-center text-lg font-semibold text-[#F4EFE6]",
    error: "text-[#FFB3A3]",
  },
  home: {
    input:
      "w-full rounded-xl border border-white/25 bg-white px-4 py-3 font-medium text-[#003B49] placeholder:text-[#003B49]/45 focus:outline-none focus:ring-2 focus:ring-[#7EE0C3]",
    button:
      "rounded-xl bg-[#FFC94A] px-6 py-3 font-bold text-[#003B49] transition-transform hover:-translate-y-0.5 disabled:opacity-60",
    success:
      "rounded-xl border border-[#7EE0C3]/50 bg-[#7EE0C3]/15 p-5 text-center text-lg font-semibold text-[#FDF6EC]",
    error: "text-[#FFD1D1]",
  },
  light: {
    input:
      "w-full rounded-2xl border-[3px] border-[#6B3410] bg-white px-4 py-3 font-bold text-[#6B3410] placeholder:text-[#6B3410]/40 focus:outline-none focus:ring-2 focus:ring-[#FC7F46]",
    button:
      "rounded-2xl border-[3px] border-[#6B3410] bg-[#FC7F46] px-6 py-3 font-extrabold text-[#FFF4DA] shadow-[3px_3px_0_0_#6B3410] transition-transform hover:-translate-y-0.5 disabled:opacity-60",
    success:
      "rounded-2xl border-[3px] border-[#1F6B5C] bg-[#1F6B5C]/10 p-5 text-center text-lg font-extrabold text-[#1F6B5C]",
    error: "text-[#b3261e]",
  },
  dark: {
    input:
      "w-full rounded-xl border border-[#D9B56A]/40 bg-[#060E1A] px-4 py-3 font-medium text-[#EFE6D2] placeholder:text-[#EFE6D2]/35 focus:outline-none focus:border-[#F3DE9E] focus:ring-1 focus:ring-[#F3DE9E]",
    button:
      "rounded-xl bg-gradient-to-b from-[#F3DE9E] to-[#C9A45C] px-6 py-3 font-semibold text-[#060E1A] transition-transform hover:-translate-y-0.5 disabled:opacity-60",
    success:
      "rounded-xl border border-[#D9B56A]/50 bg-[#D9B56A]/10 p-5 text-center text-lg font-semibold text-[#F3DE9E]",
    error: "text-[#e88a8a]",
  },
} as const;

type Interest = "value-created" | "money-mastered" | "anthropic-blogcast" | "oc-pack";

/** Signup for the single Joy Digi list. `interest` is the show page it sits on, if any; it tailors the welcome email. */
export function EmailSignupForm({
  interest,
  compact = false,
  tone = "light",
  buttonLabel = "Subscribe",
  successMessage = "You're on The Joy Digi list! Watch your inbox for a welcome email.",
}: {
  interest?: Interest;
  compact?: boolean;
  tone?: keyof typeof tones;
  buttonLabel?: string;
  successMessage?: string;
}) {
  const t = tones[tone];
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, hp, interest }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("done");
        track("newsletter_signup", { show: interest });
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "done") {
    return <p className={t.success}>{successMessage}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        name="hp"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />
      {!compact && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          aria-label="Your name"
          autoComplete="given-name"
          maxLength={80}
          className={t.input}
        />
      )}
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          autoComplete="email"
          className={`${t.input} flex-1`}
        />
        <button type="submit" disabled={status === "sending"} className={t.button}>
          {status === "sending" ? "Joining…" : buttonLabel}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className={`text-sm font-semibold ${t.error}`}>
          {message}
        </p>
      )}
    </form>
  );
}
