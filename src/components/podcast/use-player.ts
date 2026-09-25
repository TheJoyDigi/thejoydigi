import { useCallback, useEffect, useRef, useState } from "react";
import type { Episode, Show } from "@/lib/podcasts";

const RATES = [1, 1.25, 1.5, 2];

/** One shared <audio> element per page; UI components stay purely presentational. */
export function usePlayer(show: Show) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);

  const current: Episode | null = index === null ? null : show.episodes[index];

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

  const playIndex = useCallback(
    (i: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (i === index) {
        if (audio.paused) void audio.play();
        else audio.pause();
        return;
      }
      const ep = show.episodes[i];
      audio.src = ep.audio;
      audio.playbackRate = rate;
      setIndex(i);
      setTime(0);
      setDuration(ep.seconds);
      void audio.play();
    },
    [index, rate, show.episodes]
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => {
      if (index !== null && index < show.episodes.length - 1) playIndex(index + 1);
    };
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, [index, playIndex, show.episodes.length]);

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
  }, [rate]);

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

  return { current, index, playing, time, duration, rate, playIndex, toggle, seek, skip, cycleRate };
}

export type Player = ReturnType<typeof usePlayer>;

export const fmt = (s: number) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};
