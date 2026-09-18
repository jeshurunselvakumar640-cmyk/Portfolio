"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080a0f] text-[#f0f6fc] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff] mb-6 animate-pulse">
        <Sparkles className="w-8 h-8" />
      </div>
      <h1 className="text-6xl font-extrabold text-white mb-2">404</h1>
      <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
      <p className="text-white/60 max-w-md text-sm mb-8 leading-relaxed">
        The page you are looking for does not exist in Jeshurun's portfolio.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] text-black font-bold text-sm hover:opacity-90 shadow-cyan-glow transition-all flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Portfolio</span>
      </Link>
    </div>
  );
}
