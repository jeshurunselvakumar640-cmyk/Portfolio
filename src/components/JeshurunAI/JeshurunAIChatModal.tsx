"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, User, Cpu, RotateCcw } from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  time: string;
}

interface JeshurunAIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_PROMPTS = [
  "Tell me about Chordician",
  "How did Jeshurun learn keyboard?",
  "What was his role in PhysiX?",
  "What is his education background?",
  "What are his technical skills?",
];

export const JeshurunAIChatModal: React.FC<JeshurunAIChatModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "model",
      text: "Hey! I'm Jeshurun's portfolio AI assistant, powered by Gemini 2.5 Flash. Ask me anything about Jeshurun's background, his projects like Chordician & PhysiX, his keyboard journey, or his engineering interests!",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    audioEngine.playClickSound();

    const userMsg: Message = {
      id: String(Date.now()),
      role: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await res.json();
      const replyText = data.reply || "Sorry, I couldn't process that query.";

      const aiMsg: Message = {
        id: String(Date.now() + 1),
        role: "model",
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      audioEngine.playClickSound();
    } catch (err) {
      const errorMsg: Message = {
        id: String(Date.now() + 1),
        role: "model",
        text: "Sorry, I had trouble connecting to the neural server. You can still explore the portfolio sections above!",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl h-[580px] rounded-2xl bg-[#0d1117] border border-[#8b5cf6]/40 shadow-violet-glow flex flex-col overflow-hidden z-10 font-mono">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#161b22]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/20 border border-[#8b5cf6]/50 flex items-center justify-center text-[#c4b5fd]">
              <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>JESHURUN AI</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#8b5cf6]/20 text-[#a78bfa] border border-[#8b5cf6]/40">
                  GEMINI 2.5 FLASH
                </span>
              </div>
              <div className="text-[11px] text-white/50">Ask the builder // Studio Assistant</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close AI dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 border-b border-white/5 bg-[#080a0f] flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-white/40 shrink-0">PROMPTS:</span>
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-[#8b5cf6]/20 hover:text-[#c4b5fd] border border-white/10 text-white/70 whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isAI = msg.role === "model";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs leading-relaxed ${
                  isAI ? "items-start" : "items-start flex-row-reverse"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center border ${
                    isAI
                      ? "bg-[#8b5cf6]/20 border-[#8b5cf6]/50 text-[#c4b5fd]"
                      : "bg-[#00f0ff]/20 border-[#00f0ff]/50 text-[#00f0ff]"
                  }`}
                >
                  {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl ${
                    isAI
                      ? "bg-[#161b22] border border-white/10 text-white/90 font-sans"
                      : "bg-[#00f0ff]/15 border border-[#00f0ff]/40 text-white font-sans"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <div className="mt-1 text-[10px] text-white/30 font-mono text-right">
                    {msg.time}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3 text-xs text-white/60">
              <div className="w-7 h-7 rounded-lg bg-[#8b5cf6]/20 border border-[#8b5cf6]/50 flex items-center justify-center text-[#c4b5fd]">
                <Cpu className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 rounded-2xl bg-[#161b22] border border-white/10 flex items-center gap-2">
                <span>Gemini 2.5 Flash thinking</span>
                <div className="flex items-end gap-0.5 h-3 w-4">
                  <div className="w-1 bg-[#8b5cf6] rounded-t animate-eq-1" />
                  <div className="w-1 bg-[#8b5cf6] rounded-t animate-eq-2" />
                  <div className="w-1 bg-[#8b5cf6] rounded-t animate-eq-3" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-[#161b22] border-t border-white/10 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Chordician, PhysiX, music, or education..."
            className="flex-1 px-4 py-2.5 rounded-lg bg-[#080a0f] border border-white/10 text-white text-xs focus:border-[#8b5cf6] focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2.5 rounded-lg bg-[#8b5cf6] text-white font-bold hover:bg-[#7c3aed] disabled:opacity-40 transition-all flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SEND</span>
          </button>
        </form>
      </div>
    </div>
  );
};
