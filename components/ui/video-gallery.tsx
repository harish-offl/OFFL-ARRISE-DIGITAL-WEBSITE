"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { VideoAsset } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type VideoGalleryProps = {
  videos: VideoAsset[];
  accent?: string;
  /** Labels rendered when no playable asset has been integrated yet. */
  pendingLabels?: string[];
};

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export function VideoGallery({
  videos,
  accent = "#FF6B00",
  pendingLabels = ["Video 01", "Video 02"],
}: VideoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const active = videos[activeIndex];

  const syncFullscreen = useCallback(() => {
    setFullscreen(Boolean(document.fullscreenElement));
  }, []);

  useEffect(() => {
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, [syncFullscreen]);

  const resetPlayer = useCallback(() => {
    setStarted(false);
    setPlaying(false);
    setCurrent(0);
    setDuration(0);
  }, []);

  const selectVideo = useCallback(
    (index: number) => {
      setActiveIndex(index);
      resetPlayer();
    },
    [resetPlayer],
  );

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, []);

  const seek = useCallback((value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value;
    setCurrent(value);
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
  }, [muted]);

  const changeVolume = useCallback((value: number) => {
    const video = videoRef.current;
    setVolume(value);
    setMuted(value === 0);
    if (video) {
      video.volume = value;
      video.muted = value === 0;
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    const frame = frameRef.current;
    if (!frame) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void frame.requestFullscreen?.();
    }
  }, []);

  /* No playable file integrated yet — render an explicit asset slot instead of a fake player. */
  if (!active) {
    return (
      <div className="grid gap-5 sm:grid-cols-2">
        {pendingLabels.map((label, index) => (
          <div
            key={label}
            className="group relative overflow-hidden rounded-xl border border-dashed border-line bg-surface p-6"
          >
            <span
              className="absolute inset-x-0 top-0 h-1"
              style={{ backgroundColor: accent }}
              aria-hidden="true"
            />
            <div className="relative flex aspect-video w-full items-center justify-center rounded-lg border border-line bg-paper">
              <div className="text-center">
                <span className="grid size-12 place-items-center rounded-full border border-line bg-surface text-ink/70 mx-auto">
                  <Play className="size-5" />
                </span>
                <p className="mt-4 font-display text-base font-medium text-ink">{label}</p>
                <p className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted">
                  Asset pending integration
                </p>
              </div>
            </div>
            <p className="mt-4 font-body text-[0.8125rem] leading-relaxed text-muted">
              {index === 0
                ? "Add the delivered MP4/WebM file to /public/media and register it under media.videos for this client."
                : "Add the poster frame and playable source to unlock this slot."}
            </p>
          </div>
        ))}
      </div>
    );
  }

  const hasFile = Boolean(active.src);

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div
          ref={frameRef}
          className="overflow-hidden rounded-xl border border-line bg-night"
        >
          <div className="relative aspect-video w-full bg-black">
            {hasFile ? (
              <video
                key={active.id}
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-contain"
                src={active.src}
                poster={active.poster}
                preload="none"
                playsInline
                controls={false}
                onClick={togglePlay}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
                onLoadedMetadata={(event) => {
                  setDuration(event.currentTarget.duration);
                }}
                onTimeUpdate={(event) => {
                  setCurrent(event.currentTarget.currentTime);
                }}
              />
            ) : active.embedUrl ? (
              <iframe
                key={active.id}
                className="absolute inset-0 h-full w-full"
                src={active.embedUrl}
                title={active.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : null}

            {hasFile && !started && (
              <button
                type="button"
                onClick={togglePlay}
                className="group absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/35 transition-colors hover:bg-black/25"
                aria-label={`Play ${active.title}`}
              >
                <span
                  className="grid size-16 place-items-center rounded-full border border-white/30 bg-white/15 backdrop-blur transition-transform duration-500 ease-out-expo group-hover:scale-110 md:size-20"
                  style={{ color: "#fff" }}
                >
                  <Play className="size-6 md:size-7" />
                </span>
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-white/80">
                  Play video
                </span>
              </button>
            )}

            {hasFile && started && !playing && (
              <button
                type="button"
                onClick={togglePlay}
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/25"
                aria-label={`Resume ${active.title}`}
              >
                <span className="grid size-14 place-items-center rounded-full border border-white/30 bg-black/50 text-white">
                  <Play className="size-5" />
                </span>
              </button>
            )}
          </div>

          {hasFile && (
            <div className="flex flex-wrap items-center gap-3 border-t border-white/10 bg-night-2 px-3 py-3 md:px-4">
              <button
                type="button"
                onClick={togglePlay}
                className="grid size-9 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-night"
                aria-label={playing ? "Pause video" : "Play video"}
              >
                {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
              </button>

              <span className="font-mono text-[0.625rem] tabular-nums text-white/60">
                {formatTime(current)} / {formatTime(duration)}
              </span>

              <input
                type="range"
                min={0}
                max={Math.max(duration, 0.1)}
                step={0.1}
                value={Math.min(current, duration || 0.1)}
                onChange={(event) => seek(Number(event.target.value))}
                className="h-1 min-w-[6rem] flex-1 cursor-pointer appearance-none rounded-full bg-white/20"
                style={{ accentColor: accent }}
                aria-label="Seek video"
              />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-night"
                  aria-label={muted ? "Unmute video" : "Mute video"}
                >
                  {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={muted ? 0 : volume}
                  onChange={(event) => changeVolume(Number(event.target.value))}
                  className="hidden h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/20 sm:block"
                  style={{ accentColor: accent }}
                  aria-label="Volume"
                />
              </div>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="grid size-9 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-night"
                aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {fullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
              </button>
            </div>
          )}

          {!hasFile && active.embedUrl && (
            <div className="border-t border-white/10 bg-night-2 px-4 py-3">
              <p className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-white/50">
                Playing from verified embed source
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-display text-lg font-medium tracking-[-0.02em] text-ink">
              {active.title}
            </p>
            {active.caption && (
              <p className="mt-1 font-body text-sm text-muted">{active.caption}</p>
            )}
          </div>
          {active.duration && (
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
              {active.duration}
            </span>
          )}
        </div>
      </div>

      <div className="lg:col-span-4">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
          {videos.length} video{videos.length === 1 ? "" : "s"}
        </p>
        <ul className="mt-4 flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {videos.map((video, index) => {
            const isActive = index === activeIndex;
            return (
              <li key={video.id} className="min-w-[10.5rem] lg:min-w-0">
                <button
                  type="button"
                  onClick={() => selectVideo(index)}
                  aria-current={isActive}
                  className={cn(
                    "group w-full overflow-hidden rounded-lg border text-left transition-colors",
                    isActive
                      ? "border-ink/40 bg-surface"
                      : "border-line bg-surface hover:border-ink/25",
                  )}
                >
                  <span className="relative block aspect-video w-full overflow-hidden bg-paper">
                    {video.poster ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={video.poster}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <span
                        className="absolute inset-0 flex items-center justify-center font-display text-2xl font-bold"
                        style={{ backgroundColor: `${accent}22`, color: accent }}
                      >
                        {index + 1}
                      </span>
                    )}
                    <span
                      className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      <span className="grid size-9 place-items-center rounded-full bg-white/90 text-night">
                        <Play className="size-4" />
                      </span>
                    </span>
                    {isActive && (
                      <span
                        className="absolute inset-x-0 bottom-0 h-1"
                        style={{ backgroundColor: accent }}
                        aria-hidden="true"
                      />
                    )}
                  </span>
                  <span className="block px-3 py-2.5">
                    <span className="block font-body text-[0.8125rem] font-medium text-ink">
                      {video.title}
                    </span>
                    <span className="mt-0.5 block font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-muted">
                      {video.src ? "Play" : video.embedUrl ? "Embed" : "Pending"}
                      {video.duration ? ` · ${video.duration}` : ""}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
