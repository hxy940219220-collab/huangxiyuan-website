"use client";

import { MusicNoteSimple, SpeakerLow, SpeakerSlash } from "@phosphor-icons/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const DEFAULT_VOLUME = 0.12;
const VOLUME_KEY = "hxy-bgm-volume";
const ENABLED_KEY = "hxy-bgm-enabled";

function clampVolume(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function BackgroundMusic() {
  const controlRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeRef = useRef(DEFAULT_VOLUME);
  const enabledRef = useRef(true);
  const resumeAfterVisibilityRef = useRef(false);

  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [enabled, setEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const persistEnabled = useCallback((nextEnabled: boolean) => {
    try {
      window.localStorage.setItem(ENABLED_KEY, String(nextEnabled));
    } catch {
      // Storage may be unavailable in private browsing; playback still works.
    }
  }, []);

  const playAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || document.hidden || !enabledRef.current) return false;

    if (!audio.paused) {
      setIsPlaying(true);
      return true;
    }

    const targetVolume = clampVolume(volumeRef.current || DEFAULT_VOLUME);
    audio.muted = false;
    audio.volume = targetVolume;

    try {
      await audio.play();
      setIsPlaying(true);
      return true;
    } catch {
      audio.volume = targetVolume;
      setIsPlaying(false);
      return false;
    }
  }, []);

  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.volume = clampVolume(volumeRef.current || DEFAULT_VOLUME);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let storedVolume = DEFAULT_VOLUME;
    let storedEnabled = true;

    try {
      const savedVolume = window.localStorage.getItem(VOLUME_KEY);
      const parsedVolume = savedVolume === null ? NaN : Number(savedVolume);
      if (Number.isFinite(parsedVolume)) storedVolume = clampVolume(parsedVolume);
      storedEnabled = window.localStorage.getItem(ENABLED_KEY) !== "false";
    } catch {
      // Keep safe defaults when storage is unavailable.
    }

    volumeRef.current = storedVolume;
    enabledRef.current = storedEnabled && storedVolume > 0;
    audio.volume = storedVolume;
    setVolume(storedVolume);
    setEnabled(enabledRef.current);

    const removeUnlockListeners = () => {
      document.removeEventListener("pointerdown", unlockPlayback);
      document.removeEventListener("keydown", unlockPlayback);
    };

    const unlockPlayback = (event: Event) => {
      if (event.target instanceof Element && event.target.closest("[data-bgm-control]")) return;
      if (!enabledRef.current) return;

      void playAudio().then((started) => {
        if (started) removeUnlockListeners();
      });
    };

    if (enabledRef.current) {
      document.addEventListener("pointerdown", unlockPlayback);
      document.addEventListener("keydown", unlockPlayback);
      void playAudio().then((started) => {
        if (started) removeUnlockListeners();
      });
    }

    const handleVisibility = () => {
      if (document.hidden) {
        resumeAfterVisibilityRef.current = enabledRef.current && !audio.paused;
        pauseAudio();
      } else if (resumeAfterVisibilityRef.current && enabledRef.current) {
        resumeAfterVisibilityRef.current = false;
        void playAudio();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      removeUnlockListeners();
      document.removeEventListener("visibilitychange", handleVisibility);
      audio.pause();
    };
  }, [pauseAudio, playAudio]);

  useEffect(() => {
    if (!mobileOpen) return;

    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !controlRef.current?.contains(event.target)) {
        setMobileOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileOpen]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      enabledRef.current = false;
      setEnabled(false);
      persistEnabled(false);
      pauseAudio();
      return;
    }

    let nextVolume = volumeRef.current;
    if (nextVolume <= 0) {
      nextVolume = DEFAULT_VOLUME;
      volumeRef.current = nextVolume;
      setVolume(nextVolume);
      try {
        window.localStorage.setItem(VOLUME_KEY, String(nextVolume));
      } catch {
        // Keep the restored volume in memory when storage is unavailable.
      }
    }

    enabledRef.current = true;
    setEnabled(true);
    persistEnabled(true);
    void playAudio();
  };

  const changeVolume = (nextPercent: number) => {
    const audio = audioRef.current;
    const nextVolume = clampVolume(nextPercent / 100);

    volumeRef.current = nextVolume;
    setVolume(nextVolume);
    if (audio) audio.volume = nextVolume;

    try {
      window.localStorage.setItem(VOLUME_KEY, String(nextVolume));
    } catch {
      // Keep the selected volume in memory when storage is unavailable.
    }

    if (nextVolume === 0) {
      enabledRef.current = false;
      setEnabled(false);
      persistEnabled(false);
      pauseAudio();
      return;
    }

    enabledRef.current = true;
    setEnabled(true);
    persistEnabled(true);
    if (audio?.paused) void playAudio();
  };

  const level = `${Math.round(volume * 100)}%`;
  const rangeStyle = { "--bgm-level": level } as CSSProperties;

  return (
    <aside
      ref={controlRef}
      data-bgm-control
      aria-label="背景音乐控制"
      title="KNSRK · Crystal Obsidian"
      className="fixed bottom-4 right-4 z-[90] md:bottom-6 md:right-6"
    >
      <audio
        ref={audioRef}
        src="/crystal-obsidian.mp3"
        preload="metadata"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        type="button"
        aria-label={mobileOpen ? "收起背景音乐控制" : "打开背景音乐控制"}
        aria-expanded={mobileOpen}
        aria-controls="background-music-panel"
        onClick={() => setMobileOpen((open) => !open)}
        className={`cursor-target flex h-11 w-11 items-center justify-center rounded-full border bg-[oklch(0.12_0.018_285/0.97)] shadow-[0_12px_36px_oklch(0.02_0.01_285/0.48)] transition-[color,border-color,box-shadow] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan sm:hidden ${
          isPlaying
            ? "border-[oklch(0.76_0.15_220/0.48)] text-neon-cyan shadow-[0_0_20px_oklch(0.76_0.15_220/0.12)]"
            : "border-[oklch(0.34_0.025_285/0.7)] text-text-tertiary"
        }`}
      >
        <MusicNoteSimple size={18} weight={isPlaying ? "fill" : "regular"} />
      </button>

      <div
        id="background-music-panel"
        role="group"
        aria-label="背景音乐播放与音量"
        className={`absolute bottom-14 right-0 flex items-center gap-2.5 rounded-full border border-[oklch(0.34_0.025_285/0.7)] bg-[oklch(0.12_0.018_285/0.97)] p-1.5 pr-3.5 shadow-[0_12px_36px_oklch(0.02_0.01_285/0.48)] transition-[opacity,transform,visibility] duration-200 ease-out sm:static sm:visible sm:translate-y-0 sm:opacity-100 sm:pointer-events-auto ${
          mobileOpen
            ? "visible translate-y-0 opacity-100 pointer-events-auto"
            : "invisible translate-y-2 opacity-0 pointer-events-none"
        }`}
      >
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? "关闭背景音乐" : "播放背景音乐"}
          aria-pressed={isPlaying}
          className={`cursor-target flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-[color,background-color,border-color,box-shadow] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan ${
            isPlaying
              ? "border-[oklch(0.76_0.15_220/0.48)] bg-[oklch(0.76_0.15_220/0.12)] text-neon-cyan shadow-[0_0_20px_oklch(0.76_0.15_220/0.12)]"
              : "border-[oklch(0.48_0.02_285/0.42)] bg-[oklch(0.2_0.018_285/0.72)] text-text-tertiary"
          }`}
        >
          {isPlaying ? <SpeakerLow size={19} weight="fill" /> : <SpeakerSlash size={19} weight="regular" />}
        </button>

        <div className="w-[94px] sm:w-[116px]">
          <div className="mb-0.5 flex items-center justify-between gap-2 font-body text-[9.5px] leading-none tracking-[0.06em]">
            <span className="text-text-secondary">背景音乐</span>
            <output className={isPlaying ? "text-neon-cyan" : "text-text-muted"} aria-live="polite">
              {isPlaying ? level : enabled ? "待播放" : "已关闭"}
            </output>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            step="1"
            value={Math.round(volume * 100)}
            onChange={(event) => changeVolume(event.currentTarget.valueAsNumber)}
            aria-label="背景音乐音量"
            aria-valuetext={`${Math.round(volume * 100)}%`}
            className="bgm-range"
            style={rangeStyle}
          />
        </div>
      </div>
    </aside>
  );
}
