import React from "react";
import { EmailSignupForm } from "@/components/podcast/email-signup-form";

export default function Inbox() {
  return (
    <section id="inbox" aria-labelledby="inbox-heading" className="bg-[#FDF6EC] px-4 pb-12 md:pb-16">
      <div className="container mx-auto grid gap-8 rounded-[2rem] bg-[#003B49] p-7 text-[#FDF6EC] shadow-[0_24px_60px_-36px_rgba(0,59,73,0.7)] md:grid-cols-[1fr_1fr] md:items-center md:gap-12 md:p-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7EE0C3]">A little good thing in your inbox</p>
          <h2 id="inbox-heading" className="font-display !py-0 mt-3 text-3xl leading-tight font-[460] md:text-4xl">
            Get the next chapter in your inbox.
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#FDF6EC]/75 md:text-base">
            Pick a show you enjoy. I&apos;ll share its new chapters and episodes with you.
          </p>
        </div>
        <div>
          <EmailSignupForm
            show="value-created"
            allowShowSelection
            compact
            tone="home"
            buttonLabel="Keep me posted"
          />
          <p className="mt-3 text-xs text-[#FDF6EC]/65">Only updates for the show you choose. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
