"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, X, Check, ArrowRight } from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

interface DevConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DevConsoleModal: React.FC<DevConsoleModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [history, setHistory] = useState<string[]>([
    "JESHURUN_STUDIO_TERMINAL v2.5.0",
    "Type 'help' for diagnostics commands. Press ESC to exit.",
  ]);
  const [cmd, setCmd] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = cmd.trim();
    if (!trimmed) return;

    audioEngine.playClickSound();
    const newHistory = [...history, `> ${trimmed}`];

    switch (trimmed.toLowerCase()) {
      case "help":
        newHistory.push(
          "AVAILABLE COMMANDS:",
          "  status      - Display system telemetry & modules",
          "  audio       - Test audio synth frequency sweeps",
          "  chordician  - Show Chordex AI compiler metrics",
          "  physix      - Show Matter.js physics engine state",
          "  clear       - Clear console output",
          "  exit        - Close developer console"
        );
        break;
      case "status":
        newHistory.push(
          "SYSTEM TELEMETRY:",
          "  OS: Jeshurun Digital Studio v2.5",
          "  Frontend: Next.js 15 App Router + React 18 + TypeScript",
          "  Audio Engine: Web Audio API (Active Analyser, Polyphonic Synth)",
          "  Physics Core: Matter.js 2D Rigid Body Engine",
          "  AI Subsystem: Google Gemini 2.5 Flash",
          "  Status: All Systems Active"
        );
        break;
      case "audio":
        audioEngine.playChord(["C4", "E4", "G4", "B4", "C5"], 1.0);
        newHistory.push("AUDIO SYNTHESIS: Executed C Maj9 harmonic sweep.");
        break;
      case "chordician":
        newHistory.push(
          "CHORDICIAN METRICS:",
          "  Type: Solo Individual Project",
          "  Architecture: React + Express.js + Firestore + Gemini",
          "  Compiler: Chordex AI Tokenizer (Smart Paste + OCR)"
        );
        break;
      case "physix":
        newHistory.push(
          "PHYSIX METRICS:",
          "  Type: College Group Project",
          "  Role: Backend Management Co-Lead",
          "  Engine: Matter.js 2D Kinematics Simulator"
        );
        break;
      case "clear":
        setHistory([]);
        setCmd("");
        return;
      case "exit":
        onClose();
        return;
      default:
        newHistory.push(`Command not recognized: '${trimmed}'. Type 'help' for commands.`);
    }

    setHistory(newHistory);
    setCmd("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-2xl h-[480px] rounded-2xl bg-[#080a0f] border border-[#10b981]/40 shadow-2xl flex flex-col overflow-hidden z-10 font-mono text-xs text-[#10b981]">
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 border-b border-[#10b981]/20 bg-[#0d1117]">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#10b981]" />
            <span className="font-bold tracking-wider">DEV_CONSOLE // SYSTEM_DIAGNOSTICS</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-white/60 hover:text-white hover:bg-white/10"
            aria-label="Close console"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Console Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-1.5 leading-relaxed bg-[#080a0f]">
          {history.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap">
              {line}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Form */}
        <form onSubmit={handleCommand} className="p-3 bg-[#0d1117] border-t border-[#10b981]/20 flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-[#10b981] shrink-0" />
          <input
            type="text"
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            placeholder="Type 'help' or 'status'..."
            className="flex-1 bg-transparent border-none text-[#10b981] font-mono text-xs focus:outline-none placeholder:text-[#10b981]/30"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};
