import React, { useState } from "react";

const tones = {
  light: {
    input:
      "w-full rounded-2xl border-[3px] border-[#6B3410] bg-white px-4 py-3 font-bold text-[#6B3410] placeholder:text-[#6B3410]/40 focus:outline-none focus:ring-2 focus:ring-[#FC7F46]",
    button:
      "rounded-2xl border-[3px] border-[#6B3410] bg-[#FC7F46] px-6 py-3 font-extrabold text-[#FFF4DA] shadow-[3px_3px_0_0_#6B3410] transition-transform hover:-translate-y-0.5 disabled:opacity-60",
    success:
      "rounded-2xl border-[3px] border-[#1F6B5C] bg-[#1F6B5C]/10 p-5 text-center text-lg font-extrabold text-[#1F6B5C]",
  },
  dark: {
    input:
      "w-full rounded-xl border border-[#D9B56A]/40 bg-[#060E1A] px-4 py-3 font-medium text-[#EFE6D2] placeholder:text-[#EFE6D2]/35 focus:outline-none focus:border-[#F3DE9E] focus:ring-1 focus:ring-[#F3DE9E]",
    button:
      "rounded-xl bg-gradient-to-b from-[#F3DE9E] to-[#C9A45C] px-6 py-3 font-semibold text-[#060E1A] transition-transform hover:-translate-y-0.5 disabled:opacity-60",
    success:
      "rounded-xl border border-[#D9B56A]/50 bg-[#D9B56A]/10 p-5 text-center text-lg font-semibold text-[#F3DE9E]",
  },
} as const;

/** Generic newsletter signup form. Posts {email, name} to the given endpoint. */
export function EmailSignupForm({
  endpoint,
  tone = "light",
  buttonLabel = "Subscribe",
  successMessage = "You're on the list! Check your inbox for a welcome email.",
}: {
  endpoint: string;
  tone?: keyof typeof tones;
  buttonLabel?: string;
  successMessage?: string;
}) {
  const t = tones[tone];
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("done");
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
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name (optional)"
        aria-label="Your name"
        autoComplete="given-name"
        maxLength={80}
        className={t.input}
      />
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
        <p role="alert" className="text-sm font-semibold text-[#e88a8a]">
          {message}
        </p>
      )}
    </form>
  );
}
