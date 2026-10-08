import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import type { Episode, Show } from "@/lib/podcasts";

const RATES = [1, 1.25, 1.5, 2];

/** Per-show listening progress, keyed by episode number so it survives feed reordering. */
type Saved = { last?: number; eps: Record<number, { t: number; done?: boolean }> };

const storageKey = (slug: string) => `joydigi:podcast-progress:${slug}`;

function loadSaved(slug: string): Saved {
  try {
    const s = JSON.parse(localStorage.getItem(storageKey(slug)) || "null");
    return s && typeof s === "object" && s.eps && typeof s.eps === "object" ? s : { eps: {} };
  } catch {
    return { eps: {} };
  }
}

/** Where to pick an episode back up; the first few seconds and the outro restart from 0. */
const startAt = (ep: Episode, entry?: { t: number }) => (entry && entry.t > 5 && entry.t < ep.seconds - 20 ? entry.t : 0);

export type EpisodeProgress = { time: number; done: boolean };

/** One shared <audio> element per page; UI components stay purely presentational. */
export function usePlayer(show: Show, cueIndex?: number) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Mirrors `index` synchronously so audio events never credit time to the wrong episode mid-switch.
  const indexRef = useRef<number | null>(null);
  const savedRef = useRef<Saved>({ eps: {} });
  const [saved, setSaved] = useState<Saved>({ eps: {} });
  const [index, setIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);

  const current: Episode | null = index === null ? null : show.episodes[index];

  const remember = useCallback(
    (i: number, patch: { t?: number; done?: boolean }) => {
      const ep = show.episodes[i];
      if (!ep) return;
      const prev = savedRef.current.eps[ep.number] ?? { t: 0 };
      const next: Saved = { last: ep.number, eps: { ...savedRef.current.eps, [ep.number]: { ...prev, ...patch } } };
      savedRef.current = next;
      setSaved(next);
      try {
        localStorage.setItem(storageKey(show.slug), JSON.stringify(next));
      } catch {}
    },
    [show.episodes, show.slug]
  );

  // Runs before the cue effect below, so a shared episode link can resume from saved progress.
  useEffect(() => {
    savedRef.current = loadSaved(show.slug);
    setSaved(savedRef.current);
  }, [show.slug]);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;
    const onTime = () => setTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audioRef.current = null;
    };
  }, []);

  // Save position every ~5 s, on pause and when the tab goes away; t < 1 is skipped because a src swap briefly reports 0.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    let lastSaved = -1;
    const save = () => {
      const i = indexRef.current;
      const t = audio.currentTime;
      if (i === null || t < 1) return;
      const ep = show.episodes[i];
      lastSaved = t;
      remember(i, t >= ep.seconds - 20 ? { t, done: true } : { t });
    };
    const onTime = () => {
      if (!audio.paused && Math.abs(audio.currentTime - lastSaved) >= 5) save();
    };
    const onHide = () => document.visibilityState === "hidden" && save();
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("pause", save);
    window.addEventListener("pagehide", save);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("pause", save);
      window.removeEventListener("pagehide", save);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [remember, show.episodes]);

  // Listening analytics: episode_started once per episode per page view, plus 25/50/75% milestones.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const seen = new Set<string>();
    const props = () => {
      const ep = indexRef.current === null ? undefined : show.episodes[indexRef.current];
      if (!ep) return null;
      const t = audio.currentTime;
      return { show: show.slug, episode: ep.number, episode_title: ep.title, position_s: Math.round(t), percent: Math.round((t / ep.seconds) * 100) };
    };
    const once = (key: string, event: string, p: Record<string, unknown>) => {
      if (seen.has(key)) return;
      seen.add(key);
      track(event, p);
    };
    const onPlay = () => {
      const p = props();
      if (!p) return;
      track("episode_play", { ...p, playback_rate: audio.playbackRate });
      once(`${p.episode}:start`, "episode_started", p);
    };
    const onPause = () => {
      const p = props();
      if (p && !audio.ended) track("episode_pause", p);
    };
    const onTime = () => {
      const p = props();
      if (!p) return;
      for (const m of [25, 50, 75]) if (p.percent >= m) once(`${p.episode}:${m}`, "episode_progress", { ...p, milestone: m });
    };
    const onEnded = () => {
      const p = props();
      if (p) once(`${p.episode}:done`, "episode_completed", p);
    };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, [show.episodes, show.slug]);

  // Shared episode links autoplay; ?t= uses a media fragment to start mid-episode, else resume saved progress.
  useEffect(() => {
    const audio = audioRef.current;
    const ep = cueIndex === undefined ? undefined : show.episodes[cueIndex];
    if (!audio || !ep) return;
    const asked = Number(new URLSearchParams(window.location.search).get("t")) || 0;
    const t = Math.max(0, Math.min(asked || startAt(ep, savedRef.current.eps[ep.number]), ep.seconds - 1));
    audio.src = t ? `${ep.audio}#t=${t}` : ep.audio;
    indexRef.current = cueIndex!;
    setIndex(cueIndex!);
    setTime(t);
    setDuration(ep.seconds);

    // Autoplay policy usually blocks sound until a user gesture, so retry on the first tap/key; controls handle their own taps.
    const events = ["click", "touchend", "keydown"] as const;
    const onGesture = (e: Event) => {
      if ((e.target as Element | null)?.closest?.("button, a, input, textarea, select, label")) return;
      if (audio.paused) void audio.play().catch(() => {});
    };
    const stop = () => events.forEach((name) => document.removeEventListener(name, onGesture, true));
    audio.addEventListener("play", stop, { once: true });
    audio.play().catch(() => events.forEach((name) => document.addEventListener(name, onGesture, true)));
    return () => {
      stop();
      audio.removeEventListener("play", stop);
    };
  }, [cueIndex, show.episodes]);

  const playIndex = useCallback(
    (i: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (i === index) {
        if (audio.paused) void audio.play();
        else audio.pause();
        return;
      }
      if (index !== null && !audio.ended && audio.currentTime >= 1) remember(index, { t: audio.currentTime });
      const ep = show.episodes[i];
      const t = startAt(ep, savedRef.current.eps[ep.number]);
      audio.src = t ? `${ep.audio}#t=${t}` : ep.audio;
      audio.playbackRate = rate;
      indexRef.current = i;
      remember(i, {});
      setIndex(i);
      setTime(t);
      setDuration(ep.seconds);
      void audio.play();
    },
    [index, rate, remember, show.episodes]
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => {
      if (index === null) return;
      remember(index, { t: 0, done: true });
      if (index < show.episodes.length - 1) playIndex(index + 1);
    };
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, [index, playIndex, remember, show.episodes.length]);

  const progress = useCallback(
    (i: number): EpisodeProgress => {
      const ep = show.episodes[i];
      const entry = ep ? saved.eps[ep.number] : undefined;
      return { time: i === index ? time : entry?.t ?? 0, done: !!entry?.done };
    },
    [index, saved, show.episodes, time]
  );

  /** The episode to continue: the last one played, or the next one if it was finished. */
  const resume = useMemo(() => {
    const i = show.episodes.findIndex((ep) => ep.number === saved.last);
    if (i < 0) return null;
    const ep = show.episodes[i];
    const entry = saved.eps[ep.number];
    if (!entry?.done || startAt(ep, entry) > 0) return { index: i, time: startAt(ep, entry) };
    const next = show.episodes[i + 1];
    return next && !saved.eps[next.number]?.done ? { index: i + 1, time: startAt(next, saved.eps[next.number]) } : null;
  }, [saved, show.episodes]);

  const toggle = useCallback(() => playIndex(index ?? 0), [index, playIndex]);
  const seek = useCallback((t: number) => {
    const audio = audioRef.current;
    if (audio) audio.currentTime = Math.max(0, Math.min(t, audio.duration || t));
  }, []);
  const skip = useCallback((d: number) => seek((audioRef.current?.currentTime ?? 0) + d), [seek]);
  const cycleRate = useCallback(() => {
    const next = RATES[(RATES.indexOf(rate) + 1) % RATES.length];
    setRate(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
    track("playback_rate_changed", { show: show.slug, playback_rate: next });
  }, [rate, show.slug]);

  useEffect(() => {
    if (!current || !("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: current.title,
      artist: show.title,
      artwork: [{ src: show.cover, sizes: "1024x1024", type: "image/jpeg" }],
    });
    navigator.mediaSession.setActionHandler("play", toggle);
    navigator.mediaSession.setActionHandler("pause", toggle);
    navigator.mediaSession.setActionHandler("seekbackward", () => skip(-15));
    navigator.mediaSession.setActionHandler("seekforward", () => skip(30));
  }, [current, show.title, show.cover, toggle, skip]);

  return { current, index, playing, time, duration, rate, playIndex, toggle, seek, skip, cycleRate, progress, resume };
}

export type Player = ReturnType<typeof usePlayer>;

export const fmt = (s: number) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};
