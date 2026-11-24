"use client";

import { SpeakerSlash } from "@phosphor-icons/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
} from "react";

const DEFAULT_VOLUME = 0.1;
const COLLAPSE_DELAY = 1200;
const VOLUME_KEY = "hxy-bgm-volume";
const PLAY_EVENT = "hxy:bgm-play";

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
    cancelCollapse();
    setExpanded(true);
  }, [cancelCollapse]);

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
    try {
      const savedVolume = window.localStorage.getItem(VOLUME_KEY);
      const parsedVolume = savedVolume === null ? NaN : Number(savedVolume);
      if (Number.isFinite(parsedVolume) && parsedVolume > 0) {
        storedVolume = clampVolume(parsedVolume);
      }
    } catch {
      // Keep safe defaults when storage is unavailable.
    }

    volumeRef.current = storedVolume;
    enabledRef.current = true;
    audio.volume = storedVolume;

    let syncFrame = 0;
    if (storedVolume !== DEFAULT_VOLUME) {
      syncFrame = window.requestAnimationFrame(() => setVolume(storedVolume));
    }

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

    const handlePlayRequest = () => {
      enabledRef.current = true;
      setEnabled(true);
      void playAudio();
    };

    window.addEventListener(PLAY_EVENT, handlePlayRequest);

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
      if (syncFrame) window.cancelAnimationFrame(syncFrame);
      removeUnlockListeners();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener(PLAY_EVENT, handlePlayRequest);
      audio.pause();
    };
  }, [pauseAudio, playAudio]);

  useEffect(() => () => cancelCollapse(), [cancelCollapse]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused || isPlaying) {
      enabledRef.current = false;
      setEnabled(false);
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
      pauseAudio();
      return;
    }

    enabledRef.current = true;
    setEnabled(true);
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

      {/* 播放按钮固定在右侧不位移，悬停时向左平滑展开音量条，避免点击偏移误触滑块 */}
      <div
        data-bgm-control
        role="group"
        aria-label="背景音乐播放与音量"
        title="KNSRK · Crystal Obsidian"
        onMouseEnter={revealControl}
        onMouseLeave={scheduleCollapse}
        onFocusCapture={handleFocus}
        onBlurCapture={handleBlur}
        className={`absolute right-0 top-0 h-9 transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          expanded ? "w-[164px]" : "w-9"
        }`}
      >
        {/* 展开胶囊背景 */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 origin-right rounded-full border border-white/[0.14] bg-[rgba(11,11,22,0.96)] shadow-[0_10px_28px_rgba(0,0,0,0.48)] backdrop-blur-xl transition-opacity duration-250 ${
            expanded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* 左侧音量控制区 */}
        <div
          id="background-music-volume"
          aria-hidden={!expanded}
          className={`absolute left-3.5 right-[44px] top-1/2 -translate-y-1/2 transition-[opacity,transform] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            expanded
              ? "translate-x-0 opacity-100 pointer-events-auto"
              : "translate-x-2 opacity-0 pointer-events-none"
          }`}
        >
          <div className="mb-0.5 flex items-center justify-between gap-2 font-body text-[10.5px] leading-none tracking-[0.03em]">
            <span className="text-text-secondary">音乐</span>
            <output
              className={`tabular-nums ${isPlaying ? "text-neon-cyan" : "text-text-muted"}`}
              aria-live="polite"
            >
              {isPlaying ? level : enabled ? "待播放" : "已暂停"}
            </output>
          </div>
          <div className="relative h-[13px]">
            <div
              data-bgm-track
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[4px] top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-white/[0.16]"
            >
              <div
                data-bgm-fill
                className="h-full rounded-full bg-neon-cyan"
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

        {/* 固定在右侧的播放/静音按钮（永不逃离光标） */}
        <button
          type="button"
          onClick={togglePlayback}
          onPointerUp={(event) => {
            event.currentTarget.blur();
            focusWithinRef.current = false;
          }}
          aria-label={isPlaying ? "暂停背景音乐" : "播放背景音乐"}
          aria-pressed={isPlaying}
          className={`cursor-target absolute right-0.5 top-0.5 z-10 flex h-8 w-8 items-center justify-center rounded-full border transition-[color,background-color,border-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan cursor-pointer ${
            isPlaying
              ? "border-neon-cyan/50 bg-neon-cyan/[0.12] text-neon-cyan shadow-[0_0_16px_rgba(0,200,255,0.16)]"
              : "border-white/[0.15] bg-white/[0.06] text-text-tertiary hover:border-white/[0.28] hover:text-[#f5f7ff]"
          }`}
        >
          {isPlaying ? (
            <span className="flex h-3.5 items-end gap-[2.5px]" aria-hidden="true">
              <span className="bgm-eq-bar bgm-eq-1 w-[2px] rounded-full bg-neon-cyan" />
              <span className="bgm-eq-bar bgm-eq-2 w-[2px] rounded-full bg-neon-cyan" />
              <span className="bgm-eq-bar bgm-eq-3 w-[2px] rounded-full bg-neon-cyan" />
            </span>
          ) : (
            <SpeakerSlash size={15} weight="regular" />
          )}
        </button>
      </div>
    </aside>
  );
}
