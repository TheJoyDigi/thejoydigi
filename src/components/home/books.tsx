import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../marketing/kit";

export default function Books() {
  return (
    <section id="books" aria-labelledby="books-heading" className="bg-[#FDF6EC] px-4 pb-12 md:pb-16">
      <div className="container mx-auto grid gap-8 rounded-[2rem] bg-[#0C1130] bg-[radial-gradient(circle_at_85%_25%,rgba(242,168,29,0.3),transparent_55%)] p-7 text-[#F4EEDD] shadow-[0_24px_60px_-36px_rgba(27,20,13,0.7)] md:grid-cols-[1fr_200px] md:items-center md:gap-12 md:p-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#FFD47E]">The book</p>
          <h2 id="books-heading" className="font-display !py-0 mt-3 text-3xl leading-tight font-[460] md:text-5xl">
            Value, <em className="text-[#FFD47E]">Created.</em>
          </h2>
          <p className="mt-3 max-w-lg text-[#F4EEDD]/75 md:text-lg">
            Read it, or listen to all 32 chapters free. Every chapter comes with its own infographic.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/books/value-created">See the book</Button>
            <Link href="/books" className="px-2 py-2 font-semibold text-[#FFD47E] no-underline hover:no-underline hover:text-[#FDF6EC]">
              All books →
            </Link>
          </div>
        </div>
        <Link href="/books/value-created" className="hidden md:block" aria-label="Value, Created book page">
          <Image src="/books/value-created/cover.jpg" alt="Value, Created book cover" width={400} height={640} className="h-auto w-full rotate-[1.5deg] rounded-[4px] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.9)]" />
        </Link>
      </div>
    </section>
  );
}
