"use client";

import React, { useEffect, useState } from "react";
import { Volume2, VolumeX, Menu, X, Sparkles, Disc } from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";
import { portfolioData } from "@/data/portfolioData";
import { MobileMenu } from "./MobileMenu";

interface NavbarProps {
  onOpenAI: () => void;
}

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "music", label: "Music" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenAI }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const unsub = audioEngine.subscribeMute((muted) => {
      setIsMuted(muted);
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["hero", "about", "journey", "music", "projects", "skills", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      unsub();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAudioToggle = () => {
    const nextMute = audioEngine.toggleMute();
    setIsMuted(nextMute);
  };

  const scrollTo = (id: string) => {
    audioEngine.playClickSound();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#080a0f]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl border border-[#00f0ff]/30 bg-gradient-to-br from-[#00f0ff]/20 to-transparent flex items-center justify-center text-[#00f0ff] group-hover:border-[#00f0ff] group-hover:shadow-cyan-glow transition-all">
              <Disc className="w-4 h-4 animate-spin" style={{ animationDuration: "12s" }} />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                <span>{portfolioData.profile.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              </div>
              <div className="text-[11px] text-[#00f0ff]/80 font-medium tracking-wide">
                Music × Engineering × AI
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#0d1117]/80 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-lg">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeSection === link.id
                    ? "text-[#00f0ff] bg-[#00f0ff]/10 shadow-sm font-semibold"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Jeshurun AI Button */}
            <button
              onClick={() => {
                audioEngine.playClickSound();
                onOpenAI();
              }}
              className="ml-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#8b5cf6]/20 to-[#6366f1]/20 border border-[#8b5cf6]/40 text-[#c4b5fd] hover:text-white hover:border-[#8b5cf6] hover:shadow-violet-glow transition-all text-xs font-medium flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#a78bfa] animate-pulse" />
              <span>Jeshurun AI</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={handleAudioToggle}
              title={isMuted ? "Turn Sound ON" : "Mute Sound"}
              aria-label={isMuted ? "Turn Sound ON" : "Mute Sound"}
              className={`flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-medium transition-all ${
                isMuted
                  ? "border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/20"
                  : "border-[#00f0ff]/40 bg-[#00f0ff]/10 text-[#00f0ff] shadow-cyan-glow"
              }`}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white/40" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#00f0ff]" />
              )}
              
              <div className="flex items-end gap-0.5 h-3 w-3.5">
                <div className={`w-0.5 bg-current rounded-t ${!isMuted ? "animate-eq-1" : "h-1"}`} />
                <div className={`w-0.5 bg-current rounded-t ${!isMuted ? "animate-eq-2" : "h-2"}`} />
                <div className={`w-0.5 bg-current rounded-t ${!isMuted ? "animate-eq-3" : "h-1"}`} />
              </div>
              <span className="hidden sm:inline text-[11px]">
                {isMuted ? "Sound: Muted" : "Sound: ON"}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => {
                audioEngine.playClickSound();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={NAV_LINKS}
        activeSection={activeSection}
        onNavigate={scrollTo}
        onOpenAI={onOpenAI}
      />
    </>
  );
};
