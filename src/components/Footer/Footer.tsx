"use client";

import React from "react";
import { ArrowUp, Disc } from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    audioEngine.playClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#080a0f] py-14 px-4 sm:px-6 text-xs text-white/60 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Status */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00f0ff]">
            <Disc className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Jeshurun Selvakumar</div>
            <div className="text-[11px] text-white/40">Computer Engineering • Music • Building Things</div>
          </div>
        </div>

        {/* Center Credits */}
        <div className="text-center text-xs text-white/40">
          Crafted with Next.js, Web Audio API, Matter.js & Google Gemini
        </div>

        {/* Back to top */}
        <div>
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white/5 hover:bg-[#00f0ff]/10 hover:text-[#00f0ff] border border-white/10 text-white/70 transition-all flex items-center gap-2 font-medium"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30 text-center sm:text-left">
        <div>
          © {new Date().getFullYear()} Jeshurun Selvakumar. All rights reserved.
        </div>
        <div>
          Grounded in faith, musicianship, and engineering.
        </div>
      </div>
    </footer>
  );
};
