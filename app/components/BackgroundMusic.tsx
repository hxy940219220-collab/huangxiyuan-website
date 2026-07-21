"use client";

import { SpeakerLow, SpeakerSlash } from "@phosphor-icons/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
} from "react";

const DEFAULT_VOLUME = 0.1;
const COLLAPSE_DELAY = 1000;
const VOLUME_KEY = "hxy-bgm-volume";
const ENABLED_KEY = "hxy-bgm-enabled";

function clampVolume(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeRef = useRef(DEFAULT_VOLUME);
  const enabledRef = useRef(true);
  const resumeAfterVisibilityRef = useRef(false);
  const collapseTimerRef = useRef<number | null>(null);
  const focusWithinRef = useRef(false);

  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [enabled, setEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const cancelCollapse = useCallback(() => {
    if (collapseTimerRef.current !== null) {
      window.clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }
  }, []);

  const scheduleCollapse = useCallback(() => {
    cancelCollapse();
    collapseTimerRef.current = window.setTimeout(() => {
      if (!focusWithinRef.current) setExpanded(false);
      collapseTimerRef.current = null;
    }, COLLAPSE_DELAY);
  }, [cancelCollapse]);

  const revealControl = useCallback(() => {
    setExpanded(true);
    scheduleCollapse();
  }, [scheduleCollapse]);

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

  useEffect(() => () => cancelCollapse(), [cancelCollapse]);

  const togglePlayback = () => {
    revealControl();
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
    revealControl();
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

  const handleFocus = () => {
    focusWithinRef.current = true;
    cancelCollapse();
    setExpanded(true);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return;
    focusWithinRef.current = false;
    scheduleCollapse();
  };

  const level = `${Math.round(volume * 100)}%`;

  return (
    <aside className="relative z-10 h-9 w-9 shrink-0" aria-label="背景音乐控制">
      <audio
        ref={audioRef}
        src="/crystal-obsidian.mp3"
        preload="auto"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div
        data-bgm-control
        role="group"
        aria-label="背景音乐播放与音量"
        title="KNSRK · Crystal Obsidian"
        onMouseEnter={revealControl}
        onMouseMove={revealControl}
        onMouseLeave={scheduleCollapse}
        onFocusCapture={handleFocus}
        onBlurCapture={handleBlur}
        className="absolute right-0 top-0 h-9 w-[150px]"
      >
        <div
          aria-hidden="true"
          className={`absolute inset-0 origin-right rounded-full border border-[oklch(0.34_0.025_285/0.7)] bg-[oklch(0.12_0.018_285/0.97)] shadow-[0_8px_26px_oklch(0.02_0.01_285/0.42)] transition-[scale,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[scale,opacity] ${
            expanded ? "scale-x-100 opacity-100" : "scale-x-[0.24] opacity-0"
          }`}
        />

        <button
          type="button"
          onClick={togglePlayback}
          onPointerUp={(event) => {
            event.currentTarget.blur();
            focusWithinRef.current = false;
            scheduleCollapse();
          }}
          aria-label={isPlaying ? "关闭背景音乐" : "播放背景音乐"}
          aria-pressed={isPlaying}
          className={`cursor-target absolute left-0.5 top-0.5 z-10 flex h-8 w-8 items-center justify-center rounded-full border transition-[translate,color,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[translate] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan ${
            expanded ? "translate-x-0" : "translate-x-[114px]"
          } ${
            isPlaying
              ? "border-[oklch(0.76_0.15_220/0.5)] bg-[oklch(0.76_0.15_220/0.12)] text-neon-cyan shadow-[0_0_16px_oklch(0.76_0.15_220/0.12)]"
              : "border-[oklch(0.48_0.02_285/0.4)] bg-[oklch(0.2_0.018_285/0.76)] text-text-tertiary"
          }`}
        >
          {isPlaying ? <SpeakerLow size={16} weight="fill" /> : <SpeakerSlash size={16} weight="regular" />}
        </button>

        <div
          id="background-music-volume"
          aria-hidden={!expanded}
          className={`absolute left-[40px] right-2 top-1/2 -translate-y-1/2 transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            expanded
              ? "translate-x-0 opacity-100 pointer-events-auto delay-100"
              : "translate-x-3 opacity-0 pointer-events-none delay-0"
          }`}
        >
          <div className="flex items-center justify-between gap-2 font-body text-[8.5px] leading-none tracking-[0.05em]">
            <span className="text-text-secondary">音乐</span>
            <output className={isPlaying ? "text-neon-cyan" : "text-text-muted"} aria-live="polite">
              {isPlaying ? level : enabled ? "待播放" : "已关闭"}
            </output>
          </div>
          <div className="relative h-[13px]">
            <div
              data-bgm-track
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[5px] top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-[oklch(0.48_0.02_285/0.28)]"
            >
              <div
                data-bgm-fill
                className="h-full rounded-full bg-[oklch(0.79_0.15_220)]"
                style={{ width: level }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={Math.round(volume * 100)}
              onChange={(event) => changeVolume(event.currentTarget.valueAsNumber)}
              onPointerDown={revealControl}
              onPointerUp={(event) => {
                event.currentTarget.blur();
                focusWithinRef.current = false;
                scheduleCollapse();
              }}
              onKeyDown={revealControl}
              tabIndex={expanded ? 0 : -1}
              aria-label="背景音乐音量"
              aria-valuetext={`${Math.round(volume * 100)}%`}
              className="bgm-range absolute inset-0 z-10"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
