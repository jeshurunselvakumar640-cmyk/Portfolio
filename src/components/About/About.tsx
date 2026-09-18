"use client";

import React, { useState } from "react";
import { Code2, Music, Hammer, Church, Check, Sparkles, ArrowRight } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { audioEngine } from "@/lib/audioEngine";
import { ScrollRevealWrapper } from "@/components/Effects/ScrollRevealWrapper";

const ICONS: Record<string, React.ElementType> = {
  Code2,
  Music,
  Hammer,
  Cross: Church,
};

export const About: React.FC = () => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>("developer");

  const activePillar =
    portfolioData.aboutPillars.find((p) => p.id === selectedPillarId) ||
    portfolioData.aboutPillars[0];

  const handleSelectPillar = (id: string) => {
    audioEngine.playClickSound();
    setSelectedPillarId(id);
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <ScrollRevealWrapper className="mb-14 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-xs font-semibold text-[#00f0ff] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Identity & Focus</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Who is{" "}
          <span className="bg-gradient-to-r from-[#00f0ff] via-[#a78bfa] to-[#f59e0b] bg-clip-text text-transparent">
            Jeshurun?
          </span>
        </h2>
        <p className="mt-4 text-white/60 text-base sm:text-lg leading-relaxed">
          Four interconnected dimensions that shape my engineering mindset, creative pursuits, and life foundation.
        </p>
      </ScrollRevealWrapper>

      {/* 4 Pillars Interactive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Pillar Selection Cards */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
          {portfolioData.aboutPillars.map((pillar, idx) => {
            const IconComponent = ICONS[pillar.iconName] || Code2;
            const isSelected = pillar.id === selectedPillarId;

            return (
              <ScrollRevealWrapper key={pillar.id} delay={idx * 100}>
                <button
                  onClick={() => handleSelectPillar(pillar.id)}
                  className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group ${
                    isSelected
                      ? "bg-[#161b22] border-white/30 shadow-2xl scale-[1.02]"
                      : "bg-[#0d1117]/80 border-white/10 hover:border-white/20 hover:bg-[#161b22]/50 hover:translate-x-1"
                  }`}
                >
                  {isSelected && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1.5 shadow-cyan-glow"
                      style={{ backgroundColor: pillar.accentColor }}
                    />
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center border transition-all"
                      style={{
                        borderColor: `${pillar.accentColor}50`,
                        backgroundColor: `${pillar.accentColor}15`,
                        color: pillar.accentColor,
                      }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div
                      className="text-xs font-semibold px-3 py-1 rounded-full border"
                      style={{
                        borderColor: `${pillar.accentColor}30`,
                        color: pillar.accentColor,
                      }}
                    >
                      {pillar.subtitle}
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-white group-hover:text-[#00f0ff] transition-colors">
                    {pillar.title}
                  </h3>
                </button>
              </ScrollRevealWrapper>
            );
          })}
        </div>

        {/* Pillar Detail Card */}
        <ScrollRevealWrapper className="lg:col-span-7 h-full" delay={200}>
          <div className="h-full rounded-3xl bg-gradient-to-b from-[#161b22]/90 to-[#0d1117]/90 backdrop-blur-2xl p-8 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 pb-5 border-b border-white/10 mb-6">
                <span
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: activePillar.accentColor }}
                />
                <span className="text-xs font-semibold text-white/50 tracking-wider uppercase">
                  {activePillar.title} • {activePillar.subtitle}
                </span>
              </div>

              {/* Description */}
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-8 font-normal">
                {activePillar.description}
              </p>

              {/* Highlights List */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  Key Strengths & Principles:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activePillar.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-[#080a0f]/80 border border-white/5 text-sm text-white/90 font-medium hover:border-white/20 transition-all"
                    >
                      <Check
                        className="w-4 h-4 shrink-0"
                        style={{ color: activePillar.accentColor }}
                      />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Tag */}
            <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
              <span>Authentic & Grounded</span>
              <span className="text-[#00f0ff] font-medium">Core Pillars</span>
            </div>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};
