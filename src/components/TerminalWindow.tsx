"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  lines: { content: string; type?: "input" | "output" | "system" | "prompt" }[];
  className?: string;
}

export default function TerminalWindow({ lines, className }: TerminalWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        "rounded-xl border border-[#222] bg-[#0D0D0D]/90 backdrop-blur-sm overflow-hidden",
        className
      )}
    >
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#222]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#666]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#444]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
        <span className="ml-3 text-[10px] text-[#555] terminal-text">terminal</span>
      </div>
      <div className="p-4 space-y-1.5">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.3 }}
            className="terminal-text text-xs leading-relaxed"
          >
            {line.type === "prompt" && (
              <span>
                <span className="text-[#666]">visitor@shubranshu</span>
                <span className="text-white">:~$</span>{" "}
                <span className="text-white">{line.content}</span>
              </span>
            )}
            {line.type === "input" && (
              <span className="text-[#A1A1A1]">{line.content}</span>
            )}
            {line.type === "output" && (
              <span className="text-white">{line.content}</span>
            )}
            {line.type === "system" && (
              <span className="text-[#666]">{line.content}</span>
            )}
            {!line.type && (
              <span className="text-white">{line.content}</span>
            )}
          </motion.div>
        ))}
        <span className="inline-block w-2 h-4 bg-white ml-1 cursor-blink" />
      </div>
    </motion.div>
  );
}
