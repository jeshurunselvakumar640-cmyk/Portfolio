"use client";

import React from "react";
import { Music, Radio, Disc, ShieldCheck, Check } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { ScrollRevealWrapper } from "@/components/Effects/ScrollRevealWrapper";

export const MusicJourney: React.FC = () => {
  const music = portfolioData.musicJourney;

  return (
    <section id="music" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Header */}
      <ScrollRevealWrapper className="mb-14 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-xs font-semibold text-[#f59e0b] mb-4">
          <Music className="w-4 h-4" />
          <span>Musical Roots & Church Ministry</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Music{" "}
          <span className="bg-gradient-to-r from-[#f59e0b] via-[#ec4899] to-[#8b5cf6] bg-clip-text text-transparent">
            Journey
          </span>
        </h2>
        <p className="mt-4 text-white/60 text-base sm:text-lg leading-relaxed">
          From an unenthusiastic beginning at age 11 in 2019 to live church worship keyboardist and building music tools.
        </p>
      </ScrollRevealWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Story & Learning Breakdown */}
        <ScrollRevealWrapper className="lg:col-span-7 space-y-6" delay={100}>
          <div className="rounded-3xl bg-gradient-to-b from-[#161b22]/90 to-[#0d1117]/90 backdrop-blur-2xl p-8 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2.5 text-[#f59e0b] text-xs font-bold uppercase tracking-wider">
                <Radio className="w-4 h-4 animate-pulse" />
                <span>Origin Story (Started 2019 • Age 11)</span>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                Church Musician
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight">
              Shaped by Ear Training, Worship & Live Ministry
            </h3>

            <p className="text-base text-white/80 leading-relaxed mb-8">
              {music.originStory}
            </p>

            {/* Learning Meter */}
            <div className="p-6 rounded-2xl bg-[#080a0f] border border-white/10 mb-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-white/80">
                <span>Learning Experience Breakdown</span>
                <span className="text-[#f59e0b]">10% Formal Classes / 90% Self-Taught</span>
              </div>
              
              <div className="w-full h-3.5 bg-white/5 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-[#38bdf8] transition-all"
                  style={{ width: `${music.learningRatio.formal}%` }}
                  title="10% Formal Classes"
                />
                <div
                  className="h-full bg-gradient-to-r from-[#f59e0b] to-[#ec4899] transition-all"
                  style={{ width: `${music.learningRatio.selfTaught}%` }}
                  title="90% Self-Taught & Mentorship"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs pt-1 text-white/60">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
                  <span>10% Formal Lessons (~1 year)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                  <span>90% Self-Learning, Ear Training & Mentors</span>
                </div>
              </div>
            </div>

            {/* Musician Profile Note */}
            <div className="p-5 rounded-2xl bg-[#f59e0b]/10 border border-[#f59e0b]/30 flex items-start gap-3.5">
              <ShieldCheck className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                <span className="font-bold text-[#f59e0b]">Musician Profile: </span>
                {music.disclaimer}
              </div>
            </div>
          </div>
        </ScrollRevealWrapper>

        {/* Live Repertoire */}
        <ScrollRevealWrapper className="lg:col-span-5" delay={200}>
          <div className="rounded-3xl bg-gradient-to-b from-[#161b22]/90 to-[#0d1117]/90 backdrop-blur-2xl p-8 sm:p-10 border border-white/10 shadow-2xl space-y-6">
            <div className="flex items-center gap-2.5 text-[#00f0ff] text-xs font-bold uppercase tracking-wider pb-5 border-b border-white/10">
              <Disc className="w-4 h-4" />
              <span>Stage Performance & Worship Repertoire</span>
            </div>

            <p className="text-sm text-white/70 leading-relaxed">
              Practical skills applied in weekly church worship services, choir accompaniment, and lead melodies:
            </p>

            <div className="space-y-3">
              {music.musicalSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-[#080a0f] border border-white/5 text-sm text-white/90 font-medium hover:border-[#f59e0b]/40 hover:translate-x-1 transition-all"
                >
                  <Check className="w-4 h-4 text-[#f59e0b] shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 text-xs text-white/50 flex items-center justify-between">
              <span>Notation System:</span>
              <span className="text-[#00f0ff] font-semibold">ABC Notation & Lead Sheets</span>
            </div>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};
