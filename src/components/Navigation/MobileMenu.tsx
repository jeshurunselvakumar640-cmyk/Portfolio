"use client";

import React from "react";
import { X, Sparkles, Volume2, VolumeX } from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { id: string; label: string }[];
  activeSection: string;
  onNavigate: (id: string) => void;
  onOpenAI: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navLinks,
  activeSection,
  onNavigate,
  onOpenAI,
}) => {
  const isMuted = audioEngine.getMuteState();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-sm h-full bg-[#0d1117] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl z-10">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="text-xs font-semibold text-[#00f0ff] uppercase tracking-wider">
              Navigation
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <div className="mt-6 flex flex-col gap-2 text-sm">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`flex items-center justify-between p-3.5 rounded-xl text-left font-medium transition-all ${
                  activeSection === link.id
                    ? "bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/30 shadow-cyan-glow"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{link.label}</span>
              </button>
            ))}

            <button
              onClick={() => {
                onClose();
                onOpenAI();
              }}
              className="flex items-center justify-between p-3.5 mt-3 rounded-xl border border-[#8b5cf6]/40 bg-[#8b5cf6]/15 text-[#a78bfa] hover:text-white transition-all font-medium"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
                <span>Jeshurun AI Assistant</span>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-white/10 flex flex-col gap-3 text-xs">
          <button
            onClick={() => {
              audioEngine.toggleMute();
              onClose();
            }}
            className="flex items-center justify-center gap-2 p-3 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:text-white font-medium"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#00f0ff]" />}
            <span>{isMuted ? "Enable Piano Synthesizer Audio" : "Mute Synthesizer Audio"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
