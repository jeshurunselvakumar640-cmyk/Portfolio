import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { portfolioData } from "@/data/portfolioData";

// Server-side only - GEMINI_API_KEY is never exposed client-side
const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Valid message string is required." },
        { status: 400 }
      );
    }

    // If API key is available, call Gemini
    if (apiKey && apiKey.trim() !== "") {
      const modelCandidates = [
        "gemini-1.5-flash-latest",
        "gemini-1.5-flash",
        "gemini-2.0-flash-exp",
        "gemini-pro",
      ];

      for (const modelName of modelCandidates) {
        try {
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: portfolioData.aiKnowledge.systemPrompt,
          });

          const chat = model.startChat({
            history: (history || []).map((h: { role: string; text: string }) => ({
              role: h.role === "user" ? "user" : "model",
              parts: [{ text: h.text }],
            })),
          });

          const result = await chat.sendMessage(message);
          const responseText = result.response.text();

          if (responseText) {
            return NextResponse.json({
              reply: responseText,
              source: modelName,
            });
          }
        } catch (err: any) {
          // Continue to next model candidate
        }
      }
    }

    // Intelligent Offline Grounded Knowledge Responder (when API key is unset in dev)
    const reply = generateGroundedOfflineReply(message);
    return NextResponse.json({
      reply,
      source: "grounded-studio-engine",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Internal server error", details: err?.message },
      { status: 500 }
    );
  }
}

// Fallback pattern matching directly on portfolioData truth without hallucinations
function generateGroundedOfflineReply(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("chordician")) {
    return "Chordician is Jeshurun's individual solo project, bro! He built it from the ground up using React, Express.js, Firebase Auth, Firestore, REST APIs, and Gemini AI. It's a personalized digital songbook engineered to eliminate live stage friction for keyboardists, featuring Chordex AI parsing, Vision OCR, Smart Paste, and dynamic key transpositions.";
  }

  if (lower.includes("physix") || lower.includes("physics")) {
    return "PhysiX is a college group project (not a solo one!). Jeshurun co-managed the backend with one teammate, integrating Matter.js with Vite and Firebase to build an interactive virtual 2D physics lab with kinematic projectile simulations.";
  }

  if (lower.includes("keyboard") || lower.includes("music") || lower.includes("piano") || lower.includes("learn")) {
    return "Jeshurun started playing keyboard in 2019 at age 11. He took formal classes for about a year before lockdown halted them. From there, it was ~90% self-learning, ear training, and guidance from fellow musicians! Today he plays live in church during worship. He's skilled in chords, scales, leads, rhythms, and ABC notation, but he doesn't call himself a classical concert pianist—he's an authentic live church keyboardist.";
  }

  if (lower.includes("education") || lower.includes("college") || lower.includes("sies") || lower.includes("school") || lower.includes("university")) {
    return "Jeshurun is currently in his 2nd Year of Computer Engineering at SIES Graduate School of Technology, Nerul (2025–2028). Before this, he finished his 12th in Science + Computer Science at GR Patil Dombivli (2025), 10th at Kidland English School Dombivli (2023), and attended South Indian English School Diva (2012–2020).";
  }

  if (lower.includes("skill") || lower.includes("stack") || lower.includes("java") || lower.includes("c ") || lower.includes("react")) {
    return "Here's Jeshurun's technical skill set: C (Intermediate), Java (Intermediate), HTML (Intermediate), JavaScript (Intermediate), React (Beginner), Express.js (Beginner), and Keyboard & Live Performance (Intermediate → Live Church Stage).";
  }

  if (lower.includes("faith") || lower.includes("god") || lower.includes("church") || lower.includes("christian")) {
    return "God, Christian faith, and church ministry are fundamental, foundational aspects of Jeshurun's life. He serves as an active church keyboardist, approaching music and software as genuine gifts of service and worship.";
  }

  if (lower.includes("who are you") || lower.includes("who is jeshurun") || lower.includes("about")) {
    return "I'm Jeshurun's portfolio AI assistant! Jeshurun is a Computer Engineering student at SIES GST Nerul, an active church keyboardist since 2019, and a builder who created Chordician and co-engineered PhysiX. What would you like to explore about him, bro?";
  }

  return "I'm Jeshurun's portfolio AI! I'm grounded in Jeshurun's background—his 2nd-year studies at SIES GST Nerul, his solo project Chordician, his group project PhysiX, his church keyboard journey since 2019, and his engineering skills. Feel free to ask about any of those!";
}
