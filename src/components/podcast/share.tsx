import { AnimatePresence, motion } from "framer-motion";
import { Check, Link2, Mail, MessageCircle, Share2, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import type { Episode, Show } from "@/lib/podcasts";
import { fmt } from "./use-player";

export type ShareTheme = {
  /** next/font variable classes, re-applied because the sheet portals out of the page root. */
  fontClass?: string;
  headingFont?: string;
  bodyFont?: string;
  panel: string;
  text: string;
  muted: string;
  border: string;
  accent: string;
  onAccent: string;
  tile: string;
};

export type ShareTarget = { show: Show; episode?: Episode | null; time?: number };

export const episodeUrl = (show: Show, ep: Episode) => `${show.pageUrl}/${ep.number}`;

const withTime = (url: string, t?: number) => (t && t >= 1 ? `${url}?t=${Math.floor(t)}` : url);

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const track = (method: string, show: Show, ep?: Episode | null) =>
  window.gtag?.("event", "share", { method, content_type: ep ? "podcast_episode" : "podcast", item_id: ep ? `${show.slug}/${ep.number}` : show.slug });

type Channel = { id: string; label: string; icon: ReactNode; href: (url: string, text: string, title: string) => string };

const CHANNELS: Channel[] = [
  { id: "sms", label: "Messages", icon: <MessageCircle className="h-5 w-5" />, href: (u, t) => `sms:?&body=${encodeURIComponent(`${t} ${u}`)}` },
  { id: "whatsapp", label: "WhatsApp", icon: <FaWhatsapp className="h-5 w-5" />, href: (u, t) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}` },
  { id: "x", label: "X", icon: <FaXTwitter className="h-[18px] w-[18px]" />, href: (u, t) => `https://x.com/intent/post?text=${encodeURIComponent(t)}&url=${encodeURIComponent(u)}` },
  { id: "facebook", label: "Facebook", icon: <FaFacebookF className="h-[18px] w-[18px]" />, href: (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
  { id: "linkedin", label: "LinkedIn", icon: <FaLinkedinIn className="h-[18px] w-[18px]" />, href: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}` },
  { id: "email", label: "Email", icon: <Mail className="h-5 w-5" />, href: (u, t, s) => `mailto:?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(`${t}\n\n${u}`)}` },
];

/** Controls one share sheet per page; call open() with whatever the listener is sharing. */
export function useShare() {
  const [target, setTarget] = useState<ShareTarget | null>(null);
  const open = useCallback((t: ShareTarget) => setTarget(t), []);
  const close = useCallback(() => setTarget(null), []);
  return { target, open, close };
}

export type ShareControl = ReturnType<typeof useShare>;

export function ShareSheet({ share, theme }: { share: ShareControl; theme: ShareTheme }) {
  const { target, close } = share;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>{target && <Sheet key="sheet" target={target} theme={theme} onClose={close} />}</AnimatePresence>,
    document.body
  );
}

function Sheet({ target, theme, onClose }: { target: ShareTarget; theme: ShareTheme; onClose: () => void }) {
  const { show, episode } = target;
  const canTimestamp = !!episode && !!target.time && target.time >= 10;
  const [atTime, setAtTime] = useState(canTimestamp);
  const [copied, setCopied] = useState(false);
  const [canNative, setCanNative] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const url = episode ? withTime(episodeUrl(show, episode), atTime ? target.time : undefined) : show.pageUrl;
  const title = episode ? `${episode.shortTitle} — ${show.title}` : show.title;
  const text = episode
    ? atTime
      ? `Listen to this moment from “${episode.shortTitle}” (${show.title}), starting at ${fmt(target.time!)}:`
      : `You'll like this one — “${episode.shortTitle}” from ${show.title}:`
    : `You'll like this podcast — ${show.title}:`;

  useEffect(() => {
    setCanNative(typeof navigator.share === "function");
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Copy this link:", url);
    }
    setCopied(true);
    track("copy_link", show, episode);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const native = async () => {
    try {
      await navigator.share({ title, text, url });
      track("native", show, episode);
      onClose();
    } catch {
      // User dismissed the OS share sheet; keep ours open.
    }
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-end justify-center sm:items-center ${theme.fontClass ?? ""}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Share ${title}`}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="relative w-full max-w-md rounded-t-3xl border p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl sm:m-4 sm:rounded-3xl sm:p-6"
        style={{ background: theme.panel, color: theme.text, borderColor: theme.border, fontFamily: theme.bodyFont }}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full sm:hidden" style={{ background: theme.border }} />
        <div className="flex items-start gap-4">
          <Image src={show.cover} alt="" width={128} height={128} className="h-16 w-16 shrink-0 rounded-xl" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
              {episode ? `Share episode ${episode.number}` : "Share the show"}
            </p>
            <p className="mt-1 line-clamp-2 text-xl leading-tight" style={{ fontFamily: theme.headingFont }}>
              {episode ? episode.shortTitle : show.title}
            </p>
            <p className="mt-0.5 truncate text-sm" style={{ color: theme.muted }}>
              {episode ? `${show.title} · ${episode.duration}` : show.author}
            </p>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Close" className="-mr-1 -mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full" style={{ background: theme.tile }}>
            <X className="h-4 w-4" />
          </button>
        </div>

        {canTimestamp && (
          <label className="mt-5 flex cursor-pointer items-center justify-between gap-3 rounded-2xl px-4 py-3" style={{ background: theme.tile }}>
            <span className="text-sm font-medium">
              Start at <span className="tabular-nums">{fmt(target.time!)}</span>
            </span>
            <input
              type="checkbox"
              checked={atTime}
              onChange={(e) => setAtTime(e.target.checked)}
              className="h-5 w-5 cursor-pointer"
              style={{ accentColor: theme.accent }}
            />
          </label>
        )}

        <div className="mt-4 flex items-center gap-2 rounded-2xl p-1.5 pl-4" style={{ background: theme.tile }}>
          <span className="min-w-0 flex-1 truncate text-sm" style={{ color: theme.muted }}>
            {url.replace(/^https?:\/\/(www\.)?/, "")}
          </span>
          <button
            onClick={copy}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-transform active:scale-95"
            style={{ background: theme.accent, color: theme.onAccent }}
          >
            {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-y-4">
          {canNative && (
            <ChannelButton label="More…" theme={theme} onClick={native} icon={<Share2 className="h-5 w-5" />} />
          )}
          {CHANNELS.map((c) => (
            <ChannelButton
              key={c.id}
              label={c.label}
              theme={theme}
              icon={c.icon}
              href={c.href(url, text, title)}
              onClick={() => track(c.id, show, episode)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function ChannelButton({ label, icon, theme, href, onClick }: { label: string; icon: ReactNode; theme: ShareTheme; href?: string; onClick: () => void }) {
  const inner = (
    <>
      <span className="grid h-12 w-12 place-items-center rounded-full transition-transform group-hover:-translate-y-0.5 group-active:scale-95" style={{ background: theme.tile }}>
        {icon}
      </span>
      <span className="text-xs" style={{ color: theme.muted }}>
        {label}
      </span>
    </>
  );
  const cls = "group flex flex-col items-center gap-1.5 no-underline hover:no-underline";
  const external = href && /^https?:/.test(href);
  return href ? (
    <a href={href} onClick={onClick} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={cls} style={{ color: theme.text }}>
      {inner}
    </a>
  ) : (
    <button onClick={onClick} className={cls} style={{ color: theme.text }}>
      {inner}
    </button>
  );
}

export const ShareIcon = Share2;
