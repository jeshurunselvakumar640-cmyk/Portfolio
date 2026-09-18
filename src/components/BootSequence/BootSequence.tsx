"use client";

import React, { useEffect, useState } from "react";
import { Terminal, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_STEPS = [
  { text: "INITIALIZING DIGITAL STUDIO ENVIRONMENT...", delay: 200 },
  { text: "LOADING AUDIO ENGINE (POLYPHONIC SYNTH)...", delay: 450, target: "AUDIO ENGINE ....... READY" },
  { text: "MOUNTING ENGINEERING CORE (SYSTEMS & KINEMATICS)...", delay: 750, target: "ENGINEERING CORE ... READY" },
  { text: "LINKING PROJECT MODULES (CHORDICIAN & PHYSIX)...", delay: 1050, target: "PROJECT MODULE ..... READY" },
  { text: "CONFIGURING JESHURUN AI SUBSYSTEM...", delay: 1350, target: "AI SUBSYSTEM ....... READY" },
  { text: "ALL SYSTEMS STABILIZED // OPERATIONAL", delay: 1650, target: "SYSTEM ONLINE" },
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isSkipping, setIsSkipping] = useState(false);

  const handleFinish = () => {
    try {
      sessionStorage.setItem("jeshurun_boot_completed", "true");
    } catch {}
    setIsSkipping(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  useEffect(() => {
    // Check if user already booted or prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasBooted = sessionStorage.getItem("jeshurun_boot_completed");

    if (hasBooted || prefersReducedMotion) {
      onComplete();
      return;
    }

    // Play subtle startup chirp
    audioEngine.playClickSound();

    const timers: NodeJS.Timeout[] = [];

    BOOT_STEPS.forEach((step, idx) => {
      const timer = setTimeout(() => {
        setCurrentStepIndex(idx + 1);
        setLogs((prev) => [...prev, step.target || step.text]);
        audioEngine.playClickSound();

        if (idx === BOOT_STEPS.length - 1) {
          setTimeout(handleFinish, 600);
        }
      }, step.delay);
      timers.push(timer);
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        handleFinish();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#080a0f] text-[#f0f6fc] font-mono transition-opacity duration-500 ${
        isSkipping ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 studio-grid-bg opacity-40 pointer-events-none" />
      
      <div className="relative w-full max-w-xl mx-4 p-6 rounded-lg hud-panel border border-[#00f0ff]/30 shadow-cyan-glow">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 text-xs tracking-wider text-muted-foreground">
          <div className="flex items-center gap-2 text-[#00f0ff]">
            <Terminal className="w-4 h-4" />
            <span>JESHURUN_OS v2.5 // BOOT_SEQUENCE</span>
          </div>
          <button
            onClick={handleFinish}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-white/60 hover:text-[#00f0ff] hover:bg-white/5 rounded border border-white/10 transition-colors"
          >
            <span>[ESC] SKIP</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Console Logs */}
        <div className="space-y-2.5 min-h-[160px] text-xs sm:text-sm">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-2.5 text-[#00f0ff]/90">
              <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{log}</span>
            </div>
          ))}
          {currentStepIndex < BOOT_STEPS.length && (
            <div className="flex items-center gap-2 text-white/40 animate-pulse">
              <Zap className="w-4 h-4 text-[#f59e0b] shrink-0" />
              <span>PROCESSING SYSTEM DIRECTIVES...</span>
              <span className="w-2 h-4 bg-[#00f0ff] animate-ping" />
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex justify-between text-[11px] text-white/50 mb-1.5 font-mono">
            <span>DIAGNOSTICS & TELEMETRY</span>
            <span>{Math.min(100, Math.round((currentStepIndex / BOOT_STEPS.length) * 100))}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00f0ff] via-[#10b981] to-[#f59e0b] transition-all duration-300 rounded-full"
              style={{ width: `${(currentStepIndex / BOOT_STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
