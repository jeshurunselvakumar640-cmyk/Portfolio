"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, Send, Sparkles, MessageSquare } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { audioEngine } from "@/lib/audioEngine";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 1 0 0-2.92 1.46 1.46 0 0 0 0 2.92M7.86 18.5v-8.37H5.07v8.37h2.79z" />
  </svg>
);

interface ContactProps {
  onOpenAI: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenAI }) => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const email = portfolioData.contact.directEmail;

  const handleCopyEmail = () => {
    audioEngine.playClickSound();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playClickSound();
    const subject = encodeURIComponent(`Message from ${name || "Visitor"}`);
    const body = encodeURIComponent(message || "Hey Jeshurun, saw your portfolio and wanted to connect!");
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="mb-14 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-xs font-semibold text-[#00f0ff] mb-4">
          <MessageSquare className="w-4 h-4" />
          <span>Get in Touch</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Let's{" "}
          <span className="bg-gradient-to-r from-[#00f0ff] via-[#10b981] to-[#f59e0b] bg-clip-text text-transparent">
            Connect
          </span>
        </h2>
        <p className="mt-4 text-white/60 text-base sm:text-lg leading-relaxed">
          {portfolioData.contact.subheadline}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Channels */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#161b22]/90 to-[#0d1117]/90 backdrop-blur-2xl border border-white/10 shadow-2xl space-y-5">
            <div className="flex items-center justify-between text-xs text-white/50">
              <span className="flex items-center gap-2 text-[#00f0ff] font-bold uppercase tracking-wider">
                <Mail className="w-4 h-4" />
                <span>Direct Email</span>
              </span>
            </div>

            <div className="text-white text-base sm:text-lg font-bold truncate">
              {email}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleCopyEmail}
                className="flex-1 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-[#10b981]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied to Clipboard" : "Copy Email"}</span>
              </button>

              <a
                href={`mailto:${email}`}
                className="py-3 px-6 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] text-black font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-cyan-glow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Write</span>
              </a>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="grid grid-cols-2 gap-3.5">
            <a
              href={portfolioData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-3xl bg-gradient-to-b from-[#161b22]/90 to-[#0d1117]/90 backdrop-blur-2xl border border-white/10 hover:border-white/30 text-white/90 hover:text-white transition-all flex items-center gap-3.5 group shadow-lg"
            >
              <GithubIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              <div>
                <div className="font-bold text-sm">GitHub</div>
                <div className="text-xs text-white/40">Open Source</div>
              </div>
            </a>

            <a
              href={portfolioData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-3xl bg-gradient-to-b from-[#161b22]/90 to-[#0d1117]/90 backdrop-blur-2xl border border-white/10 hover:border-[#00f0ff]/50 text-white/90 hover:text-white transition-all flex items-center gap-3.5 group shadow-lg"
            >
              <LinkedinIcon className="w-6 h-6 text-[#00f0ff] group-hover:scale-110 transition-transform" />
              <div>
                <div className="font-bold text-sm">LinkedIn</div>
                <div className="text-xs text-white/40">Profile</div>
              </div>
            </a>
          </div>

          {/* AI Quick Callout */}
          <div className="p-5 rounded-3xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 text-white/90 font-medium">
              <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
              <span>Questions about my projects or background?</span>
            </div>
            <button
              onClick={() => {
                audioEngine.playClickSound();
                onOpenAI();
              }}
              className="px-4 py-2 rounded-full bg-[#8b5cf6] text-white font-bold hover:bg-[#7c3aed] transition-all shadow-violet-glow"
            >
              Ask AI
            </button>
          </div>
        </div>

        {/* Right Column: Message Form */}
        <div className="lg:col-span-7 rounded-3xl bg-gradient-to-b from-[#161b22]/90 to-[#0d1117]/90 backdrop-blur-2xl p-8 sm:p-10 border border-white/10 shadow-2xl">
          <div className="pb-5 border-b border-white/10 mb-6 text-sm font-bold text-white">
            Send a Direct Note
          </div>

          <form onSubmit={handleSendMail} className="space-y-4 text-xs">
            <div>
              <label className="text-white/60 block mb-2 font-medium">Your Name / Organization</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex"
                className="w-full px-4 py-3.5 rounded-2xl bg-[#080a0f] border border-white/10 text-white text-sm focus:border-[#00f0ff] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-white/60 block mb-2 font-medium">Your Message</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Let's build something impactful, discuss music technology, or collaborate on code..."
                className="w-full px-4 py-3.5 rounded-2xl bg-[#080a0f] border border-white/10 text-white text-sm focus:border-[#00f0ff] focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00f0ff] via-[#10b981] to-[#f59e0b] text-black font-bold text-sm hover:opacity-90 shadow-cyan-glow transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message to Jeshurun</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
