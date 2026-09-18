"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { BootSequence } from "@/components/BootSequence/BootSequence";
import { Navbar } from "@/components/Navigation/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { About } from "@/components/About/About";
import { EducationTimeline } from "@/components/Journey/EducationTimeline";
import { MusicJourney } from "@/components/MusicJourney/MusicJourney";
import { Projects } from "@/components/Projects/Projects";
import { SkillsConsole } from "@/components/Skills/SkillsConsole";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";
import { JeshurunAIDock } from "@/components/JeshurunAI/JeshurunAIDock";
import { JeshurunAIChatModal } from "@/components/JeshurunAI/JeshurunAIChatModal";
import { InteractiveCanvasBackground } from "@/components/Effects/InteractiveCanvasBackground";

export default function Home() {
  const [bootCompleted, setBootCompleted] = useState<boolean>(false);
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#080a0f] text-[#f0f6fc] relative selection:bg-[#00f0ff] selection:text-black overflow-x-hidden">
      {/* Dynamic Interactive Mouse & Particle Background */}
      <InteractiveCanvasBackground />

      {/* Subtle Ambient Grid */}
      <div className="fixed inset-0 studio-grid-bg opacity-25 pointer-events-none z-0" />

      {/* Boot Sequence Overlay */}
      {!bootCompleted && (
        <BootSequence onComplete={() => setBootCompleted(true)} />
      )}

      {/* Modern Studio Navbar */}
      <Navbar onOpenAI={() => setIsAIOpen(true)} />

      {/* Portfolio Sections with Scroll Reveals */}
      <div className="relative z-10 space-y-16">
        <Hero onOpenAI={() => setIsAIOpen(true)} />
        <About />
        <EducationTimeline />
        <MusicJourney />
        <Projects />
        <SkillsConsole />
        <Contact onOpenAI={() => setIsAIOpen(true)} />
        <Footer />
      </div>

      {/* Floating Studio AI Assistant Dock & Modal */}
      <JeshurunAIDock
        onClick={() => setIsAIOpen(true)}
        isOpen={isAIOpen}
      />

      <JeshurunAIChatModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />
    </main>
  );
}
