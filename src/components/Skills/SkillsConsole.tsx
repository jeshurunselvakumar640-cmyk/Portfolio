"use client";

import React, { useState } from "react";
import { Cpu, Music, Play, Layers, CheckCircle2, Sliders, Sparkles, Code2 } from "lucide-react";
import { portfolioData, SkillItem } from "@/data/portfolioData";
import { audioEngine } from "@/lib/audioEngine";
import { ScrollRevealWrapper } from "@/components/Effects/ScrollRevealWrapper";

export const SkillsConsole: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(portfolioData.skills[0]);

  const filteredSkills = portfolioData.skills.filter((s) => {
    if (activeCategory === "all") return true;
    return s.category === activeCategory;
  });

  const handleSelectSkill = (s: SkillItem) => {
    audioEngine.playClickSound();
    setSelectedSkill(s);
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Header */}
      <ScrollRevealWrapper className="mb-14 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-xs font-semibold text-[#8b5cf6] mb-4">
          <Code2 className="w-4 h-4" />
          <span>Technical & Musical Matrix</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Skills &{" "}
          <span className="bg-gradient-to-r from-[#8b5cf6] via-[#a78bfa] to-[#00f0ff] bg-clip-text text-transparent">
            Capabilities
          </span>
        </h2>
        <p className="mt-4 text-white/60 text-base sm:text-lg leading-relaxed">
          Technical capabilities across systems programming, full-stack web technologies, and church musicianship.
        </p>
      </ScrollRevealWrapper>

      {/* Filter Tabs */}
      <ScrollRevealWrapper className="flex flex-wrap items-center justify-center gap-2.5 mb-10" delay={50}>
        {[
          { id: "all", label: "All Capabilities" },
          { id: "languages", label: "Languages & Systems" },
          { id: "web", label: "Web Technologies" },
          { id: "music", label: "Musical Harmony" },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              audioEngine.playClickSound();
              setActiveCategory(cat.id);
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeCategory === cat.id
                ? "bg-[#8b5cf6] text-white border border-[#8b5cf6] shadow-violet-glow scale-105"
                : "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </ScrollRevealWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Skills Cards Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filteredSkills.map((skill, idx) => {
            const isSelected = selectedSkill.name === skill.name;
            const isMusic = skill.category === "music";

            return (
              <ScrollRevealWrapper key={skill.name} delay={idx * 60}>
                <div
                  onClick={() => handleSelectSkill(skill)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? "bg-[#161b22] border-[#8b5cf6] shadow-violet-glow scale-[1.02]"
                      : isMusic
                      ? "bg-[#0d1117] border-[#f59e0b]/40 hover:border-[#f59e0b] hover:translate-x-1"
                      : "bg-[#0d1117] border-white/10 hover:border-white/20 hover:bg-[#161b22]/50 hover:translate-x-1"
                  }`}
                >
                  {isMusic && (
                    <div className="absolute top-0 right-0 bg-[#f59e0b]/20 px-3 py-1 rounded-bl-xl text-[10px] font-bold text-[#f59e0b]">
                      Live Musician
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-lg text-white">{skill.name}</span>
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                      style={{
                        borderColor: `${skill.accent}40`,
                        color: skill.accent,
                        backgroundColor: `${skill.accent}15`,
                      }}
                    >
                      {skill.level}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs text-white/40 font-medium">
                      <span>Proficiency</span>
                      <span>{skill.levelScore}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${skill.levelScore}%`,
                          backgroundColor: skill.accent,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </ScrollRevealWrapper>
            );
          })}
        </div>

        {/* Selected Skill Spotlight Card */}
        <ScrollRevealWrapper className="lg:col-span-5 sticky top-28" delay={150}>
          <div className="rounded-3xl bg-gradient-to-b from-[#161b22]/90 to-[#0d1117]/90 backdrop-blur-2xl p-8 sm:p-10 border border-[#8b5cf6]/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2 text-[#8b5cf6] font-bold uppercase tracking-wider">
                <Sliders className="w-4 h-4" />
                <span>Skill Spotlight</span>
              </div>
              <span className="text-white/40 font-medium">Core Stack</span>
            </div>

            <div>
              <div className="text-xs text-white/40 font-semibold uppercase tracking-wider">Capability</div>
              <div className="text-2xl font-bold text-white mt-1">
                {selectedSkill.name}
              </div>
            </div>

            <div>
              <div className="text-xs text-white/40 font-semibold uppercase tracking-wider">Level</div>
              <div className="text-base font-bold mt-1" style={{ color: selectedSkill.accent }}>
                {selectedSkill.level}
              </div>
            </div>

            <div>
              <div className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-2">Details & Experience</div>
              <p className="text-sm text-white/80 leading-relaxed p-4 rounded-2xl bg-[#080a0f] border border-white/5 font-normal">
                {selectedSkill.note}
              </p>
            </div>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};
