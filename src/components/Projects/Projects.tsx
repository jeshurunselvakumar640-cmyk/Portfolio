"use client";

import React from "react";
import { Layers, Sparkles } from "lucide-react";
import { ChordicianProject } from "./ChordicianProject";
import { PhysiXProject } from "./PhysiXProject";
import { ScrollRevealWrapper } from "@/components/Effects/ScrollRevealWrapper";

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <ScrollRevealWrapper className="mb-14 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-xs font-semibold text-[#00f0ff] mb-4">
          <Layers className="w-4 h-4" />
          <span>Interactive Applications</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Featured{" "}
          <span className="bg-gradient-to-r from-[#00f0ff] via-[#10b981] to-[#f59e0b] bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
        <p className="mt-4 text-white/60 text-base sm:text-lg leading-relaxed">
          Interactive environments for real applications: Chordician (Solo AI Digital Songbook) and PhysiX (College Group 2D Physics Lab).
        </p>
      </ScrollRevealWrapper>

      {/* Project 01: Chordician */}
      <ScrollRevealWrapper delay={100}>
        <ChordicianProject />
      </ScrollRevealWrapper>

      {/* Narrative Transition */}
      <div className="my-14 flex flex-col items-center justify-center text-xs text-white/40">
        <div className="w-0.5 h-12 bg-gradient-to-b from-[#00f0ff] to-[#10b981]" />
        <div className="my-3 px-4 py-1.5 rounded-full border border-white/10 bg-[#0d1117] text-white/70 font-medium">
          Music Technology → Physics & Simulation
        </div>
        <div className="w-0.5 h-12 bg-gradient-to-b from-[#10b981] to-[#10b981]/20" />
      </div>

      {/* Project 02: PhysiX */}
      <ScrollRevealWrapper delay={150}>
        <PhysiXProject />
      </ScrollRevealWrapper>
    </section>
  );
};
