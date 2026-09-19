import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { portfolioData } from "@/data/portfolioData";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Valid message string is required." },
        { status: 400 }
      );
    }

    const trimmedMessage = message.trim();
    const apiKey = process.env.GEMINI_API_KEY;

    // 1. If API key is available, call Google Gemini with supported active models
    if (apiKey && apiKey.trim() !== "") {
      const modelCandidates = [
        "gemini-3.6-flash",
        "gemini-3.8-flash",
        "gemini-3.5-flash",
        "gemini-3.5-flash-lite",
        "gemini-3.1-flash-lite",
        "gemini-flash-latest",
      ];

      // Format past history cleanly for Gemini SDK
      const formattedHistory: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];
      if (Array.isArray(history)) {
        for (const item of history) {
          if (
            (item.role === "user" || item.role === "model") &&
            typeof item.text === "string" &&
            item.text.trim() !== ""
          ) {
            formattedHistory.push({
              role: item.role === "user" ? "user" : "model",
              parts: [{ text: item.text.trim() }],
            });
          }
        }
      }

      for (const modelName of modelCandidates) {
        try {
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: portfolioData.aiKnowledge.systemPrompt,
          });

          // Ensure history starts with a user message if history is provided
          let validChatHistory = formattedHistory;
          while (validChatHistory.length > 0 && validChatHistory[0].role !== "user") {
            validChatHistory = validChatHistory.slice(1);
          }

          const chat = model.startChat({
            history: validChatHistory,
          });

          const result = await chat.sendMessage(trimmedMessage);
          const responseText = result.response.text();

          if (responseText && responseText.trim() !== "") {
            return NextResponse.json({
              reply: responseText.trim(),
              source: modelName,
            });
          }
        } catch (err: any) {
          console.warn(`[Gemini API Attempt Failed for ${modelName}]:`, err?.message || err);
          // Try next model candidate
        }
      }
    }

    // 2. Intelligent Grounded Knowledge Fallback (if API key is missing or models are unreachable)
    const fallbackReply = generateSemanticKnowledgeReply(trimmedMessage);
    return NextResponse.json({
      reply: fallbackReply,
      source: "grounded-portfolio-knowledge",
    });
  } catch (err: any) {
    console.error("[Chat API Error]:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err?.message },
      { status: 500 }
    );
  }
}

/**
 * Robust semantic knowledge responder grounded directly in portfolioData.
 * Handles diverse free-form phrasing when Gemini API cannot be reached.
 */
function generateSemanticKnowledgeReply(query: string): string {
  const q = query.toLowerCase();

  // Why Chordician / Problem solved
  if (
    q.includes("why did you build chordician") ||
    q.includes("why build chordician") ||
    q.includes("why did jeshurun build chordician") ||
    q.includes("why he built chordician") ||
    q.includes("problem does chordician solve") ||
    q.includes("solve") ||
    q.includes("motivation") ||
    q.includes("inspiration")
  ) {
    return "Jeshurun built **Chordician** to eliminate live stage friction for musicians. During live church performances, finding notes and chord sheets fast was stressful. Online tabs often had incorrect chords, were tuned to original album recordings instead of live vocal keys, or lacked stage arrangements. Chordician solves this by providing AI-powered chord parsing (Chordex AI), OCR import, and on-the-fly key transpositions for live worship and stage performance.";
  }

  // Hardest part of Chordician
  if (
    q.includes("hardest part") ||
    q.includes("challenge") ||
    q.includes("difficult") ||
    q.includes("struggle")
  ) {
    return "The most challenging part of building **Chordician** was developing the custom **Chordex AI** tokenizer. Accurately distinguishing chord notations from arbitrary song lyrics in unstructured text and handwritten sheet photos—while maintaining accurate harmonic transposition mathematics across all musical keys—required extensive algorithmic refinement.";
  }

  // Chordician general / features / standalone
  if (
    q.includes("chordician") ||
    q.includes("chordex") ||
    q.includes("songbook") ||
    q.includes("build alone") ||
    q.includes("built alone") ||
    q.includes("solo project")
  ) {
    return "**Chordician** is Jeshurun's 100% solo individual project! It's an intelligent digital songbook for live musicians with Chordex AI parsing, OCR sheet import, Smart Paste, and dynamic key transpositions. Built with React, Express.js, Firebase, Gemini AI, and PWA offline caching. You can check it out live at [chordician.vercel.app](https://chordician.vercel.app/)!";
  }

  // PhysiX / Contribution / Group Project
  if (
    q.includes("physix") ||
    q.includes("physics") ||
    q.includes("virtual lab") ||
    q.includes("role in physix") ||
    q.includes("contribution") ||
    q.includes("group project")
  ) {
    return "**PhysiX** is an interactive 2D virtual physics lab created as a collaborative college group project. Jeshurun's specific contribution was **Backend Management Co-Lead**, where he managed state orchestration, data sync, and integrated the Matter.js 2D physics engine for real-time kinematic projectile and collision simulations. Live at [physi-x-orcin.vercel.app](https://physi-x-orcin.vercel.app/)!";
  }

  // Music Journey / Keyboard / How learned
  if (
    q.includes("keyboard") ||
    q.includes("piano") ||
    q.includes("how did he learn") ||
    q.includes("how did you learn") ||
    q.includes("start playing") ||
    q.includes("when did") ||
    q.includes("how long") ||
    q.includes("music")
  ) {
    return "Jeshurun started playing keyboard in 2019 at age 11. He took formal classes for about a year before lockdown halted them. From there, ~90% of his progress came through dedicated self-practice, intense ear training, and mentorship from experienced church musicians. Today, he is an active live keyboardist during church worship, focusing on harmonic voicings, lead melodies, and ABC notation.";
  }

  // Education / Studying / College / School
  if (
    q.includes("study") ||
    q.includes("studying") ||
    q.includes("education") ||
    q.includes("college") ||
    q.includes("sies") ||
    q.includes("school") ||
    q.includes("degree")
  ) {
    return "Jeshurun is currently in his **2nd Year of Computer Engineering (2025–2028)** at **SIES Graduate School of Technology, Nerul**. Previously, he completed 12th Grade Science with Computer Science at GR Patil Dombivli (2025), 10th Grade at Kidland English School (2023), and foundational schooling at South Indian English School Diva.";
  }

  // Technical Skills / Technologies known / Tech Stack
  if (
    q.includes("skill") ||
    q.includes("technolog") ||
    q.includes("tech stack") ||
    q.includes("languages") ||
    q.includes("java") ||
    q.includes("c ") ||
    q.includes("react") ||
    q.includes("express")
  ) {
    return "Jeshurun's verified technical competencies include:\n- **Programming**: C (Intermediate, systems & data structures), Java (Intermediate, OOP & backend), JavaScript ES6+ (Intermediate)\n- **Web & Frameworks**: HTML/CSS, React, Express.js, REST APIs, Tailwind CSS, PWA\n- **Tools & Libraries**: Matter.js (Physics), Web Audio API, Firebase (Auth/Firestore), Git\n- **Music**: Live Church Keyboard, Harmonic Voicings, ABC Notation";
  }

  // Developer goals / What kind of developer / Future
  if (
    q.includes("what kind of developer") ||
    q.includes("become") ||
    q.includes("goal") ||
    q.includes("career") ||
    q.includes("future") ||
    q.includes("aim")
  ) {
    return "Jeshurun is aiming to become a practical, problem-driven software engineer who builds high-utility tools with robust backend architectures. He is deeply interested in systems programming, distributed backend services, and bridging technology with creative domains like music and simulation.";
  }

  // What does he enjoy / Outside coding / Hobbies / Interests
  if (
    q.includes("enjoy") ||
    q.includes("outside") ||
    q.includes("hobby") ||
    q.includes("hobbies") ||
    q.includes("free time") ||
    q.includes("interest")
  ) {
    return "Outside coding, Jeshurun serves as an active keyboardist in church during weekly live worship. He loves ear training, listening to worship and acoustic music, learning from senior musicians, and building software projects that solve real-world friction.";
  }

  // Who is Jeshurun / Overview / Introduction
  if (
    q.includes("who is jeshurun") ||
    q.includes("who are you") ||
    q.includes("tell me about jeshurun") ||
    q.includes("about") ||
    q.includes("interesting") ||
    q.includes("background")
  ) {
    return "Jeshurun Selvakumar is a 2nd-year Computer Engineering student at SIES GST Nerul, an active church keyboardist since 2019, and a builder. He creates software at the intersection of Music × Engineering × AI, including **Chordician** (Solo AI Digital Songbook) and **PhysiX** (College 2D Physics Lab). Christian faith, worship, and practical engineering are core pillars of his life.";
  }

  // Unknown question fallback rule
  return "I don't have that information in Jeshurun's portfolio yet. Feel free to ask about his projects (**Chordician**, **PhysiX**), his education at SIES GST, his church keyboard journey, or his engineering skills!";
}
