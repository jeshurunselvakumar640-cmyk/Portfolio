"use client";

import React, { useState } from "react";
import { GraduationCap, MapPin, CheckCircle, Clock, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { audioEngine } from "@/lib/audioEngine";
import { ScrollRevealWrapper } from "@/components/Effects/ScrollRevealWrapper";

export const EducationTimeline: React.FC = () => {
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState<number>(3); // Current university

  const handleSelect = (idx: number) => {
    audioEngine.playClickSound();
    setActiveMilestoneIndex(idx);
  };

  return (
    <section id="journey" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Header */}
      <ScrollRevealWrapper className="mb-14 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-xs font-semibold text-[#10b981] mb-4">
          <GraduationCap className="w-4 h-4" />
          <span>Academic Milestones</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Education{" "}
          <span className="bg-gradient-to-r from-[#10b981] via-[#00f0ff] to-[#38bdf8] bg-clip-text text-transparent">
            Trajectory
          </span>
        </h2>
        <p className="mt-4 text-white/60 text-base sm:text-lg leading-relaxed">
          From foundational schooling in Diva/Dombivli to pursuing Computer Engineering at SIES Graduate School of Technology.
        </p>
      </ScrollRevealWrapper>

      {/* Timeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Timeline Path Cards */}
        <div className="lg:col-span-7 space-y-4">
          {portfolioData.education.map((item, idx) => {
            const isSelected = activeMilestoneIndex === idx;
            const isCurrent = item.status === "current";

            return (
              <ScrollRevealWrapper key={idx} delay={idx * 120}>
                <div
                  onClick={() => handleSelect(idx)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer group ${
                    isSelected
                      ? "bg-[#161b22] border-[#10b981] shadow-2xl scale-[1.01]"
                      : "bg-[#0d1117]/80 border-white/10 hover:border-white/20 hover:bg-[#161b22]/50 hover:translate-x-1"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#00f0ff]">
                      {item.period}
                    </span>
                    {isCurrent ? (
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-[#10b981] bg-[#10b981]/10 px-3 py-1 rounded-full border border-[#10b981]/30">
                        <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
                        <span>Currently in 2nd Year</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-white/50">
                        <CheckCircle className="w-3.5 h-3.5 text-[#10b981]" />
                        <span>Completed</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                    {item.institution}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-white/50 mt-1 mb-2 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#f59e0b]" />
                    <span>{item.location}</span>
                  </div>

                  <p className="text-sm text-white/70 leading-relaxed">{item.details}</p>
                </div>
              </ScrollRevealWrapper>
            );
          })}
        </div>

        {/* Selected Milestone Spotlight */}
        <ScrollRevealWrapper className="lg:col-span-5 sticky top-28" delay={200}>
          <div className="rounded-3xl bg-gradient-to-b from-[#161b22]/90 to-[#0d1117]/90 backdrop-blur-2xl p-8 sm:p-10 border border-[#10b981]/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5 text-[#10b981] text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>Milestone Spotlight</span>
              </div>
              <span className="text-xs font-semibold text-white/40">
                {portfolioData.education[activeMilestoneIndex].year}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-xs text-white/40 font-semibold uppercase tracking-wider">Institution</div>
                <div className="text-xl font-bold text-white mt-1">
                  {portfolioData.education[activeMilestoneIndex].institution}
                </div>
              </div>

              <div>
                <div className="text-xs text-white/40 font-semibold uppercase tracking-wider">Duration</div>
                <div className="text-sm font-semibold text-[#00f0ff] mt-1">
                  {portfolioData.education[activeMilestoneIndex].period}
                </div>
              </div>

              <div>
                <div className="text-xs text-white/40 font-semibold uppercase tracking-wider">Location</div>
                <div className="text-sm text-white/80 mt-1">
                  {portfolioData.education[activeMilestoneIndex].location}
                </div>
              </div>

              <div>
                <div className="text-xs text-white/40 font-semibold uppercase tracking-wider">Key Achievement</div>
                <div className="text-sm font-bold text-[#10b981] mt-1">
                  {portfolioData.education[activeMilestoneIndex].milestone || "Foundational Studies"}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-2">Context</div>
                <p className="text-sm text-white/70 leading-relaxed">
                  {portfolioData.education[activeMilestoneIndex].details}
                </p>
              </div>
            </div>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};
