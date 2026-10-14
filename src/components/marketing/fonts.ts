import { Bungee, DM_Sans, Fraunces } from "next/font/google";

const display = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-display",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/** The wordmark face; big display moments only (home hero, section kickers). */
const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bungee",
  display: "swap",
});

export const fontVars = `${display.variable} ${body.variable} ${bungee.variable}`;
