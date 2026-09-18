"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Award, X } from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

export const PianoSecretUnlock: React.FC = () => {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    // Hidden global listener for secret key sequence: C - M - A - J
    let buffer = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      buffer += e.key.toUpperCase();
      if (buffer.length > 8) buffer = buffer.slice(-8);

      if (buffer.includes("CMAJ7") || buffer.includes("CHORD")) {
        setUnlocked(true);
        audioEngine.playChime();
        buffer = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!unlocked) return null;

  return (
    <div className="fixed top-20 right-6 z-50 animate-bounce">
      <div className="p-4 rounded-xl hud-panel-amber border border-[#f59e0b] shadow-amber-glow font-mono text-xs text-white flex items-start gap-3 max-w-sm">
        <Award className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-[#f59e0b] mb-1">
            SECRET HARMONIC SEQUENCE UNLOCKED!
          </div>
          <p className="text-[11px] text-white/80 leading-relaxed font-sans">
            You discovered the studio chord trigger! Overdrive harmonic resonance is active.
          </p>
        </div>
        <button
          onClick={() => setUnlocked(false)}
          className="text-white/40 hover:text-white"
          aria-label="Dismiss unlock notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
