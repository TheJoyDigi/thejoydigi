import { BookOpen, Maximize2, Minimize2, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import type { Episode } from "@/lib/podcasts";
import styles from "./episode-transcript.module.css";

type ReaderSettings = {
  size: number;
  width: "comfortable" | "wide";
  theme: "paper" | "night";
};

const DEFAULT_SETTINGS: ReaderSettings = { size: 1, width: "comfortable", theme: "paper" };
const STORAGE_KEY = "thejoydigi.reader-settings";

/** The complete transcript remains in server HTML, including when the reader is closed. */
const COPY = {
  default: { eyebrow: "THE READING ROOM", title: "The story, in your hands.", body: "Read along at your own pace. Make the page yours." },
  arcade: { eyebrow: "READ MODE", title: "Every word, no headphones.", body: "Read along, skim back, steal the best lines." },
};

export function EpisodeTranscript({ episode, variant = "default" }: { episode?: Episode; variant?: keyof typeof COPY }) {
  const [settings, setSettings] = useState<ReaderSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);
  const [focused, setFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const readerRef = useRef<HTMLElement>(null);
  const focusButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as Partial<ReaderSettings> | null;
      if (saved) {
        setSettings({
          size: typeof saved.size === "number" && saved.size >= 0 && saved.size <= 3 ? saved.size : 1,
          width: saved.width === "wide" ? "wide" : "comfortable",
          theme: saved.theme === "night" ? "night" : "paper",
        });
      }
    } catch {
      // Reading preferences are optional when storage is unavailable.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // The reader still works without persistent storage.
    }
  }, [loaded, settings]);

  useEffect(() => {
    if (!focused) return;
    const previousOverflow = document.body.style.overflow;
    const focusButton = focusButtonRef.current;
    document.body.style.overflow = "hidden";
    focusButton?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFocused(false);
        return;
      }
      if (event.key !== "Tab" || !readerRef.current) return;
      const controls = Array.from(readerRef.current.querySelectorAll<HTMLElement>("button:not(:disabled), a[href]"));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      focusButton?.focus();
    };
  }, [focused]);

  if (!episode?.transcript?.trim()) return null;

  const wordCount = episode.transcript.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  const unit = /\bepisode\b/i.test(episode.title) ? "EPISODE" : "CHAPTER";
  const sizeClass = [styles.sizeSmall, styles.sizeRegular, styles.sizeLarge, styles.sizeExtraLarge][settings.size];

  return (
    <section
      id="transcript"
      ref={readerRef}
      aria-labelledby="transcript-heading"
      aria-modal={focused ? true : undefined}
      role={focused ? "dialog" : undefined}
      className={`${styles.section} ${variant === "arcade" ? styles.arcade : ""} ${focused ? styles.focused : ""}`}
    >
      <div className={styles.shell}>
        {!focused && (
          <div className={styles.intro}>
            <span className={styles.introMark} aria-hidden="true"><BookOpen size={18} strokeWidth={1.6} /></span>
            <div>
              <p className={styles.eyebrow}>{COPY[variant].eyebrow}</p>
              <h2 id="transcript-heading" className={styles.introTitle}>{COPY[variant].title}</h2>
              <p className={styles.introCopy}>{COPY[variant].body}</p>
            </div>
          </div>
        )}

        <div className={`${styles.card} ${settings.theme === "night" ? styles.night : ""} ${sizeClass} ${settings.width === "wide" ? styles.wide : ""}`}>
          <div className={styles.cardTop}>
            <div className={styles.chapterMeta}>
              <span className={styles.metaLine} aria-hidden="true" />
              <span>{unit} {String(episode.number).padStart(2, "0")}</span>
              <span className={styles.metaDot} aria-hidden="true">·</span>
              <span>{minutes} MIN READ</span>
            </div>
            <BookOpen className={styles.cardIcon} size={24} strokeWidth={1.4} aria-hidden="true" />
          </div>

          <div className={styles.titleBlock}>
            <p className={styles.kicker}>THE TRANSCRIPT</p>
            <h3 id={focused ? "transcript-heading" : undefined} className={styles.episodeTitle}>{episode.shortTitle}</h3>
            <p className={styles.episodeDescription}>{episode.description}</p>
          </div>

          <details className={styles.details} open={expanded} onToggle={(event) => {
            setExpanded(event.currentTarget.open);
            if (!event.currentTarget.open) setFocused(false);
          }}>
            <summary className={styles.summary}>
              <span className={styles.summaryText}>{expanded ? "Hide transcript" : "Open transcript"}</span>
              <span className={styles.summaryArrow} aria-hidden="true">{expanded ? "−" : "+"}</span>
            </summary>
            <div className={styles.readerBody}>
              <div className={styles.toolbar} aria-label="Reading tools">
                <div className={styles.toolGroup}>
                  <span className={styles.toolLabel}>TEXT SIZE</span>
                  <div className={styles.segment}>
                    <button type="button" aria-label="Decrease text size" disabled={settings.size === 0} onClick={() => setSettings((current) => ({ ...current, size: Math.max(0, current.size - 1) }))}>A−</button>
                    <span className={styles.sizeValue} aria-live="polite">{[90, 100, 115, 130][settings.size]}%</span>
                    <button type="button" aria-label="Increase text size" disabled={settings.size === 3} onClick={() => setSettings((current) => ({ ...current, size: Math.min(3, current.size + 1) }))}>A+</button>
                  </div>
                </div>
                <div className={styles.toolGroup}>
                  <span className={styles.toolLabel}>COLUMN</span>
                  <div className={styles.segment}>
                    <button type="button" aria-pressed={settings.width === "comfortable"} onClick={() => setSettings((current) => ({ ...current, width: "comfortable" }))}>Comfort</button>
                    <button type="button" aria-pressed={settings.width === "wide"} onClick={() => setSettings((current) => ({ ...current, width: "wide" }))}>Wide</button>
                  </div>
                </div>
                <div className={styles.toolGroup}>
                  <span className={styles.toolLabel}>APPEARANCE</span>
                  <button className={styles.singleTool} type="button" aria-label={settings.theme === "paper" ? "Switch to night theme" : "Switch to paper theme"} onClick={() => setSettings((current) => ({ ...current, theme: current.theme === "paper" ? "night" : "paper" }))}>
                    {settings.theme === "paper" ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
                    {settings.theme === "paper" ? "Night" : "Paper"}
                  </button>
                </div>
                <div className={styles.toolGroup}>
                  <span className={styles.toolLabel}>DISTRACTIONS</span>
                  <button ref={focusButtonRef} className={styles.singleTool} type="button" aria-pressed={focused} onClick={() => setFocused((current) => !current)}>
                    {focused ? <Minimize2 size={16} aria-hidden="true" /> : <Maximize2 size={16} aria-hidden="true" />}
                    {focused ? "Exit focus" : "Focus"}
                  </button>
                </div>
              </div>

              <div className={styles.rule} aria-hidden="true"><span>✦</span></div>
              <article className={styles.transcript} aria-label={`${episode.shortTitle} transcript`}>
                <ReactMarkdown>{episode.transcript}</ReactMarkdown>
              </article>
              <div className={styles.ending} aria-hidden="true"><span /> END OF {unit} <span /></div>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
