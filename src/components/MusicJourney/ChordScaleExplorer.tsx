"use client";

import React, { useState } from "react";
import { Play, Sparkles, Music2, Volume2 } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { audioEngine } from "@/lib/audioEngine";

const CHORD_NOTE_MAP: Record<string, string[]> = {
  "C Maj": ["C4", "E4", "G4"],
  "D Min": ["D4", "F4", "A4"],
  "E Min": ["E4", "G4", "B4"],
  "F Maj": ["F4", "A4", "C5"],
  "G Maj": ["G4", "B4", "D5"],
  "A Min": ["A4", "C5", "E5"],
  "B Dim": ["B4", "D5", "F5"],
  "B Min": ["B4", "D5", "F#5"],
  "D Maj": ["D4", "F#4", "A4"],
  "F# Dim": ["F#4", "A4", "C5"],
  "E Dim": ["E4", "G4", "Bb4"],
  "G Min": ["G4", "Bb4", "D5"],
  "Bb Maj": ["Bb4", "D5", "F5"],
};

export const ChordScaleExplorer: React.FC = () => {
  const [selectedScaleIndex, setSelectedScaleIndex] = useState(0);
  const [activeChord, setActiveChord] = useState<string | null>(null);

  const scales = portfolioData.musicJourney.scales;
  const currentScale = scales[selectedScaleIndex];

  const playScaleNote = (noteName: string) => {
    const fullNote = `${noteName.replace("#", "#")}4`;
    audioEngine.playNote(fullNote, 0.45, "triangle");
  };

  const playChord = (chordName: string) => {
    setActiveChord(chordName);
    const notes = CHORD_NOTE_MAP[chordName] || ["C4", "E4", "G4"];
    audioEngine.playChord(notes, 0.9);
    setTimeout(() => setActiveChord(null), 900);
  };

  return (
    <div className="rounded-3xl bg-gradient-to-b from-[#161b22]/90 to-[#0d1117]/90 backdrop-blur-2xl p-8 sm:p-10 border border-[#f59e0b]/30 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#f59e0b]/20 border border-[#f59e0b]/40 flex items-center justify-center text-[#f59e0b]">
            <Music2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Scale & Harmony Explorer
            </h3>
            <p className="text-xs text-white/50">
              Click scale notes or diatonic chords to preview live harmonic voicings
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#f59e0b]">
          <Volume2 className="w-4 h-4 animate-pulse" />
          <span>Click any chord to play sound</span>
        </div>
      </div>

      {/* Scale Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2.5 mb-8">
        {scales.map((s, idx) => (
          <button
            key={s.name}
            onClick={() => {
              audioEngine.playClickSound();
              setSelectedScaleIndex(idx);
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              selectedScaleIndex === idx
                ? "bg-gradient-to-r from-[#f59e0b] to-[#ec4899] text-black shadow-amber-glow scale-105"
                : "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>{s.name}</span>
            <span className="text-[11px] opacity-80">({s.type})</span>
          </button>
        ))}
      </div>

      {/* Scale Notes */}
      <div className="mb-8">
        <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
          Scale Degrees & Melodic Tones:
        </div>
        <div className="flex flex-wrap gap-2.5">
          {currentScale.notes.map((note) => (
            <button
              key={note}
              onClick={() => playScaleNote(note)}
              className="w-12 h-12 rounded-2xl bg-[#080a0f] border border-[#f59e0b]/30 text-white font-mono text-base font-bold flex items-center justify-center hover:bg-[#f59e0b]/20 hover:border-[#f59e0b] hover:scale-110 shadow-sm transition-all"
            >
              {note}
            </button>
          ))}
        </div>
      </div>

      {/* Diatonic Chords */}
      <div className="mb-8">
        <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
          Harmonic Progression Chords:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {currentScale.chords.map((chord) => {
            const isPlaying = activeChord === chord;
            return (
              <button
                key={chord}
                onClick={() => playChord(chord)}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                  isPlaying
                    ? "bg-[#f59e0b] text-black font-bold shadow-amber-glow scale-105"
                    : "bg-[#080a0f] border-white/10 text-white/90 hover:border-[#f59e0b]/60 hover:bg-[#161b22] hover:scale-105"
                }`}
              >
                <Play className="w-3.5 h-3.5 text-[#f59e0b] fill-current" />
                <span className="font-bold text-sm">{chord}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feeling Description */}
      <div className="pt-5 border-t border-white/10 flex items-center gap-3 text-sm text-white/80">
        <Sparkles className="w-5 h-5 text-[#f59e0b] shrink-0" />
        <div>
          <span className="text-white/40 font-medium">Musical Character: </span>
          <span className="font-medium text-white">{currentScale.feeling}</span>
        </div>
      </div>
    </div>
  );
};
