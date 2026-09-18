"use client";

import React from "react";
import { Sparkles, MessageSquare } from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

interface JeshurunAIDockProps {
  onClick: () => void;
  isOpen: boolean;
}

export const JeshurunAIDock: React.FC<JeshurunAIDockProps> = ({ onClick, isOpen }) => {
  if (isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={() => {
          audioEngine.playClickSound();
          onClick();
        }}
        className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#161b22] border border-[#8b5cf6]/50 shadow-violet-glow hover:border-[#8b5cf6] hover:bg-[#21262d] transition-all font-mono text-xs text-white"
        aria-label="Open Jeshurun AI assistant"
      >
        <div className="w-6 h-6 rounded-full bg-[#8b5cf6]/20 border border-[#8b5cf6]/60 flex items-center justify-center text-[#a78bfa] group-hover:scale-110 transition-transform">
          <Sparkles className="w-3.5 h-3.5 text-[#8b5cf6] animate-pulse" />
        </div>
        <div className="flex flex-col items-start leading-tight">
          <span className="font-bold text-[#c4b5fd]">JESHURUN AI</span>
          <span className="text-[10px] text-white/50">Ask the builder</span>
        </div>
      </button>
    </div>
  );
};
