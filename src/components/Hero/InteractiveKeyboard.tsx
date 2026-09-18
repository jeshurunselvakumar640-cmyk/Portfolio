"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Sparkles, Volume2, VolumeX, Music, Waves } from "lucide-react";
import { audioEngine, NOTE_FREQUENCIES } from "@/lib/audioEngine";

interface KeyDef {
  note: string;
  isBlack: boolean;
  keyLabel?: string;
}

const KEYS: KeyDef[] = [
  { note: "C4", isBlack: false, keyLabel: "A" },
  { note: "C#4", isBlack: true, keyLabel: "W" },
  { note: "D4", isBlack: false, keyLabel: "S" },
  { note: "D#4", isBlack: true, keyLabel: "E" },
  { note: "E4", isBlack: false, keyLabel: "D" },
  { note: "F4", isBlack: false, keyLabel: "F" },
  { note: "F#4", isBlack: true, keyLabel: "T" },
  { note: "G4", isBlack: false, keyLabel: "G" },
  { note: "G#4", isBlack: true, keyLabel: "Y" },
  { note: "A4", isBlack: false, keyLabel: "H" },
  { note: "A#4", isBlack: true, keyLabel: "U" },
  { note: "B4", isBlack: false, keyLabel: "J" },
  { note: "C5", isBlack: false, keyLabel: "K" },
  { note: "C#5", isBlack: true, keyLabel: "O" },
  { note: "D5", isBlack: false, keyLabel: "L" },
  { note: "D#5", isBlack: true, keyLabel: "P" },
  { note: "E5", isBlack: false, keyLabel: ";" },
];

const PRESETS = [
  { name: "C Maj7", desc: "Warm & Open", notes: ["C4", "E4", "G4", "B4"], color: "#00f0ff" },
  { name: "F Maj9", desc: "Airy Shimmer", notes: ["F4", "A4", "C5", "E5"], color: "#f59e0b" },
  { name: "D Min7", desc: "Modal Soul", notes: ["D4", "F4", "A4", "C5"], color: "#8b5cf6" },
  { name: "G Sus4", desc: "Church Tension", notes: ["G4", "C5", "D5"], color: "#10b981" },
];

export const InteractiveKeyboard: React.FC = () => {
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
  const [currentNoteInfo, setCurrentNoteInfo] = useState<{ note: string; freq: number } | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const unsub = audioEngine.subscribeMute(setIsMuted);

    // Waveform oscilloscope loop
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const buffer = new Uint8Array(128);

      const renderWaveform = () => {
        if (!ctx) return;
        audioEngine.getWaveformData(buffer);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Smooth wave line
        ctx.lineWidth = 2.5;
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "#00f0ff");
        gradient.addColorStop(0.5, "#8b5cf6");
        gradient.addColorStop(1, "#f59e0b");
        ctx.strokeStyle = activeNotes.size > 0 ? gradient : "rgba(0, 240, 255, 0.35)";

        ctx.beginPath();
        const sliceWidth = canvas.width / buffer.length;
        let x = 0;

        for (let i = 0; i < buffer.length; i++) {
          const v = buffer[i] / 128.0;
          const y = (v * canvas.height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();

        animFrameRef.current = requestAnimationFrame(renderWaveform);
      };

      renderWaveform();
    }

    // Keyboard shortcut listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key.toUpperCase();
      const matched = KEYS.find((k) => k.keyLabel === key);
      if (matched && !activeNotes.has(matched.note)) {
        triggerNoteStart(matched.note);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      const matched = KEYS.find((k) => k.keyLabel === key);
      if (matched) {
        triggerNoteEnd(matched.note);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      unsub();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [activeNotes]);

  const triggerNoteStart = (note: string) => {
    audioEngine.startNote(note, "triangle");
    setActiveNotes((prev) => new Set(prev).add(note));
    setCurrentNoteInfo({ note, freq: NOTE_FREQUENCIES[note] || 440 });
  };

  const triggerNoteEnd = (note: string) => {
    audioEngine.stopNote(note);
    setActiveNotes((prev) => {
      const next = new Set(prev);
      next.delete(note);
      return next;
    });
  };

  const playChordPreset = (notes: string[]) => {
    if (isMuted) {
      audioEngine.setMute(false);
    }
    notes.forEach((note) => {
      triggerNoteStart(note);
      setTimeout(() => triggerNoteEnd(note), 700);
    });
  };

  return (
    <div className="w-full rounded-3xl bg-gradient-to-b from-[#161b22]/90 to-[#0d1117]/90 backdrop-blur-2xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Subtle Glow backdrop */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#8b5cf6]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & Frequency Display */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-5 mb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00f0ff]/20 to-[#8b5cf6]/20 border border-[#00f0ff]/40 flex items-center justify-center text-[#00f0ff]">
            <Music className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>Interactive Piano Synthesizer</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] font-mono border border-[#00f0ff]/30">
                Web Audio
              </span>
            </h3>
            <p className="text-xs text-white/50">
              Play notes via keys (A to ;) or click chords below to hear live acoustic tones
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Active Note Indicator */}
          <div className="flex items-center gap-2 bg-[#080a0f]/80 px-3.5 py-1.5 rounded-full border border-white/10 font-mono text-xs">
            <span className="text-white/40">Pitch:</span>
            <span className="text-[#00f0ff] font-bold">
              {currentNoteInfo ? `${currentNoteInfo.note} • ${currentNoteInfo.freq} Hz` : "Play a note"}
            </span>
          </div>

          {/* Quick Sound Toggle */}
          <button
            onClick={() => audioEngine.toggleMute()}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all ${
              isMuted
                ? "border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
                : "border-[#10b981]/40 bg-[#10b981]/10 text-[#10b981]"
            }`}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isMuted ? "Audio: Muted (Click to enable)" : "Audio: Active"}</span>
          </button>
        </div>
      </div>

      {/* Waveform Visualizer Display */}
      <div className="relative z-10 w-full h-12 bg-[#080a0f]/80 rounded-xl border border-white/10 overflow-hidden mb-6 flex items-center justify-center">
        <canvas ref={canvasRef} width={700} height={48} className="w-full h-full" />
      </div>

      {/* Piano Keyboard */}
      <div className="relative z-10 w-full overflow-x-auto pb-4">
        <div className="relative flex justify-center min-w-[560px] select-none h-44 sm:h-48 pt-2">
          {KEYS.map((k) => {
            const isActive = activeNotes.has(k.note);

            if (k.isBlack) {
              return (
                <button
                  key={k.note}
                  onMouseDown={() => triggerNoteStart(k.note)}
                  onMouseUp={() => triggerNoteEnd(k.note)}
                  onMouseLeave={() => isActive && triggerNoteEnd(k.note)}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    triggerNoteStart(k.note);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    triggerNoteEnd(k.note);
                  }}
                  className={`absolute z-20 w-8 sm:w-9 h-28 sm:h-32 rounded-b-lg transition-all flex flex-col justify-between items-center pb-2.5 font-mono text-[10px] ${
                    isActive
                      ? "bg-gradient-to-b from-[#00f0ff] to-[#0284c7] shadow-cyan-glow translate-y-1 text-black font-bold border-2 border-white"
                      : "bg-[#161b22] text-white/60 hover:bg-[#21262d] border border-black/80"
                  }`}
                  style={{
                    left: getBlackKeyOffset(k.note),
                  }}
                  aria-label={`Play note ${k.note}`}
                >
                  <span className="text-[9px] opacity-70">{k.note}</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-black/50 text-white/80">
                    {k.keyLabel}
                  </span>
                </button>
              );
            }

            return (
              <button
                key={k.note}
                onMouseDown={() => triggerNoteStart(k.note)}
                onMouseUp={() => triggerNoteEnd(k.note)}
                onMouseLeave={() => isActive && triggerNoteEnd(k.note)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  triggerNoteStart(k.note);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  triggerNoteEnd(k.note);
                }}
                className={`w-12 sm:w-14 h-40 sm:h-44 rounded-b-2xl border border-white/10 transition-all flex flex-col justify-between items-center pb-3.5 font-mono text-xs relative ${
                  isActive
                    ? "bg-gradient-to-b from-white via-[#00f0ff]/30 to-[#00f0ff] shadow-cyan-glow translate-y-1 text-black font-bold"
                    : "bg-[#0d1117] text-white/70 hover:bg-[#161b22]"
                }`}
                aria-label={`Play note ${k.note}`}
              >
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-white/40">{k.note}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#00f0ff] font-medium">
                    {k.keyLabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Instant Chord Presets */}
      <div className="relative z-10 mt-3 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
          <Sparkles className="w-4 h-4 text-[#f59e0b]" />
          <span>Harmonic Voicings:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => playChordPreset(preset.notes)}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium transition-all flex items-center gap-2 group hover:border-[#00f0ff]/50"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: preset.color }}
              />
              <span className="font-bold">{preset.name}</span>
              <span className="text-[11px] text-white/40">({preset.desc})</span>
              <Play className="w-3 h-3 text-[#00f0ff] group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

function getBlackKeyOffset(note: string): string {
  const offsets: Record<string, string> = {
    "C#4": "calc(50% - 216px)",
    "D#4": "calc(50% - 164px)",
    "F#4": "calc(50% - 60px)",
    "G#4": "calc(50% - 8px)",
    "A#4": "calc(50% + 44px)",
    "C#5": "calc(50% + 148px)",
    "D#5": "calc(50% + 200px)",
  };
  return offsets[note] || "0px";
}
