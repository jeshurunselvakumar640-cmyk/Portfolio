"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Play, RefreshCw, Layers, CheckCircle2, Music, ExternalLink, Wand2, SlidersHorizontal } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { audioEngine } from "@/lib/audioEngine";

const CHORD_TRANSPOSE_TABLE: Record<number, Record<string, string>> = {
  0: { "C": "C", "F": "F", "G": "G", "Am": "Am" },
  2: { "C": "D", "F": "G", "G": "A", "Am": "Bm" },
  4: { "C": "E", "F": "A", "G": "B", "Am": "C#m" },
  5: { "C": "F", "F": "Bb", "G": "C", "Am": "Dm" },
  7: { "C": "G", "F": "C", "G": "D", "Am": "Em" },
};

const CHORD_TRIAD_NOTES: Record<string, string[]> = {
  "C": ["C4", "E4", "G4"],
  "F": ["F4", "A4", "C5"],
  "G": ["G4", "B4", "D5"],
  "D": ["D4", "F#4", "A4"],
  "A": ["A4", "C#5", "E5"],
  "E": ["E4", "G#4", "B4"],
  "B": ["B4", "D#5", "F#5"],
  "Bb": ["Bb4", "D5", "F5"],
};

export const ChordicianProject: React.FC = () => {
  const project = portfolioData.projects.find((p) => p.id === "chordician")!;
  const [viewMode, setViewMode] = useState<"transformed" | "raw">("transformed");
  const [transposeSemi, setTransposeSemi] = useState<number>(0);
  const [activeChord, setActiveChord] = useState<string | null>(null);
  const [isTransforming, setIsTransforming] = useState<boolean>(false);

  const handleTranspose = (delta: number) => {
    audioEngine.playClickSound();
    const validOffsets = [0, 2, 4, 5, 7];
    const currentIndex = validOffsets.indexOf(transposeSemi);
    let nextIndex = currentIndex + delta;
    if (nextIndex < 0) nextIndex = validOffsets.length - 1;
    if (nextIndex >= validOffsets.length) nextIndex = 0;
    setTransposeSemi(validOffsets[nextIndex]);
  };

  const getTransposed = (baseChord: string) => {
    const table = CHORD_TRANSPOSE_TABLE[transposeSemi] || CHORD_TRANSPOSE_TABLE[0];
    return table[baseChord] || baseChord;
  };

  const playChordSound = (chord: string) => {
    setActiveChord(chord);
    const notes = CHORD_TRIAD_NOTES[chord] || ["C4", "E4", "G4"];
    audioEngine.playChord(notes, 0.85);
    setTimeout(() => setActiveChord(null), 850);
  };

  const triggerTransformEffect = () => {
    audioEngine.playClickSound();
    setIsTransforming(true);
    setViewMode("raw");
    setTimeout(() => {
      setViewMode("transformed");
      setIsTransforming(false);
      audioEngine.playChime();
    }, 900);
  };

  return (
    <div id="chordician-demo" className="rounded-3xl bg-gradient-to-b from-[#161b22]/90 to-[#0d1117]/90 backdrop-blur-2xl p-8 sm:p-12 border border-[#00f0ff]/30 shadow-2xl relative overflow-hidden mb-16">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#00f0ff] animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#00f0ff]">
            Individual Solo Project • 100% Built by Jeshurun
          </span>
        </div>
        <div className="flex items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] text-black font-bold text-xs hover:opacity-90 transition-all flex items-center gap-2 shadow-cyan-glow"
            >
              <span>Launch Chordician App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-10">
        {/* Project Story & Information */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Chordician
            </h3>
            <p className="text-sm sm:text-base font-semibold text-[#00f0ff] mt-1">
              {project.tagline}
            </p>
          </div>

          <p className="text-base text-white/80 leading-relaxed font-normal">
            {project.description}
          </p>

          {/* Motivation Callout */}
          <div className="p-6 rounded-2xl bg-[#080a0f] border border-white/10 space-y-2.5">
            <div className="text-xs font-bold text-[#f59e0b] uppercase tracking-wider">
              Origin Problem & Live Stage Friction:
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              {project.story}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
              Technologies Used:
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Songbook & Chordex AI Studio Preview */}
        <div className="lg:col-span-7 rounded-3xl bg-[#080a0f] border border-[#00f0ff]/30 p-6 sm:p-8 shadow-2xl flex flex-col">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-[#00f0ff]" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Chordex AI Interactive Sheet
              </span>
            </div>

            <button
              onClick={triggerTransformEffect}
              className="px-3.5 py-1.5 rounded-full bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTransforming ? "animate-spin" : ""}`} />
              <span>Simulate AI Parsing</span>
            </button>
          </div>

          {/* Interactive Sheet Container */}
          {viewMode === "transformed" && !isTransforming ? (
            <div className="space-y-6">
              {/* Sheet Header with Live Transposition HUD */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[#161b22] p-4 rounded-2xl border border-white/10">
                <div>
                  <div className="text-xs text-white/40 uppercase font-semibold">Active Key</div>
                  <div className="text-lg font-bold text-white">
                    Key of {getTransposed("C")} Major
                  </div>
                </div>

                {/* Transpose Controls */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/50 font-medium">Transpose:</span>
                  <button
                    onClick={() => handleTranspose(-1)}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold text-sm border border-white/10 flex items-center justify-center transition-all"
                    title="Transpose Down"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 rounded-lg bg-[#00f0ff]/20 text-[#00f0ff] font-bold text-xs border border-[#00f0ff]/40">
                    {transposeSemi === 0 ? "Original" : `+${transposeSemi} ST`}
                  </span>
                  <button
                    onClick={() => handleTranspose(1)}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold text-sm border border-white/10 flex items-center justify-center transition-all"
                    title="Transpose Up"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Interactive Clean Lead Sheet */}
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-[#00f0ff]/40 space-y-6">
                <div className="text-xs font-bold text-white/40 uppercase tracking-wider pb-2 border-b border-white/5">
                  Song Lead Sheet • Click any chord to hear audio
                </div>

                {/* Line 1 */}
                <div className="space-y-2">
                  <div className="flex items-center gap-16">
                    <button
                      onClick={() => playChordSound(getTransposed("C"))}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-sm ${
                        activeChord === getTransposed("C")
                          ? "bg-[#00f0ff] text-black shadow-cyan-glow scale-110"
                          : "bg-[#00f0ff]/15 text-[#00f0ff] hover:bg-[#00f0ff]/30 border border-[#00f0ff]/40"
                      }`}
                    >
                      {getTransposed("C")}
                    </button>

                    <button
                      onClick={() => playChordSound(getTransposed("F"))}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-sm ${
                        activeChord === getTransposed("F")
                          ? "bg-[#00f0ff] text-black shadow-cyan-glow scale-110"
                          : "bg-[#00f0ff]/15 text-[#00f0ff] hover:bg-[#00f0ff]/30 border border-[#00f0ff]/40"
                      }`}
                    >
                      {getTransposed("F")}
                    </button>

                    <button
                      onClick={() => playChordSound(getTransposed("C"))}
                      className="px-3 py-1.5 rounded-xl bg-[#00f0ff]/15 text-[#00f0ff] font-bold text-xs hover:bg-[#00f0ff]/30 border border-[#00f0ff]/40 transition-all"
                    >
                      {getTransposed("C")}
                    </button>
                  </div>
                  <div className="text-base font-medium text-white/90">
                    Amazing grace, how sweet the sound
                  </div>
                </div>

                {/* Line 2 */}
                <div className="space-y-2">
                  <div className="flex items-center gap-24">
                    <span className="w-12" />
                    <button
                      onClick={() => playChordSound(getTransposed("G"))}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-sm ${
                        activeChord === getTransposed("G")
                          ? "bg-[#00f0ff] text-black shadow-cyan-glow scale-110"
                          : "bg-[#00f0ff]/15 text-[#00f0ff] hover:bg-[#00f0ff]/30 border border-[#00f0ff]/40"
                      }`}
                    >
                      {getTransposed("G")}
                    </button>
                  </div>
                  <div className="text-base font-medium text-white/90">
                    That saved a wretch like me.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff] flex items-center justify-center text-[#00f0ff] mx-auto animate-pulse">
                <Wand2 className="w-6 h-6 animate-spin" />
              </div>
              <div className="text-base font-bold text-white">
                Chordex AI Parsing Tokens & Structuring Lead Sheet...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {project.features.map((f, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#080a0f] border border-white/5 text-xs text-white/80 font-medium"
          >
            <CheckCircle2 className="w-4 h-4 text-[#00f0ff] shrink-0" />
            <span>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
