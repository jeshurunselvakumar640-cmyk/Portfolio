"use client";

import React from "react";
import { ArrowDown, Sparkles, Music, ChevronRight, ExternalLink, Play, Layers, Atom, Sparkle } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { audioEngine } from "@/lib/audioEngine";

interface HeroProps {
  onOpenAI: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAI }) => {
  const scrollTo = (id: string) => {
    audioEngine.playClickSound();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10 mb-10">
        {/* Left Column: Hero Content */}
        <div className="lg:col-span-6 space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-xs text-white/90 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
            <span className="font-semibold text-[#00f0ff]">SIES GST Nerul</span>
            <span className="text-white/30">•</span>
            <span>2nd Year Computer Engineering</span>
          </div>

          {/* Name & Headline */}
          <div className="space-y-3">
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Jeshurun <br />
              <span className="bg-gradient-to-r from-[#00f0ff] via-[#a78bfa] to-[#f59e0b] bg-clip-text text-transparent">
                Selvakumar
              </span>
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-white/90 tracking-tight flex items-center gap-2.5 flex-wrap">
              <span className="text-[#00f0ff]">Engineering</span>
              <span className="text-white/30">•</span>
              <span className="text-[#a78bfa]">Music</span>
              <span className="text-white/30">•</span>
              <span className="text-[#f59e0b]">Building Software</span>
            </p>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl font-normal">
            Welcome! I am a Computer Engineering student at SIES GST Nerul, active church keyboardist since 2019, and software creator. Explore my featured projects <strong className="text-white">Chordician</strong> and <strong className="text-white">PhysiX</strong> built for real-world utility.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={() => scrollTo("projects")}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] text-black font-bold text-sm hover:opacity-90 shadow-cyan-glow transition-all flex items-center gap-2 group"
            >
              <span>Explore Projects</span>
              <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo("music")}
              className="px-6 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white font-medium text-sm transition-all flex items-center gap-2"
            >
              <Music className="w-4 h-4 text-[#f59e0b]" />
              <span>Music Journey</span>
            </button>

            <button
              onClick={() => {
                audioEngine.playClickSound();
                onOpenAI();
              }}
              className="px-6 py-3.5 rounded-full border border-[#8b5cf6]/40 bg-[#8b5cf6]/15 text-[#c4b5fd] hover:text-white hover:border-[#8b5cf6] hover:shadow-violet-glow transition-all text-sm font-medium flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
              <span>Ask Jeshurun AI</span>
            </button>
          </div>
        </div>

        {/* Right Column: Highlighted Projects Cards */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between px-2 text-xs font-semibold text-white/60">
            <span className="flex items-center gap-2 text-[#00f0ff] uppercase tracking-wider">
              <Sparkle className="w-3.5 h-3.5" />
              <span>Featured Live Deployments</span>
            </span>
            <span>Direct Redirects</span>
          </div>

          {/* 1. Chordician Highlight Card */}
          <div className="rounded-3xl bg-gradient-to-b from-[#161b22]/90 to-[#0d1117]/90 backdrop-blur-2xl p-6 sm:p-7 border border-[#00f0ff]/30 shadow-2xl hover:border-[#00f0ff]/60 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00f0ff]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#00f0ff]/20 transition-all" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#00f0ff]/15 border border-[#00f0ff]/40 text-[#00f0ff] text-[11px] font-bold">
                    Solo Project
                  </span>
                  <span className="text-white/40 text-xs">•</span>
                  <span className="text-xs text-white/70 font-medium">AI Digital Songbook</span>
                </div>

                <a
                  href="https://chordician.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioEngine.playClickSound()}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] text-black font-bold text-xs hover:scale-105 transition-all flex items-center gap-1.5 shadow-cyan-glow"
                >
                  <span>Launch Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white group-hover:text-[#00f0ff] transition-colors flex items-center gap-2">
                  <span>Chordician</span>
                </h3>
                <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                  Intelligent digital songbook engineered for live musicians. Transforms messy chord sheets with Chordex AI parsing, OCR import, and live key transpositions.
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {["React", "Express.js", "Firebase", "Gemini AI", "PWA"].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-[#080a0f] border border-white/10 text-[11px] font-mono text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-white/40 font-mono text-[11px]">chordician.vercel.app</span>
                <button
                  onClick={() => scrollTo("chordician-demo")}
                  className="text-[#00f0ff] hover:underline flex items-center gap-1 text-xs font-semibold"
                >
                  <span>View in-depth breakdown</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* 2. PhysiX Highlight Card */}
          <div className="rounded-3xl bg-gradient-to-b from-[#161b22]/90 to-[#0d1117]/90 backdrop-blur-2xl p-6 sm:p-7 border border-[#10b981]/30 shadow-2xl hover:border-[#10b981]/60 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#10b981]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#10b981]/20 transition-all" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#10b981]/15 border border-[#10b981]/40 text-[#10b981] text-[11px] font-bold">
                    College Group Project
                  </span>
                  <span className="text-white/40 text-xs">•</span>
                  <span className="text-xs text-white/70 font-medium">Backend Co-Lead</span>
                </div>

                <a
                  href="https://physi-x-orcin.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioEngine.playClickSound()}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-[#10b981] to-[#00f0ff] text-black font-bold text-xs hover:scale-105 transition-all flex items-center gap-1.5 shadow-lg"
                >
                  <span>Launch Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white group-hover:text-[#10b981] transition-colors flex items-center gap-2">
                  <span>PhysiX — Virtual Lab</span>
                </h3>
                <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                  Interactive 2D physics simulation sandbox. Built with Matter.js and Vite to visualize kinematic trajectories, gravitational acceleration, and dynamic projectile collisions.
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {["Matter.js", "Vite", "Firebase", "JavaScript", "Kinematics"].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-[#080a0f] border border-white/10 text-[11px] font-mono text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-white/40 font-mono text-[11px]">physi-x-orcin.vercel.app</span>
                <button
                  onClick={() => scrollTo("physix-demo")}
                  className="text-[#10b981] hover:underline flex items-center gap-1 text-xs font-semibold"
                >
                  <span>View in-depth breakdown</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="w-full flex justify-center mt-8">
        <button
          onClick={() => scrollTo("about")}
          className="flex flex-col items-center gap-2 text-white/40 hover:text-[#00f0ff] transition-colors text-xs font-medium"
          aria-label="Scroll to About section"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
