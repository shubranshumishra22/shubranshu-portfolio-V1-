"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import ArcadeGame from "./ArcadeGame";

interface LogLine {
  text: string;
  type: "prompt" | "input" | "output" | "system";
}

export default function Terminal() {
  const [history, setHistory] = useState<LogLine[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [activeApp, setActiveApp] = useState<"terminal" | "game">("terminal");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const handleFocus = () => {
      inputRef.current?.focus();
    };
    window.addEventListener("focus-terminal-input", handleFocus);
    return () => {
      window.removeEventListener("focus-terminal-input", handleFocus);
    };
  }, []);


  // Initial boot sequences
  useEffect(() => {
    setHistory([
      { text: "SYSBOOT: CPU OK // RAM OK // COGNITIVE_LINK OK", type: "system" },
      { text: "SHUBRANSHU SHEKHAR CORE v1.0.0 ONLINE.", type: "system" },
      { text: "AI & ML ENGINEER | FULL STACK DEVELOPER.", type: "system" },
      { text: "----------------------------------------", type: "system" },
      { text: "Type or click a system routine:", type: "system" },
      { text: "[about]     → Read cognitive profile & bio", type: "output" },
      { text: "[projects]  → Load engineering applications", type: "output" },
      { text: "[research]  → Scan academic publications", type: "output" },
      { text: "[skills]    → Query core technology matrix", type: "output" },
      { text: "[contact]   → Retrieve communication channels", type: "output" },
      { text: "[spotify]   → Boot retro cyber tape & Spotify player", type: "output" },
      { text: "[play]      → Launch retro arcade game", type: "output" },
      { text: "----------------------------------------", type: "system" },
    ]);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, inputValue]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response: LogLine[] = [];
    let shouldScrollToSection = "";

    if (trimmed === "help") {
      response = [
        { text: "ROUTINES CATALOG:", type: "system" },
        { text: "  about       → Access profile data & biography", type: "output" },
        { text: "  projects    → Inspect active build catalogs", type: "output" },
        { text: "  research    → Retrieve publications archive", type: "output" },
        { text: "  skills      → Display capability indicators", type: "output" },
        { text: "  contact     → Establish secure connection", type: "output" },
        { text: "  spotify     → Boot retro cyber tape & Spotify player", type: "output" },
        { text: "  play        → Launch retro arcade game", type: "output" },
        { text: "  clear       → Reset terminal scrollbuffer", type: "output" },
      ];
    } else if (trimmed === "about") {
      response = [
        { text: "[LOADING PROFILE LAYER...]", type: "system" },
        { text: "Name: Shubranshu Shekhar", type: "output" },
        { text: "Role: AI & ML Engineer | Full Stack Developer", type: "output" },
        { text: "Focus: Solving complex problems via smart software.", type: "output" },
        { text: "Routing to #about...", type: "system" },
      ];
      shouldScrollToSection = "about";
    } else if (trimmed === "projects") {
      response = [
        { text: "[RETRIEVING DIGITAL ASSETS...]", type: "system" },
        { text: "Compiling active repository lists...", type: "output" },
        { text: "Routing to #projects...", type: "system" },
      ];
      shouldScrollToSection = "projects";
    } else if (trimmed === "research") {
      response = [
        { text: "[SCANNING RESEARCH LIBRARY...]", type: "system" },
        { text: "Locating machine learning publications...", type: "output" },
        { text: "Routing to #research...", type: "system" },
      ];
      shouldScrollToSection = "research";
    } else if (trimmed === "skills") {
      response = [
        { text: "[EVALUATING SYSTEM PARAMETERS...]", type: "system" },
        { text: "Languages: TS/JS, Python, Go, C++, SQL", type: "output" },
        { text: "Frameworks: Next.js, React, Node.js, PyTorch", type: "output" },
        { text: "Routing to #skills...", type: "system" },
      ];
      shouldScrollToSection = "skills";
    } else if (trimmed === "contact") {
      response = [
        { text: "[ESTABLISHING SECURE COMMS LINK...]", type: "system" },
        { text: "Connection channel status: READY.", type: "output" },
        { text: "Routing to #contact...", type: "system" },
      ];
      shouldScrollToSection = "contact";
    } else if (trimmed === "spotify" || trimmed === "song" || trimmed === "music") {
      response = [
        { text: "[ESTABLISHING SECURE AUDIO LINK...]", type: "system" },
        { text: "  ♫ TRACK:  Kalyani Remix", type: "output" },
        { text: "  ♫ ARTIST: Shreya Ghoshal", type: "output" },
        { text: "  ♫ STATUS: ONLINE & DEPLOYED", type: "output" },
        { text: "  ♫ LINK:   https://open.spotify.com/search/Kalyani%20Remix%20Shreya%20Ghoshal", type: "output" },
        { text: "Activating floating tape deck deck-01...", type: "system" },
      ];
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("maximize-spotify-player"));
      }
    } else if (trimmed === "play" || trimmed === "game") {
      response = [
        { text: "[INITIALIZING RETRO GAME GRID...]", type: "system" },
        { text: "Booting Matrix Arcade sub-kernel...", type: "output" },
      ];
      setTimeout(() => {
        setActiveApp("game");
      }, 700);
    } else if (trimmed === "clear") {
      setHistory([]);
      setInputValue("");
      return;
    } else if (trimmed !== "") {
      response = [
        { text: `error: unknown routine '${trimmed}'. Try 'help'.`, type: "system" },
      ];
    }

    setHistory((prev) => [
      ...prev,
      { text: `visitor@shubranshu:~$ ${cmd}`, type: "prompt" },
      ...response,
    ]);

    setInputValue("");

    if (shouldScrollToSection) {
      setTimeout(() => {
        const el = document.getElementById(shouldScrollToSection);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleCommand(inputValue);
    }
  };

  if (activeApp === "game") {
    return <ArcadeGame onExit={() => setActiveApp("terminal")} />;
  }

  return (
    <div
      onClick={focusInput}
      className="w-full h-full font-terminal text-left select-none text-[7px] min-[370px]:text-[8.5px] sm:text-[9px] md:text-[10px] min-[1400px]:text-[11px] leading-relaxed cursor-text flex flex-col justify-between"
    >
      <div
        ref={scrollRef}
        className="w-full overflow-y-auto hide-scrollbar flex-1 pr-1"
      >
        <div className="space-y-1 sm:space-y-1.5 phosphor-text">
          {history.map((line, idx) => {
            // Check if it's an output line containing clickable commands in brackets
            if (line.type === "output" && line.text.startsWith("[")) {
              const match = line.text.match(/^\[([a-z]+)\](.*)/);
              if (match) {
                const cmd = match[1];
                const desc = match[2];
                return (
                  <div key={idx} className="flex flex-wrap items-center">
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCommand(cmd);
                      }}
                      className="underline cursor-pointer hover:text-white transition-colors mr-1 font-bold"
                    >
                      [{cmd}]
                    </span>
                    <span className="opacity-80">{desc}</span>
                  </div>
                );
              }
            }

            // Normal text line
            return (
              <div key={idx} className="whitespace-pre-wrap">
                {line.type === "prompt" ? (
                  <span>
                    <span className="opacity-75">visitor@shubranshu</span>
                    <span>:~$</span> <span className="opacity-95">{line.text.replace("visitor@shubranshu:~$ ", "")}</span>
                  </span>
                ) : (
                  <span>{line.text}</span>
                )}
              </div>
            );
          })}

          {/* Active input line */}
          <form onSubmit={handleSubmit} className="flex items-center gap-1">
            <span className="opacity-75 whitespace-nowrap">visitor@shubranshu</span>
            <span className="whitespace-nowrap">:~$</span>
            <div className="relative flex-1 flex items-center">
              <span className="text-[#7CFF8A] z-10">{inputValue}</span>
              <span
                className="inline-block w-[6px] h-3.5 bg-[#7CFF8A] cursor-blink"
                style={{ marginLeft: inputValue ? "2px" : "0" }}
              />
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="absolute inset-0 opacity-0 bg-transparent text-transparent caret-transparent border-none outline-none z-0"
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
