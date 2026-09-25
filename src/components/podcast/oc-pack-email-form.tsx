import React, { useState } from "react";

const inputCls =
  "w-full rounded-2xl border-[3px] border-[#6B3410] bg-white px-4 py-3 font-bold text-[#6B3410] placeholder:text-[#6B3410]/40 focus:outline-none focus:ring-2 focus:ring-[#FC7F46]";

/** Email capture for the "Join the pack" section. Posts to /api/oc-pack/subscribe. */
export function OcPackEmailForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/oc-pack/subscribe", {
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
    return (
      <p className="rounded-2xl border-[3px] border-[#1F6B5C] bg-[#1F6B5C]/10 p-5 text-center text-lg font-extrabold text-[#1F6B5C]">
        You&apos;re in the pack! 🐶 Check your inbox for a welcome email.
      </p>
    );
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
        className={inputCls}
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
          className={`${inputCls} flex-1`}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-2xl border-[3px] border-[#6B3410] bg-[#FC7F46] px-6 py-3 font-extrabold text-[#FFF4DA] shadow-[3px_3px_0_0_#6B3410] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === "sending" ? "Joining…" : "Join the pack"}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="text-sm font-bold text-[#b3261e]">
          {message}
        </p>
      )}
    </form>
  );
}
