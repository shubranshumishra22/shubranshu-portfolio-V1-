"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Music, Volume2, VolumeX, Minimize2, Maximize2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SpotifyPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [activeTab, setActiveTab] = useState<"tape" | "spotify">("tape");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio track info (Default: Kalyani Remix)
  const track = {
    title: "Kalyani Remix",
    artist: "Shreya Ghoshal",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    spotifyUrl: "https://open.spotify.com/search/Kalyani%20Remix%20Shreya%20Ghoshal",
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : 0.7;
    }
  }, [isMuted]);

  useEffect(() => {
    const handleMaximize = () => {
      setIsMinimized(false);
      // Auto play on command if browser allows
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.warn("Audio play blocked on command boot:", err);
        });
      }
    };
    window.addEventListener("maximize-spotify-player", handleMaximize);
    return () => {
      window.removeEventListener("maximize-spotify-player", handleMaximize);
    };
  }, []);

  useEffect(() => {
    const handleTogglePlayback = () => {
      if (!audioRef.current) return;
      if (audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.warn("Audio play blocked:", err);
        });
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener("toggle-audio-playback", handleTogglePlayback);
    return () => {
      window.removeEventListener("toggle-audio-playback", handleTogglePlayback);
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("audio-state-changed", { detail: { isPlaying } }));
    setIsMinimized(!isPlaying);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("Audio play blocked by browser policy:", err);
      });
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-terminal text-xs">
      <audio
        ref={audioRef}
        src={track.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        loop
      />

      <AnimatePresence mode="wait">
        {!isMinimized && (
          // EXPANDED MUSIC PLAYER DECK
          <motion.div
            key="expanded"
            layoutId="player-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-72 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col gap-3.5"
          >
            {/* Header controls */}
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2 text-[10px] text-[var(--color-muted)]">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("tape")}
                  className={`pb-1 px-1 transition-colors ${
                    activeTab === "tape" ? "text-[#7CFF8A] border-b border-[#7CFF8A]" : "hover:text-white"
                  }`}
                >
                  DECK-01
                </button>
                <button
                  onClick={() => setActiveTab("spotify")}
                  className={`pb-1 px-1 transition-colors ${
                    activeTab === "spotify" ? "text-[#1DB954] border-b border-[#1DB954]" : "hover:text-white"
                  }`}
                >
                  SPOTIFY
                </button>
              </div>
              <button
                onClick={() => setIsMinimized(true)}
                className="hover:text-white p-0.5 transition-colors"
                aria-label="Minimize player"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {activeTab === "tape" ? (
              // TAPE PLAYER MODE
              <div className="flex flex-col gap-3">
                {/* Cassette Tape graphic */}
                <div className="w-full h-24 rounded border border-[var(--color-border)] bg-[#111] relative overflow-hidden flex items-center justify-center p-3 select-none">
                  {/* Tape labels & structure */}
                  <div className="absolute top-1 left-2 text-[8px] text-[var(--color-muted)] uppercase tracking-wider">
                    Chrome Position
                  </div>
                  <div className="absolute bottom-1 right-2 text-[8px] text-[var(--color-muted)] uppercase tracking-wider">
                    NR [ON]
                  </div>

                  {/* Tape window */}
                  <div className="w-2/3 h-10 rounded border border-[var(--color-border)] bg-[#0A0A0A] relative flex items-center justify-around px-4">
                    {/* Left spindle */}
                    <div className="w-6 h-6 rounded-full border border-[var(--color-border)] bg-[#151515] flex items-center justify-center relative">
                      <motion.div
                        animate={isPlaying ? { rotate: 360 } : {}}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        className="w-4 h-4 rounded-full border border-dashed border-[#7CFF8A]/60 flex items-center justify-center"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                      </motion.div>
                    </div>

                    {/* Tape status */}
                    <div className="flex flex-col items-center gap-0.5 text-[8px] text-[#7CFF8A] font-bold">
                      <span>PLAY</span>
                      <span className={isPlaying ? "animate-pulse" : "opacity-30"}>◀</span>
                    </div>

                    {/* Right spindle */}
                    <div className="w-6 h-6 rounded-full border border-[var(--color-border)] bg-[#151515] flex items-center justify-center relative">
                      <motion.div
                        animate={isPlaying ? { rotate: 360 } : {}}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        className="w-4 h-4 rounded-full border border-dashed border-[#7CFF8A]/60 flex items-center justify-center"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Track Details */}
                <div className="flex flex-col">
                  <div className="font-bold text-[var(--color-primary)] truncate">{track.title}</div>
                  <div className="text-[10px] text-[var(--color-secondary)]">{track.artist}</div>
                </div>

                {/* Progress bar */}
                <div className="flex flex-col gap-1">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="w-full h-1 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-[#7CFF8A]"
                  />
                  <div className="flex justify-between text-[8.5px] text-[var(--color-muted)]">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-2.5">
                  <button
                    onClick={togglePlay}
                    className="flex items-center justify-center w-8 h-8 rounded border border-[var(--color-border)] hover:border-[#7CFF8A] hover:bg-[#7CFF8A]/5 text-[var(--color-primary)] transition-all"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>

                  {/* Visualizer bars */}
                  <div className="flex items-end gap-0.5 h-6 px-4">
                    {[0.6, 0.9, 0.4, 0.8, 0.5, 0.7, 0.3].map((val, idx) => (
                      <span
                        key={idx}
                        className="w-0.5 bg-[#7CFF8A] transition-all duration-300"
                        style={{
                          height: isPlaying ? `${val * 100}%` : "15%",
                          animation: isPlaying
                            ? `pulse ${0.4 + idx * 0.1}s infinite alternate`
                            : "none",
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={toggleMute}
                    className="flex items-center justify-center w-8 h-8 rounded border border-[var(--color-border)] hover:border-[var(--color-secondary)] hover:bg-white/5 text-[var(--color-secondary)] transition-all"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ) : (
              // SPOTIFY EMBED MODE
              <div className="flex flex-col gap-3">
                <div className="rounded overflow-hidden border border-[var(--color-border)]">
                  <iframe
                    src="https://open.spotify.com/embed/playlist/37i9dQZF1DX8Rs8u508EJe?utm_source=generator&theme=0"
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allowFullScreen={false}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                </div>
                <div className="text-[10px] text-[var(--color-muted)] leading-relaxed">
                  Spotify controls require authorization inside the embed. Use the button below to view the official profile.
                </div>
                <a
                  href={track.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 rounded border border-[var(--color-border)] bg-[#1DB954]/10 hover:bg-[#1DB954]/25 hover:border-[#1DB954] text-[#1DB954] font-bold text-center transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  OPEN ON SPOTIFY
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
